from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router
from .models import user as models
from .database import engine

# Crear tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="Backend API")

# Configuración de CORS
origins = [
    "http://localhost:5173",  # Frontend Vite
    "http://localhost:3000",  # Metabase
    "http://127.0.0.1:5173",  # Frontend alternativo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir todas las rutas
app.include_router(router)

# Ruta raíz para verificación
@app.get("/")
async def root():
    return {"message": "API Portugueando"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
