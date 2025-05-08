from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .database import SessionLocal
from .models import Facility
from .schemas import FacilityCreate

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.get("/facilities")
async def read_facilities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Facility))
    return result.scalars().all()

@router.post("/facilities")
async def create_facility(facility: FacilityCreate, db: AsyncSession = Depends(get_db)):
    db_facility = Facility(name=facility.name, location=facility.location)
    db.add(db_facility)
    await db.commit()
    await db.refresh(db_facility)
    return db_facility