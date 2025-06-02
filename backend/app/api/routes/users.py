from fastapi import Cookie, Response
from sqlalchemy.orm import Session

from ...database import get_db
from ... import schemas, crud, models

import jwt
import time

from itsdangerous import URLSafeSerializer, BadSignature

from fastapi import BackgroundTasks
from fastapi.responses import JSONResponse
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import base64


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
