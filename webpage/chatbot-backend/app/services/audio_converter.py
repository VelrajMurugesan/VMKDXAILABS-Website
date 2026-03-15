"""Audio format conversion utilities for Twilio voice integration.

Handles conversion between Twilio's mulaw format and the formats
used by Whisper STT (WAV) and Google Cloud TTS (MP3).
"""

import audioop
import io
import struct
import logging
from pydub import AudioSegment

logger = logging.getLogger(__name__)

MULAW_SAMPLE_RATE = 8000
MULAW_SAMPLE_WIDTH = 1  # 8-bit mulaw
PCM_SAMPLE_WIDTH = 2    # 16-bit PCM


def mulaw_to_wav(mulaw_chunks: list[bytes], sample_rate: int = MULAW_SAMPLE_RATE) -> bytes:
    """Convert Twilio mulaw audio chunks to WAV bytes for Whisper STT.

    Args:
        mulaw_chunks: List of raw mulaw-encoded audio byte chunks from Twilio.
        sample_rate: Sample rate of the mulaw audio (Twilio uses 8000 Hz).

    Returns:
        WAV file bytes suitable for Whisper API input.
    """
    mulaw_data = b"".join(mulaw_chunks)
    if not mulaw_data:
        raise ValueError("No audio data to convert")

    # Decode mulaw to 16-bit PCM
    pcm_data = audioop.ulaw2lin(mulaw_data, PCM_SAMPLE_WIDTH)

    # Build WAV file in memory
    wav_buffer = io.BytesIO()
    num_channels = 1
    data_size = len(pcm_data)
    # WAV header
    wav_buffer.write(b"RIFF")
    wav_buffer.write(struct.pack("<I", 36 + data_size))
    wav_buffer.write(b"WAVE")
    wav_buffer.write(b"fmt ")
    wav_buffer.write(struct.pack("<I", 16))  # chunk size
    wav_buffer.write(struct.pack("<H", 1))   # PCM format
    wav_buffer.write(struct.pack("<H", num_channels))
    wav_buffer.write(struct.pack("<I", sample_rate))
    wav_buffer.write(struct.pack("<I", sample_rate * num_channels * PCM_SAMPLE_WIDTH))
    wav_buffer.write(struct.pack("<H", num_channels * PCM_SAMPLE_WIDTH))
    wav_buffer.write(struct.pack("<H", PCM_SAMPLE_WIDTH * 8))
    wav_buffer.write(b"data")
    wav_buffer.write(struct.pack("<I", data_size))
    wav_buffer.write(pcm_data)

    wav_bytes = wav_buffer.getvalue()
    logger.debug(
        "Converted %d mulaw chunks (%d bytes) to WAV (%d bytes)",
        len(mulaw_chunks), len(mulaw_data), len(wav_bytes),
    )
    return wav_bytes


def mp3_to_mulaw(mp3_bytes: bytes) -> bytes:
    """Convert Google TTS MP3 output to mulaw for Twilio playback.

    Args:
        mp3_bytes: MP3 audio bytes from Google Cloud TTS.

    Returns:
        Raw mulaw-encoded audio bytes at 8000 Hz mono.
    """
    if not mp3_bytes:
        raise ValueError("No MP3 data to convert")

    # Load MP3 with pydub (requires ffmpeg)
    audio = AudioSegment.from_mp3(io.BytesIO(mp3_bytes))

    # Convert to 8000 Hz mono 16-bit PCM
    audio = audio.set_frame_rate(MULAW_SAMPLE_RATE)
    audio = audio.set_channels(1)
    audio = audio.set_sample_width(PCM_SAMPLE_WIDTH)

    pcm_data = audio.raw_data

    # Encode PCM to mulaw
    mulaw_data = audioop.lin2ulaw(pcm_data, PCM_SAMPLE_WIDTH)

    logger.debug(
        "Converted MP3 (%d bytes) to mulaw (%d bytes, %.1fs)",
        len(mp3_bytes), len(mulaw_data),
        len(mulaw_data) / MULAW_SAMPLE_RATE,
    )
    return mulaw_data
