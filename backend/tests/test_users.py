import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.main import app
from app.models.user import User
from app.core.security import create_access_token


def test_get_me_unauthorized(client: TestClient):
    # 인증 없이 요청
    response = client.get("/api/users/me")
    assert response.status_code == 401

def test_get_me_invalid_token(client: TestClient):
    # 잘못된 토큰으로 요청
    response = client.get(
        "/api/users/me",
        headers={"Authorization": "Bearer invalid_token"}
    )
    assert response.status_code == 401 