from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import join
from .database import SessionLocal
from .models import IncidentLog, Facility, User
from .schemas import IncidentCreate
from datetime import datetime
from typing import List
from pydantic import BaseModel

router = APIRouter()

# Добавим модель для ответа
class IncidentResponse(BaseModel):
    id: int
    incident_type: str
    incident_time: datetime
    facility_name: str
    responsible_user_name: str

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.get("/incidents", response_model=List[IncidentResponse])
async def read_incidents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            IncidentLog.id,
            IncidentLog.incident_type,
            IncidentLog.incident_time,
            Facility.name.label("facility_name"),
            User.name.label("responsible_user_name")
        )
        .select_from(
            join(IncidentLog, Facility, IncidentLog.facility_id == Facility.id)
            .join(User, IncidentLog.responsible_user_id == User.id)
        )
    )
    
    # Преобразуем результаты в список словарей
    incidents = []
    for row in result.all():
        incidents.append({
            "id": row.id,
            "incident_type": row.incident_type,
            "incident_time": row.incident_time,
            "facility_name": row.facility_name,
            "responsible_user_name": row.responsible_user_name
        })
    
    return incidents

@router.post("/incidents")
async def create_incident(incident: IncidentCreate, db: AsyncSession = Depends(get_db)):
    db_incident = IncidentLog(
        incident_type=incident.incident_type,
        incident_time=datetime.now(),
        facility_id=incident.facility_id,
        responsible_user_id=incident.responsible_user_id
    )
    db.add(db_incident)
    await db.commit()
    await db.refresh(db_incident)
    return db_incident