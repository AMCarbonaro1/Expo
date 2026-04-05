from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Twilio
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    # Square
    square_access_token: str = ""
    square_application_id: str = ""
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

    # Frontend
    frontend_url: str = "http://localhost:3000"

    @property
    def square_base_url(self) -> str:
        if self.square_environment == "sandbox":
            return "https://connect.squareupsandbox.com"
        return "https://connect.squareup.com"

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
