from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.restaurant import Restaurant

router = APIRouter(prefix="/api/restaurants", tags=["restaurants"])


class RestaurantCreate(BaseModel):
    owner_name: str
    restaurant_name: str
    phone: str


class RestaurantResponse(BaseModel):
    id: int
    owner_name: str
    restaurant_name: str
    phone: str

    model_config = {"from_attributes": True}


@router.post("", response_model=RestaurantResponse)
async def create_restaurant(data: RestaurantCreate, db: AsyncSession = Depends(get_db)):
    restaurant = Restaurant(
        owner_name=data.owner_name,
        restaurant_name=data.restaurant_name,
        phone=data.phone,
    )
    db.add(restaurant)
    await db.commit()
    await db.refresh(restaurant)
    return restaurant
