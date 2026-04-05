import logging

import httpx

from app.config import settings

logger = logging.getLogger(__name__)


async def get_claude_response(system_prompt: str, messages: list[dict]) -> str:
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": settings.anthropic_api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-sonnet-4-20250514",
                    "max_tokens": 300,
                    "system": system_prompt,
                    "messages": messages,
                },
                timeout=30.0,
            )
            data = resp.json()

        if "content" in data and data["content"]:
            return data["content"][0]["text"]

        logger.error(f"Claude API error: {data}")
        return "Sorry, I'm having trouble right now. Try again in a moment."

    except Exception as e:
        logger.error(f"Claude API exception: {e}")
        return "Sorry, I'm having trouble right now. Try again in a moment."
