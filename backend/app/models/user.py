from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from ..database import Base
from sqlalchemy import DateTime
from datetime import datetime
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)  # ← Campo name
    email = Column(String(50), nullable=False, unique=True)
    hashed_password = Column(String(50), nullable=False)
    estado = Column(Integer, nullable=False)
    rol = Column(String(20), nullable=False)


class Nivel(Base):
    __tablename__ = "nivel"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True)
    email = Column(String(50), index=True)
    profesor = Column(String(50), index=True)
    semestre = Column(String(50), index=True)
    hora = Column(String(50), index=True)
    nivel = Column(Integer, index=True)
    grupo = Column(Integer, index=True)

class Coleccion(Base):
    __tablename__ = "colecciones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    categoria = Column(String(255), nullable=False)


