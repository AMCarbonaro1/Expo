from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routers.restaurants import router as restaurants_router
from app.routers.square_oauth import router as square_oauth_router
from app.routers.sync import router as sync_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Expo", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(restaurants_router)
app.include_router(square_oauth_router)
app.include_router(sync_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
