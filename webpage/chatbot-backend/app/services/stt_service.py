import logging
import os
import re
import tempfile

from openai import AsyncOpenAI

from app.core.config import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()

client = AsyncOpenAI(api_key=settings.openai_api_key)

# Unicode patterns for fallback language detection
TAMIL_PATTERN = re.compile(r"[\u0B80-\u0BFF]")
HINDI_PATTERN = re.compile(r"[\u0900-\u097F]")

# Whisper language name → our code
LANG_MAP = {
    "tamil": "ta",
    "english": "en",
    "hindi": "hi",
}

# Our code → Whisper ISO 639-1 hint
HINT_MAP = {
    "ta": "ta",
    "en": "en",
    "hi": "hi",
}


def detect_language_from_text(text: str) -> str:
    """Detect language from transcript text using Unicode ranges."""
    if TAMIL_PATTERN.search(text):
        return "ta"
    if HINDI_PATTERN.search(text):
        return "hi"
    return "en"


async def transcribe_audio(
    audio_content: bytes,
    content_type: str = "audio/webm",
    language_hint: str = "auto",
) -> dict:
    """
    Transcribe audio using OpenAI Whisper API.
    Automatically detects language (Tamil, English, Hindi, Tanglish).

    Args:
        audio_content: Raw audio bytes.
        content_type: MIME type of the audio file.
        language_hint: Language hint - "ta", "en", "hi", or "auto".

    Returns:
        A dict with "transcript" (str) and "detected_language" (str).
    """
    # Determine file extension from content type
    content_type_lower = content_type.lower()
    if "webm" in content_type_lower:
        suffix = ".webm"
    elif "ogg" in content_type_lower:
        suffix = ".ogg"
    elif "wav" in content_type_lower:
        suffix = ".wav"
    elif "mp3" in content_type_lower or "mpeg" in content_type_lower:
        suffix = ".mp3"
    else:
        suffix = ".webm"

    # Write audio to temp file (Whisper API requires a file)
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as f:
            f.write(audio_content)
            temp_path = f.name

        # Build Whisper API params
        params = {
            "model": "whisper-1",
            "file": open(temp_path, "rb"),
            "response_format": "verbose_json",
        }

        # Pass language hint if user selected a specific language
        if language_hint != "auto" and language_hint in HINT_MAP:
            params["language"] = HINT_MAP[language_hint]

        logger.info(
            f"Whisper STT request - content_type: {content_type}, "
            f"size: {len(audio_content)} bytes, "
            f"language_hint: {language_hint}"
        )

        response = await client.audio.transcriptions.create(**params)

        # Close the file handle
        params["file"].close()

        transcript = response.text.strip() if response.text else ""
        whisper_lang = getattr(response, "language", "english")

        # Map Whisper language to our code
        detected_language = LANG_MAP.get(whisper_lang, "en")

        logger.info(
            f"Whisper detected language: {whisper_lang} -> {detected_language}"
        )

        # Fallback: check transcript text for Tamil/Hindi Unicode
        # Handles Tanglish where Whisper might say "english" but text has Tamil chars
        if transcript:
            text_lang = detect_language_from_text(transcript)
            if text_lang == "ta" and detected_language != "ta":
                logger.info(
                    f"Language override from text: {detected_language} -> ta (Tamil chars found)"
                )
                detected_language = "ta"
            elif text_lang == "hi" and detected_language != "hi":
                logger.info(
                    f"Language override from text: {detected_language} -> hi (Hindi chars found)"
                )
                detected_language = "hi"

        if not transcript:
            logger.warning("Whisper returned empty transcript.")
            return {"transcript": "", "detected_language": detected_language}

        logger.info(f"STT transcript ({detected_language}): {transcript[:100]}...")
        return {"transcript": transcript, "detected_language": detected_language}

    except Exception as e:
        logger.error(f"Whisper STT error: {e}", exc_info=True)
        raise
    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception:
                pass
