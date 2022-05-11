from re import L
from typing import List
from pydantic import BaseModel


class UserCreate(BaseModel):
    nickname: str


class User(BaseModel):
    id: int
    nickname: str

    class Config:
        orm_mode = True


class Rating(BaseModel):
    user_id: int
    movie_id: int
    rating: int

    class Config:
        orm_mode = True


class RatingAvg(BaseModel):
    avg: float


class Movie(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True


class Movies(BaseModel):
    movies: List[Movie]
