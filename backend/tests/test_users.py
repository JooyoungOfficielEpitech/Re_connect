import pytest
from fastapi import status

def test_read_user_me(client, test_user_token):
    """현재 로그인한 사용자의 프로필 정보 조회 테스트"""
    response = client.get(
        "/api/users/me",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert data["full_name"] == "Test User"

def test_read_user_me_unauthorized(client):
    """인증되지 않은 사용자의 프로필 정보 조회 시도 테스트"""
    response = client.get("/api/users/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_update_user_me(client, test_user_token):
    """현재 로그인한 사용자의 프로필 정보 수정 테스트"""
    response = client.put(
        "/api/users/me",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={
            "email": "updated@example.com",
            "username": "updateduser",
            "password": "newpassword123",
            "full_name": "Updated User"
        }
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "updated@example.com"
    assert data["username"] == "updateduser"
    assert data["full_name"] == "Updated User"

def test_update_user_me_unauthorized(client):
    """인증되지 않은 사용자의 프로필 정보 수정 시도 테스트"""
    response = client.put(
        "/api/users/me",
        json={
            "email": "updated@example.com",
            "username": "updateduser",
            "password": "newpassword123",
            "full_name": "Updated User"
        }
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED 