from datetime import date, timedelta

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import select, delete, func as sa_func, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies.auth import get_admin_user
from app.models.alert import Alert
from app.models.bank import PlaidToken, BankTransaction, DepositMatch
from app.models.invoice import Invoice, InvoiceItem
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken, Order, OrderItem, LaborEntry, DailySummary
from app.models.settings_change import PendingSettingsChange
from app.models.user import User
from app.services.morning_send import send_morning_recaps
from app.services.nightly_pipeline import run_nightly_pipeline
from app.services.plaid_sync import sync_transactions, sync_balances
from app.services.recap_generator import generate_morning_recap
from app.services.square_sync import sync_orders, sync_labor, compute_daily_summary
from app.services.twilio_sms import send_sms
from app.services.context_builder import (
    build_system_prompt,
    get_bank_summary,
    get_food_cost_summary,
    get_invoice_history,
    get_recent_summaries,
    get_weekly_comparison,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ─── Dashboard Stats ─────────────────────────────────────────

@router.get("/stats")
async def get_stats(admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    total = (await db.execute(select(sa_func.count()).select_from(Restaurant))).scalar() or 0
    active = (await db.execute(
        select(sa_func.count()).select_from(User).where(User.subscription_status == "active")
    )).scalar() or 0

    last_summary = (await db.execute(
        select(sa_func.max(DailySummary.summary_date))
    )).scalar()
    last_message = (await db.execute(
        select(sa_func.max(Message.created_at)).where(Message.direction == "out")
    )).scalar()

    recent_signups = (await db.execute(
        select(Restaurant.id, Restaurant.restaurant_name, Restaurant.owner_name, Restaurant.created_at)
        .order_by(Restaurant.created_at.desc()).limit(10)
    )).all()

    return {
        "total_accounts": total,
        "active_subscriptions": active,
        "monthly_revenue": active * 49,
        "last_sync_date": str(last_summary) if last_summary else None,
        "last_message_at": str(last_message) if last_message else None,
        "recent_signups": [
            {"id": r[0], "restaurant_name": r[1], "owner_name": r[2], "created_at": str(r[3])}
            for r in recent_signups
        ],
    }


# ─── Account List ─────────────────────────────────────────────

@router.get("/accounts")
async def list_accounts(
    search: str = Query(""),
    admin: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(
        Restaurant.id,
        Restaurant.restaurant_name,
        Restaurant.owner_name,
        Restaurant.phone,
        Restaurant.created_at,
        User.email,
        User.subscription_status,
    ).outerjoin(User, User.restaurant_id == Restaurant.id)

    if search:
        query = query.where(
            Restaurant.restaurant_name.ilike(f"%{search}%")
            | Restaurant.owner_name.ilike(f"%{search}%")
            | User.email.ilike(f"%{search}%")
        )

    query = query.order_by(Restaurant.created_at.desc())
    result = await db.execute(query)
    rows = result.all()

    accounts = []
    for r in rows:
        rid = r[0]
        sq = (await db.execute(select(SquareToken.id).where(SquareToken.restaurant_id == rid))).scalar_one_or_none()
        pl = (await db.execute(select(PlaidToken.id).where(PlaidToken.restaurant_id == rid))).scalar_one_or_none()
        msg_count = (await db.execute(
            select(sa_func.count()).select_from(Message).where(Message.restaurant_id == rid)
        )).scalar() or 0

        accounts.append({
            "id": rid,
            "restaurant_name": r[1],
            "owner_name": r[2],
            "phone": r[3],
            "created_at": str(r[4]),
            "email": r[5],
            "subscription_status": r[6],
            "square_connected": sq is not None,
            "bank_connected": pl is not None,
            "message_count": msg_count,
        })

    return {"accounts": accounts}


# ─── Account Detail ───────────────────────────────────────────

@router.get("/accounts/{rid}")
async def get_account(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == rid))
    restaurant = result.scalar_one_or_none()
    if not restaurant:
        return {"error": "Not found"}

    result = await db.execute(select(User).where(User.restaurant_id == rid))
    user = result.scalar_one_or_none()

    sq = (await db.execute(select(SquareToken).where(SquareToken.restaurant_id == rid))).scalar_one_or_none()
    pl = (await db.execute(select(PlaidToken).where(PlaidToken.restaurant_id == rid))).scalar_one_or_none()

    msg_count = (await db.execute(select(sa_func.count()).select_from(Message).where(Message.restaurant_id == rid))).scalar() or 0
    alert_count = (await db.execute(select(sa_func.count()).select_from(Alert).where(Alert.restaurant_id == rid))).scalar() or 0
    invoice_count = (await db.execute(select(sa_func.count()).select_from(Invoice).where(Invoice.restaurant_id == rid))).scalar() or 0
    summary_count = (await db.execute(select(sa_func.count()).select_from(DailySummary).where(DailySummary.restaurant_id == rid))).scalar() or 0

    return {
        "restaurant": {
            "id": restaurant.id,
            "restaurant_name": restaurant.restaurant_name,
            "owner_name": restaurant.owner_name,
            "phone": restaurant.phone,
            "restaurant_type": restaurant.restaurant_type,
            "hours": restaurant.hours,
            "food_cost_baseline": restaurant.food_cost_baseline,
            "recap_enabled": restaurant.recap_enabled,
            "recap_hour": restaurant.recap_hour,
            "alerts_enabled": restaurant.alerts_enabled,
            "created_at": str(restaurant.created_at),
        },
        "user": {
            "id": user.id if user else None,
            "email": user.email if user else None,
            "subscription_status": user.subscription_status if user else None,
            "stripe_customer_id": user.stripe_customer_id if user else None,
            "created_at": str(user.created_at) if user else None,
        } if user else None,
        "connections": {
            "square": {"connected": sq is not None, "merchant_id": sq.merchant_id if sq else None},
            "bank": {
                "connected": pl is not None,
                "institution": pl.institution_name if pl else None,
                "balance": pl.current_balance if pl else None,
            },
        },
        "counts": {
            "messages": msg_count,
            "alerts": alert_count,
            "invoices": invoice_count,
            "summaries": summary_count,
        },
    }


# ─── Update Account ──────────────────────────────────────────

class AccountUpdate(BaseModel):
    restaurant_name: str | None = None
    owner_name: str | None = None
    phone: str | None = None
    email: str | None = None
    restaurant_type: str | None = None
    hours: str | None = None
    food_cost_baseline: float | None = None
    recap_enabled: bool | None = None
    recap_hour: int | None = None
    alerts_enabled: bool | None = None
    subscription_status: str | None = None


@router.put("/accounts/{rid}")
async def update_account(rid: int, data: AccountUpdate, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == rid))
    restaurant = result.scalar_one_or_none()
    if not restaurant:
        return {"error": "Not found"}

    for field in ["restaurant_name", "owner_name", "phone", "restaurant_type", "hours", "food_cost_baseline", "recap_enabled", "recap_hour", "alerts_enabled"]:
        val = getattr(data, field)
        if val is not None:
            setattr(restaurant, field, val)

    result = await db.execute(select(User).where(User.restaurant_id == rid))
    user = result.scalar_one_or_none()

    if data.email is not None and user:
        user.email = data.email

    if data.subscription_status is not None and user:
            user.subscription_status = data.subscription_status

    await db.commit()
    return {"status": "updated"}


# ─── Delete Account ───────────────────────────────────────────

@router.delete("/accounts/{rid}")
async def delete_account(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    # Delete in FK-safe order
    for model in [DepositMatch, BankTransaction, PlaidToken, PendingSettingsChange, Message, Alert]:
        await db.execute(delete(model).where(model.restaurant_id == rid))

    # Invoice items via subquery
    inv_ids = select(Invoice.id).where(Invoice.restaurant_id == rid)
    await db.execute(delete(InvoiceItem).where(InvoiceItem.invoice_id.in_(inv_ids)))
    await db.execute(delete(Invoice).where(Invoice.restaurant_id == rid))

    # Order items via subquery
    order_ids = select(Order.id).where(Order.restaurant_id == rid)
    await db.execute(delete(OrderItem).where(OrderItem.order_id.in_(order_ids)))
    await db.execute(delete(Order).where(Order.restaurant_id == rid))

    await db.execute(delete(LaborEntry).where(LaborEntry.restaurant_id == rid))
    await db.execute(delete(DailySummary).where(DailySummary.restaurant_id == rid))
    await db.execute(delete(SquareToken).where(SquareToken.restaurant_id == rid))
    await db.execute(delete(User).where(User.restaurant_id == rid))
    await db.execute(delete(Restaurant).where(Restaurant.id == rid))

    await db.commit()
    return {"status": "deleted"}


# ─── Account Data ─────────────────────────────────────────────

@router.get("/accounts/{rid}/messages")
async def get_messages(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message).where(Message.restaurant_id == rid).order_by(Message.created_at.asc()).limit(100)
    )
    msgs = result.scalars().all()
    return {"messages": [
        {"direction": m.direction, "body": m.body, "created_at": str(m.created_at)}
        for m in msgs
    ]}


@router.get("/accounts/{rid}/alerts")
async def get_alerts(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Alert).where(Alert.restaurant_id == rid).order_by(Alert.created_at.desc()).limit(50)
    )
    alerts = result.scalars().all()
    return {"alerts": [
        {"alert_type": a.alert_type, "severity": a.severity, "message": a.message, "summary_date": str(a.summary_date), "created_at": str(a.created_at)}
        for a in alerts
    ]}


