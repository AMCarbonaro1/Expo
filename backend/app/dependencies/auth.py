import hashlib
import hmac
import time

from fastapi import Depends, Header, HTTPException
from jose import JWTError, jwt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.user import User


async def get_current_user(
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db),
) -> User:
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization

    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        user_id = int(payload.get("sub", 0))
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


async def get_admin_user(
    user: User = Depends(get_current_user),
) -> User:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


async def get_current_restaurant_id(
    authorization: str = Header(...),
) -> int:
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization

    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        return int(payload.get("restaurant_id", 0))
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")


def verify_ownership(user: User, restaurant_id: int):
    """Raise 403 if user doesn't own the requested restaurant."""
    if user.restaurant_id != restaurant_id:
        raise HTTPException(status_code=403, detail="Access denied")


def sign_state(restaurant_id: int) -> str:
    """Create a signed OAuth state parameter."""
    ts = str(int(time.time()))
    payload = f"{restaurant_id}:{ts}"
    sig = hmac.new(settings.jwt_secret_key.encode(), payload.encode(), hashlib.sha256).hexdigest()[:16]
    return f"{payload}:{sig}"


def verify_state(state: str) -> int:
    """Verify and extract restaurant_id from signed OAuth state. Raises 400 on failure."""
    try:
        parts = state.split(":")
        if len(parts) != 3:
            raise ValueError("Invalid state format")
        restaurant_id, ts, sig = int(parts[0]), parts[1], parts[2]
        expected = hmac.new(settings.jwt_secret_key.encode(), f"{restaurant_id}:{ts}".encode(), hashlib.sha256).hexdigest()[:16]
        if not hmac.compare_digest(expected, sig):
            raise ValueError("Invalid signature")
        # Check state is not older than 1 hour
        if abs(time.time() - int(ts)) > 3600:
            raise ValueError("State expired")
        return restaurant_id
    except (ValueError, IndexError) as e:
        raise HTTPException(status_code=400, detail=f"Invalid OAuth state: {e}")
