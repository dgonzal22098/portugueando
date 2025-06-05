from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Index, event, ForeignKeyConstraint, DateTime
from ..database import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50, collation='utf8mb4_unicode_ci'), nullable=False, unique=True, index=True)
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

class Contenido(Base):
    __tablename__ = "contenidos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    categorias = Column(String(255))  # Puedes almacenar categorías separadas por comas
    url = Column(String(2000))  # Aumentado de 500 a 2000
    coleccion_id = Column(Integer, ForeignKey("colecciones.id", ondelete="CASCADE"))
    # Relación con la colección
    coleccion = relationship("Coleccion", back_populates="contenidos")

class Grupo(Base):
    __tablename__ = "grupo"

    id_grupo = Column(Integer, primary_key=True, index=True)  # Clave primaria
    email = Column(String(50, collation='utf8mb4_unicode_ci'), ForeignKey("users.email", ondelete="CASCADE", onupdate="CASCADE"), nullable=True)
    nGrupo = Column(Integer, nullable=False)  # Número del grupo
    hora = Column(String(10), nullable=True)  # Formato HH:MM o usar Time si prefieres
    fecha = Column(DateTime, nullable=True)  # Fecha completa con hora, o usar Date para solo fecha
    nivel = Column(Integer, nullable=False)
    lider = Column(Boolean, default=False)
    estado = Column(Boolean, default=1)  # 1=activo, 0=inactivo, etc.

    # Relación con el usuario
    usuario = relationship("User", foreign_keys=[email], backref="grupos")

class CaracterizacionEscritura(Base):
    __tablename__ = "caracterizacion_escritura"

    id = Column(Integer, primary_key=True, autoincrement=True)
    marca_temporal = Column("Marca temporal", String(50), nullable=True)
    nome = Column(String(50), nullable=False)
    nivel = Column("Nível", Integer, nullable=True)
    professor = Column("Professor(a)", String(50), nullable=False)
    email = Column(String(50, collation='utf8mb4_unicode_ci'), nullable=False)
    __table_args__ = (
        ForeignKeyConstraint(
            ['email'], ['users.email'],
            name='fk_caracterizacion_user_email',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ),
        Index('ix_caracterizacion_escritura_email', 'email')
    )
    ano_semestre = Column(String(50), nullable=False)
    horario = Column("Horário", String(50), nullable=False)
    tipo_redacao = Column("Tipo de Redação", String(50), nullable=False)
    corte = Column(Integer, nullable=False)
    ss = Column(Integer, nullable=False)
    c_cedilha = Column("ç", Integer, nullable=False)
    rr = Column(Integer, nullable=False)
    x = Column(Integer, nullable=False)
    s = Column(Integer, nullable=False)
    acento_grave = Column(Integer, nullable=False)
    acento_agudo = Column(Integer, nullable=False)
    acento_circunflexo = Column(Integer, nullable=False)
    til = Column(Integer, nullable=False)
    verbos_regulares = Column(Integer, nullable=False)
    verbos_irregulares = Column(Integer, nullable=False)
    genero = Column(Integer, nullable=False)
    numero = Column(Integer, nullable=False)
    virgula = Column(Integer, nullable=False)
    ponto_seguida = Column(Integer, nullable=False)
    ponto_paragrafo = Column(Integer, nullable=False)
    ponto_virgula = Column(Integer, nullable=False)
    reticencias = Column(Integer, nullable=False)
    ponto_interrogacao = Column(Integer, nullable=False)
    ponto_exclamacao = Column(Integer, nullable=False)
    travessao = Column(Integer, nullable=False)
    aspas = Column(Integer, nullable=False)
    parenteses = Column(Integer, nullable=False)
    usualidade = Column(Integer, nullable=False)
    portunhol = Column(Integer, nullable=False)
    extra_terrestre = Column(Integer, nullable=False)
    repeticoes_inadequadas = Column(Integer, nullable=False)
    ausencia = Column(Integer, nullable=False)
    excesso = Column(Integer, nullable=False)
    ordem = Column(Integer, nullable=False)
    total_errores = Column(Integer, nullable=False)

    # Relación con el usuario usando ForeignKeyConstraint explícito


    # Relación con el usuario
    usuario = relationship("User", backref="caracterizaciones")

@event.listens_for(CaracterizacionEscritura, 'before_insert')
def calculate_total_errores(mapper, connection, target):
    """Calcula el total de errores antes de insertar un nuevo registro"""
    target.total_errores = sum([
        target.ss or 0,
        target.c_cedilha or 0,
        target.rr or 0,
        target.x or 0,
        target.s or 0,
        target.acento_grave or 0,
        target.acento_agudo or 0,
        target.acento_circunflexo or 0,
        target.til or 0,
        target.verbos_regulares or 0,
        target.verbos_irregulares or 0,
        target.genero or 0,
        target.numero or 0,
        target.virgula or 0,
        target.ponto_seguida or 0,
        target.ponto_paragrafo or 0,
        target.ponto_virgula or 0,
        target.reticencias or 0,
        target.ponto_interrogacao or 0,
        target.ponto_exclamacao or 0,
        target.travessao or 0,
        target.aspas or 0,
        target.parenteses or 0,
        target.usualidade or 0,
        target.portunhol or 0,
        target.extra_terrestre or 0,
        target.repeticoes_inadequadas or 0,
        target.ausencia or 0,
        target.excesso or 0,
        target.ordem or 0
    ])
