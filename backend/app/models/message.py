from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    purpose = Column(String(300), nullable=False)
    tone_style = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    positive_reaction = Column(Float, nullable=False)
    warning = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="messages")

    class Config:
        orm_mode = True 