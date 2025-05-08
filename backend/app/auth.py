from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.hash import bcrypt
from .database import SessionLocal
from .models import User
from .schemas import UserLogin
from .schemas import UserRegister

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/login")
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(User).where(User.name == data.name))
    user = query.scalar_one_or_none()
    if not user or not bcrypt.verify(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}

@router.post("/register")
async def register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    # Проверка, существует ли уже такой пользователь
    query = await db.execute(select(User).where(User.name == data.name))
    existing_user = query.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Хэшируем пароль
    hashed_password = bcrypt.hash(data.password)
    new_user = User(name=data.name, role="user", password_hash=hashed_password)
    
    db.add(new_user)
    await db.commit()

    return {"message": "User registered successfully"}