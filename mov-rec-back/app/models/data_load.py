from typing import List
from pydantic import BaseModel


class User(BaseModel):
    id: int
    nickname: str

    class Config:
        orm_mode = True


class Rating(BaseModel):
    user_id: int
    movie_id: int
    rating: int


class Movie(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True


class Movies(BaseModel):
    movies: List[Movie]
