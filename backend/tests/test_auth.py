import pytest
from fastapi import status
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import get_password_hash

@pytest.fixture(autouse=True)
def setup_database(db_session: Session):
    """테스트 데이터베이스를 초기화합니다."""
    # 기존 데이터 삭제
    db_session.query(User).delete()
    db_session.commit()

def test_signup_success(client):
    """회원가입 성공 테스트"""
    response = client.post(
        "/api/auth/signup",
        json={
            "email": "newuser@example.com",
            "username": "newuser",
            "password": "password123",
            "full_name": "New User"
        }
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["username"] == "newuser"
    assert "id" in data
    assert "hashed_password" not in data

def test_signup_duplicate_email(client, test_user):
    """중복 이메일로 회원가입 시도 테스트"""
    response = client.post(
        "/api/auth/signup",
        json={
            "email": "test@example.com",
            "username": "anotheruser",
            "password": "password123",
            "full_name": "Another User"
        }
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "이미 등록된 이메일입니다" in response.json()["detail"]

def test_signup_duplicate_username(client, test_user):
    """중복 사용자명으로 회원가입 시도 테스트"""
    response = client.post(
        "/api/auth/signup",
        json={
            "email": "another@example.com",
            "username": "testuser",
            "password": "password123",
            "full_name": "Another User"
        }
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "이미 사용 중인 사용자명입니다" in response.json()["detail"]

def test_login_success(client, test_user):
    """로그인 성공 테스트"""
    response = client.post(
        "/api/auth/login",
        data={"username": "test@example.com", "password": "password123"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client, test_user):
    """잘못된 비밀번호로 로그인 시도 테스트"""
    response = client.post(
        "/api/auth/login",
        data={"username": "test@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "이메일 또는 비밀번호가 올바르지 않습니다" in response.json()["detail"]

def test_login_nonexistent_user(client):
    """존재하지 않는 사용자로 로그인 시도 테스트"""
    response = client.post(
        "/api/auth/login",
        data={"username": "nonexistent@example.com", "password": "password123"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "이메일 또는 비밀번호가 올바르지 않습니다" in response.json()["detail"] 