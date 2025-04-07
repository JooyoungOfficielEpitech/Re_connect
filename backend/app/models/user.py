from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 관계 설정
    profile = relationship("UserProfile", back_populates="user", uselist=False)
    onboarding = relationship("Onboarding", back_populates="user", uselist=False)
    missions = relationship("Mission", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, username={self.username}, full_name={self.full_name})>" 