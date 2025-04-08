from fastapi import APIRouter
from .endpoints import auth, users, missions, onboarding, messages

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(missions.router, prefix="/missions", tags=["missions"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"]) 