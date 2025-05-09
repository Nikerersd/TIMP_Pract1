from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Annotated
import re

class UserLogin(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    password: str = Field(..., min_length=1)

class UserRegister(BaseModel):
    name: Annotated[str, Field(min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_]+$")]
    password: str = Field(..., min_length=6)

    @field_validator('name')
    def validate_name(cls, value):
        if not re.match(r"^[a-zA-Z0-9_]+$", value):
            raise ValueError("Имя может содержать только буквы, цифры и подчёркивания")
        return value

class FacilityCreate(BaseModel):
    name: str
    location: str

class IncidentCreate(BaseModel):
    incident_type: str
    facility_id: int
    responsible_user_id: int