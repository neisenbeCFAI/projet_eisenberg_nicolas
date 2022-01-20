from sqlalchemy.orm import Session

from dependencies import get_password_hash
from models import User, Product
from schemas import ProductBase as Prod
from schemas import UserCreate


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user_db(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        firstname=user.firstname,
        lastName=user.lastName,
        address=user.address,
        city=user.city,
        cp=user.cp,
        country=user.country,
        prefix=user.prefix,
        telephone=user.telephone,
        email=user.email,
        gender=user.gender,
        username=user.username,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_product_db(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def get_products_db(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Product).offset(skip).limit(limit).all()


def create_product_db(db: Session, prod: Prod):
    db_product = Product(**prod.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
