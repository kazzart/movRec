from pydantic import BaseSettings

class Settings(BaseSettings):
    development_mode: bool = True
    server_port: int
    database_url: str
    secret: str
    jwt_algorithm: str = 'HS256'
    jwt_lifetime: int = 3600

settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8'
)