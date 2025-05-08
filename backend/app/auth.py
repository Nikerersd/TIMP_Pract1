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
    # Проверка на пустые данные
    if not data.name.strip() or not data.password.strip():
        await db.rollback()
        raise HTTPException(status_code=422, detail="Имя и пароль не могут быть пустыми")
    
    user = (await db.execute(select(User).where(User.name == data.name))).scalar_one_or_none()
    
    if not user:
        await db.rollback()
        raise HTTPException(status_code=401, detail="Пользователь не найден")
    
    if not bcrypt.verify(data.password, user.password_hash):
        await db.rollback()
        raise HTTPException(status_code=401, detail="Неверный пароль")
    
    await db.commit()
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

@router.get("/users/employees")
async def get_employees(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User.name, User.role).where(User.role == "employee"))
    return result.mappings().all()  # Возвращает список словарей

@router.post("/users")
async def create_user(
    user_data: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    hashed_password = bcrypt.hash(user_data.password)
    new_user = User(
        name=user_data.name,
        password_hash=hashed_password,
        role="employee"  # или получать роль из запроса
    )
    db.add(new_user)
    await db.commit()
    return {"message": "User created successfully"}