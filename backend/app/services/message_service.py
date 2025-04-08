from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.message import Message
from app.models.user import User
from app.models.onboarding import Onboarding
from app.schemas.message import MessagePurpose
import random

class MessageService:
    def __init__(self, db: Session):
        self.db = db

    def get_recommended_goals(self, user: User) -> List[dict]:
        """
        사용자의 온보딩 데이터를 기반으로 추천 목표를 생성합니다.
        """
        # 기본 목표 목록
        all_goals = [
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

        # 사용자의 온보딩 데이터 가져오기
        onboarding = self.db.query(Onboarding).filter(Onboarding.user_id == user.id).first()
        
        if not onboarding:
            # 온보딩 데이터가 없는 경우 랜덤하게 0~3개 추천
            num_goals = random.randint(0, 3)
            return random.sample(all_goals, num_goals)

        # 온보딩 데이터 기반 목표 추천 로직
        recommended_goals = []
        
        # 이별 이유에 따른 목표 추천
        if onboarding.breakup_reason:
            if "성격 차이" in onboarding.breakup_reason:
                recommended_goals.append(all_goals[2])  # 자기 이해
            elif "외부 요인" in onboarding.breakup_reason:
                recommended_goals.append(all_goals[0])  # 재회
            elif "감정 식음" in onboarding.breakup_reason:
                recommended_goals.append(all_goals[1])  # 마음 정리

        # 전략 유형에 따른 목표 추천
        if onboarding.strategy_type:
            if onboarding.strategy_type == "재회 희망":
                recommended_goals.append(all_goals[0])  # 재회
            elif onboarding.strategy_type == "완전한 이별":
                recommended_goals.append(all_goals[1])  # 마음 정리
            elif onboarding.strategy_type == "미정":
                recommended_goals.append(all_goals[2])  # 자기 이해

        # 중복 제거
        recommended_goals = list({goal['id']: goal for goal in recommended_goals}.values())
        
        # 최대 3개까지만 반환
        return recommended_goals[:3]

    def generate_message(self, user: User, message_purpose: MessagePurpose) -> Message:
        """
        사용자의 입력과 온보딩 데이터를 기반으로 메시지를 생성합니다.
        """
        # 온보딩 데이터 가져오기
        onboarding = self.db.query(Onboarding).filter(Onboarding.user_id == user.id).first()

        # 메시지 생성 로직
        tone_style_templates = {
            "logical": [
                "객관적인 사실을 바탕으로 {purpose}에 대해 이야기하고 싶습니다.",
                "합리적인 관점에서 {purpose}를 설명하고자 합니다.",
                "논리적으로 생각해보면, {purpose}이(가) 중요한 이유가 있습니다."
            ],
            "emotional": [
                "진심을 담아 {purpose}에 대한 제 마음을 전하고 싶습니다.",
                "솔직한 감정으로 {purpose}에 대해 이야기하고 싶어요.",
                "{purpose}에 대한 제 진심이 전해졌으면 좋겠습니다."
            ],
            "curious": [
                "{purpose}에 대해 함께 생각해보면 어떨까요?",
                "{purpose}에 대해 당신의 생각이 궁금합니다.",
                "{purpose}에 대해 이야기를 나누어보고 싶습니다."
            ]
        }

        # 기본 템플릿 선택
        templates = tone_style_templates.get(message_purpose.tone_style, tone_style_templates["logical"])
        base_message = random.choice(templates).format(purpose=message_purpose.purpose)

        # 온보딩 데이터가 있는 경우, 맞춤형 내용 추가
        if onboarding:
            relationship_duration = f"{onboarding.relationship_years}년 {onboarding.relationship_months}개월"
            additional_context = f"\n우리가 함께한 {relationship_duration}의 시간이 있었기에, "
            if onboarding.strategy_type == "재회 희망":
                additional_context += "새로운 시작을 위한 대화를 나누고 싶습니다."
            elif onboarding.strategy_type == "완전한 이별":
                additional_context += "서로의 미래를 위해 좋은 마무리를 하고 싶습니다."
            else:
                additional_context += "서로를 이해하는 시간이 되었으면 합니다."
            
            base_message += additional_context

        # 긍정적 반응 예측 (실제로는 더 복잡한 로직이 필요)
        positive_reaction = random.uniform(50, 90)

        # 경고 메시지 생성
        warning = None
        warning_threshold = {
            "logical": 0.2,    # 20% 확률
            "emotional": 0.4,  # 40% 확률
            "curious": 0.3     # 30% 확률
        }

        if random.random() < warning_threshold.get(message_purpose.tone_style, 0.3):
            warnings = [
                "상대방이 부담을 느낄 수 있습니다.",
                "감정적 자극이 있을 수 있습니다.",
                "상대방이 거부할 가능성이 있습니다."
            ]
            warning = random.choice(warnings)

        # 메시지 저장
        message = Message(
            user_id=user.id,
            purpose=message_purpose.purpose,
            tone_style=message_purpose.tone_style,
            content=base_message,
            positive_reaction=positive_reaction,
            warning=warning
        )
        
        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message 