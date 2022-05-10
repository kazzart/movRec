from typing import List
from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True


class Recommendations(BaseModel):
    movies: List[Movie]
