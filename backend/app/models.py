from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)

class Facility(Base):
    __tablename__ = "facilities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)

class IncidentLog(Base):
    __tablename__ = "incident_log"
    id = Column(Integer, primary_key=True, index=True)
    incident_type = Column(String, nullable=False)
    incident_time = Column(DateTime, nullable=False)
    facility_id = Column(Integer, ForeignKey('facilities.id'))
    responsible_user_id = Column(Integer, ForeignKey('users.id'))