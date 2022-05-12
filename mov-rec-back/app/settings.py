from pydantic import BaseSettings


class Settings(BaseSettings):
    development_mode: bool = True
    server_port: int
    database_url: str
    root_path: str = ''


settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8'

)
