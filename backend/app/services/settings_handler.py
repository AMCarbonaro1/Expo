import json
import logging
import re

import httpx
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.restaurant import Restaurant
from app.models.settings_change import PendingSettingsChange

logger = logging.getLogger(__name__)

DETECT_PROMPT = """You are a settings change detector for a restaurant management SMS app called Expo.

The user may be asking to change one of these settings:
- recap_hour: What time they get their morning recap (1-23, default 7 = 7am)
- recap_enabled: Whether morning recaps are on or off (true/false)
- food_cost_baseline: Their target food cost percentage (number like 28, 30, 32)
- hours: Their restaurant operating hours (free text like "Mon-Sat 7am-9pm")
- restaurant_type: Type of restaurant (free text like "coney island", "pizza", "mexican")
- alerts_enabled: Whether alerts are on or off (true/false)

If the message is clearly asking to change a setting, return ONLY this JSON:
{"field": "field_name", "value": "new_value", "description": "Human readable description of the change"}

For recap_hour, convert times like "6am" to 6, "8:30pm" to 20, etc.
For boolean fields, convert "turn off"/"disable"/"stop" to "false" and "turn on"/"enable"/"start" to "true".

If the message is NOT a settings change request (it's a question, greeting, or anything else), return ONLY:
null

Return ONLY the JSON or null. No other text."""


async def detect_settings_intent(body: str) -> dict | None:
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
                    "max_tokens": 200,
                    "system": DETECT_PROMPT,
                    "messages": [{"role": "user", "content": body}],
                },
                timeout=15.0,
            )
            data = resp.json()

        if "content" not in data or not data["content"]:
            return None

        text = data["content"][0]["text"].strip()

        if text == "null" or text == "None":
            return None

        # Strip markdown fences
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

        result = json.loads(text)
        if isinstance(result, dict) and "field" in result:
            return result
        return None

    except Exception as e:
        logger.error(f"Settings intent detection error: {e}")
        return None


async def get_pending_change(db: AsyncSession, restaurant_id: int) -> PendingSettingsChange | None:
    result = await db.execute(
        select(PendingSettingsChange).where(
            and_(
                PendingSettingsChange.restaurant_id == restaurant_id,
                PendingSettingsChange.status == "pending",
            )
        ).order_by(PendingSettingsChange.created_at.desc()).limit(1)
    )
    return result.scalar_one_or_none()


async def create_pending_change(
    db: AsyncSession, restaurant_id: int, field: str, value: str, description: str
) -> str:
    # Cancel any existing pending changes
    result = await db.execute(
        select(PendingSettingsChange).where(
            and_(
                PendingSettingsChange.restaurant_id == restaurant_id,
                PendingSettingsChange.status == "pending",
            )
        )
    )
    for existing in result.scalars().all():
        existing.status = "canceled"

    change = PendingSettingsChange(
        restaurant_id=restaurant_id,
        field_name=field,
        new_value=str(value),
        description=description,
        status="pending",
    )
    db.add(change)
    await db.commit()

    return f"{description} — sound good?"


async def apply_pending_change(db: AsyncSession, restaurant_id: int) -> str:
    change = await get_pending_change(db, restaurant_id)
    if not change:
        return "No pending change to apply."

    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one()

    field = change.field_name
    value = change.new_value

    if field == "recap_hour":
        restaurant.recap_hour = int(value)
        hour = int(value)
        ampm = "am" if hour < 12 else "pm"
        display_hour = hour if hour <= 12 else hour - 12
        if display_hour == 0:
            display_hour = 12
        confirm = f"Done — your morning recap is now set for {display_hour}{ampm}."
    elif field == "recap_enabled":
        restaurant.recap_enabled = value.lower() == "true"
        confirm = "Done — morning recaps are turned " + ("on." if restaurant.recap_enabled else "off.")
    elif field == "food_cost_baseline":
        restaurant.food_cost_baseline = float(value)
        confirm = f"Done — your food cost target is now {value}%."
    elif field == "hours":
        restaurant.hours = value
        confirm = f"Done — your hours are updated to {value}."
    elif field == "restaurant_type":
        restaurant.restaurant_type = value
        confirm = f"Done — restaurant type set to {value}."
    elif field == "alerts_enabled":
        restaurant.alerts_enabled = value.lower() == "true"
        confirm = "Done — alerts are turned " + ("on." if restaurant.alerts_enabled else "off.")
    else:
        confirm = "Done — setting updated."

    change.status = "applied"
    await db.commit()
    return confirm


async def cancel_pending_change(db: AsyncSession, restaurant_id: int) -> str:
    change = await get_pending_change(db, restaurant_id)
    if not change:
        return "No pending change to cancel."

    change.status = "canceled"
    await db.commit()
    return "No problem, I won't change anything."
