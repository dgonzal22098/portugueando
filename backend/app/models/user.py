from sqlalchemy import Boolean, Column, Integer, String, Date, Enum
from ..database import Base
import enum


class RolUsuario(enum.Enum):
    Estudiante = "Estudiante"
    Profesor = "Profesor"
    Administrador = "Administrador"


class User(Base):
    __tablename__ = "users"

    id = Column(String(20), primary_key=True, index=True)  # Cédula como ID
    name = Column(String(100), index=True)  # Nombres y apellidos
    email = Column(String(100), unique=True, index=True)  # Correo institucional
    dob = Column(Date)  # Fecha de nacimiento
    hashed_password = Column(String(100))  # Mantener por seguridad
    is_active = Column(Boolean, default=True)
    rol = Column(Enum(RolUsuario), nullable=False)  # Rol del usuario: Estudiante, Profesor o Administrador
