"""Real-time stream processor for Twilio Media Streams.

Manages per-call state, audio buffering, silence detection (energy-based VAD),
and orchestrates the STT -> LLM -> TTS pipeline for each call turn.
"""

import asyncio
import audioop
import base64
import logging
import time

from app.services.audio_converter import mulaw_to_wav, mp3_to_mulaw
from app.services.stt_service import transcribe_audio
from app.services.llm_service import get_phone_response
from app.services.tts_service import synthesize_speech_bytes
from app.services.email_service import extract_lead_data, strip_lead_marker

logger = logging.getLogger(__name__)

# VAD / silence detection settings
SILENCE_THRESHOLD = 500       # RMS energy below this = silence (mulaw at 8kHz)
SILENCE_DURATION_SEC = 1.5    # Seconds of silence to trigger end-of-speech
MIN_SPEECH_DURATION_SEC = 0.3 # Minimum speech to process (ignore short bursts)
MULAW_SAMPLE_RATE = 8000      # Twilio sends 8kHz mulaw
CHUNK_DURATION_SEC = 0.02     # Each Twilio media message ≈ 20ms of audio


class CallSession:
    """Manages state for a single phone call."""

    def __init__(self, call_sid: str, stream_sid: str | None = None):
        self.call_sid = call_sid
        self.stream_sid = stream_sid
        self.conversation_history: list[dict] = []
        self.audio_buffer: list[bytes] = []
        self.last_audio_time: float = 0.0
        self.speech_start_time: float = 0.0
        self.is_speaking: bool = False
        self.detected_language: str = "auto"
        self.is_processing: bool = False
        self.leads_captured: list[dict] = []
        self.created_at: float = time.time()

    def add_audio_chunk(self, payload: bytes) -> None:
        """Add a mulaw audio chunk to the buffer."""
        now = time.time()
        self.last_audio_time = now

        if not self.is_speaking:
            self.is_speaking = True
            self.speech_start_time = now

        self.audio_buffer.append(payload)

    def get_speech_duration(self) -> float:
        """Get the duration of buffered audio in seconds."""
        total_bytes = sum(len(chunk) for chunk in self.audio_buffer)
        return total_bytes / MULAW_SAMPLE_RATE

    def clear_audio_buffer(self) -> None:
        """Clear the audio buffer after processing."""
        self.audio_buffer.clear()
        self.is_speaking = False
        self.speech_start_time = 0.0

    def add_to_history(self, role: str, content: str) -> None:
        """Add a message to conversation history."""
        self.conversation_history.append({"role": role, "content": content})


# Active call sessions keyed by call_sid
_sessions: dict[str, CallSession] = {}


def get_or_create_session(call_sid: str, stream_sid: str | None = None) -> CallSession:
    """Get an existing session or create a new one."""
    if call_sid not in _sessions:
        _sessions[call_sid] = CallSession(call_sid, stream_sid)
        logger.info("Created new call session: %s", call_sid)
    session = _sessions[call_sid]
    if stream_sid and not session.stream_sid:
        session.stream_sid = stream_sid
    return session


def remove_session(call_sid: str) -> None:
    """Remove a call session when the call ends."""
    if call_sid in _sessions:
        session = _sessions.pop(call_sid)
        duration = time.time() - session.created_at
        logger.info(
            "Removed call session: %s (duration=%.0fs, turns=%d, leads=%d)",
            call_sid, duration,
            len(session.conversation_history) // 2,
            len(session.leads_captured),
        )


def detect_silence(audio_chunk: bytes) -> bool:
    """Check if an audio chunk is silence based on RMS energy.

    Args:
        audio_chunk: Raw mulaw audio bytes.

    Returns:
        True if the chunk is below the silence threshold.
    """
    if not audio_chunk:
        return True
    # Convert mulaw to PCM to measure energy
    try:
        pcm = audioop.ulaw2lin(audio_chunk, 2)
        rms = audioop.rms(pcm, 2)
        return rms < SILENCE_THRESHOLD
    except Exception:
        return True


