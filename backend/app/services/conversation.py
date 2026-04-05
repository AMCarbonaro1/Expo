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
    get_invoice_history,
    get_recent_messages,
    get_recent_summaries,
    get_weekly_comparison,
)
from app.services.first_sync import maybe_first_sync
from app.services.invoice_processor import (
    confirm_invoice,
    get_pending_invoice,
    process_invoice_image,
    reject_invoice,
)
from app.services.settings_handler import (
    apply_pending_change,
    cancel_pending_change,
    create_pending_change,
    detect_settings_intent,
    get_pending_change,
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
    # Check for pending settings confirmation
    pending_setting = await get_pending_change(db, restaurant_id)
    if pending_setting and not media_url:
        normalized_body = body.strip().lower()
        if normalized_body in CONFIRM_WORDS:
            response = await apply_pending_change(db, restaurant_id)
            out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
            db.add(out_msg)
            await db.commit()
            return response
        elif normalized_body in REJECT_WORDS:
            response = await cancel_pending_change(db, restaurant_id)
            out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
            db.add(out_msg)
            await db.commit()
            return response

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

    # Check for settings change request
    settings_intent = await detect_settings_intent(body)
    if settings_intent:
        response = await create_pending_change(
            db, restaurant_id,
            field=settings_intent["field"],
            value=str(settings_intent["value"]),
            description=settings_intent["description"],
        )
        out_msg = Message(restaurant_id=restaurant_id, direction="out", body=response)
        db.add(out_msg)
        await db.commit()
        return response

    # Trigger first sync if needed
    await maybe_first_sync(db, restaurant_id)

    # Normal Claude conversation
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one()

    summaries = await get_recent_summaries(db, restaurant_id)
    food_cost = await get_food_cost_summary(db, restaurant_id)
    bank = await get_bank_summary(db, restaurant_id)
    invoices = await get_invoice_history(db, restaurant_id)
    weekly = await get_weekly_comparison(db, restaurant_id)

    # Fetch recent alerts
    alert_result = await db.execute(
        select(Alert).where(Alert.restaurant_id == restaurant_id)
        .order_by(Alert.created_at.desc()).limit(10)
    )
    recent_alerts = list(alert_result.scalars().all())

    system_prompt = build_system_prompt(
        restaurant, summaries, alerts=recent_alerts,
        food_cost=food_cost, bank_summary=bank,
        invoice_history=invoices, weekly_comparison=weekly,
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
