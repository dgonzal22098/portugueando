from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from ..database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


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


class Grupo(Base):
    __tablename__ = "grupos"

    id = Column(Integer, primary_key=True, index=True)
    curso_id = Column(String(50), nullable=False)
    horario = Column(String(20), nullable=False)
    numero_grupo = Column(Integer, nullable=False)
    fecha_creacion = Column(DateTime, default=func.now())

    # Campos adicionales si los necesitas
    profesor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    capacidad_maxima = Column(Integer, default=20)
    estudiantes_inscritos = Column(Integer, default=0)

