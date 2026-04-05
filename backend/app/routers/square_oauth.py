import urllib.parse

import httpx
from fastapi import APIRouter, Depends, Query
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken

router = APIRouter(prefix="/api/square", tags=["square"])

SCOPES = [
    "ORDERS_READ",
    "PAYMENTS_READ",
    "TIMECARDS_READ",
    "MERCHANT_PROFILE_READ",
]
REDIRECT_URI = f"{settings.backend_url}/api/square/callback"


@router.get("/auth-url")
async def get_auth_url(restaurant_id: int = Query(...)):
    params = {
        "client_id": settings.square_application_id,
        "scope": " ".join(SCOPES),
        "session": "false",
        "state": str(restaurant_id),
        "redirect_uri": REDIRECT_URI,
    }
    url = f"{settings.square_base_url}/oauth2/authorize?{urllib.parse.urlencode(params)}"
    return {"url": url}


@router.get("/callback")
async def square_callback(
    code: str = Query(...),
    state: str = Query(""),
    db: AsyncSession = Depends(get_db),
):
    restaurant_id = int(state) if state else None

    # Exchange code for tokens
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{settings.square_base_url}/oauth2/token",
            json={
                "client_id": settings.square_application_id,
                "client_secret": settings.square_application_secret,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": REDIRECT_URI,
            },
        )
        token_data = resp.json()

    if "access_token" not in token_data:
        return {"error": "Failed to get access token", "details": token_data}

    access_token = token_data["access_token"]
    refresh_token = token_data.get("refresh_token")
    merchant_id = token_data.get("merchant_id")

    # Fetch location ID
    location_id = None
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{settings.square_base_url}/v2/locations",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        locations = resp.json().get("locations", [])
        if locations:
            location_id = locations[0]["id"]

    # Update restaurant with location ID
    if restaurant_id and location_id:
        result = await db.execute(select(Restaurant).where(Restaurant.id == restaurant_id))
        restaurant = result.scalar_one_or_none()
        if restaurant:
            restaurant.square_location_id = location_id

    # Store tokens (upsert)
    if restaurant_id:
        result = await db.execute(
            select(SquareToken).where(SquareToken.restaurant_id == restaurant_id)
        )
        existing = result.scalar_one_or_none()
        if existing:
            existing.access_token = access_token
            existing.refresh_token = refresh_token
            existing.merchant_id = merchant_id
        else:
            token = SquareToken(
                restaurant_id=restaurant_id,
                access_token=access_token,
                refresh_token=refresh_token,
                merchant_id=merchant_id,
            )
            db.add(token)

    await db.commit()

    return RedirectResponse(url=f"{settings.frontend_url}/dashboard")
