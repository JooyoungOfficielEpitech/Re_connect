from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.deps import get_current_active_user, get_db
from ..models.user import User
from ..schemas.user import UserResponse, UserCreate
from ..core.security import get_password_hash

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_active_user)):
    """현재 로그인한 사용자의 프로필 정보를 반환합니다."""
    return current_user

@router.put("/me", response_model=UserResponse)
def update_user_me(user: UserCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    """현재 로그인한 사용자의 프로필 정보를 수정합니다."""
    current_user.email = user.email
    current_user.username = user.username
    current_user.full_name = user.full_name
    current_user.hashed_password = get_password_hash(user.password)
    db.commit()
    db.refresh(current_user)
    return current_user 