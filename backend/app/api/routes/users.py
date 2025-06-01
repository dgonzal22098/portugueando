from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...database import get_db
from ... import schemas, crud, models
import jwt
import time

router = APIRouter()

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_email = db.query(models.User).filter(models.User.email == user.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    return crud.create_user(db=db, user=user)


@router.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/login/")
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user(db, email=form_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    # En una aplicación real deberías verificar la contraseña con hashing
    if user.hashed_password != form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    # Simplificado para demostración - sin tokens JWT aún
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "estado": user.estado,
        "rol": user.rol
    }


@router.get("/api/metabase-token")
def get_iframe_url():
    METABASE_SITE_URL = "http://localhost:3000"
    METABASE_SECRET_KEY = "d97dd1c77980a6109a01efa565fdeda607a86c26333d03dcae2dcada556af89c"
    payload = {
        "resource": {"dashboard": 34},
        "params": {

        },
        "exp": round(time.time()) + (60 * 10)  # 10 minute expiration
    }
    token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
    iframe_url = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true"
    return {"iframeUrl": iframe_url}

# app/routers/users.py
@router.get("/main/registro_profesor/", response_model=List[dict])
def read_profesores(db: Session = Depends(get_db)):
    try:
        profesores = db.query(models.User).filter(
            models.User.rol == "Profesor"
        ).all()

        return [
            {
                "namepro": profesor.name,
                "emailpro": profesor.email,
                "estado": profesor.estado
            }
            for profesor in profesores
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/main/dashboard/{nivel_id}/{grupo_id}", response_model=List[dict])
def read_students(nivel_id: int, grupo_id: int, db: Session = Depends(get_db)):
    try:
        print(f"Buscando nivel {nivel_id} grupo {grupo_id}")
        nivel1 = db.query(models.Nivel).filter(
            models.Nivel.nivel == nivel_id,
            models.Nivel.grupo == grupo_id
        ).all()
        print(f"Resultados encontrados: {len(nivel1)}")

        return [
            {
                "id": n.id,
                "nombre": n.nombre,
                "email": n.email,
                "nivel": n.nivel
            }
            for n in nivel1
        ]

    except Exception as e:
        print(f"Error en la consulta: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))