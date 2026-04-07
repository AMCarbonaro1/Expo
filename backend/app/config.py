from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env", override=True)


class Settings(BaseSettings):
    # Twilio
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    # Square
    square_access_token: str = ""
    square_application_id: str = ""
    square_application_secret: str = ""
    square_environment: str = "sandbox"

    # Plaid
    plaid_client_id: str = ""
    plaid_secret: str = ""
    plaid_env: str = "sandbox"

    # Google Cloud Vision
    google_application_credentials: str = ""

    # Claude API
    anthropic_api_key: str = ""

    # AWS
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_region: str = "us-east-1"
    s3_bucket_name: str = ""

    # Database
    database_url: str = ""

    # Stripe
    stripe_secret_key: str = ""
    stripe_publishable_key: str = ""
    stripe_price_id: str = ""
    stripe_webhook_secret: str = ""

    # QuickBooks
    quickbooks_client_id: str = ""
    quickbooks_client_secret: str = ""
    quickbooks_environment: str = "sandbox"

    # Xero
    xero_client_id: str = ""
    xero_client_secret: str = ""

    # 7shifts
    sevenshifts_client_id: str = ""
    sevenshifts_client_secret: str = ""

    # DoorDash
    doordash_developer_id: str = ""
    doordash_key_id: str = ""
    doordash_signing_secret: str = ""

    # Toast (needs partner approval)
    toast_client_id: str = ""
    toast_client_secret: str = ""

    # Clover (needs app market approval)
    clover_app_id: str = ""
    clover_app_secret: str = ""
    clover_environment: str = "sandbox"

    # Lightspeed
    lightspeed_client_id: str = ""
    lightspeed_client_secret: str = ""

    # Uber Eats (needs NDA)
    ubereats_client_id: str = ""
    ubereats_client_secret: str = ""

    # Grubhub (needs NDA)
    grubhub_partner_key: str = ""

    # OpenTable (needs affiliate approval)
    opentable_client_id: str = ""
    opentable_client_secret: str = ""

    # MarketMan (needs partner)
    marketman_api_key: str = ""
    marketman_api_password: str = ""

    # MarginEdge
    marginedge_api_key: str = ""

    # Restaurant365 (needs support contact)
    r365_username: str = ""
    r365_password: str = ""

    # Revel (needs partner)
    revel_api_key: str = ""
    revel_api_secret: str = ""

    # HungerRush (needs account manager)
    hungerrush_client_id: str = ""
    hungerrush_client_secret: str = ""

    # JWT
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    # URLs
    backend_url: str = "http://localhost:8000"
    frontend_url: str = "http://localhost:3000"

    @property
    def square_base_url(self) -> str:
        if self.square_environment == "sandbox":
            return "https://connect.squareupsandbox.com"
        return "https://connect.squareup.com"

    @property
    def plaid_base_url(self) -> str:
        if self.plaid_env == "sandbox":
            return "https://sandbox.plaid.com"
        elif self.plaid_env == "development":
            return "https://development.plaid.com"
        return "https://production.plaid.com"

    @property
    def async_database_url(self) -> str:
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    model_config = {"env_file": "../.env", "env_file_encoding": "utf-8"}


settings = Settings()
