from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
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
