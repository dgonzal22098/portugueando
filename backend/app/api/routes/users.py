import logging

from fastapi import APIRouter, Depends, Cookie, Response, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text

import io
from pydantic import BaseModel


from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import Depends
from ...database import get_db
from ... import models, schemas
import logging


from fastapi.responses import StreamingResponse
from io import BytesIO

import pandas as pd

from ... import schemas

from ...crud import colecciones as crud_colecciones
from ...models.user import Coleccion, Contenido
from ...schemas.schemas import ColeccionCreate, ColeccionResponse, ContenidoCreate, ContenidoResponse

from ...models import user as models

import jwt
import time

from ...schemas.schemas import EstudianteNivel

from itsdangerous import URLSafeSerializer, BadSignature


from fastapi.responses import JSONResponse
import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from ...core.security import create_access_token, get_current_user, generate_otp, store_otp, verify_otp
from ...schemas import schemas
from ...crud import user as crud_user
from sqlalchemy.orm import Session
from ...database import get_db
from datetime import timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import socket


from typing import Optional



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
    print(f"Intentando login con email: {form_data.email}")
    user = crud_user.get_user(db, email=form_data.email)

    if not user:
        print(f"Usuario no encontrado con email: {form_data.email}")
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    print(f"Usuario encontrado: {user.name}, password enviada: {form_data.password}, password guardada: {user.hashed_password}")

    if user.hashed_password != form_data.password:
        print(f"Contraseña incorrecta para usuario: {user.email}")
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # Generar token de sesión
    session_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "estado": user.estado,
        "rol": user.rol,
        "exp": datetime.utcnow() + timedelta(days=1)  # Token expira en 1 día
    }

    session_token = serializer.dumps(session_data)
    response = JSONResponse(content=session_data)

    # Configurar cookie de sesión
    response.set_cookie(
        key="session",
        value=session_token,
        httponly=True,
        secure=False,  # Cambiar a True en producción con HTTPS
        samesite="lax",
        max_age=86400  # 24 horas en segundos
    )

    return response

@router.get("/verificar-sesion/")
def verificar_sesion(session_data: dict = Depends(get_session_data)):
    if not session_data:
        raise HTTPException(status_code=401, detail="Sesión no válida")
    return session_data

@router.get("/metabase-token")
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
    user = crud_user.get_user(db, email=email_data.email)
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
    user = crud_user.get_user(db, email=email)
    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Actualizar contraseña (asumiendo que tienes una función para esto)
    crud_user.update_user_password(db, user.id, new_password)

    # Eliminar el token usado
    del password_reset_tokens[token]

    return {"message": "Contraseña actualizada correctamente"}

