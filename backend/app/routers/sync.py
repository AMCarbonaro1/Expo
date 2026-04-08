from datetime import date

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies.auth import get_current_user, verify_ownership
from app.models.user import User
from app.services.square_sync import sync_orders, sync_labor, compute_daily_summary

router = APIRouter(prefix="/api/square", tags=["sync"])


class SyncResponse(BaseModel):
    orders_synced: int
    shifts_synced: int


class SummaryResponse(BaseModel):
    summary_date: date
    total_sales: float
    order_count: int
    avg_ticket: float
    cash_sales: float
    card_sales: float
    total_tips: float
    total_discounts: float
    labor_cost: float
    labor_hours: float
    labor_percentage: float
    busiest_hour: int | None

    model_config = {"from_attributes": True}


@router.post("/sync/{restaurant_id}", response_model=SyncResponse)
async def run_sync(
    restaurant_id: int,
    target_date: date = Query(default_factory=date.today),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    verify_ownership(user, restaurant_id)
    orders_count = await sync_orders(db, restaurant_id, target_date)
    shifts_count = await sync_labor(db, restaurant_id, target_date)
    await compute_daily_summary(db, restaurant_id, target_date)
    return SyncResponse(orders_synced=orders_count, shifts_synced=shifts_count)


@router.get("/summary/{restaurant_id}", response_model=SummaryResponse | None)
async def get_summary(
    restaurant_id: int,
    target_date: date = Query(alias="date", default_factory=date.today),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    verify_ownership(user, restaurant_id)
    summary = await compute_daily_summary(db, restaurant_id, target_date)
    return summary
