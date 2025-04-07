from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import auth, users, missions, onboarding
from .db.database import engine, Base

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Re_Connect API",
    description="Re_Connect 백엔드 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 운영 환경에서는 구체적인 origin을 지정해야 합니다
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터 등록
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(missions.router, prefix="/api/missions", tags=["missions"])
app.include_router(onboarding.router, prefix="/api/onboarding", tags=["onboarding"])

@app.get("/")
async def root():
    return {"message": "Re_Connect API에 오신 것을 환영합니다!"} 