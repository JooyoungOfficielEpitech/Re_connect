from pydantic import BaseModel
from typing import List, Optional, Dict
from enum import Enum

class OnboardingStep(int, Enum):
    PROFILE = 1
    INTERESTS = 2
    PREFERENCES = 3
    GOALS = 4
    COMPLETED = 5

class UserProfileBase(BaseModel):
    bio: Optional[str] = None
    interests: Optional[List[str]] = None
    preferences: Optional[Dict] = None
    goals: Optional[List[str]] = None

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileResponse(UserProfileBase):
    id: int
    user_id: int
    onboarding_completed: int

    class Config:
        orm_mode = True 