@router.get("/accounts/{rid}/summaries")
async def get_summaries(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(DailySummary).where(DailySummary.restaurant_id == rid).order_by(DailySummary.summary_date.desc()).limit(30)
    )
    summaries = result.scalars().all()
    return {"summaries": [
        {
            "date": str(s.summary_date), "total_sales": s.total_sales, "order_count": s.order_count,
            "avg_ticket": s.avg_ticket, "labor_percentage": s.labor_percentage, "labor_cost": s.labor_cost,
        }
        for s in summaries
    ]}


# ─── Helpdesk Actions ─────────────────────────────────────────

@router.post("/accounts/{rid}/sync")
async def force_sync(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    results = {"orders": 0, "shifts": 0, "bank": False}
    yesterday = date.today() - timedelta(days=1)

    sq = (await db.execute(select(SquareToken).where(SquareToken.restaurant_id == rid))).scalar_one_or_none()
    if sq:
        results["orders"] = await sync_orders(db, rid, yesterday)
        results["shifts"] = await sync_labor(db, rid, yesterday)
        await compute_daily_summary(db, rid, yesterday)

    pl = (await db.execute(select(PlaidToken).where(PlaidToken.restaurant_id == rid))).scalar_one_or_none()
    if pl:
        await sync_transactions(db, rid)
        await sync_balances(db, rid)
        results["bank"] = True

    return results


@router.post("/accounts/{rid}/send-recap")
async def force_recap(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    recap = await generate_morning_recap(db, rid)
    if not recap:
        return {"error": "No data for recap"}

    result = await db.execute(select(Restaurant).where(Restaurant.id == rid))
    restaurant = result.scalar_one()

    msg = Message(restaurant_id=rid, direction="out", body=recap)
    db.add(msg)
    await db.commit()

    await send_sms(restaurant.phone, recap)
    return {"status": "sent", "recap": recap}


class SendSmsRequest(BaseModel):
    body: str


@router.post("/accounts/{rid}/send-sms")
async def admin_send_sms(rid: int, data: SendSmsRequest, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == rid))
    restaurant = result.scalar_one_or_none()
    if not restaurant:
        return {"error": "Not found"}

    msg = Message(restaurant_id=rid, direction="out", body=data.body)
    db.add(msg)
    await db.commit()

    await send_sms(restaurant.phone, data.body)
    return {"status": "sent"}


@router.post("/accounts/{rid}/preview-prompt")
async def preview_prompt(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == rid))
    restaurant = result.scalar_one_or_none()
    if not restaurant:
        return {"error": "Not found"}

    summaries = await get_recent_summaries(db, rid)
    food_cost = await get_food_cost_summary(db, rid)
    bank = await get_bank_summary(db, rid)
    invoices = await get_invoice_history(db, rid)
    weekly = await get_weekly_comparison(db, rid)

    alert_result = await db.execute(select(Alert).where(Alert.restaurant_id == rid).order_by(Alert.created_at.desc()).limit(10))
    alerts = list(alert_result.scalars().all())

    prompt = build_system_prompt(restaurant, summaries, alerts=alerts, food_cost=food_cost, bank_summary=bank, invoice_history=invoices, weekly_comparison=weekly)
    return {"prompt": prompt}


