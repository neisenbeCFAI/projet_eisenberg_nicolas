from sqlalchemy import Boolean, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastName = Column(String)
    address = Column(String)
    city = Column(String)
    cp = Column(String)
    country = Column(String)
    prefix = Column(String)
    telephone = Column(String)
    email = Column(String, unique=True, index=True)
    gender = Column(String)
    username = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float)
    description = Column(String)
    img = Column(String, nullable=True)