from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from enum import Enum
from datetime import date
from ..models.onboarding import TendencyType, BreakupReason, StrategyType

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

class OnboardingStep1(BaseModel):
    breakup_date: date
    relationship_years: int
    relationship_months: int
    my_tendency: TendencyType
    partner_tendency: TendencyType

class OnboardingStep2(BaseModel):
    breakup_reason: BreakupReason

class OnboardingStep3(BaseModel):
    strategy_type: StrategyType

class OnboardingCreate(OnboardingStep1, OnboardingStep2, OnboardingStep3):
    pass

class OnboardingResponse(BaseModel):
    id: int
    user_id: int
    breakup_date: date
    relationship_years: int
    relationship_months: int
    my_tendency: TendencyType
    partner_tendency: TendencyType
    breakup_reason: Optional[BreakupReason] = None
    strategy_type: Optional[StrategyType] = None

    class Config:
        from_attributes = True 