from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class IntegrationToken(Base):
    """Generic token storage for all third-party integrations.
    Each service stores its credentials here with a unique (restaurant_id, service) pair.
    """
    __tablename__ = "integration_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    service: Mapped[str] = mapped_column(String(50))  # e.g., "quickbooks", "xero", "7shifts", etc.
    access_token: Mapped[str] = mapped_column(Text)
    refresh_token: Mapped[str | None] = mapped_column(Text)
    token_expires_at: Mapped[datetime | None] = mapped_column(DateTime)
    external_id: Mapped[str | None] = mapped_column(String(255))  # realm_id, tenant_id, company_guid, etc.
    external_name: Mapped[str | None] = mapped_column(String(255))  # org name, company name, etc.
    extra_data: Mapped[str | None] = mapped_column(Text)  # JSON for service-specific fields
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
