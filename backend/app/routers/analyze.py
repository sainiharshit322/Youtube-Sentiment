from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, youtube, sentiment, auth
from app.databse import get_db

router = APIRouter()


@router.get("/analyze/{video_id}")
def analyze(video_id: str, db: Session = Depends(get_db), user = Depends(auth.get_current_user)):
    comments = youtube.fetch_comments(video_id)
    results = [{"text": c, **sentiment.analyze_sentiment(c)} for c in comments]
    summary = {
        "positive": sum(1 for r in results if r["label"] == "positive"),
        "neutral": sum(1 for r in results if r["label"] == "neutral"),
        "negative": sum(1 for r in results if r["label"] == "negative"),
    }
    entry = models.SentimentResult(
        video_id=video_id,
        summary=summary,
        comments=results,
        user_id=user.id
    )
    db.add(entry)
    db.commit()
    return {"summary": summary, "results": results}

@router.get("/history")
def history(db: Session = Depends(get_db), user = Depends(auth.get_current_user)):
    records = db.query(models.SentimentResult).filter_by(user_id=user.id).all()
    return [
        {"video_id": r.video_id, "summary": r.summary, "created_at": r.created_at}
        for r in records
    ]
