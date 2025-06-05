from passlib.context import CryptContext
from datetime import datetime, timedelta
import random
import string
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# Configuración JWT
SECRET_KEY = "tu_clave_secreta_aqui"  # En producción, usar variable de entorno
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Almacenamiento temporal de códigos OTP (en producción usar base de datos)
otp_store = {}

def generate_otp(length=6):
    """Genera un código OTP numérico"""
    return ''.join(random.choices(string.digits, k=length))

def store_otp(email: str, otp: str):
    """Almacena el código OTP con tiempo de expiración"""
    otp_store[email] = {
        'code': otp,
        'expires_at': datetime.utcnow() + timedelta(minutes=5)  # Expira en 5 minutos
    }

def verify_otp(email: str, otp: str) -> bool:
    """Verifica si el código OTP es válido y no ha expirado"""
    if email not in otp_store:
        return False

    stored_otp = otp_store[email]
    if datetime.utcnow() > stored_otp['expires_at']:
        del otp_store[email]  # Eliminar OTP expirado
        return False

    if stored_otp['code'] != otp:
        return False

    del otp_store[email]  # Eliminar OTP usado
    return True

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Crea un token JWT con los datos proporcionados"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Verifica y decodifica el token JWT para obtener el usuario actual"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email


