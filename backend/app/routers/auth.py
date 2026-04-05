from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
import bcrypt as _bcrypt
from jose import jwt
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.invoice import Invoice
from app.models.bank import PlaidToken
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken
from app.models.user import User

router = APIRouter(prefix="/api/auth", tags=["auth"])


def create_token(user_id: int, restaurant_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "restaurant_id": restaurant_id,
        "exp": datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


class SignupRequest(BaseModel):
    email: str
    password: str
    owner_name: str
    restaurant_name: str
    phone: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str

    model_config = {"from_attributes": True}


class RestaurantResponse(BaseModel):
    id: int
    owner_name: str
    restaurant_name: str
    phone: str

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):
    token: str
    user: UserResponse
    restaurant: RestaurantResponse


class OnboardingStatus(BaseModel):
    square_connected: bool
    bank_connected: bool
    has_texted: bool
    has_invoice: bool


@router.post("/signup", response_model=AuthResponse)
async def signup(data: SignupRequest, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create restaurant
    restaurant = Restaurant(
        owner_name=data.owner_name,
        restaurant_name=data.restaurant_name,
        phone=data.phone,
    )
    db.add(restaurant)
    await db.flush()

    # Create user with 7-day trial
    user = User(
        email=data.email,
        password_hash=_bcrypt.hashpw(data.password.encode(), _bcrypt.gensalt()).decode(),
        restaurant_id=restaurant.id,
        trial_ends_at=datetime.utcnow() + timedelta(days=7),
        subscription_status="trialing",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    await db.refresh(restaurant)

    token = create_token(user.id, restaurant.id)
    return AuthResponse(
        token=token,
        user=UserResponse.model_validate(user),
        restaurant=RestaurantResponse.model_validate(restaurant),
    )


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not _bcrypt.checkpw(data.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    result = await db.execute(select(Restaurant).where(Restaurant.id == user.restaurant_id))
    restaurant = result.scalar_one()

    token = create_token(user.id, restaurant.id)
    return AuthResponse(
        token=token,
        user=UserResponse.model_validate(user),
        restaurant=RestaurantResponse.model_validate(restaurant),
    )


@router.get("/me")
async def me(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Restaurant).where(Restaurant.id == user.restaurant_id))
    restaurant = result.scalar_one()

    now = datetime.utcnow()
    trial_active = (
        user.subscription_status == "trialing"
        and user.trial_ends_at
        and user.trial_ends_at > now
    )
    days_left = max(0, (user.trial_ends_at - now).days) if user.trial_ends_at and user.trial_ends_at > now else 0

    return {
        "user": UserResponse.model_validate(user).model_dump(),
        "restaurant": RestaurantResponse.model_validate(restaurant).model_dump(),
        "subscription_status": user.subscription_status,
        "trial_ends_at": str(user.trial_ends_at) if user.trial_ends_at else None,
        "trial_active": trial_active,
        "days_left": days_left,
        "is_active": user.subscription_status == "active" or trial_active,
    }


@router.get("/onboarding-status", response_model=OnboardingStatus)
async def onboarding_status(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    rid = user.restaurant_id

    sq = await db.execute(select(SquareToken).where(SquareToken.restaurant_id == rid))
    plaid = await db.execute(select(PlaidToken).where(PlaidToken.restaurant_id == rid))
    msgs = await db.execute(
        select(Message).where(Message.restaurant_id == rid, Message.direction == "in").limit(1)
    )
    invs = await db.execute(select(Invoice).where(Invoice.restaurant_id == rid).limit(1))

    return OnboardingStatus(
        square_connected=sq.scalar_one_or_none() is not None,
        bank_connected=plaid.scalar_one_or_none() is not None,
        has_texted=msgs.scalar_one_or_none() is not None,
        has_invoice=invs.scalar_one_or_none() is not None,
    )
