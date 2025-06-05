from sqlalchemy.orm import Session
from .. import models, schemas

def get_user(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_rol(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()



def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()



def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        rol=user.rol,  # Usa el rol proporcionado por la API
        estado=user.estado if hasattr(user, 'estado') else 1  # Estado activo por defecto
    )
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise e

def create_coleccion(db: Session, coleccion: schemas.ColeccionCreate):
    # Solución temporal: crear un diccionario con solo los campos que existen en la base de datos
    coleccion_dict = {
        "nombre": coleccion.nombre,
        "categoria": coleccion.categoria
    }
    # Usar el diccionario para crear la instancia de Coleccion
    db_coleccion = models.Coleccion(**coleccion_dict)
    db.add(db_coleccion)
    db.commit()
    db.refresh(db_coleccion)
    return db_coleccion

def get_colecciones(db: Session):
    return db.query(models.Coleccion).all()
