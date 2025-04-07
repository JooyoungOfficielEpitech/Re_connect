import pytest
from fastapi import status

def test_create_mission(client, test_user_token):
    """새로운 미션 생성 테스트"""
    response = client.post(
        "/api/missions/",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={
            "title": "Test Mission",
            "description": "This is a test mission"
        }
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "Test Mission"
    assert data["description"] == "This is a test mission"
    assert data["is_completed"] == False
    assert "id" in data
    assert "user_id" in data
    return data["id"]

def test_create_mission_unauthorized(client):
    """인증되지 않은 사용자의 미션 생성 시도 테스트"""
    response = client.post(
        "/api/missions/",
        json={
            "title": "Test Mission",
            "description": "This is a test mission"
        }
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_read_missions(client, test_user_token, test_user, db_session):
    """미션 목록 조회 테스트"""
    # 먼저 미션 생성
    from app.models.mission import Mission
    mission = Mission(
        title="Test Mission",
        description="This is a test mission",
        user_id=test_user.id
    )
    db_session.add(mission)
    db_session.commit()
    
    # 미션 목록 조회
    response = client.get(
        "/api/missions/",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Mission"
    assert data[0]["description"] == "This is a test mission"
    assert data[0]["is_completed"] == False
    return data[0]["id"]

def test_read_missions_unauthorized(client):
    """인증되지 않은 사용자의 미션 목록 조회 시도 테스트"""
    response = client.get("/api/missions/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_read_mission(client, test_user_token, test_user, db_session):
    """특정 미션 상세 조회 테스트"""
    # 먼저 미션 생성
    from app.models.mission import Mission
    mission = Mission(
        title="Test Mission",
        description="This is a test mission",
        user_id=test_user.id
    )
    db_session.add(mission)
    db_session.commit()
    db_session.refresh(mission)
    
    # 미션 상세 조회
    response = client.get(
        f"/api/missions/{mission.id}",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "Test Mission"
    assert data["description"] == "This is a test mission"
    assert data["is_completed"] == False
    return mission.id

def test_read_mission_not_found(client, test_user_token):
    """존재하지 않는 미션 조회 시도 테스트"""
    response = client.get(
        "/api/missions/999",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_update_mission(client, test_user_token, test_user, db_session):
    """미션 수정 테스트"""
    # 먼저 미션 생성
    from app.models.mission import Mission
    mission = Mission(
        title="Test Mission",
        description="This is a test mission",
        user_id=test_user.id
    )
    db_session.add(mission)
    db_session.commit()
    db_session.refresh(mission)
    
    # 미션 수정
    response = client.put(
        f"/api/missions/{mission.id}",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={
            "title": "Updated Mission",
            "description": "This is an updated mission",
            "is_completed": True
        }
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "Updated Mission"
    assert data["description"] == "This is an updated mission"
    assert data["is_completed"] == True

def test_update_mission_not_found(client, test_user_token):
    """존재하지 않는 미션 수정 시도 테스트"""
    response = client.put(
        "/api/missions/999",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={
            "title": "Updated Mission",
            "description": "This is an updated mission",
            "is_completed": True
        }
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_delete_mission(client, test_user_token, test_user, db_session):
    """미션 삭제 테스트"""
    # 먼저 미션 생성
    from app.models.mission import Mission
    mission = Mission(
        title="Test Mission",
        description="This is a test mission",
        user_id=test_user.id
    )
    db_session.add(mission)
    db_session.commit()
    db_session.refresh(mission)
    
    # 미션 삭제
    response = client.delete(
        f"/api/missions/{mission.id}",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
    
    # 삭제 확인
    deleted_mission = db_session.query(Mission).filter(Mission.id == mission.id).first()
    assert deleted_mission is None

def test_delete_mission_not_found(client, test_user_token):
    """존재하지 않는 미션 삭제 시도 테스트"""
    response = client.delete(
        "/api/missions/999",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND 