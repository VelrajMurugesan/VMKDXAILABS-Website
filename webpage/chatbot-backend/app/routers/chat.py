import logging
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.llm_service import get_chat_response
from app.services.email_service import (
    extract_lead_data,
    extract_lead_from_conversation,
    strip_lead_marker,
)

logger = logging.getLogger(__name__)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="User's message text")
    language: str = Field(default="auto", description="Language hint: 'ta', 'en', 'hi', or 'auto'")
    session_id: str = Field(..., min_length=1, max_length=128, description="Unique session identifier")
    history: list[dict] = Field(default_factory=list, description="Conversation history")


class LeadData(BaseModel):
    name: str
    mobile: str
    email: str
    requirement: str


class ChatResponse(BaseModel):
    reply: str
    language: str
    lead: LeadData | None = None


def detect_language(text: str) -> str:
    """
    Detect the language of the input text based on Unicode character ranges.
    """
    tamil_pattern = re.compile(r"[\u0B80-\u0BFF]")
    if tamil_pattern.search(text):
        return "ta"

    hindi_pattern = re.compile(r"[\u0900-\u097F]")
    if hindi_pattern.search(text):
        return "hi"

    return "en"


@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process a text chat message and return an AI response.
    Detects lead data and returns it for frontend email sending.
    """
    try:
        if request.language == "auto":
            detected_language = detect_language(request.message)
        else:
            detected_language = request.language

        logger.info(
            f"Chat request - session: {request.session_id}, "
            f"language: {detected_language}, "
            f"history_length: {len(request.history)}, "
            f"message_length: {len(request.message)}"
        )

        reply = await get_chat_response(
            user_message=request.message,
            history=request.history,
            language_hint=detected_language,
        )

        # Try marker-based extraction first
        lead_dict = extract_lead_data(reply)
        if lead_dict:
            logger.info(f"Lead captured via marker (text): {lead_dict['name']}")
            reply = strip_lead_marker(reply)
        else:
            # Fallback: regex-based extraction from conversation
            lead_dict = extract_lead_from_conversation(
                current_message=request.message,
                history=request.history,
            )
            if lead_dict:
                logger.info(f"Lead captured via regex (text): {lead_dict['name']}")

        lead_response = LeadData(**lead_dict) if lead_dict else None

        return ChatResponse(
            reply=reply,
            language=detected_language,
            lead=lead_response,
        )

    except Exception as e:
        logger.error(f"Chat endpoint error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your message. Please try again later.",
        )
