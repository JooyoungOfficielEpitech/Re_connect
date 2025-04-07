from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core import deps
from app.models.user import User
from app.models.user_profile import UserProfile
from app.schemas.onboarding import (
    UserProfileCreate,
    UserProfileUpdate,
    UserProfileResponse,
    OnboardingStep
)

router = APIRouter()

@router.post("/profile", response_model=UserProfileResponse)
def create_user_profile(
    profile: UserProfileCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """사용자 프로필 생성"""
    db_profile = UserProfile(
        user_id=current_user.id,
        bio=profile.bio,
        interests=profile.interests,
        preferences=profile.preferences,
        goals=profile.goals,
        onboarding_completed=0
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.put("/profile", response_model=UserProfileResponse)
def update_user_profile(
    profile: UserProfileUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """사용자 프로필 업데이트"""
    db_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for field, value in profile.dict(exclude_unset=True).items():
        setattr(db_profile, field, value)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.put("/step/{step}", response_model=UserProfileResponse)
def update_onboarding_step(
    step: OnboardingStep,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """온보딩 단계 업데이트"""
    db_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    db_profile.onboarding_completed = step.value
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.get("/profile", response_model=UserProfileResponse)
def get_user_profile(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """사용자 프로필 조회"""
    db_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile 