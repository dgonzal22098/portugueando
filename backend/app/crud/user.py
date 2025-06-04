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
    # En una app real, hash la contraseña
    hashed_password = user.password
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_password(db: Session, user_id: int, new_password: str):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        # En una aplicación real, deberías hashear la contraseña
        user.hashed_password = new_password
        db.commit()
        return user
    return None

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
