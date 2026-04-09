from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.beta_application import BetaApplication

router = APIRouter(prefix="/api/beta", tags=["beta"])


class BetaApplyRequest(BaseModel):
    name: str
    restaurant_name: str
    phone: str
    city: str
    pos_system: str
    years_open: str | None = None


@router.post("/apply")
async def apply_for_beta(payload: BetaApplyRequest, db: AsyncSession = Depends(get_db)):
    """Public endpoint — no auth required. Saves a beta application."""
    application = BetaApplication(
        name=payload.name,
        restaurant_name=payload.restaurant_name,
        phone=payload.phone,
        city=payload.city,
        pos_system=payload.pos_system,
        years_open=payload.years_open,
    )
    db.add(application)
    await db.commit()
    return {"ok": True}
