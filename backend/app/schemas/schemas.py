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

class ContenidoBase(BaseModel):
    titulo: str
    fecha: str
    etiquetas: str

class ColeccionBase(BaseModel):
    nombre: str
    categoria: str  # Ahora es un string, no una lista
    contenidos: str


class ColeccionCreate(ColeccionBase):
    pass


class Coleccion(ColeccionBase):
    id: int

    class Config:
        from_attributes = True
