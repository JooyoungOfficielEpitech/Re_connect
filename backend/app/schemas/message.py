from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

class RecommendedGoal(BaseModel):
    id: int
    name: str
    description: str
    reason: str

    model_config = ConfigDict(from_attributes=True)

class MessagePurpose(BaseModel):
    purpose: str = Field(..., max_length=300)
    tone_style: str = Field(..., description="논리적, 감성적, 호기심 유발 중 하나")

class GeneratedMessage(BaseModel):
    message: str
    positive_reaction: int = Field(..., ge=0, le=100, description="긍정적 반응 예측 퍼센트")
    warning: Optional[str] = None

    model_config = ConfigDict(from_attributes=True) 