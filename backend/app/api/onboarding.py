from fastapi import APIRouter, Depends, HTTPException, status
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
from ..db.database import get_db
from ..models.onboarding import Onboarding, TendencyType, BreakupReason, StrategyType
from ..schemas.onboarding import OnboardingCreate, OnboardingResponse, OnboardingStep1, OnboardingStep2, OnboardingStep3
from ..api.auth import get_current_user

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

@router.post("/step1", response_model=OnboardingResponse)
async def create_onboarding_step1(
    data: OnboardingStep1,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """온보딩 1단계 데이터 저장"""
    # 기존 온보딩 데이터가 있는지 확인
    onboarding = db.query(Onboarding).filter(Onboarding.user_id == current_user.id).first()
    
    if onboarding:
        # 기존 데이터 업데이트
        onboarding.breakup_date = data.breakup_date
        onboarding.relationship_years = data.relationship_years
        onboarding.relationship_months = data.relationship_months
        onboarding.my_tendency = data.my_tendency
        onboarding.partner_tendency = data.partner_tendency
    else:
        # 새 온보딩 데이터 생성
        onboarding = Onboarding(
            user_id=current_user.id,
            breakup_date=data.breakup_date,
            relationship_years=data.relationship_years,
            relationship_months=data.relationship_months,
            my_tendency=data.my_tendency,
            partner_tendency=data.partner_tendency
        )
        db.add(onboarding)
    
    db.commit()
    db.refresh(onboarding)
    return onboarding

@router.post("/step2", response_model=OnboardingResponse)
async def create_onboarding_step2(
    data: OnboardingStep2,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """온보딩 2단계 데이터 저장"""
    # 온보딩 1단계가 완료되었는지 확인
    onboarding = db.query(Onboarding).filter(Onboarding.user_id == current_user.id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Step 1 must be completed first"
        )
    
    # 2단계 데이터 업데이트
    onboarding.breakup_reason = data.breakup_reason
    
    db.commit()
    db.refresh(onboarding)
    return onboarding

@router.post("/step3", response_model=OnboardingResponse)
async def create_onboarding_step3(
    data: OnboardingStep3,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """온보딩 3단계 데이터 저장"""
    # 온보딩 1단계가 완료되었는지 확인
    onboarding = db.query(Onboarding).filter(Onboarding.user_id == current_user.id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Step 1 must be completed first"
        )
    
    # 3단계 데이터 업데이트
    onboarding.strategy_type = data.strategy_type
    
    db.commit()
    db.refresh(onboarding)
    return onboarding

@router.get("/", response_model=OnboardingResponse)
async def get_onboarding(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """사용자의 온보딩 데이터 조회"""
    onboarding = db.query(Onboarding).filter(Onboarding.user_id == current_user.id).first()
    if not onboarding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Onboarding data not found"
        )
    return onboarding 