async def process_speech_turn(session: CallSession) -> bytes | None:
    """Process a complete speech turn through the STT -> LLM -> TTS pipeline.

    Args:
        session: The call session with buffered audio.

    Returns:
        Mulaw audio bytes of the response, or None if processing failed.
    """
    if session.is_processing:
        logger.debug("Already processing for %s, skipping", session.call_sid)
        return None

    session.is_processing = True
    try:
        speech_duration = session.get_speech_duration()
        if speech_duration < MIN_SPEECH_DURATION_SEC:
            logger.debug(
                "Speech too short (%.2fs) for %s, ignoring",
                speech_duration, session.call_sid,
            )
            session.clear_audio_buffer()
            return None

        # 1. Convert mulaw buffer to WAV
        wav_bytes = mulaw_to_wav(session.audio_buffer)
        session.clear_audio_buffer()

        # 2. STT: Whisper transcription
        logger.info("STT starting for %s (%.1fs audio)", session.call_sid, speech_duration)
        stt_result = await transcribe_audio(
            wav_bytes,
            content_type="audio/wav",
            language_hint=session.detected_language,
        )
        transcript = stt_result.get("transcript", "").strip()
        detected_lang = stt_result.get("detected_language", "en")

        if not transcript:
            logger.info("Empty transcript for %s, skipping", session.call_sid)
            return None

        # Update session language
        session.detected_language = detected_lang
        logger.info("STT result for %s: [%s] %s", session.call_sid, detected_lang, transcript[:100])

        # 3. LLM: Get phone-optimized response
        session.add_to_history("user", transcript)
        llm_reply = await get_phone_response(
            user_message=transcript,
            history=session.conversation_history[:-1],  # Exclude the just-added message
            language_hint=detected_lang,
        )

        # Check for lead data in the response
        lead = extract_lead_data(llm_reply)
        if lead:
            session.leads_captured.append(lead)
            logger.info("Lead captured during call %s: %s", session.call_sid, lead)

        # Strip lead markers from the spoken response
        clean_reply = strip_lead_marker(llm_reply)
        session.add_to_history("assistant", clean_reply)

        logger.info("LLM reply for %s: %s", session.call_sid, clean_reply[:100])

        # 4. TTS: Convert response to speech (MP3 bytes)
        mp3_bytes = await synthesize_speech_bytes(clean_reply, language=detected_lang)

        # 5. Convert MP3 to mulaw for Twilio
        mulaw_response = mp3_to_mulaw(mp3_bytes)
        logger.info(
            "Response ready for %s: %d bytes mulaw (%.1fs)",
            session.call_sid, len(mulaw_response),
            len(mulaw_response) / MULAW_SAMPLE_RATE,
        )

        return mulaw_response

    except Exception as e:
        logger.error("Error processing speech turn for %s: %s", session.call_sid, e, exc_info=True)
        return None
    finally:
        session.is_processing = False


def build_media_message(stream_sid: str, mulaw_audio: bytes) -> list[dict]:
    """Build Twilio Media Stream messages to send audio back to the caller.

    Twilio expects base64-encoded mulaw audio in 'media' events.
    We chunk the audio to avoid exceeding message size limits.

    Args:
        stream_sid: The Twilio stream SID.
        mulaw_audio: Raw mulaw audio bytes.

    Returns:
        List of media message dicts to send over WebSocket.
    """
    # Twilio recommends sending audio in chunks (~20ms each = 160 bytes at 8kHz)
    chunk_size = 160  # 20ms at 8kHz
    messages = []

    for i in range(0, len(mulaw_audio), chunk_size):
        chunk = mulaw_audio[i:i + chunk_size]
        payload = base64.b64encode(chunk).decode("ascii")
        messages.append({
            "event": "media",
            "streamSid": stream_sid,
            "media": {
                "payload": payload,
            },
        })

    # Send a mark event to know when playback finishes
    messages.append({
        "event": "mark",
        "streamSid": stream_sid,
        "mark": {
            "name": "response_end",
        },
    })

    return messages
