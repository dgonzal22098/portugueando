from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int
    estado: int
    rol: str  # ← Agregar campo
    hashed_password: str

    class Config:
        from_attributes = True

class UserProf(BaseModel):
    namepro: str
    emailpro: str
    estado: int

    class Config:
        from_attributes = True

class EmailSchema(BaseModel):
    email: str

class OTPVerification(BaseModel):
    email: str
    code: str

class ResetPasswordSchema(BaseModel):
    token: str
    new_password: str


class EstudianteNivel(BaseModel):
    nombre: str
    correo: str
    nivel: int
    grupo: int
    profesor: str
    semestre: str
    hora: str

    class Config:
        from_attributes = True

class ContenidoBase(BaseModel):
    nombre: str
    categorias: Optional[str] = None
    url: Optional[str] = None
    coleccion_id: int

class ContenidoCreate(ContenidoBase):
    pass

class ContenidoResponse(ContenidoBase):
    id: int
    categorias: str

    class Config:
        from_attributes = True

class ColeccionBase(BaseModel):
    nombre: str
    categoria: str

class ColeccionCreate(ColeccionBase):
    grupo_id: int = 0

class ColeccionResponse(ColeccionBase):
    id: int
    contenidos: List[ContenidoResponse] = []
    categoria: str
    grupo_id: int = 0

    class Config:
        from_attributes = True

