
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app import models, auth
from app.databse import get_db


router = APIRouter()

@router.post("/signup")
def signup(user: dict, db: Session = Depends(get_db)):
    if db.query(models.User).filter_by(username=user["username"]).first():
        raise HTTPException(status_code=400, detail="Username taken")
    hashed = auth.hash_password(user["password"])
    new_user = models.User(username=user["username"], password=hashed)
    db.add(new_user)
    db.commit()
    return {"msg": "Signup successful"}

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(username=form.username).first()
    if not user or not auth.verify_password(form.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
