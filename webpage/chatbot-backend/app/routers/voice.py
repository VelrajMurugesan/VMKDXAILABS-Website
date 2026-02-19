import logging
import os
import asyncio
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.core.config import get_settings
from app.services.stt_service import transcribe_audio
from app.services.llm_service import get_chat_response
from app.services.tts_service import synthesize_speech, AUDIO_TEMP_DIR
from app.services.email_service import extract_lead_data, extract_lead_from_conversation, strip_lead_marker

logger = logging.getLogger(__name__)

settings = get_settings()

router = APIRouter()


class LeadData(BaseModel):
    name: str
    mobile: str
    email: str
    requirement: str

class VoiceResponse(BaseModel):
    transcript: str
    reply: str
    audio_url: str
    detected_language: str
    lead: LeadData | None = None


def _validate_audio_file(file: UploadFile) -> None:
    """
    Validate the uploaded audio file.

    Raises:
        HTTPException: If validation fails.
    """
    # Check content type
    if not file.content_type or not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {file.content_type}. Only audio files are accepted.",
        )

    # Check file size (content_length may not always be available)
    max_size = settings.max_audio_size_mb * 1024 * 1024
    if file.size and file.size > max_size:
        raise HTTPException(
            status_code=413,
            detail=f"Audio file too large. Maximum size is {settings.max_audio_size_mb}MB.",
        )


async def _cleanup_audio_file(filepath: str, delay_minutes: int) -> None:
    """
    Background task to delete an audio file after a specified delay.

    Args:
        filepath: Full path to the audio file.
        delay_minutes: Minutes to wait before deleting.
    """
    try:
        await asyncio.sleep(delay_minutes * 60)
        if os.path.exists(filepath):
            os.remove(filepath)
            logger.info(f"Cleaned up audio file: {filepath}")
    except Exception as e:
        logger.warning(f"Failed to clean up audio file {filepath}: {e}")


@router.post("/api/voice", response_model=VoiceResponse)
async def voice(
    background_tasks: BackgroundTasks,
    audio: UploadFile = File(..., description="Audio file to transcribe"),
    language: str = Form(default="auto", description="Language hint: 'ta', 'en', 'hi', or 'auto'"),
):
    """
    Process a voice message through the complete pipeline:
    Audio -> Google STT -> GPT-4o -> Azure TTS -> Response

    Returns the transcript, AI reply text, audio URL, and detected language.
    """
    # Validate the uploaded audio file
    _validate_audio_file(audio)

    try:
        # Read the audio content
        audio_content = await audio.read()

        # Validate size after reading (in case file.size was not available)
        max_size = settings.max_audio_size_mb * 1024 * 1024
        if len(audio_content) > max_size:
            raise HTTPException(
                status_code=413,
                detail=f"Audio file too large. Maximum size is {settings.max_audio_size_mb}MB.",
            )

        if len(audio_content) == 0:
            raise HTTPException(
                status_code=400,
                detail="Audio file is empty.",
            )

        content_type = audio.content_type or "audio/webm"

        logger.info(
            f"Voice request - content_type: {content_type}, "
            f"size: {len(audio_content)} bytes, "
            f"language_hint: {language}"
        )

        # Step 1: Speech-to-Text
        stt_result = await transcribe_audio(
            audio_content=audio_content,
            content_type=content_type,
            language_hint=language,
        )

        transcript = stt_result["transcript"]
        detected_language = stt_result["detected_language"]

        if not transcript:
            raise HTTPException(
                status_code=422,
                detail="Could not transcribe the audio. Please speak clearly and try again.",
            )

        logger.info(f"STT result - language: {detected_language}, transcript: {transcript[:100]}...")

        # Step 2: Get AI response from GPT-4o
        reply = await get_chat_response(
            user_message=transcript,
            history=[],
            language_hint=detected_language,
        )

        # Check for lead data - marker first, then regex fallback
        lead_dict = extract_lead_data(reply)
        lead_response = None
        if lead_dict:
            logger.info(f"Lead captured via marker (voice): {lead_dict['name']}")
            reply = strip_lead_marker(reply)
            lead_response = LeadData(**lead_dict)
        else:
            lead_dict = extract_lead_from_conversation(
                current_message=transcript,
                history=[],
            )
            if lead_dict:
                logger.info(f"Lead captured via regex (voice): {lead_dict['name']}")
                lead_response = LeadData(**lead_dict)

        logger.info(f"LLM reply length: {len(reply)} chars")

        # Step 3: Text-to-Speech
        audio_filename = await synthesize_speech(
            text=reply,
            language=detected_language,
        )

        # Schedule cleanup of the audio file
        audio_filepath = os.path.join(AUDIO_TEMP_DIR, audio_filename)
        background_tasks.add_task(
            _cleanup_audio_file,
            audio_filepath,
            settings.tts_cleanup_minutes,
        )

        # Build audio URL
        audio_url = f"/api/audio/{audio_filename}"

        logger.info(
            f"Voice pipeline complete - language: {detected_language}, "
            f"audio_file: {audio_filename}"
        )

        return VoiceResponse(
            transcript=transcript,
            reply=reply,
            audio_url=audio_url,
            detected_language=detected_language,
            lead=lead_response,
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Voice endpoint error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your voice message. Please try again later.",
        )


@router.get("/api/audio/{filename}")
async def get_audio(filename: str):
    """
    Serve a TTS-generated audio file.

    Args:
        filename: The audio file name to retrieve.

    Returns:
        The audio file as a streaming response.
    """
    # Sanitize filename to prevent path traversal
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename.")

    filepath = os.path.join(AUDIO_TEMP_DIR, filename)

    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Audio file not found or has expired.")

    return FileResponse(
        path=filepath,
        media_type="audio/mpeg",
        filename=filename,
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    )
