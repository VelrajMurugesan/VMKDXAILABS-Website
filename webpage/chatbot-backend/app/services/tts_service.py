import logging
import os
import re
import uuid

from google.cloud import texttospeech_v1 as texttospeech

from app.core.config import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()

# Chirp3-HD voices — Google's best quality, natural sounding
VOICE_MAP = {
    "ta": {"language_code": "ta-IN", "name": "ta-IN-Chirp3-HD-Achernar"},
    "en": {"language_code": "en-IN", "name": "en-IN-Chirp3-HD-Achernar"},
    "hi": {"language_code": "hi-IN", "name": "hi-IN-Chirp3-HD-Achernar"},
}

# Audio temp directory
AUDIO_TEMP_DIR = settings.audio_temp_dir


def clean_text_for_speech(text: str) -> str:
    """
    Clean text for natural TTS output.
    Removes markdown, special symbols, and formatting that
    would be read aloud unnaturally.
    """
    # Remove markdown bold/italic markers: **text**, *text*, __text__, _text_
    text = re.sub(r"\*{1,3}(.+?)\*{1,3}", r"\1", text)
    text = re.sub(r"_{1,3}(.+?)_{1,3}", r"\1", text)

    # Remove markdown headers: ## Header
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.MULTILINE)

    # Remove markdown links: [text](url) → text
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)

    # Remove markdown inline code: `code`
    text = re.sub(r"`([^`]+)`", r"\1", text)

    # Remove markdown bullet points: - item, * item, • item
    text = re.sub(r"^[\s]*[-*•]\s+", "", text, flags=re.MULTILINE)

    # Remove numbered list markers: 1. item, 2. item
    text = re.sub(r"^[\s]*\d+\.\s+", "", text, flags=re.MULTILINE)

    # Remove markdown horizontal rules: ---, ***, ___
    text = re.sub(r"^[-*_]{3,}\s*$", "", text, flags=re.MULTILINE)

    # Replace email addresses with spoken form
    text = re.sub(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", "", text)

    # Remove URLs
    text = re.sub(r"https?://[^\s]+", "", text)

    # Replace / between words with " or " (e.g., CRM/ERP → CRM or ERP)
    text = re.sub(r"(\w)/(\w)", r"\1 or \2", text)

    # Remove special symbols that shouldn't be spoken
    text = re.sub(r"[━═╌│┃┌┐└┘├┤┬┴┼]", "", text)

    # Remove remaining special characters (keep basic punctuation for natural pauses)
    # Keep: . , ? ! : ' - (these create natural speech pauses)
    # Remove: * # ~ ^ ` | \ / @ $ % & + = { } [ ] < > " ;
    text = re.sub(r'[*#~^`|\\/@$%&+={}[\]<>";]', "", text)

    # Clean up sentences left incomplete after removing emails/URLs
    text = re.sub(r"\b(?:at|to)\s+or\s+(?:visit|call)?\s*$", ".", text, flags=re.MULTILINE)
    text = re.sub(r"reach us at\s*or\s*", "reach us. ", text)
    text = re.sub(r"reach us at\s*\.", "reach us.", text)
    text = re.sub(r"reach us\s+\.", "reach us.", text)
    text = re.sub(r"\bat\s*\.\s*$", ".", text, flags=re.MULTILINE)
    text = re.sub(r"\bvisit\s*\.\s*$", ".", text, flags=re.MULTILINE)
    text = re.sub(r"You can reach us\s+or\s*$", "You can reach us.", text, flags=re.MULTILINE)
    text = re.sub(r"\bor\s+visit\s*\.?\s*$", ".", text, flags=re.MULTILINE)
    # Clean trailing "at" or "at ." left after email removal
    text = re.sub(r"\bat\s*$", ".", text, flags=re.MULTILINE)

    # Restore + before phone numbers (was removed by special char cleanup)
    text = re.sub(r"\b(91-\d)", r"+\1", text)

    # Clean up multiple spaces
    text = re.sub(r"  +", " ", text)

    # Clean up multiple newlines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Remove leading/trailing whitespace per line
    text = "\n".join(line.strip() for line in text.split("\n"))

    return text.strip()


async def synthesize_speech(text: str, language: str = "en") -> str:
    """
    Synthesize speech from text using Google Cloud TTS Chirp3-HD.

    Args:
        text: The text to convert to speech.
        language: Language code ("ta", "en", "hi").

    Returns:
        Filename of the generated MP3 audio file.
    """
    try:
        voice_config = VOICE_MAP.get(language, VOICE_MAP["en"])

        os.makedirs(AUDIO_TEMP_DIR, exist_ok=True)

        filename = f"tts_{uuid.uuid4().hex}.mp3"
        filepath = os.path.join(AUDIO_TEMP_DIR, filename)

        client = texttospeech.TextToSpeechClient()

        # Clean text for natural speech output
        clean_text = clean_text_for_speech(text)

        logger.info(f"TTS input cleaned: {len(text)} -> {len(clean_text)} chars")

        synthesis_input = texttospeech.SynthesisInput(text=clean_text)

        voice = texttospeech.VoiceSelectionParams(
            language_code=voice_config["language_code"],
            name=voice_config["name"],
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=1.0,
            pitch=0.0,
        )

        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config,
        )

        with open(filepath, "wb") as f:
            f.write(response.audio_content)

        logger.info(
            f"TTS synthesis completed: {filename} "
            f"({language}, {voice_config['name']}, {len(response.audio_content)} bytes)"
        )
        return filename

    except Exception as e:
        logger.error(f"Google TTS error: {e}", exc_info=True)
        raise
