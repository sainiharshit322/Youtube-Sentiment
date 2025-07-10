from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.databse import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    results = relationship("SentimentResult", back_populates="user")

class SentimentResult(Base):
    __tablename__ = "sentiment_results"
    id = Column(Integer, primary_key=True)
    video_id = Column(String)
    summary = Column(JSON)
    comments = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="results")
