from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from ..database import Base
from sqlalchemy.orm import relationship


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
    nivel = Column(Integer, index=True)
    grupo = Column(Integer, index=True)

