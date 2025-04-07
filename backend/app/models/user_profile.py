from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..db.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, index=True)
    bio = Column(String, nullable=True)
    interests = Column(JSON, nullable=True)  # 관심사 목록
    preferences = Column(JSON, nullable=True)  # 선호도 설정
    goals = Column(JSON, nullable=True)  # 목표 설정
    onboarding_completed = Column(Integer, default=0)  # 온보딩 진행 상태

    # 관계 설정
    user = relationship("User", back_populates="profile") 