# app/routers/users.py
@router.get("/main/registro_profesor/")
def read_profesores(db: Session = Depends(get_db)):
    logger.info("Recibida petición GET para listar profesores")
    try:
        # Consultando específicamente usuarios con rol "Profesor"
        profesores = db.query(models.User).filter(
            models.User.rol == "Profesor"
        ).all()

        logger.info(f"Encontrados {len(profesores)} profesores")

        # Asegurarse de que todos los campos necesarios estén incluidos
        resultado = []
        for profesor in profesores:
            profesor_dict = {
                "id": profesor.id,
                "name": profesor.name,
                "email": profesor.email,
                "estado": profesor.estado,
                "rol": "Profesor",  # Asegurarse de que el rol sea "Profesor"
            }
            resultado.append(profesor_dict)
            logger.info(f"Profesor procesado: {profesor_dict}")

        return resultado

    except Exception as e:
        logger.error(f"Error al obtener profesores: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener profesores: {str(e)}"
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
    user = crud_user.get_user(db, email=email_data.email)
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
    user = crud_user.get_user(db, email=email)
    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Actualizar contraseña (asumiendo que tienes una función para esto)
    crud_user.update_user_password(db, user.id, new_password)

    # Eliminar el token usado
    del password_reset_tokens[token]

    return {"message": "Contraseña actualizada correctamente"}

@router.get("/main/material_apoyo/", response_model=List[schemas.ColeccionResponse])
def read_colecciones(grupo_id: Optional[int] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Coleccion)
        if (grupo_id):
            logger.info(f"Filtrando por grupo_id: {grupo_id}")
            query = query.filter(Coleccion.grupo_id == grupo_id)
        logger.info("Ejecutando consulta...")
        colecciones = query.all()
        logger.info(f"Encontradas {len(colecciones)} colecciones")

        # Convertir a diccionario antes de retornar para validar la estructura
        result = []
        for col in colecciones:
            result.append({
                "id": col.id,
                "nombre": col.nombre,
                "categoria": col.categoria,
                "grupo_id": col.grupo_id,
                "contenidos": [] if not hasattr(col, 'contenidos') else [
                    {
                        "id": c.id,
                        "nombre": c.nombre,
                        "categorias": c.categorias,
                        "url": c.url,
                        "coleccion_id": c.coleccion_id
                    } for c in col.contenidos
                ]
            })
        return result
    except Exception as e:
        logger.error(f"Error al obtener colecciones: {str(e)}")
        logger.exception("Detalles completos del error:")
        raise HTTPException(status_code=500, detail=f"Error al obtener colecciones: {str(e)}")

@router.post("/main/material_apoyo/", response_model=ColeccionResponse)
def crear_coleccion(coleccion: ColeccionCreate, db: Session = Depends(get_db)):
    try:
        db_coleccion = crud_colecciones.create_coleccion(db, coleccion)
        return db_coleccion
    except Exception as e:
        print("Error al crear colección:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/main/material_apoyo/{coleccion_id}", response_model=ColeccionResponse)
def obtener_coleccion(coleccion_id: int, db: Session = Depends(get_db)):
    coleccion = crud_colecciones.get_coleccion_by_id(db, coleccion_id)
    if coleccion is None:
        raise HTTPException(status_code=404, detail="Colección no encontrada")
    return coleccion

@router.post("/main/material_apoyo/{coleccion_id}/contenidos/", response_model=ContenidoResponse)
def crear_contenido(coleccion_id: int, contenido: ContenidoCreate, db: Session = Depends(get_db)):
    # Verificar que existe la colección
    coleccion = crud_colecciones.get_coleccion_by_id(db, coleccion_id)
    if not coleccion:
        raise HTTPException(status_code=404, detail="Colección no encontrada")

    contenido_data = contenido.dict()
    contenido_data['coleccion_id'] = coleccion_id
    db_contenido = crud_colecciones.create_contenido(db, schemas.ContenidoCreate(**contenido_data))
    return db_contenido

@router.get("/main/material_apoyo/{coleccion_id}/contenidos/", response_model=List[ContenidoResponse])
def obtener_contenidos(coleccion_id: int, db: Session = Depends(get_db)):
    # Verificar que existe la colección
    coleccion = crud_colecciones.get_coleccion_by_id(db, coleccion_id)
    if not coleccion:
        raise HTTPException(status_code=404, detail="Colección no encontrada")

    return crud_colecciones.get_contenidos(db, coleccion_id)

@router.get("/main/material_apoyo/{coleccion_id}/contenidos/{contenido_id}", response_model=ContenidoResponse)
def obtener_contenido(coleccion_id: int, contenido_id: int, db: Session = Depends(get_db)):
    # Verificar que existe la colección
    coleccion = crud_colecciones.get_coleccion_by_id(db, coleccion_id)
    if not coleccion:
        raise HTTPException(status_code=404, detail="Colección no encontrada")

    contenido = db.query(Contenido).filter(
        Contenido.id == contenido_id,
        Contenido.coleccion_id == coleccion_id
    ).first()
    if contenido is None:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    return contenido

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def send_otp_email(email: str, otp: str, max_retries=3):
    logger.info(f"Intentando enviar OTP a {email}")
    message = MIMEMultipart()
    message["From"] = EMAIL_USER
    message["To"] = email
    message["Subject"] = "Código de verificación - Portugueando"

    body = f"""
    <html>
    <body>
        <h2>Código de verificación para Portugueando</h2>
        <p>Tu código de verificación es:</p>
        <h1 style="color: #3BAC52; font-size: 32px;">{otp}</h1>
        <p>Este código expirará en 5 minutos.</p>
        <p>Si no solicitaste este código, ignora este correo.</p>
    </body>
    </html>
    """
    message.attach(MIMEText(body, "html"))

    for attempt in range(max_retries):
        try:
            server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30)
            server.set_debuglevel(1)
            logger.info("Conectado al servidor SMTP")

            server.starttls()
            logger.info("TLS iniciado")

            server.login(EMAIL_USER, EMAIL_PASSWORD)
            logger.info("Login exitoso")

            server.send_message(message)
            logger.info(f"Correo enviado exitosamente a {email}")

            server.quit()
            return True, "Correo enviado exitosamente"

        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"Error de autenticación SMTP: {e}")
            return False, "Error de autenticación con el servidor de correo"
        except smtplib.SMTPException as e:
            logger.error(f"Error SMTP en intento {attempt + 1}: {e}")
            if attempt == max_retries - 1:
                return False, f"Error SMTP: {str(e)}"
        except Exception as e:
            logger.error(f"Error inesperado en intento {attempt + 1}: {e}")
            if attempt == max_retries - 1:
                return False, f"Error inesperado: {str(e)}"

    return False, "No se pudo enviar el correo después de varios intentos"

