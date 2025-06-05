from sqlalchemy import func
from fastapi import APIRouter, Depends, Cookie, Response, HTTPException
from sqlalchemy.orm import Session

from sqlalchemy import text
from typing import List
from ...database import get_db
from ... import schemas, crud, models
from fastapi.responses import JSONResponse
import jwt
import time
from ...schemas.schemas import EstudianteNivel
from itsdangerous import URLSafeSerializer, BadSignature

from typing import Optional
from fastapi import BackgroundTasks
from fastapi.responses import JSONResponse
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import List
import base64
from app.models.user import User, Nivel, Grupo  
from app.schemas.schemas import GrupoResponse, GrupoCreate
from app.models.user import Grupo
from sqlalchemy import func
from ...schemas.schemas import UserProf
from typing import Optional

import logging


router = APIRouter()

EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USER = "dani28022016@gmail.com"  # Reemplaza con tu correo
EMAIL_PASSWORD = "iykc sjxm scuo jket"


async def send_password_reset_email(email: str, token: str):
    reset_link = f"http://localhost:5173/reset-password?token={token}"

    message = MIMEMultipart()
    message["From"] = EMAIL_USER
    message["To"] = email
    message["Subject"] = "Recuperación de Contraseña"

    body = f"""
    <html>
    <body>
        <h2>Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace a continuación para continuar:</p>
        <p><a href="{reset_link}">Restablecer mi contraseña</a></p>
        <p>Este enlace expirará en 30 minutos.</p>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
    </body>
    </html>
    """
    message.attach(MIMEText(body, "html"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(message)
        server.quit()
        return True
    except Exception as e:
        print(f"Error al enviar correo: {e}")
        return False


# Almacenamiento temporal de tokens (en producción usar base de datos)
password_reset_tokens = {}


SECRET_KEY = "e8f2a9b1c7d6508a4f3e2d1b7c9a6f0d5e3b2a8c7f6d5e0b9a8c7f6d5e4b3a2c1"
serializer = URLSafeSerializer(SECRET_KEY)


# Función para obtener datos de la sesión
def get_session_data(session: Optional[str] = Cookie(None)):
    if not session:
        return None

    try:
        data = serializer.loads(session)
        return data
    except BadSignature:
        return None

# Modifica la función login para asegurarte de que la cookie se establece correctamente
@router.post("/login/")
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user(db, email=form_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    # En una aplicación real deberías verificar la contraseña con hashing
    if user.hashed_password != form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # Datos que quieres guardar en la sesión
    session_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "estado": user.estado,
        "rol": user.rol
    }

    # Serializar los datos y establecer la cookie
    session_cookie = serializer.dumps(session_data)
    response = JSONResponse(content=session_data)

    # Establecer la cookie de sesión - asegúrate de que estos parámetros son correctos
    response.set_cookie(
        key="session",
        value=session_cookie,
        httponly=True,
        secure=False,  # Si estás en desarrollo local
        samesite="lax",
        max_age=1800  # 30 minutos
    )

    return response


@router.get("/api/metabase-token")
def get_iframe_url(
        email: str = None,
        rol: str = None,
        session_data: Optional[dict] = Depends(get_session_data)
):
    # Intentar obtener datos de la sesión primero
    if not session_data and (not email or not rol):
        raise HTTPException(status_code=400,
                            detail="Se requieren los parámetros 'email' y 'rol' si no hay sesión activa")

    # Usar datos de la sesión si están disponibles, de lo contrario usar parámetros
    user_email = session_data.get("email") if session_data else email
    user_rol = session_data.get("rol") if session_data else rol

    # Definir variables comunes
    METABASE_SITE_URL = "http://localhost:3000"
    METABASE_SECRET_KEY = "d97dd1c77980a6109a01efa565fdeda607a86c26333d03dcae2dcada556af89c"

    # Si el rol es "Estudiante", incluir el email en los parámetros
    if user_rol == "Estudiante":
        payload = {
            "resource": {"dashboard": 34},
            "params": {
                "email": [user_email]
            },
            "exp": round(time.time()) + (60 * 10)  # 10 minute expiration
        }
    else:
        payload = {
            "resource": {"dashboard": 34},
            "params": {},
            "exp": round(time.time()) + (60 * 10)  # 10 minute expiration
        }

    token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
    iframe_url = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true"
    return {"iframeUrl": iframe_url}

@router.post("/recover/")
async def recover_password(
        email_data: schemas.EmailSchema,
        background_tasks: BackgroundTasks,
        db: Session = Depends(get_db)
):
    user = crud.get_user(db, email=email_data.email)
    if not user:
        # Para prevenir enumeración de usuarios, devolvemos siempre el mismo mensaje
        return {
            "message": "Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña."}

    # Generar token único
    token = secrets.token_urlsafe(32)
    expiry = datetime.now() + timedelta(minutes=30)

    # Guardar token (en producción usar base de datos)
    password_reset_tokens[token] = {
        "email": user.email,
        "expiry": expiry
    }

    # Enviar correo en segundo plano
    background_tasks.add_task(send_password_reset_email, user.email, token)

    return {
        "message": "Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña."}


@router.post("/reset-password/")
async def reset_password(
        reset_data: schemas.ResetPasswordSchema,
        db: Session = Depends(get_db)):

    print(f"Recibida solicitud de restablecimiento con token: {reset_data.token}")
    print(f"Tokens disponibles: {list(password_reset_tokens.keys())}")

    token = reset_data.token
    new_password = reset_data.new_password

    # Verificar si el token existe y no ha expirado
    if token not in password_reset_tokens:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")

    token_data = password_reset_tokens[token]
    if datetime.now() > token_data["expiry"]:
        # Eliminar token expirado
        del password_reset_tokens[token]
        raise HTTPException(status_code=400, detail="Token expirado")

    # Obtener el email asociado al token
    email = token_data["email"]

    # Actualizar la contraseña del usuario
    user = crud.get_user(db, email=email)
    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Actualizar contraseña (asumiendo que tienes una función para esto)
    crud.update_user_password(db, user.id, new_password)

    # Eliminar el token usado
    del password_reset_tokens[token]

    return {"message": "Contraseña actualizada correctamente"}

# app/routers/users.py
@router.get("/main/registro_profesor/", response_model=List[schemas.UserProf])
def read_profesores(db: Session = Depends(get_db)):
    try:
        # Ejecutar consulta
        profesores = db.execute(text("""SELECT name, email, estado FROM users WHERE rol = 'Administrador' """))

        # Mapear resultados al esquema UserProf
        results = [
            {
                "namepro": row.name,
                "emailpro": row.email,
                "estado": row.estado
            }
            for row in profesores
        ]

        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/main/registro_profesor/", response_model=schemas.UserProf)
def crear_profesor(profesor_data: UserProf, db: Session = Depends(get_db)):
    try:
        # 1. Crear instancia del modelo User
        nuevo_profesor = User(
            name=profesor_data.namepro,
            email=profesor_data.emailpro,
            estado=profesor_data.estado,
            rol="Profesor" , # Asignar rol automáticamente
            hashed_password = "temp123"
        )

        # 2. Agregar y confirmar en la base de datos
        db.add(nuevo_profesor)
        db.commit()
        db.refresh(nuevo_profesor)

        return UserProf(
            namepro=nuevo_profesor.name,
            emailpro=nuevo_profesor.email,
            estado=nuevo_profesor.estado
        )


    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error al crear profesor: {str(e)}"
        )


@router.get("/main/dashboard", response_model=List[EstudianteNivel])
def read_students_detail(db: Session = Depends(get_db)):
    try:
        # Ejecutar la consulta SQL usando SQLAlchemy
        estudiantes = db.execute(text(""" SELECT u.name AS nombre, u.email AS correo, n.nivel AS nivel, n.grupo AS grupo, c.professor AS profesor, c.ano_semestre AS semestre, c.horario AS hora FROM users u INNER JOIN nivel n ON u.email = n.email INNER JOIN caracterizacao_escritura c ON u.email = c.email WHERE n.nivel = 3 AND n.grupo = 4 """))

        # Convertir los resultados a diccionario
        results = [
            {
                "nombre": row.nombre,
                "correo": row.correo,
                "nivel": row.nivel,
                "grupo": row.grupo,
                "profesor": row.profesor,
                "semestre": row.semestre,
                "hora": row.hora
            }
            for row in estudiantes
        ]

        return results

    except Exception as e:
        print(f"Error en la consulta: {str(e)}")  # Para debug
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recover/")
async def recover_password(
        email_data: schemas.EmailSchema,
        background_tasks: BackgroundTasks,
        db: Session = Depends(get_db)
):
    user = crud.get_user(db, email=email_data.email)
    if not user:
        # Para prevenir enumeración de usuarios, devolvemos siempre el mismo mensaje
        return {
            "message": "Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña."}

    # Generar token único
    token = secrets.token_urlsafe(32)
    expiry = datetime.now() + timedelta(minutes=30)

    # Guardar token (en producción usar base de datos)
    password_reset_tokens[token] = {
        "email": user.email,
        "expiry": expiry
    }

    # Enviar correo en segundo plano
    background_tasks.add_task(send_password_reset_email, user.email, token)

    return {
        "message": "Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña."}


@router.post("/reset-password/")
async def reset_password(
        reset_data: schemas.ResetPasswordSchema,
        db: Session = Depends(get_db)):

    print(f"Recibida solicitud de restablecimiento con token: {reset_data.token}")
    print(f"Tokens disponibles: {list(password_reset_tokens.keys())}")

    token = reset_data.token
    new_password = reset_data.new_password

    # Verificar si el token existe y no ha expirado
    if token not in password_reset_tokens:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")

    token_data = password_reset_tokens[token]
    if datetime.now() > token_data["expiry"]:
        # Eliminar token expirado
        del password_reset_tokens[token]
        raise HTTPException(status_code=400, detail="Token expirado")

    # Obtener el email asociado al token
    email = token_data["email"]

    # Actualizar la contraseña del usuario
    user = crud.get_user(db, email=email)
    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Actualizar contraseña (asumiendo que tienes una función para esto)
    crud.update_user_password(db, user.id, new_password)

    # Eliminar el token usado
    del password_reset_tokens[token]

    return {"message": "Contraseña actualizada correctamente"}

@router.get("/main/grupos/next_num")
def get_next_grupo_num(nivel: int, db: Session = Depends(get_db)):
    max_num = db.query(func.max(Grupo.nGrupo)).filter(Grupo.nivel == nivel).scalar()
    next_num = max_num + 1 if max_num is not None else 1
    return {"nextNum": next_num}


@router.post("/main/grupos/", response_model=GrupoResponse)
def crear_grupo(grupo: GrupoCreate, db: Session = Depends(get_db)):
    nuevo_grupo = Grupo(**grupo.dict())
    db.add(nuevo_grupo)
    db.commit()
    db.refresh(nuevo_grupo)
    return nuevo_grupo