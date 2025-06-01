from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int
    estado: int

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



class NivelBase(BaseModel):
    nombre: str
    nivel: int
    grupo: int

class Nivel(NivelBase):
    id: int

    class Config:
        orm_mode = True
