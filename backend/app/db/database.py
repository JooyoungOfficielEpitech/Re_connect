from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# 데이터베이스 URL 설정
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://re_connect_user:your_password@localhost:5432/re_connect")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# 데이터베이스 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 테이블 생성
def init_db():
    Base.metadata.create_all(bind=engine)