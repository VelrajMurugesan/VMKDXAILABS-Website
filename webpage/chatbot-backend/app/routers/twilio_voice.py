"""Twilio Voice endpoints: inbound/outbound webhooks, status callback, and WebSocket media stream."""

import asyncio
import base64
import json
import logging
import time

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request, HTTPException, Query, Header
from fastapi.responses import Response
from pydantic import BaseModel

from app.core.config import get_settings
from app.services.twilio_service import (
    build_media_stream_twiml,
    make_outbound_call,
    get_call_status,
    end_call,
)
from app.services.stream_processor import (
    get_or_create_session,
    remove_session,
    detect_silence,
    process_speech_turn,
    build_media_message,
    SILENCE_DURATION_SEC,
)

logger = logging.getLogger(__name__)
settings = get_settings()

router = APIRouter(prefix="/api/twilio", tags=["twilio-voice"])


# --- Request/Response models ---

class OutboundCallRequest(BaseModel):
    to_number: str
    greeting: str | None = None


class OutboundCallResponse(BaseModel):
    call_sid: str
    status: str


class CallStatusResponse(BaseModel):
    call_sid: str
    status: str
    direction: str | None = None
    duration: str | None = None


# --- API Key auth helper ---

def verify_api_key(api_key: str | None) -> None:
    """Verify the API key for protected endpoints."""
    if not settings.twilio_api_key:
        raise HTTPException(status_code=500, detail="Twilio API key not configured on server")
    if not api_key or api_key != settings.twilio_api_key:
        raise HTTPException(status_code=401, detail="Invalid API key")


# --- HTTP Endpoints ---

@router.post("/voice/inbound")
async def inbound_call(request: Request, greeting: str | None = Query(None)):
    """Webhook for incoming Twilio calls.

    Returns TwiML that greets the caller and starts a Media Stream WebSocket.
    Twilio will POST form data with CallSid, From, To, etc.
    """
    form = await request.form()
    call_sid = form.get("CallSid", "unknown")
    caller = form.get("From", "unknown")
    called = form.get("To", "unknown")

    logger.info("Inbound call: SID=%s, from=%s, to=%s", call_sid, caller, called)

    twiml = build_media_stream_twiml(call_sid, greeting=greeting)
    return Response(content=twiml, media_type="application/xml")


@router.post("/voice/outbound", response_model=OutboundCallResponse)
async def outbound_call(
    body: OutboundCallRequest,
    x_api_key: str | None = Header(None),
):
    """Initiate an outbound call. Protected with API key auth.

    The call will connect and then start the same Media Stream WebSocket
    as inbound calls, using the inbound webhook as the TwiML URL.
    """
    verify_api_key(x_api_key)

    logger.info("Outbound call requested to: %s", body.to_number)
    result = make_outbound_call(body.to_number, greeting=body.greeting)
    return OutboundCallResponse(**result)


@router.post("/voice/status")
async def call_status_callback(request: Request):
    """Status callback for Twilio call events.

    Twilio POSTs call status updates (initiated, ringing, answered, completed).
    """
    form = await request.form()
    call_sid = form.get("CallSid", "unknown")
    call_status = form.get("CallStatus", "unknown")
    call_duration = form.get("CallDuration", "0")
    direction = form.get("Direction", "unknown")

    logger.info(
        "Call status update: SID=%s, status=%s, duration=%ss, direction=%s",
        call_sid, call_status, call_duration, direction,
    )

    # Clean up session when call completes
    if call_status in ("completed", "busy", "no-answer", "canceled", "failed"):
        remove_session(call_sid)

    return Response(content="<Response/>", media_type="application/xml")


@router.get("/voice/call/{call_sid}", response_model=CallStatusResponse)
async def get_call_info(call_sid: str, x_api_key: str | None = Header(None)):
    """Get the status of a specific call. Protected with API key."""
    verify_api_key(x_api_key)
    result = get_call_status(call_sid)
    return CallStatusResponse(
        call_sid=result["call_sid"],
        status=result["status"],
        direction=result.get("direction"),
        duration=result.get("duration"),
    )


@router.post("/voice/call/{call_sid}/end")
async def end_active_call(call_sid: str, x_api_key: str | None = Header(None)):
    """End an active call. Protected with API key."""
    verify_api_key(x_api_key)
    result = end_call(call_sid)
    return {"call_sid": result["call_sid"], "status": result["status"]}


# --- WebSocket Media Stream ---

@router.websocket("/ws/{call_sid}")
async def media_stream(websocket: WebSocket, call_sid: str):
    """Handle Twilio Media Stream WebSocket.

    Receives real-time mulaw audio from the caller and sends back
    AI-generated responses through the STT -> LLM -> TTS pipeline.
    """
    await websocket.accept()
    logger.info("WebSocket connected for call: %s", call_sid)

    session = get_or_create_session(call_sid)
    stream_sid = None
    last_audio_time = time.time()

    try:
        while True:
            # Receive message from Twilio
            raw = await asyncio.wait_for(websocket.receive_text(), timeout=60.0)
            message = json.loads(raw)
            event = message.get("event")

            if event == "connected":
                logger.info("Media stream connected for call %s", call_sid)

            elif event == "start":
                stream_sid = message.get("streamSid")
                start_info = message.get("start", {})
                session.stream_sid = stream_sid
                logger.info(
                    "Media stream started: streamSid=%s, callSid=%s, tracks=%s",
                    stream_sid, call_sid, start_info.get("tracks"),
                )

            elif event == "media":
                # Decode the base64 mulaw audio payload
                payload_b64 = message.get("media", {}).get("payload", "")
                if not payload_b64:
                    continue

                audio_chunk = base64.b64decode(payload_b64)
                is_silent = detect_silence(audio_chunk)

                if not is_silent:
                    session.add_audio_chunk(audio_chunk)
                    last_audio_time = time.time()
                else:
                    # Check if we have buffered speech and enough silence has passed
                    if (
                        session.is_speaking
                        and session.audio_buffer
                        and (time.time() - last_audio_time) >= SILENCE_DURATION_SEC
                    ):
                        # End of speech detected - process the turn
                        logger.info(
                            "Silence detected for %s, processing %.1fs of speech",
                            call_sid, session.get_speech_duration(),
                        )
                        mulaw_response = await process_speech_turn(session)

                        if mulaw_response and stream_sid:
                            # Send audio response back to caller
                            media_messages = build_media_message(stream_sid, mulaw_response)
                            for msg in media_messages:
                                await websocket.send_text(json.dumps(msg))

            elif event == "mark":
                # Playback of our response finished
                mark_name = message.get("mark", {}).get("name", "")
                logger.debug("Mark received for %s: %s", call_sid, mark_name)

            elif event == "stop":
                logger.info("Media stream stopped for call %s", call_sid)
                break

            else:
                logger.debug("Unknown media stream event for %s: %s", call_sid, event)

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected for call %s", call_sid)
    except asyncio.TimeoutError:
        logger.warning("WebSocket timeout for call %s (no data for 60s)", call_sid)
    except Exception as e:
        logger.error("WebSocket error for call %s: %s", call_sid, e, exc_info=True)
    finally:
        remove_session(call_sid)
        logger.info("WebSocket cleanup complete for call %s", call_sid)