@router.post("/request-otp/")
async def request_otp(email: schemas.EmailSchema, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        logger.info(f"Solicitud de OTP recibida para: {email.email}")

        if not email.email.endswith('@universidadean.edu.co'):
            raise HTTPException(
                status_code=400,
                detail="Solo se permiten correos institucionales de la Universidad EAN"
            )

        # Generar código OTP
        otp = generate_otp()
        logger.info(f"OTP generado para {email.email}")

        # Intentar enviar el correo
        success, error_message = await send_otp_email(email.email, otp)

        if not success:
            logger.error(f"Error al enviar OTP a {email.email}: {error_message}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"No se pudo enviar el código de verificación: {error_message}"
            )

        # Almacenar el OTP solo si el correo se envió exitosamente
        store_otp(email.email, otp)
        logger.info(f"OTP almacenado exitosamente para {email.email}")

        return {"message": "Código de verificación enviado al correo"}

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error inesperado en request_otp: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno del servidor: {str(e)}"
        )

@router.post("/verify-otp/")
async def verify_otp_login(verification_data: schemas.OTPVerification, db: Session = Depends(get_db)):
    if not verify_otp(verification_data.email, verification_data.code):
        raise HTTPException(
            status_code=400,
            detail="Código inválido o expirado"
        )

    # Buscar usuario existente o crear uno nuevo
    user = crud_user.get_user(db, email=verification_data.email)
    if not user:
        # Crear nuevo usuario si no existe
        user_create = schemas.UserCreate(
            email=verification_data.email,
            name=verification_data.email.split('@')[0],
            rol="Estudiante"  # Rol por defecto
        )
        user = crud_user.create_user(db, user_create)

    # Crear token de acceso
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(days=1)
    )

    # Crear datos de sesión
    expiry_time = datetime.utcnow() + timedelta(days=1)
    session_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "rol": user.rol,
        "exp": expiry_time.isoformat()
    }

    # Serializar datos de sesión para la cookie
    session_token = serializer.dumps(session_data)

    # Crear respuesta con los datos del usuario
    response_data = {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "rol": user.rol
        }
    }

    response = JSONResponse(content=response_data)
    response.set_cookie(
        key="session",
        value=session_token,
        httponly=True,
        secure=False,  # Cambiar a True en producción con HTTPS
        samesite="lax",
        max_age=86400
    )

    return response

