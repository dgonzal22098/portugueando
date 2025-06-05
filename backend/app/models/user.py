from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from ..database import Base
from sqlalchemy import DateTime
from datetime import datetime
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

class Coleccion(Base):
    __tablename__ = "colecciones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    categoria = Column(String(255), nullable=False)
    grupo_id = Column(Integer, nullable=True, index=True)
    # Relación con los contenidos
    contenidos = relationship("Contenido", back_populates="coleccion", lazy="joined")

class Grupo(Base):
<<<<<<< HEAD
    __tablename__ = "grupo"
    id_grupo = Column(Integer, primary_key=True)
    email = Column(String(50), nullable=False)
    nGrupo = Column(Integer, nullable=False)
    hora = Column(String(16), nullable=False)
    fecha = Column(String(30), nullable=False)
    estado = Column(Boolean, nullable=False)
    lider = Column(Boolean, nullable=False)
    nivel = Column(Integer, nullable=False)
=======
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

class Contenido(Base):
    __tablename__ = "contenidos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    categorias = Column(String(255))  # Puedes almacenar categorías separadas por comas
    url = Column(String(2000))  # Aumentado de 500 a 2000
    coleccion_id = Column(Integer, ForeignKey("colecciones.id", ondelete="CASCADE"))
    # Relación con la colección
    coleccion = relationship("Coleccion", back_populates="contenidos")
>>>>>>> 87dceb61ae0e8e71a1a1a489ee1205538bcb4ef4
