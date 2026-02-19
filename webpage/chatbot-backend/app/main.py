import logging
import os
import time
from collections import defaultdict
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.routers import chat, voice
from app.services.tts_service import AUDIO_TEMP_DIR

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

settings = get_settings()

# ─────────────────────────────────────────────
# Rate Limiting (in-memory, per IP, sliding window)
# ─────────────────────────────────────────────
rate_limit_store: dict[str, list[float]] = defaultdict(list)

RATE_LIMITS = {
    "/api/chat": settings.rate_limit_text,
    "/api/voice": settings.rate_limit_voice,
}


def check_rate_limit(client_ip: str, endpoint: str) -> bool:
    """
    Check if a client IP has exceeded the rate limit for a given endpoint.
    Uses a sliding window of 60 seconds.

    Args:
        client_ip: The client's IP address.
        endpoint: The API endpoint path.

    Returns:
        True if within limits, False if rate limit exceeded.
    """
    limit = RATE_LIMITS.get(endpoint)
    if limit is None:
        return True

    key = f"{client_ip}:{endpoint}"
    now = time.time()
    window = 60.0  # 1 minute sliding window

    # Remove timestamps outside the window
    timestamps = rate_limit_store[key]
    rate_limit_store[key] = [t for t in timestamps if now - t < window]

    if len(rate_limit_store[key]) >= limit:
        return False

    rate_limit_store[key].append(now)
    return True


def cleanup_rate_limit_store() -> None:
    """Remove stale entries from the rate limit store."""
    now = time.time()
    stale_keys = []
    for key, timestamps in rate_limit_store.items():
        cleaned = [t for t in timestamps if now - t < 120]
        if not cleaned:
            stale_keys.append(key)
        else:
            rate_limit_store[key] = cleaned
    for key in stale_keys:
        del rate_limit_store[key]


# ─────────────────────────────────────────────
# Lifespan (startup / shutdown)
# ─────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup and shutdown events."""
    # Startup
    logger.info("VMKD X AI LABS Chatbot Backend starting up...")

    # Set GOOGLE_APPLICATION_CREDENTIALS env var for Google SDK auth
    if settings.google_application_credentials:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.google_application_credentials
        logger.info(f"Google credentials: {settings.google_application_credentials}")

    # Ensure audio temp directory exists
    os.makedirs(AUDIO_TEMP_DIR, exist_ok=True)
    logger.info(f"Audio temp directory: {AUDIO_TEMP_DIR}")

    # Clean up any leftover audio files from previous runs
    if os.path.exists(AUDIO_TEMP_DIR):
        for f in os.listdir(AUDIO_TEMP_DIR):
            filepath = os.path.join(AUDIO_TEMP_DIR, f)
            try:
                os.remove(filepath)
                logger.info(f"Cleaned up leftover audio file: {f}")
            except Exception as e:
                logger.warning(f"Could not remove {f}: {e}")

    # Validate essential configuration
    if not settings.openai_api_key:
        logger.warning("OPENAI_API_KEY is not set! Chat endpoints will fail.")
    if not settings.google_application_credentials:
        logger.warning("GOOGLE_APPLICATION_CREDENTIALS is not set! STT/TTS will fail.")

    logger.info("Chatbot backend is ready to serve requests.")

    yield

    # Shutdown
    logger.info("VMKD X AI LABS Chatbot Backend shutting down...")

    # Final cleanup of audio temp files
    if os.path.exists(AUDIO_TEMP_DIR):
        for f in os.listdir(AUDIO_TEMP_DIR):
            filepath = os.path.join(AUDIO_TEMP_DIR, f)
            try:
                os.remove(filepath)
            except Exception:
                pass

    # Clear rate limit store
    rate_limit_store.clear()

    logger.info("Shutdown complete.")


# ─────────────────────────────────────────────
# FastAPI App
# ─────────────────────────────────────────────
app = FastAPI(
    title="VMKD X AI LABS Chatbot API",
    description="Multilingual AI chatbot backend for VMKD X AI LABS Business Solution",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)


# ─────────────────────────────────────────────
# Rate Limiting Middleware
# ─────────────────────────────────────────────
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Apply rate limiting to API endpoints."""
    # Only rate-limit specific endpoints
    if request.url.path in RATE_LIMITS:
        client_ip = request.client.host if request.client else "unknown"

        # Check X-Forwarded-For header (behind reverse proxy/Traefik)
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()

        if not check_rate_limit(client_ip, request.url.path):
            logger.warning(f"Rate limit exceeded for {client_ip} on {request.url.path}")
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Too many requests. Please wait a moment and try again."
                },
            )

    # Periodically clean up stale rate limit entries
    if len(rate_limit_store) > 1000:
        cleanup_rate_limit_store()

    response = await call_next(request)
    return response


# ─────────────────────────────────────────────
# Include Routers
# ─────────────────────────────────────────────
app.include_router(chat.router, tags=["Chat"])
app.include_router(voice.router, tags=["Voice"])


# ─────────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    """
    Health check endpoint. Returns the service status and configuration state.
    """
    return {
        "status": "healthy",
        "service": "VMKD X AI LABS Chatbot API",
        "version": "1.0.0",
        "checks": {
            "openai_configured": bool(settings.openai_api_key),
            "google_cloud_configured": bool(settings.google_application_credentials),
        },
    }