@router.post("/main/registro_profesor/")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    try:
        new_user = crud_user.create_user(db, user)
        return {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name,
            "rol": new_user.rol,
            "estado": new_user.estado
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/main/profesor/estado/{profesor_id}")
def update_profesor_estado(
    profesor_id: int,
    estado_data: dict,
    db: Session = Depends(get_db)
):
    try:
        # Obtener el profesor
        profesor = db.query(models.User).filter(
            models.User.id == profesor_id,
            models.User.rol == "Profesor"
        ).first()

        if not profesor:
            raise HTTPException(status_code=404, detail="Profesor no encontrado")

        # Actualizar el estado
        profesor.estado = estado_data.get("estado", 0)
        db.commit()

        return {
            "message": "Estado actualizado correctamente",
            "profesor": {
                "id": profesor.id,
                "name": profesor.name,
                "email": profesor.email,
                "estado": profesor.estado
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/main/grupos/{nivel}")
def get_grupos_by_nivel(nivel: int, db: Session = Depends(get_db)):
    try:
        logger.info(f"Obteniendo grupos para el nivel {nivel}")

        # Construir y ejecutar la consulta para grupos donde el profesor es líder
        query = db.query(models.Grupo).filter(
            models.Grupo.nivel == nivel,
            models.Grupo.lider == True
        )

        logger.info(f"Query SQL real: {str(query.statement)}")

        grupos = query.all()
        logger.info(f"Número de grupos encontrados: {len(grupos)}")

        if not grupos:
            # Intentar una consulta directa para verificar la tabla
            result = db.execute(text("SELECT COUNT(*) as count FROM grupo WHERE lider = TRUE AND nivel = :nivel"),
                              {"nivel": nivel}).scalar()
            logger.info(f"Total de grupos con nivel {nivel} y líder: {result}")

            return {
                "grupos": [],
                "resumen": {
                    "nivel": nivel,
                    "total_grupos": 0,
                    "grupos_activos": 0,
                    "grupos_inactivos": 0
                }
            }

        # Convertir los grupos a diccionarios
        grupos_data = []
        for grupo in grupos:
            grupo_dict = {
                "id_grupo": grupo.id_grupo,
                "email": grupo.email,
                "nGrupo": grupo.nGrupo,
                "hora": grupo.hora,
                "fecha": str(grupo.fecha) if grupo.fecha else None,
                "nivel": grupo.nivel,
                "estado": grupo.estado
            }
            grupos_data.append(grupo_dict)
            logger.info(f"Grupo procesado: {grupo_dict}")

        # Contar grupos activos e inactivos
        grupos_activos = len([g for g in grupos if g.estado])
        grupos_inactivos = len([g for g in grupos if not g.estado])

        resultado = {
            "grupos": grupos_data,
            "resumen": {
                "nivel": nivel,
                "total_grupos": len(grupos),
                "grupos_activos": grupos_activos,
                "grupos_inactivos": grupos_inactivos
            }
        }

        logger.info(f"Resultado final: {resultado}")
        return resultado

    except Exception as e:
        logger.error(f"Error al obtener grupos del nivel {nivel}: {str(e)}")
        logger.exception("Detalles completos del error:")
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener grupos: {str(e)}"
        )

@router.get("/main/grupos_historicos")
def get_grupos_historicos(db: Session = Depends(get_db), semestre_actual: str = None):
    try:
        logger.info("Obteniendo grupos históricos")

        # Obtener la fecha actual
        fecha_actual = datetime.now()

        # Construir la consulta base
        query = db.query(models.Grupo)

        # Si se proporciona un semestre_actual, filtrar por semestre
        if semestre_actual:
            query = query.filter(models.Grupo.semestre != semestre_actual)
        else:
            # Si no hay semestre especificado, usar la fecha como criterio
            query = query.filter(models.Grupo.fecha < fecha_actual)

        # Ejecutar la consulta
        grupos = query.all()

        # Convertir los grupos a diccionarios
        grupos_data = [
            {
                "id_grupo": grupo.id_grupo,
                "email": grupo.email,
                "nGrupo": grupo.nGrupo,
                "hora": grupo.hora,
                "fecha": str(grupo.fecha) if grupo.fecha else None,
                "nivel": grupo.nivel,
                "estado": grupo.estado
            } for grupo in grupos
        ]

        logger.info(f"Grupos históricos encontrados: {len(grupos_data)}")
        return grupos_data

    except Exception as e:
        logger.error(f"Error al obtener grupos históricos: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener grupos históricos: {str(e)}"
        )

@router.get("/grupos/{grupo_id}/estudiantes", response_model=List[schemas.UserBase])
def get_estudiantes_grupo(grupo_id: int, db: Session = Depends(get_db)):
    """Obtiene los estudiantes asignados a un grupo específico (histórico)"""
    # Consulta SQL para obtener estudiantes del grupo
    query = text("""
        SELECT DISTINCT u.* 
        FROM users u
        JOIN estudiante_grupo eg ON u.email = eg.email_estudiante
        WHERE eg.id_grupo = :grupo_id
    """)

    result = db.execute(query, {"grupo_id": grupo_id})
    estudiantes = [dict(row) for row in result]

    if not estudiantes:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron estudiantes para este grupo"
        )

    return estudiantes

@router.get("/main/grupos/{grupo_id}/estudiantes/excel")
def download_estudiantes_excel(grupo_id: int, db: Session = Depends(get_db)):
    """Descarga la lista de estudiantes de un grupo en formato Excel"""

    try:
        # Consulta SQL para obtener estudiantes del grupo
        query = text("""
            SELECT DISTINCT u.name as nombre, u.email as correo
            FROM users u
            JOIN estudiante_grupo eg ON u.email = eg.email_estudiante
            WHERE eg.id_grupo = :grupo_id
        """)

        result = db.execute(query, {"grupo_id": grupo_id})
        estudiantes = [dict(row) for row in result]

        if not estudiantes:
            raise HTTPException(
                status_code=404,
                detail="No se encontraron estudiantes para este grupo"
            )

        # Crear DataFrame y exportar a Excel
        df = pd.DataFrame(estudiantes)
        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name='Estudiantes', index=False)

        output.seek(0)

        headers = {
            'Content-Disposition': f'attachment; filename=estudiantes_grupo_{grupo_id}.xlsx'
        }

        return StreamingResponse(
            output,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers=headers
        )

    except Exception as e:
        logger.error(f"Error al generar Excel para grupo {grupo_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/main/grupos/")
