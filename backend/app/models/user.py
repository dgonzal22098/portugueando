from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from ..database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False) 
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
    __tablename__ = "grupo"
    id_grupo = Column(Integer, primary_key=True)
    email = Column(String(50), nullable=False)
    nGrupo = Column(Integer, nullable=False)
    hora = Column(String(16), nullable=False)
    fecha = Column(String(30), nullable=False)
    estado = Column(Boolean, nullable=False)
    lider = Column(Boolean, nullable=False)
    nivel = Column(Integer, nullable=False)