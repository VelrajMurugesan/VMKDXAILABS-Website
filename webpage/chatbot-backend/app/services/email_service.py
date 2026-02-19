import json
import logging
import re

from app.core.config import get_settings

logger = logging.getLogger(__name__)

settings = get_settings()

LEAD_PATTERN = re.compile(
    r"\|\|\|LEAD_DATA\|\|\|\s*(\{.*?\})\s*\|\|\|END_LEAD_DATA\|\|\|",
    re.DOTALL,
)

# Regex patterns for extracting lead info from conversation
EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_PATTERN = re.compile(r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}")


def extract_lead_data(text: str) -> dict | None:
    """
    Extract lead data JSON from LLM response text (marker-based).

    Returns:
        Dict with name, mobile, email, requirement if found, else None.
    """
    match = LEAD_PATTERN.search(text)
    if not match:
        return None

    try:
        data = json.loads(match.group(1))
        required = ["name", "mobile", "email", "requirement"]
        if all(data.get(k) for k in required):
            return data
        logger.warning(f"Lead data missing required fields: {data}")
        return None
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse lead JSON: {e}")
        return None


def extract_lead_from_conversation(
    current_message: str,
    history: list[dict],
) -> dict | None:
    """
    Extract lead info from conversation using regex patterns.
    Scans all user messages for email, phone, name, and requirement.

    Returns:
        Dict with name, mobile, email, requirement if all found, else None.
    """
    # Collect all user messages
    user_texts = []
    for msg in history:
        if msg.get("role") == "user" and msg.get("content"):
            user_texts.append(msg["content"])
    user_texts.append(current_message)

    combined = " ".join(user_texts)

    # Extract email
    email_match = EMAIL_PATTERN.search(combined)
    if not email_match:
        return None
    email = email_match.group(0)

    # Extract phone
    phone_match = PHONE_PATTERN.search(combined)
    if not phone_match:
        return None
    phone = phone_match.group(0).strip()

    # Extract name - look for patterns like "name is X", "I am X", "my name X"
    name = None
    name_patterns = [
        re.compile(r"(?:my\s+)?name\s+(?:is\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)", re.IGNORECASE),
        re.compile(r"(?:i\s+am|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)", re.IGNORECASE),
        # Tamil: என் பெயர் (en peyar)
        re.compile(r"(?:\u0baa\u0bc6\u0baf\u0bb0\u0bcd|\u0baa\u0bc7\u0bb0\u0bcd)\s+(.+?)(?:[,.\s]|$)"),
    ]
    for pattern in name_patterns:
        for text in user_texts:
            m = pattern.search(text)
            if m:
                name = m.group(1).strip()
                # Clean up - remove trailing words that aren't names
                name = re.sub(r"\s+(and|my|mobile|email|phone|number|is).*$", "", name, flags=re.IGNORECASE)
                if len(name) >= 2:
                    break
        if name:
            break

    if not name:
        return None

    # Extract requirement - look for need/want/require patterns, or use the first user message
    requirement = None
    req_patterns = [
        re.compile(r"(?:i\s+)?(?:need|want|require|looking\s+for|interested\s+in)\s+(.+?)(?:\.|$)", re.IGNORECASE),
        # Tamil: வேண்டும் (vendum)
        re.compile(r"(.+?)\s+\u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd"),
    ]
    for pattern in req_patterns:
        for text in user_texts:
            m = pattern.search(text)
            if m:
                requirement = m.group(1).strip()
                if len(requirement) >= 5:
                    break
        if requirement:
            break

    # Fallback: use the first user message as the requirement
    if not requirement and user_texts:
        requirement = user_texts[0][:200]

    if not requirement:
        return None

    return {
        "name": name,
        "mobile": phone,
        "email": email,
        "requirement": requirement,
    }


def strip_lead_marker(text: str) -> str:
    """Remove the lead data marker block from the response text."""
    return LEAD_PATTERN.sub("", text).strip()