@router.post("/accounts/{rid}/disconnect-square")
async def disconnect_square(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    await db.execute(delete(SquareToken).where(SquareToken.restaurant_id == rid))
    await db.commit()
    return {"status": "disconnected"}


@router.post("/accounts/{rid}/disconnect-bank")
async def disconnect_bank(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    await db.execute(delete(PlaidToken).where(PlaidToken.restaurant_id == rid))
    await db.commit()
    return {"status": "disconnected"}


# ─── System Tools ─────────────────────────────────────────────

@router.post("/run-nightly")
async def trigger_nightly(admin: User = Depends(get_admin_user)):
    results = await run_nightly_pipeline()
    return {"status": "complete", "results": results}


@router.post("/send-recaps")
async def trigger_recaps(admin: User = Depends(get_admin_user)):
    await send_morning_recaps()
    return {"status": "complete"}


@router.post("/preview-recap/{rid}")
async def preview_recap(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    recap = await generate_morning_recap(db, rid)
    return {"recap": recap}


@router.get("/invoices/{rid}")
async def list_invoices(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Invoice).where(Invoice.restaurant_id == rid).order_by(Invoice.created_at.desc()).limit(20)
    )
    invoices = result.scalars().all()

    output = []
    for inv in invoices:
        result = await db.execute(select(InvoiceItem).where(InvoiceItem.invoice_id == inv.id))
        items = result.scalars().all()
        output.append({
            "id": inv.id, "vendor": inv.vendor_name, "date": str(inv.invoice_date) if inv.invoice_date else None,
            "total": inv.total_amount, "status": inv.status,
            "items": [{"product": i.product_name, "qty": i.quantity, "unit": i.unit, "unit_price": i.unit_price, "total_price": i.total_price} for i in items],
        })

    return {"invoices": output}


@router.get("/bank-transactions/{rid}")
async def list_bank_transactions(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BankTransaction).where(BankTransaction.restaurant_id == rid).order_by(BankTransaction.date.desc()).limit(50)
    )
    txns = result.scalars().all()
    return {"transactions": [
        {"date": str(t.date), "amount": t.amount, "name": t.name, "merchant": t.merchant_name, "category": t.category_primary, "recurring": t.is_recurring}
        for t in txns
    ]}


@router.get("/deposit-matches/{rid}")
async def list_deposit_matches(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(DepositMatch).where(DepositMatch.restaurant_id == rid).order_by(DepositMatch.match_date.desc()).limit(30)
    )
    matches = result.scalars().all()
    return {"matches": [
        {"date": str(m.match_date), "pos_card_sales": m.pos_card_sales, "bank_deposit": m.bank_deposit, "gap": m.gap_amount, "gap_pct": m.gap_percentage, "status": m.status}
        for m in matches
    ]}


@router.get("/bank-balance/{rid}")
async def get_bank_balance(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PlaidToken).where(PlaidToken.restaurant_id == rid))
    token = result.scalar_one_or_none()
    if not token:
        return {"error": "No bank connected"}
    return {"balance": token.current_balance, "institution": token.institution_name, "updated_at": str(token.balance_updated_at) if token.balance_updated_at else None}


