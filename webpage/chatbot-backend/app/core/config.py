from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4o"

    # Google Cloud (STT + TTS)
    google_application_credentials: str = ""

    # EmailJS (for lead emails)
    emailjs_service_id: str = ""
    emailjs_public_key: str = ""
    emailjs_lead_template_id: str = ""

    # App
    audio_temp_dir: str = "/app/audio_temp"
    cors_origins: list[str] = [
        "https://vmkdxailabs.com",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:8080",
    ]
    max_audio_size_mb: int = 10
    max_audio_duration_sec: int = 30
    tts_cleanup_minutes: int = 5
    rate_limit_text: int = 20  # per minute per IP
    rate_limit_voice: int = 10

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
