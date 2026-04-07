from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routers.restaurants import router as restaurants_router
from app.routers.square_oauth import router as square_oauth_router
from app.routers.sync import router as sync_router
from app.routers.sms import router as sms_router
from app.routers.admin import router as admin_router
from app.routers.auth import router as auth_router
from app.routers.billing import router as billing_router
from app.routers.integrations import router as integrations_router
from app.routers.plaid_link import router as plaid_link_router
from app.scheduler import start_scheduler, shutdown_scheduler


async def _seed_admin():
    from sqlalchemy import select
    from app.database import async_session
    from app.models.user import User
    try:
        async with async_session() as db:
            result = await db.execute(select(User).where(User.email == "amcarbonaro@gmail.com"))
            user = result.scalar_one_or_none()
            if user and not user.is_admin:
                user.is_admin = True
                await db.commit()
    except Exception:
        pass


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await _seed_admin()
    start_scheduler()
    yield
    shutdown_scheduler()


app = FastAPI(title="Expo", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        settings.frontend_url.replace("://", "://www."),
        "https://expo-rose-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(restaurants_router)
app.include_router(square_oauth_router)
app.include_router(sync_router)
app.include_router(sms_router)
app.include_router(admin_router)
app.include_router(plaid_link_router)
app.include_router(auth_router)
app.include_router(billing_router)
app.include_router(integrations_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