# ─── Password Reset ───────────────────────────────────────────

class PasswordResetRequest(BaseModel):
    new_password: str


@router.post("/accounts/{rid}/reset-password")
async def reset_password(rid: int, data: PasswordResetRequest, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    import bcrypt as _bcrypt
    result = await db.execute(select(User).where(User.restaurant_id == rid))
    user = result.scalar_one_or_none()
    if not user:
        return {"error": "User not found"}
    user.password_hash = _bcrypt.hashpw(data.new_password.encode(), _bcrypt.gensalt()).decode()
    await db.commit()
    return {"status": "password_reset"}


# ─── Admin Notes ──────────────────────────────────────────────

@router.get("/accounts/{rid}/notes")
async def get_notes(rid: int, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    from app.models.integration import IntegrationToken
    result = await db.execute(
        select(IntegrationToken).where(
            and_(IntegrationToken.restaurant_id == rid, IntegrationToken.service == "_admin_notes")
        )
    )
    token = result.scalar_one_or_none()
    notes = token.access_token if token else ""
    return {"notes": notes}


class NotesUpdate(BaseModel):
    notes: str


@router.put("/accounts/{rid}/notes")
async def update_notes(rid: int, data: NotesUpdate, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    from app.models.integration import IntegrationToken
    result = await db.execute(
        select(IntegrationToken).where(
            and_(IntegrationToken.restaurant_id == rid, IntegrationToken.service == "_admin_notes")
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = data.notes
    else:
        note = IntegrationToken(
            restaurant_id=rid, service="_admin_notes",
            access_token=data.notes, external_name="Admin Notes",
        )
        db.add(note)
    await db.commit()
    return {"status": "saved"}


# ─── Bulk SMS ─────────────────────────────────────────────────

class BulkSmsRequest(BaseModel):
    body: str


@router.post("/bulk-sms")
async def bulk_sms(data: BulkSmsRequest, admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Restaurant).join(User, User.restaurant_id == Restaurant.id).where(User.subscription_status == "active")
    )
    restaurants = result.scalars().all()
    sent = 0
    for r in restaurants:
        try:
            msg = Message(restaurant_id=r.id, direction="out", body=data.body)
            db.add(msg)
            await send_sms(r.phone, data.body)
            sent += 1
        except Exception:
            pass
    await db.commit()
    return {"status": "sent", "count": sent, "total": len(restaurants)}


# ─── Health Check ─────────────────────────────────────────────

@router.get("/health-check")
async def health_check(admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    import httpx
    from app.config import settings

    checks = {}

    # Database
    try:
        result = await db.execute(sa_func.now())
        checks["database"] = {"status": "ok"}
    except Exception as e:
        checks["database"] = {"status": "error", "message": str(e)}

    # Twilio
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"https://api.twilio.com/2010-04-01/Accounts/{settings.twilio_account_sid}.json",
                auth=(settings.twilio_account_sid, settings.twilio_auth_token),
                timeout=10.0,
            )
            data = resp.json()
            checks["twilio"] = {"status": "ok", "account_status": data.get("status")}
    except Exception as e:
        checks["twilio"] = {"status": "error", "message": str(e)}

    # Claude API
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": settings.anthropic_api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={"model": "claude-sonnet-4-20250514", "max_tokens": 5, "messages": [{"role": "user", "content": "hi"}]},
                timeout=10.0,
            )
            checks["claude_api"] = {"status": "ok" if resp.status_code == 200 else "error", "http_code": resp.status_code}
    except Exception as e:
        checks["claude_api"] = {"status": "error", "message": str(e)}

    # Stripe
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.stripe.com/v1/balance",
                auth=(settings.stripe_secret_key, ""),
                timeout=10.0,
            )
            checks["stripe"] = {"status": "ok" if resp.status_code == 200 else "error"}
    except Exception as e:
        checks["stripe"] = {"status": "error", "message": str(e)}

    all_ok = all(c.get("status") == "ok" for c in checks.values())
    return {"status": "healthy" if all_ok else "degraded", "checks": checks}


# ─── Recent Messages (all accounts) ──────────────────────────

@router.get("/recent-messages")
async def recent_messages(admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message, Restaurant.restaurant_name, Restaurant.owner_name)
        .join(Restaurant, Message.restaurant_id == Restaurant.id)
        .order_by(Message.created_at.desc())
        .limit(50)
    )
    rows = result.all()
    return {"messages": [
        {
            "restaurant_name": r[1],
            "owner_name": r[2],
            "direction": r[0].direction,
            "body": r[0].body,
            "created_at": str(r[0].created_at),
        }
        for r in rows
    ]}


# ─── Revenue Metrics ──────────────────────────────────────────

@router.get("/revenue")
async def revenue_metrics(admin: User = Depends(get_admin_user), db: AsyncSession = Depends(get_db)):
    from datetime import datetime

    # Current MRR
    active = (await db.execute(
        select(sa_func.count()).select_from(User).where(User.subscription_status == "active")
    )).scalar() or 0
    mrr = active * 49

    # Signups by month (last 6 months)
    six_months_ago = datetime.utcnow() - timedelta(days=180)
    result = await db.execute(
        select(
            sa_func.date_trunc("month", User.created_at).label("month"),
            sa_func.count().label("count"),
        )
        .where(User.created_at >= six_months_ago)
        .group_by("month")
        .order_by("month")
    )
    signups_by_month = [{"month": str(r[0])[:7], "count": r[1]} for r in result.all()]

    # Status breakdown
    result = await db.execute(
        select(User.subscription_status, sa_func.count())
        .group_by(User.subscription_status)
    )
    status_breakdown = {r[0] or "unknown": r[1] for r in result.all()}

    # Churn (canceled / total ever)
    total_users = (await db.execute(select(sa_func.count()).select_from(User))).scalar() or 0
    canceled = status_breakdown.get("canceled", 0)
    churn_rate = (canceled / total_users * 100) if total_users > 0 else 0

    return {
        "mrr": mrr,
        "active_subscriptions": active,
        "total_users": total_users,
        "churn_rate": round(churn_rate, 1),
        "status_breakdown": status_breakdown,
        "signups_by_month": signups_by_month,
    }
