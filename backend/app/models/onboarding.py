from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from ..db.database import Base
import enum

class TendencyType(str, enum.Enum):
    ANALYTICAL = "analytical"
    EMOTIONAL = "emotional"

class BreakupReason(str, enum.Enum):
    COMMUNICATION = "의사소통 문제"
    VALUES = "가치관 차이"
    EXTERNAL = "외부 요인 (거리, 환경)"
    TRUST = "신뢰 상실"
    OTHER = "기타"

class StrategyType(str, enum.Enum):
    ANALYTICAL = "analytical"
    BALANCED = "balanced"
    EMOTIONAL = "emotional"

class Onboarding(Base):
    __tablename__ = "onboarding"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Step 1: 관계 정보
    breakup_date = Column(Date, nullable=False)
    relationship_years = Column(Integer, nullable=False)
    relationship_months = Column(Integer, nullable=False)
    my_tendency = Column(Enum(TendencyType), nullable=False)
    partner_tendency = Column(Enum(TendencyType), nullable=False)
    
    # Step 2: 이별 원인
    breakup_reason = Column(Enum(BreakupReason), nullable=True)
    
    # Step 3: 전략 스타일
    strategy_type = Column(Enum(StrategyType), nullable=True)
    
    # 관계 설정
    user = relationship("User", back_populates="onboarding") 