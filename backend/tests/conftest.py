import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from unittest.mock import patch

from app.main import app
from app.db.database import Base, get_db
from app.models.user import User
from app.core.security import create_access_token
from app.core.deps import get_current_user

# 테스트용 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    # 테스트용 데이터베이스 테이블 생성
    Base.metadata.create_all(bind=engine)
    
    # 테스트용 데이터베이스 세션 생성
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # 테스트 후 테이블 삭제
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db):
    # 테스트용 데이터베이스 세션을 사용하도록 의존성 오버라이드
    def override_get_db():
        try:
            yield db
        finally:
            db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    
    # 테스트 클라이언트 생성
    with TestClient(app) as test_client:
        yield test_client
    
    # 의존성 오버라이드 제거
    app.dependency_overrides.clear()

@pytest.fixture(scope="function")
def test_user(db):
    user = User(
        email="test@example.com",
        username="testuser",
        full_name="Test User",
        hashed_password="hashed_password",
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture(scope="function")
def auth_headers(test_user):
    access_token = create_access_token(data={"email": test_user.email})
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture(scope="function")
def auth_client(client, auth_headers):
    client.headers = auth_headers
    return client

@pytest.fixture(scope="function")
def mock_auth(test_user):
    """인증 의존성을 모킹하는 fixture"""
    async def override_get_current_user():
        return test_user
    
    # 인증 의존성 오버라이드
    app.dependency_overrides[get_current_user] = override_get_current_user
    
    yield
    
    # 의존성 오버라이드 제거
    app.dependency_overrides.pop(get_current_user, None)

@pytest.fixture(scope="function")
def mock_auth_patch(test_user):
    """unittest.mock.patch를 사용한 인증 모킹"""
    with patch("app.core.deps.get_current_user", return_value=test_user):
        yield 