import logging
from contextlib import asynccontextmanager

import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import settings

# Initialize Sentry error monitoring
if settings.sentry_dsn:
    sentry_sdk.init(
        dsn=settings.sentry_dsn,
        send_default_pii=True,
        traces_sample_rate=0.1,
        environment="production" if "carbonaromedia" in settings.backend_url else "development",
    )
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

logger = logging.getLogger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


async def _seed_admin():
    from sqlalchemy import select
    from app.database import async_session
    from app.models.user import User
    admin_email = settings.admin_email
    if not admin_email:
        return
    try:
        async with async_session() as db:
            result = await db.execute(select(User).where(User.email == admin_email))
            user = result.scalar_one_or_none()
            if user and not user.is_admin:
                user.is_admin = True
                await db.commit()
                logger.info(f"Admin flag set for {admin_email}")
    except Exception as e:
        logger.error(f"Admin seed failed: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await _seed_admin()
    start_scheduler()
    yield
    shutdown_scheduler()


app = FastAPI(title="Expo", version="0.1.0", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        settings.frontend_url.replace("://", "://www."),
        "https://expo-rose-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
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
