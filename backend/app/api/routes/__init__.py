from fastapi import APIRouter
from .users import router as users_router


# Crear un router principal
router = APIRouter()

# Incluir los sub-routers
router.include_router(users_router)


# Exportar los routers individuales para su uso directo
users = users_router

