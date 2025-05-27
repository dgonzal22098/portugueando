from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from ..database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(String(20), primary_key=True, index=True)
    name = Column(String(100), index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(100))
    is_active = Column(Boolean, default=True)
    rol = Column(String(100), index=True)

    caracterizacoes = relationship("CaracterizacaoEscritura", back_populates="user")

class CaracterizacaoEscritura(Base):
    __tablename__ = "caracterizacao_escritura"

    # Añado un ID como clave primaria (ya que no se especificó en el SQL original)
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Campos de la tabla original
    marca_temporal = Column(String(50), nullable=True)
    nome = Column(String(50), nullable=True)
    nivel = Column(Integer, nullable=True)
    professor = Column(String(50), nullable=True)
    email = Column(String(50), ForeignKey("users.email"), nullable=True)
    ano_semestre = Column(String(50), nullable=True)
    horario = Column(String(50), nullable=True)
    tipo_redacao = Column(String(50), nullable=True)
    corte = Column(Integer, nullable=True)
    ss = Column(Integer, nullable=True)
    ç = Column(Integer, nullable=True)
    rr = Column(Integer, nullable=True)
    x = Column(Integer, nullable=True)
    s = Column(Integer, nullable=True)
    acento_grave = Column(Integer, nullable=True)
    acento_agudo = Column(Integer, nullable=True)
    acento_circunflexo = Column(Integer, nullable=True)
    til = Column(Integer, nullable=True)
    verbos_regulares = Column(Integer, nullable=True)
    verbos_irregulares = Column(Integer, nullable=True)
    genero = Column(Integer, nullable=True)
    numero = Column(Integer, nullable=True)
    virgula = Column(Integer, nullable=True)
    ponto_seguida = Column(Integer, nullable=True)
    ponto_paragrafo = Column(Integer, nullable=True)
    ponto_virgula = Column(Integer, nullable=True)
    reticencias = Column(Integer, nullable=True)
    ponto_interrogacao = Column(Integer, nullable=True)
    ponto_exclamacao = Column(Integer, nullable=True)
    travessao = Column(Integer, nullable=True)
    aspas = Column(Integer, nullable=True)
    parenteses = Column(Integer, nullable=True)
    usualidade = Column(Integer, nullable=True)
    portunhol = Column(Integer, nullable=True)
    extra_terrestre = Column(Integer, nullable=True)
    repeticoes_inadequadas = Column(Integer, nullable=True)
    ausencia = Column(Integer, nullable=True)
    excesso = Column(Integer, nullable=True)
    ordem = Column(Integer, nullable=True)
    total_errores = Column(Integer, nullable=True)

    # Relación con la tabla users
    user = relationship("User", back_populates="caracterizacoes")