def create_grupo(grupo: schemas.GrupoCreate, db: Session = Depends(get_db)):
    """Crear un nuevo grupo"""
    try:
        logger.info("Creando nuevo grupo")

        # Crear el grupo usando SQLAlchemy
        nuevo_grupo = models.Grupo(
            nGrupo=grupo.nGrupo,
            email=grupo.email,
            hora=grupo.hora,
            fecha=grupo.fecha,
            nivel=grupo.nivel,
            lider=grupo.lider,
            estado=grupo.estado
        )

        db.add(nuevo_grupo)
        db.commit()
        db.refresh(nuevo_grupo)

        logger.info(f"Grupo creado exitosamente: {nuevo_grupo.id_grupo}")

        return {
            "id_grupo": nuevo_grupo.id_grupo,
            "nGrupo": nuevo_grupo.nGrupo,
            "email": nuevo_grupo.email,
            "hora": nuevo_grupo.hora,
            "fecha": nuevo_grupo.fecha,
            "nivel": nuevo_grupo.nivel,
            "estado": nuevo_grupo.estado
        }

    except Exception as e:
        db.rollback()
        logger.error(f"Error al crear grupo: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al crear grupo: {str(e)}"
        )

@router.get("/api/grupos/nivel/{nivel}")
def get_grupos_by_nivel_alias(nivel: int, db: Session = Depends(get_db)):
    """Alias de la ruta /main/grupos/{nivel} para mantener compatibilidad con el frontend"""
    return get_grupos_by_nivel(nivel, db)

