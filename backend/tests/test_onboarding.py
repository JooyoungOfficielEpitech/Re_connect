import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from datetime import date, timedelta
from unittest.mock import patch
from app.models.user import User
from app.models.onboarding import Onboarding, TendencyType

def test_create_onboarding_step1(client: TestClient, db: Session, test_user: User, mock_auth_patch):
    # 테스트용 온보딩 데이터
    today = date.today()
    one_month_ago = today - timedelta(days=30)
    
    onboarding_data = {
        "breakup_date": one_month_ago.isoformat(),
        "relationship_years": 2,
        "relationship_months": 6,
        "my_tendency": "analytical",
        "partner_tendency": "emotional"
    }

    # 모킹된 인증을 사용하여 요청
    response = client.post("/api/onboarding/step1", json=onboarding_data)

    # 응답 검증
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == test_user.id
    assert data["breakup_date"] == one_month_ago.isoformat()
    assert data["relationship_years"] == 2
    assert data["relationship_months"] == 6
    assert data["my_tendency"] == "analytical"
    assert data["partner_tendency"] == "emotional"
    assert data["breakup_reason"] is None
    assert data["strategy_type"] is None

    # 데이터베이스에 저장되었는지 확인
    db_onboarding = db.query(Onboarding).filter(Onboarding.user_id == test_user.id).first()
    assert db_onboarding is not None
    assert db_onboarding.breakup_date == one_month_ago
    assert db_onboarding.relationship_years == 2
    assert db_onboarding.relationship_months == 6
    assert db_onboarding.my_tendency == TendencyType.ANALYTICAL
    assert db_onboarding.partner_tendency == TendencyType.EMOTIONAL
    assert db_onboarding.breakup_reason is None
    assert db_onboarding.strategy_type is None

def test_create_onboarding_step1_unauthorized(client: TestClient):
    # 인증 없이 요청
    onboarding_data = {
        "breakup_date": "2023-01-01",
        "relationship_years": 2,
        "relationship_months": 6,
        "my_tendency": "analytical",
        "partner_tendency": "emotional"
    }
    
    response = client.post("/api/onboarding/step1", json=onboarding_data)
    assert response.status_code == 401

def test_create_onboarding_step1_invalid_data(client: TestClient, db: Session, test_user: User, mock_auth_patch):
    # 잘못된 데이터로 요청
    invalid_data = {
        "breakup_date": "invalid-date",
        "relationship_years": -1,  # 음수는 유효하지 않음
        "relationship_months": 13,  # 12보다 큰 값은 유효하지 않음
        "my_tendency": "invalid_tendency",  # 유효하지 않은 성향
        "partner_tendency": "invalid_tendency"  # 유효하지 않은 성향
    }
    
    response = client.post("/api/onboarding/step1", json=invalid_data)
    assert response.status_code == 422  # Unprocessable Entity 