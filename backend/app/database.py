from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

engine = create_async_engine(settings.async_database_url, echo=False)
async_session = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session


async def init_db():
    import app.models.restaurant  # noqa: F401
    import app.models.square_data  # noqa: F401
    import app.models.message  # noqa: F401
    import app.models.alert  # noqa: F401
    import app.models.invoice  # noqa: F401
    import app.models.bank  # noqa: F401
    import app.models.user  # noqa: F401
    import app.models.settings_change  # noqa: F401
    import app.models.integration  # noqa: F401
    import app.models.support_ticket  # noqa: F401
    import app.models.beta_application  # noqa: F401
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