@router.post("/api/upload-students")
async def upload_students(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint para cargar una lista de estudiantes desde un archivo CSV directamente a la tabla users.
    El archivo debe estar separado por punto y coma (;) y contener las columnas:
    - nombre
    - email
    """
    try:
        logger.info("Procesando archivo de estudiantes")

        # Leer el contenido del archivo
        content = await file.read()
        content = content.decode('utf-8')

        # Procesar el CSV
        import csv
        from io import StringIO

        csvfile = StringIO(content)
        reader = csv.DictReader(csvfile, delimiter=';')

        estudiantes_procesados = []
        errores = []

        for row in reader:
            try:
                email = row['email'].strip().lower()
                nombre = row['nombre'].strip()

                # Validar el email
                if not email.endswith('@universidadean.edu.co'):
                    errores.append(f"Email inválido: {email}")
                    continue

                # Verificar si el usuario ya existe
                estudiante_existente = db.query(models.User).filter(models.User.email == email).first()

                if not estudiante_existente:
                    # Crear nuevo usuario
                    nuevo_estudiante = models.User(
                        email=email,
                        name=nombre,
                        rol="Estudiante",
                        estado=1
                    )

                    db.add(nuevo_estudiante)
                    estudiantes_procesados.append({
                        "email": email,
                        "nombre": nombre,
                        "estado": "Creado exitosamente"
                    })
                    logger.info(f"Nuevo estudiante creado: {email}")
                else:
                    estudiantes_procesados.append({
                        "email": email,
                        "nombre": nombre,
                        "estado": "Email ya registrado"
                    })
                    logger.info(f"Email ya registrado: {email}")

            except KeyError as e:
                errores.append(f"Error en el formato del CSV. Falta la columna: {str(e)}")
                logger.error(f"Error en el formato del CSV: {str(e)}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Error en el formato del CSV. Falta la columna: {str(e)}"
                )
            except Exception as e:
                errores.append(f"Error procesando estudiante {email}: {str(e)}")
                logger.error(f"Error procesando estudiante: {str(e)}")

        # Commit los cambios si todo está bien
        db.commit()
        logger.info(f"Proceso completado. {len(estudiantes_procesados)} estudiantes procesados.")

        return {
            "message": "Archivo procesado correctamente",
            "estudiantes": estudiantes_procesados,
            "total_procesados": len(estudiantes_procesados),
            "errores": errores
        }

    except Exception as e:
        db.rollback()
        logger.error(f"Error al procesar archivo: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el archivo: {str(e)}"
        )

@router.post("/main/dashboard")
async def create_caracterizacion(
    caracterizacion: dict,
    db: Session = Depends(get_db)
):
    """Crear una nueva caracterización de escritura"""
    try:
        logger.info("Creando nueva caracterización de escritura")

        # Crear la caracterización usando SQLAlchemy
        nueva_caracterizacion = models.CaracterizacionEscritura(
            marca_temporal=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            nome=caracterizacion["nome"],
            nivel=caracterizacion["nivel"],
            professor=caracterizacion["profe"],
            email=caracterizacion["email"],
            ano_semestre=caracterizacion["semestre"],
            horario=caracterizacion["horario"],
            tipo_redacao=caracterizacion["redacao"],
            corte=caracterizacion["corte"],
            ss=caracterizacion["ss"],
            c_cedilha=caracterizacion["c"],
            rr=caracterizacion["rr"],
            x=caracterizacion["x"],
            s=caracterizacion["s"],
            acento_grave=caracterizacion["agrave"],
            acento_agudo=caracterizacion["aagudo"],
            acento_circunflexo=caracterizacion["acircunflexo"],
            til=caracterizacion["till"],
            verbos_regulares=caracterizacion["vregulares"],
            verbos_irregulares=caracterizacion["virregulares"],
            genero=caracterizacion["genero"],
            numero=caracterizacion["numero"],
            virgula=caracterizacion["virgula"],
            ponto_seguida=caracterizacion["pcontinuo"],
            ponto_paragrafo=caracterizacion["pparagrafo"],
            ponto_virgula=caracterizacion["pvergula"],
            reticencias=caracterizacion["reticencias"],
            ponto_interrogacao=caracterizacion["pinterrogacao"],
            ponto_exclamacao=caracterizacion["pexclamacao"],
            travessao=caracterizacion["travessao"],
            aspas=caracterizacion["aspas"],
            parenteses=caracterizacion["parenteses"],
            usualidade=caracterizacion["usualidade"],
            portunhol=caracterizacion["portunhol"],
            extra_terrestre=caracterizacion["extraterrestres"],
            repeticoes_inadequadas=caracterizacion["rinadecuadas"],
            ausencia=caracterizacion["ausenciaa"],
            excesso=caracterizacion["excesso"],
            ordem=caracterizacion["order"]
        )

        db.add(nueva_caracterizacion)
        db.commit()
        db.refresh(nueva_caracterizacion)

        return {
            "message": "Caracterización creada exitosamente",
            "caracterizacion": nueva_caracterizacion
        }

    except Exception as e:
        db.rollback()
        logger.error(f"Error al crear caracterización: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al crear caracterización: {str(e)}"
        )
