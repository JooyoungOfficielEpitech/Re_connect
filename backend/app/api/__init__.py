from fastapi import APIRouter
from .auth import router as auth_router
from .users import router as users_router
from .missions import router as missions_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(missions_router, prefix="/missions", tags=["missions"]) 