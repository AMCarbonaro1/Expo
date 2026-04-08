import hashlib
import hmac
import logging
from datetime import datetime

import httpx
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db, async_session
from app.dependencies.auth import get_current_user
from app.models.user import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/billing", tags=["billing"])

STRIPE_API = "https://api.stripe.com/v1"


async def _stripe_request(method: str, endpoint: str, data: dict | None = None) -> dict:
    async with httpx.AsyncClient() as client:
        kwargs = {
            "auth": (settings.stripe_secret_key, ""),
            "timeout": 30.0,
        }
        if data:
            kwargs["data"] = data

        if method == "POST":
            resp = await client.post(f"{STRIPE_API}{endpoint}", **kwargs)
        else:
            resp = await client.get(f"{STRIPE_API}{endpoint}", **kwargs)

        return resp.json()


async def _ensure_customer(user: User, db: AsyncSession) -> str:
    """Create or return Stripe customer ID for user."""
    if user.stripe_customer_id:
        return user.stripe_customer_id

    data = await _stripe_request("POST", "/customers", {
        "email": user.email,
        "metadata[user_id]": str(user.id),
        "metadata[restaurant_id]": str(user.restaurant_id),
    })
    customer_id = data["id"]
    user.stripe_customer_id = customer_id
    await db.commit()
    return customer_id


@router.post("/create-checkout")
async def create_checkout(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    customer_id = await _ensure_customer(user, db)

    data = await _stripe_request("POST", "/checkout/sessions", {
        "customer": customer_id,
        "mode": "subscription",
        "line_items[0][price]": settings.stripe_price_id,
        "line_items[0][quantity]": "1",
        "success_url": f"{settings.frontend_url}/dashboard?payment=success",
        "cancel_url": f"{settings.frontend_url}/dashboard?payment=canceled",
        "metadata[user_id]": str(user.id),
    })

    if "error" in data:
        raise HTTPException(status_code=400, detail=data["error"].get("message", "Stripe error"))

    return {"url": data["url"]}


@router.post("/portal")
async def create_portal(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    if not user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No billing account found")

    data = await _stripe_request("POST", "/billing_portal/sessions", {
        "customer": user.stripe_customer_id,
        "return_url": f"{settings.frontend_url}/dashboard",
    })

    if "error" in data:
        raise HTTPException(status_code=400, detail=data["error"].get("message", "Stripe error"))

    return {"url": data["url"]}


@router.get("/status")
async def billing_status(user: User = Depends(get_current_user)):
    now = datetime.utcnow()
    trial_active = (
        user.subscription_status == "trialing"
        and user.trial_ends_at
        and user.trial_ends_at > now
    )
    days_left = 0
    if user.trial_ends_at and user.trial_ends_at > now:
        days_left = (user.trial_ends_at - now).days

    return {
        "subscription_status": user.subscription_status,
        "trial_ends_at": str(user.trial_ends_at) if user.trial_ends_at else None,
        "trial_active": trial_active,
        "days_left": days_left,
        "is_active": user.subscription_status == "active" or trial_active,
    }


@router.post("/webhook")
async def stripe_webhook(request: Request):
    body = await request.body()
    sig = request.headers.get("stripe-signature", "")

    # Verify Stripe signature — REQUIRED
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")

    try:
        parts = dict(item.split("=", 1) for item in sig.split(","))
        timestamp = parts.get("t", "")
        v1_sig = parts.get("v1", "")
        signed_payload = f"{timestamp}.{body.decode()}"
        expected = hmac.new(
            settings.stripe_webhook_secret.encode(),
            signed_payload.encode(),
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(expected, v1_sig):
            raise HTTPException(status_code=400, detail="Invalid signature")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Webhook signature verification failed: {e}")
        raise HTTPException(status_code=400, detail="Signature verification failed")

    import json
    event = json.loads(body)
    event_type = event.get("type", "")
    data_obj = event.get("data", {}).get("object", {})

    logger.info(f"Stripe webhook: {event_type}")

    async with async_session() as db:
        if event_type == "checkout.session.completed":
            customer_id = data_obj.get("customer")
            subscription_id = data_obj.get("subscription")
            if customer_id:
                result = await db.execute(
                    select(User).where(User.stripe_customer_id == customer_id)
                )
                user = result.scalar_one_or_none()
                if user:
                    user.stripe_subscription_id = subscription_id
                    user.subscription_status = "active"
                    await db.commit()
                    logger.info(f"User {user.id} subscription activated")

        elif event_type == "invoice.paid":
            customer_id = data_obj.get("customer")
            if customer_id:
                result = await db.execute(
                    select(User).where(User.stripe_customer_id == customer_id)
                )
                user = result.scalar_one_or_none()
                if user:
                    user.subscription_status = "active"
                    await db.commit()

        elif event_type == "invoice.payment_failed":
            customer_id = data_obj.get("customer")
            if customer_id:
                result = await db.execute(
                    select(User).where(User.stripe_customer_id == customer_id)
                )
                user = result.scalar_one_or_none()
                if user:
                    user.subscription_status = "past_due"
                    await db.commit()

        elif event_type == "customer.subscription.deleted":
            customer_id = data_obj.get("customer")
            if customer_id:
                result = await db.execute(
                    select(User).where(User.stripe_customer_id == customer_id)
                )
                user = result.scalar_one_or_none()
                if user:
                    user.subscription_status = "canceled"
                    await db.commit()

    return {"received": True}
