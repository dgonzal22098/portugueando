<<<<<<< HEAD
from sqlalchemy import func
=======
import logging

>>>>>>> 87dceb61ae0e8e71a1a1a489ee1205538bcb4ef4
from fastapi import APIRouter, Depends, Cookie, Response, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from ... import schemas

from ...crud import colecciones as crud_colecciones
from ...models.user import Coleccion, Contenido
from ...schemas.schemas import ColeccionCreate, ColeccionResponse, ContenidoCreate, ContenidoResponse


import jwt
import time


from ...schemas.schemas import EstudianteNivel

from itsdangerous import URLSafeSerializer, BadSignature


from fastapi.responses import JSONResponse
import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import base64
from app.models.user import User, Nivel, Grupo  
from app.schemas.schemas import GrupoResponse, GrupoCreate
from app.models.user import Grupo
from sqlalchemy import func
from ...schemas.schemas import UserProf

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

<<<<<<< HEAD
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
=======
@router.get("/main/material_apoyo/", response_model=List[schemas.ColeccionResponse])
def read_colecciones(grupo_id: Optional[int] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Coleccion)
        if (grupo_id):
            query = query.filter(Coleccion.grupo_id == grupo_id)
        colecciones = query.all()
        return colecciones
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

async def send_otp_email(email: str, otp: str):
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

    try:
        # Verificar conectividad DNS
        try:
            socket.gethostbyname(EMAIL_HOST)
        except socket.gaierror as e:
            logger.error(f"Error de resolución DNS para {EMAIL_HOST}: {e}")
            return False, f"Error de DNS: No se puede resolver {EMAIL_HOST}"

        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.set_debuglevel(1)  # Habilitar debugging
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
        logger.error(f"Error SMTP: {e}")
        return False, f"Error SMTP: {str(e)}"
    except Exception as e:
        logger.error(f"Error inesperado al enviar correo: {e}")
        return False, f"Error inesperado: {str(e)}"

@router.post("/request-otp/")
async def request_otp(email: schemas.EmailSchema, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    if not email.email.endswith('@universidadean.edu.co'):
        raise HTTPException(
            status_code=400,
            detail="Solo se permiten correos institucionales de la Universidad EAN"
        )

    # Generar código OTP
    otp = generate_otp()

    # Intentar enviar el correo
    success, error_message = await send_otp_email(email.email, otp)

    if not success:
        logger.error(f"Error al enviar OTP a {email.email}: {error_message}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo enviar el código de verificación: {error_message}"
        )

    # Solo almacenar el OTP si el correo se envió exitosamente
    store_otp(email.email, otp)
    logger.info(f"OTP almacenado exitosamente para {email.email}")

    return {"message": "Código de verificación enviado al correo"}

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
            name=verification_data.email.split('@')[0],  # Usar parte del email como nombre
            password="",  # No se necesita contraseña con OTP
            rol="Estudiante"  # Rol por defecto
        )
        user = crud_user.create_user(db, user_create)

    # Crear token de acceso
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(days=1)
    )

    # Crear datos de sesión (convertir datetime a string ISO)
    expiry_time = datetime.utcnow() + timedelta(days=1)
    session_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "rol": user.rol,
        "exp": expiry_time.isoformat()  # Convertir a string ISO
    }

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

    # Serializar datos de sesión para la cookie
    session_token = serializer.dumps(session_data)

    # Crear respuesta
    response = JSONResponse(content=response_data)

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
>>>>>>> 87dceb61ae0e8e71a1a1a489ee1205538bcb4ef4
