from typing import Optional

from pydantic.main import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class ProductBase(BaseModel):
    title: str
    price: float
    description: str
    img: str

    class Config:
        orm_mode = True


class Product(ProductBase):
    id: int


class User(BaseModel):
    firstname: str
    lastName: str
    address: str
    city: str
    cp: str
    country: str
    prefix: str
    telephone: str
    email: str
    gender: str
    username: str

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str


class UserCreate(User):
    password: str


class PaymentValidation(BaseModel):
    message: str