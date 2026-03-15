"""Twilio client and call management service."""

import logging
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse, Connect

from app.core.config import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()

_client: Client | None = None


def get_twilio_client() -> Client:
    """Get or create the Twilio REST client (lazy init)."""
    global _client
    if _client is None:
        if not settings.twilio_account_sid or not settings.twilio_auth_token:
            raise RuntimeError(
                "Twilio credentials not configured. "
                "Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env"
            )
        _client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
        logger.info("Twilio client initialized")
    return _client


def build_media_stream_twiml(call_sid: str, greeting: str | None = None) -> str:
    """Build TwiML response that starts a Media Stream WebSocket.

    Args:
        call_sid: The call SID to use in the WebSocket URL.
        greeting: Optional greeting message to say before starting the stream.

    Returns:
        TwiML XML string.
    """
    response = VoiceResponse()

    if greeting:
        response.say(greeting, voice="Polly.Aditi", language="en-IN")
    else:
        response.say(
            "Welcome to VMKD X AI LABS. How can I help you today?",
            voice="Polly.Aditi",
            language="en-IN",
        )

    # Pause briefly to let the greeting finish
    response.pause(length=1)

    connect = Connect()
    ws_url = f"{settings.base_url.replace('https://', 'wss://').replace('http://', 'ws://')}/api/twilio/ws/{call_sid}"
    connect.stream(url=ws_url)
    response.append(connect)

    return str(response)


def make_outbound_call(to_number: str, greeting: str | None = None) -> dict:
    """Initiate an outbound call via Twilio.

    Args:
        to_number: Phone number to call (E.164 format).
        greeting: Optional custom greeting for the call.

    Returns:
        Dict with call_sid and status.
    """
    client = get_twilio_client()

    # For outbound calls, we use a TwiML URL that Twilio will fetch
    # We pass the greeting as a query parameter
    twiml_url = f"{settings.base_url}/api/twilio/voice/inbound"
    if greeting:
        import urllib.parse
        twiml_url += f"?greeting={urllib.parse.quote(greeting)}"

    call = client.calls.create(
        to=to_number,
        from_=settings.twilio_phone_number,
        url=twiml_url,
        status_callback=f"{settings.base_url}/api/twilio/voice/status",
        status_callback_event=["initiated", "ringing", "answered", "completed"],
        status_callback_method="POST",
    )

    logger.info("Outbound call initiated: SID=%s, to=%s", call.sid, to_number)
    return {"call_sid": call.sid, "status": call.status}


def get_call_status(call_sid: str) -> dict:
    """Check the status of a call.

    Args:
        call_sid: The Twilio call SID.

    Returns:
        Dict with call details.
    """
    client = get_twilio_client()
    call = client.calls(call_sid).fetch()
    return {
        "call_sid": call.sid,
        "status": call.status,
        "direction": call.direction,
        "duration": call.duration,
        "from": call.from_formatted,
        "to": call.to_formatted,
    }


def end_call(call_sid: str) -> dict:
    """Hang up a call.

    Args:
        call_sid: The Twilio call SID.

    Returns:
        Dict with updated call status.
    """
    client = get_twilio_client()
    call = client.calls(call_sid).update(status="completed")
    logger.info("Call ended: SID=%s", call_sid)
    return {"call_sid": call.sid, "status": call.status}
