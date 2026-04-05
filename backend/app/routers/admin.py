from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.bank import PlaidToken, BankTransaction, DepositMatch
from app.models.invoice import Invoice, InvoiceItem
from app.services.morning_send import send_morning_recaps
from app.services.nightly_pipeline import run_nightly_pipeline
from app.services.plaid_sync import sync_transactions, sync_balances
from app.services.recap_generator import generate_morning_recap

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/run-nightly")
async def trigger_nightly():
    results = await run_nightly_pipeline()
    return {"status": "complete", "results": results}


@router.post("/send-recaps")
async def trigger_recaps():
    await send_morning_recaps()
    return {"status": "complete"}


@router.post("/preview-recap/{restaurant_id}")
async def preview_recap(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    recap = await generate_morning_recap(db, restaurant_id)
    return {"recap": recap}


@router.get("/invoices/{restaurant_id}")
async def list_invoices(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Invoice)
        .where(Invoice.restaurant_id == restaurant_id)
        .order_by(Invoice.created_at.desc())
        .limit(20)
    )
    invoices = result.scalars().all()

    output = []
    for inv in invoices:
        result = await db.execute(
            select(InvoiceItem).where(InvoiceItem.invoice_id == inv.id)
        )
        items = result.scalars().all()
        output.append({
            "id": inv.id,
            "vendor": inv.vendor_name,
            "date": str(inv.invoice_date) if inv.invoice_date else None,
            "total": inv.total_amount,
            "status": inv.status,
            "items": [
                {
                    "product": i.product_name,
                    "qty": i.quantity,
                    "unit": i.unit,
                    "unit_price": i.unit_price,
                    "total_price": i.total_price,
                }
                for i in items
            ],
        })

    return {"invoices": output}


@router.post("/sync-bank/{restaurant_id}")
async def trigger_bank_sync(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    txn_result = await sync_transactions(db, restaurant_id)
    balance = await sync_balances(db, restaurant_id)
    return {"transactions": txn_result, "balance": balance}


@router.get("/bank-transactions/{restaurant_id}")
async def list_bank_transactions(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BankTransaction)
        .where(BankTransaction.restaurant_id == restaurant_id)
        .order_by(BankTransaction.date.desc())
        .limit(50)
    )
    txns = result.scalars().all()
    return {"transactions": [
        {
            "date": str(t.date),
            "amount": t.amount,
            "name": t.name,
            "merchant": t.merchant_name,
            "category": t.category_primary,
            "recurring": t.is_recurring,
        }
        for t in txns
    ]}


@router.get("/deposit-matches/{restaurant_id}")
async def list_deposit_matches(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(DepositMatch)
        .where(DepositMatch.restaurant_id == restaurant_id)
        .order_by(DepositMatch.match_date.desc())
        .limit(30)
    )
    matches = result.scalars().all()
    return {"matches": [
        {
            "date": str(m.match_date),
            "pos_card_sales": m.pos_card_sales,
            "bank_deposit": m.bank_deposit,
            "gap": m.gap_amount,
            "gap_pct": m.gap_percentage,
            "status": m.status,
        }
        for m in matches
    ]}


@router.get("/bank-balance/{restaurant_id}")
async def get_bank_balance(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == restaurant_id)
    )
    token = result.scalar_one_or_none()
    if not token:
        return {"error": "No bank connected"}
    return {
        "balance": token.current_balance,
        "institution": token.institution_name,
        "updated_at": str(token.balance_updated_at) if token.balance_updated_at else None,
    }
