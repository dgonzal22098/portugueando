from pydantic import BaseModel, EmailStr


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

class GrupoCreate(BaseModel):
    email: str
    nGrupo: int
    hora: str
    fecha: str
    estado: bool
    lider: bool
    nivel: int

class GrupoResponse(GrupoCreate):
    id_grupo: int

    class Config:
        form_mode = True