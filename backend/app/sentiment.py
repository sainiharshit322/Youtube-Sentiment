from transformers import pipeline
analyzer = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    result = analyzer(text[:512])[0]
    return {
        "label": result["label"].lower(),
        "score": result["score"]
    }
