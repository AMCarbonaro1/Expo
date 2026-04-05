from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.message import Message
from app.models.restaurant import Restaurant
from app.services.claude_service import get_claude_response
from app.models.alert import Alert
from app.services.context_builder import (
    build_conversation_history,
    build_system_prompt,
    get_bank_summary,
    get_food_cost_summary,
    get_recent_messages,
    get_recent_summaries,
)
from app.services.invoice_processor import (
    confirm_invoice,
    get_pending_invoice,
    process_invoice_image,
    reject_invoice,
)

CONFIRM_WORDS = {"yes", "y", "yep", "yeah", "correct", "confirmed", "looks good", "lgtm"}
REJECT_WORDS = {"no", "n", "nope", "wrong", "reject", "discard"}


async def handle_incoming_message(
    db: AsyncSession,
    restaurant_id: int,
    body: str,
    media_url: str | None = None,
    media_content_type: str | None = None,
) -> str:
    # Check for pending invoice confirmation
    pending = await get_pending_invoice(db, restaurant_id)
    if pending and not media_url:
        normalized_body = body.strip().lower()
        if normalized_body in CONFIRM_WORDS:
            response = await confirm_invoice(db, restaurant_id)
            out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
            db.add(out_msg)
            await db.commit()
            return response
        elif normalized_body in REJECT_WORDS:
            response = await reject_invoice(db, restaurant_id)
            out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
            db.add(out_msg)
            await db.commit()
            return response
        # Otherwise fall through to normal conversation

    # Check for incoming image (invoice photo)
    if media_url and media_content_type and media_content_type.startswith("image/"):
        response = await process_invoice_image(
            db, restaurant_id, media_url, media_content_type
        )
        out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
        db.add(out_msg)
        await db.commit()
        return response

    # Normal Claude conversation
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one()

    summaries = await get_recent_summaries(db, restaurant_id)
    food_cost = await get_food_cost_summary(db, restaurant_id)
    bank = await get_bank_summary(db, restaurant_id)

    # Fetch recent alerts
    alert_result = await db.execute(
        select(Alert).where(Alert.restaurant_id == restaurant_id)
        .order_by(Alert.created_at.desc()).limit(10)
    )
    recent_alerts = list(alert_result.scalars().all())

    system_prompt = build_system_prompt(
        restaurant, summaries, alerts=recent_alerts,
        food_cost=food_cost, bank_summary=bank,
    )

    recent_messages = await get_recent_messages(db, restaurant_id)
    conversation = build_conversation_history(recent_messages)
    conversation.append({"role": "user", "content": body})

    response = await get_claude_response(system_prompt, conversation)

    out_msg = Message(
        restaurant_id=restaurant_id,
        direction="out",
        body=response,
    )
    db.add(out_msg)
    await db.commit()

    return response
