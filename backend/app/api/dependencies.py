from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud, models
from ..core.security import verify_otp

def get_current_user(db: Session = Depends(get_db), email: str = None, otp: str = None):
    if not email or not otp:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credentials required",
        )

    if not verify_otp(email, otp):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid OTP or OTP expired",
        )

    user = crud.get_user(db, email=email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user
