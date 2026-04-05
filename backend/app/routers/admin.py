from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.invoice import Invoice, InvoiceItem
from app.services.morning_send import send_morning_recaps
from app.services.nightly_pipeline import run_nightly_pipeline
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
