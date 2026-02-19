import logging
from openai import AsyncOpenAI

from app.core.config import get_settings
from app.core.prompts import SYSTEM_PROMPT

logger = logging.getLogger(__name__)

settings = get_settings()

client = AsyncOpenAI(api_key=settings.openai_api_key)


def build_messages(
    system_prompt: str,
    history: list[dict],
    user_message: str,
) -> list[dict]:
    """
    Build the messages array for the OpenAI Chat Completions API.

    Args:
        system_prompt: The system-level instruction prompt.
        history: List of previous messages, each with "role" and "content".
        user_message: The latest user message.

    Returns:
        A list of message dicts ready for the API call.
    """
    messages = [{"role": "system", "content": system_prompt}]

    # Include only the last 10 messages from history to stay within context limits
    recent_history = history[-10:] if len(history) > 10 else history

    for entry in recent_history:
        role = entry.get("role", "user")
        content = entry.get("content", "")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": user_message})

    return messages


async def get_chat_response(
    user_message: str,
    history: list[dict] | None = None,
    language_hint: str = "auto",
) -> str:
    """
    Get a chat response from OpenAI GPT-4o.

    Args:
        user_message: The user's message text.
        history: Optional conversation history.
        language_hint: Detected or specified language hint (e.g., "ta", "en", "hi").

    Returns:
        The assistant's reply text.

    Raises:
        Exception: If the OpenAI API call fails.
    """
    if history is None:
        history = []

    # Append a strong language instruction to the system prompt
    system_prompt = SYSTEM_PROMPT
    if language_hint and language_hint != "auto":
        language_map = {
            "ta": (
                "**CRITICAL LANGUAGE INSTRUCTION:** The user is speaking in TAMIL (தமிழ்). "
                "You MUST respond ENTIRELY in Tamil script (தமிழ் எழுத்து). "
                "Do NOT respond in Hindi, English, or any other language. "
                "If the user mixes English words (Tanglish), still respond in Tamil script. "
                "Begin with 'வணக்கம்' if greeting."
            ),
            "hi": (
                "**CRITICAL LANGUAGE INSTRUCTION:** The user is speaking in HINDI (हिंदी). "
                "You MUST respond ENTIRELY in Hindi/Devanagari script. "
                "Do NOT respond in Tamil or English. Begin with 'नमस्ते' if greeting."
            ),
            "en": (
                "**CRITICAL LANGUAGE INSTRUCTION:** The user is speaking in English. "
                "You MUST respond ENTIRELY in English. "
                "Do NOT respond in Tamil or Hindi."
            ),
        }
        hint = language_map.get(language_hint, "")
        if hint:
            system_prompt = f"{system_prompt}\n\n{hint}"

    messages = build_messages(system_prompt, history, user_message)

    try:
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=messages,
            temperature=0.3,
            max_tokens=500,
        )

        reply = response.choices[0].message.content
        if not reply:
            logger.warning("OpenAI returned an empty response.")
            return "I'm sorry, I couldn't generate a response. Please try again or contact us at info@vmkdxailabs.com."

        return reply.strip()

    except Exception as e:
        logger.error(f"OpenAI API error: {e}", exc_info=True)
        raise
