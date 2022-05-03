from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class User(UserBase):
    id: int
    class Config:
        orm_mode=True


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
