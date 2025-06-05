from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .api.routes import users
from app.models.user import Grupo


# Crear tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="Backend API")

# Configuración de CORS
origins = [
    "http://localhost:5173",  # Frontend Vite
    "http://localhost:3000",  # Otros puertos si son necesarios
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Importante para las cookies
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Permitir exponer headers al frontend
)

# Incluir rutas
app.include_router(users.router)

# Ruta raíz para verificación
@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
