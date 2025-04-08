from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class MissionBase(BaseModel):
    title: str
    description: Optional[str] = None

class MissionCreate(MissionBase):
    pass

class MissionUpdate(MissionBase):
    is_completed: Optional[bool] = None

class MissionResponse(MissionBase):
    id: int
    is_completed: bool
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True) 