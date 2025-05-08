from pydantic import BaseModel

class UserLogin(BaseModel):
    name: str
    password: str

class UserRegister(BaseModel):
    name: str
    password: str