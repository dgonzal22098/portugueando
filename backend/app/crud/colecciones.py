from sqlalchemy.orm import Session
from .. import models, schemas
from ..models.user import Coleccion, Contenido

def get_colecciones(db: Session, grupo_id: int = None):
    query = db.query(Coleccion)
    if grupo_id:
        query = query.filter(Coleccion.grupo_id == grupo_id)
    return query.all()

def create_coleccion(db: Session, coleccion: schemas.ColeccionCreate):
    coleccion_dict = coleccion.dict()
    db_coleccion = Coleccion(**coleccion_dict)
    db.add(db_coleccion)
    db.commit()
    db.refresh(db_coleccion)
    return db_coleccion

def get_coleccion_by_id(db: Session, coleccion_id: int):
    return db.query(Coleccion).filter(Coleccion.id == coleccion_id).first()

def create_contenido(db: Session, contenido: schemas.ContenidoCreate):
    db_contenido = Contenido(**contenido.dict())
    db.add(db_contenido)
    db.commit()
    db.refresh(db_contenido)
    return db_contenido

def get_contenidos(db: Session, coleccion_id: int):
    return db.query(Contenido).filter(Contenido.coleccion_id == coleccion_id).all()
