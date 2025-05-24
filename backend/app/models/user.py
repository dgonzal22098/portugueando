from sqlalchemy import Boolean, Column, Integer, String
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(20), primary_key=True, index=True)  # Cédula como ID
    username = Column(String(100), index=True)  # Nombres y apellidos
    email = Column(String(100), unique=True, index=True)  # Correo institucional
    hashed_password = Column(String(100))  # Mantener por seguridad
    is_active = Column(Boolean, default=True)
    rol = Column(String(100), index=True)
