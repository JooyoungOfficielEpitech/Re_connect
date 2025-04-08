from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.schemas.message import RecommendedGoal, MessagePurpose, GeneratedMessage
from app.core.deps import get_current_user, get_db
from app.models.user import User
from app.services.message_service import MessageService

router = APIRouter()

# 추천 목표 목록 (임시 데이터)
RECOMMENDED_GOALS = [
    {
        "id": 1,
        "name": "재회",
        "description": "이전 관계를 복구하고 새로운 시작을 준비합니다.",
        "reason": "상대방과의 관계가 아직 완전히 종료되지 않았으며, 서로에 대한 감정이 남아있습니다."
    },
    {
        "id": 2,
        "name": "마음 정리",
        "description": "과거의 관계를 정리하고 새로운 시작을 준비합니다.",
        "reason": "현재 감정적 혼란과 불안정한 상태를 해소할 필요가 있습니다."
    },
    {
        "id": 3,
        "name": "자기 이해",
        "description": "자신의 감정과 행동 패턴을 이해하고 성장합니다.",
        "reason": "관계에서 반복되는 패턴을 발견했으며, 이를 개선할 필요가 있습니다."
    },
    {
        "id": 4,
        "name": "성장",
        "description": "이전 관계의 경험을 통해 개인적 성장을 이루어냅니다.",
        "reason": "관계 경험을 통해 배운 교훈을 바탕으로 더 나은 관계를 만들 준비를 합니다."
    }
]

@router.get("/recommended-goals", response_model=List[RecommendedGoal])
async def get_recommended_goals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    사용자에게 추천할 목표 목록을 반환합니다.
    사용자의 온보딩 데이터를 기반으로 0~3개의 목표를 추천합니다.
    """
    # 임시로 모든 추천 목표를 반환
    return RECOMMENDED_GOALS

@router.post("/generate", response_model=GeneratedMessage)
async def generate_message(
    message_purpose: MessagePurpose,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    사용자가 입력한 목적과 말투 스타일에 따라 메시지를 생성하고 긍정적 반응 예측을 제공합니다.
    생성된 메시지는 데이터베이스에 저장됩니다.
    """
    message_service = MessageService(db)
    message = message_service.generate_message(current_user, message_purpose)
    
    return GeneratedMessage(
        message=message.content,
        positive_reaction=int(message.positive_reaction),
        warning=message.warning
    ) 