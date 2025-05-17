from sqlalchemy.orm import Session
from .. import models, schemas
from passlib.context import CryptContext

# Para encriptar contraseñas en una aplicación real
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_users_by_rol(db: Session, rol: str, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.rol == rol).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # Hash de la contraseña para seguridad
    hashed_password = pwd_context.hash(user.password)

    db_user = models.User(
        id=user.id,
        name=user.name,
        email=user.email,
        dob=user.dob,
        rol=user.rol,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: str, user_update: schemas.UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    update_data = user_update.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["hashed_password"] = pwd_context.hash(update_data.pop("password"))

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: str):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    db.delete(db_user)
    db.commit()
    return db_user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, email: str, password: str):
    user = get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
