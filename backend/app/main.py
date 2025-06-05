from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .api.routes import users

# Crear tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="Backend API")

# Configuración de CORS
origins = [
    "http://localhost:5173",  # Frontend Vite
    "http://localhost:3000",  # Metabase
    "http://192.168.1.0:5173",  # Para IPs de red local
    "http://192.168.1.0:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://0.0.0.0:5173",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Importante para las cookies
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Permitir exponer headers al frontend
    max_age=3600,
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
