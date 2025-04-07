from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..core.deps import get_db, get_current_user
from ..models.user import User
from ..models.mission import Mission
from ..schemas.mission import MissionCreate, MissionUpdate, MissionResponse

router = APIRouter()

@router.post("/", response_model=MissionResponse)
def create_mission(
    mission: MissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """새로운 미션을 생성합니다."""
    db_mission = Mission(
        title=mission.title,
        description=mission.description,
        user_id=current_user.id
    )
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    return db_mission

@router.get("/", response_model=List[MissionResponse])
def read_missions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """현재 로그인한 사용자의 미션 목록을 조회합니다."""
    missions = db.query(Mission).filter(
        Mission.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return missions

@router.get("/{mission_id}", response_model=MissionResponse)
def read_mission(
    mission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """특정 미션의 상세 정보를 조회합니다."""
    mission = db.query(Mission).filter(
        Mission.id == mission_id,
        Mission.user_id == current_user.id
    ).first()
    if mission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="미션을 찾을 수 없습니다"
        )
    return mission

@router.put("/{mission_id}", response_model=MissionResponse)
def update_mission(
    mission_id: int,
    mission_update: MissionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """특정 미션의 정보를 업데이트합니다."""
    db_mission = db.query(Mission).filter(
        Mission.id == mission_id,
        Mission.user_id == current_user.id
    ).first()
    if db_mission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="미션을 찾을 수 없습니다"
        )
    
    for field, value in mission_update.dict(exclude_unset=True).items():
        setattr(db_mission, field, value)
    
    db.commit()
    db.refresh(db_mission)
    return db_mission

@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(
    mission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """특정 미션을 삭제합니다."""
    db_mission = db.query(Mission).filter(
        Mission.id == mission_id,
        Mission.user_id == current_user.id
    ).first()
    if db_mission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="미션을 찾을 수 없습니다"
        )
    
    db.delete(db_mission)
    db.commit()
    return None 