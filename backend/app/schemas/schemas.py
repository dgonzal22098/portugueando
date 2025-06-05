from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional, Dict, Any
from datetime import datetime, date

class UserBase(BaseModel):
    name: str
    email: str

    @validator('email')
    def validate_email_domain(cls, v):
        if not v.lower().endswith('@universidadean.edu.co'):
            raise ValueError('Solo se permiten correos con dominio @universidadean.edu.co')
        return v.lower()

class UserCreate(UserBase):
    rol: str
    estado: Optional[int] = 1


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int
    estado: int
    rol: str

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

class GrupoBase(BaseModel):
    email: str
    nGrupo: int
    hora: Optional[str]
    fecha: Optional[datetime]
    nivel: int
    lider: Optional[bool] = False
    estado: Optional[bool] = True

class GrupoCreate(GrupoBase):
    pass

class GrupoResponse(GrupoBase):
    id_grupo: int

    class Config:
        from_attributes = True

class GrupoInfo(BaseModel):
    nivel: int
    total_grupos: int
    grupos_activos: int
    grupos_inactivos: int

    class Config:
        from_attributes = True
