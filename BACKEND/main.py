from datetime import timedelta
from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
# to get a string like this run:
# openssl rand -hex 32
from sqlalchemy.orm import Session

from db_methods import create_user_db, get_products_db, get_product_db, create_product_db
from dependencies import authenticate_user, create_access_token, get_db, get_current_user
from schemas import Token, User, UserCreate, Product, ProductBase, PaymentValidation
from utils import get_user_by_email

ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db=db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.post("/users/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_db(db=db, user=user)


@app.get("/products/", response_model=List[Product])
def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = get_products_db(db, skip, limit)
    if len(products) > 0:
        return products
    else:
        raise HTTPException(status_code=300, detail="Issue with query")


@app.get("/products/{prod_id}", response_model=Product)
def get_product(prod_id: int, db: Session = Depends(get_db)):
    product = get_product_db(db, prod_id)
    if product:
        return product
    else:
        raise HTTPException(status_code=300, detail="Issue with query")


@app.post("/products/", response_model=Product)
def create_product(prod: ProductBase, db: Session = Depends(get_db)):
    return create_product_db(db, prod)


@app.post("/payment/", response_model=PaymentValidation)
def pay_a_cart(amount: int, current_user: User = Depends(get_current_user)):
    return PaymentValidation(message="ok")
