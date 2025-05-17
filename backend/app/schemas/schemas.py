from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import date


class RolUsuario(str, Enum):
    Estudiante = "Estudiante"
    Profesor = "Profesor"
    Administrador = "Administrador"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    id: str  # Cédula como ID


class UserCreate(UserBase):
    password: str
    dob: date
    rol: RolUsuario


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    dob: Optional[date] = None
    rol: Optional[RolUsuario] = None
    is_active: Optional[bool] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(UserBase):
    dob: date
    is_active: bool
    rol: RolUsuario

    class Config:
        from_attributes = True
