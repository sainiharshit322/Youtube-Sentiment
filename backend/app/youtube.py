import requests
import os

API_KEY = os.environ.get("YOUTUBE_API_KEY")

def fetch_comments(video_id, max_results=50):
    url = "https://www.googleapis.com/youtube/v3/commentThreads"
    params = {
        "part": "snippet",
        "videoId": video_id,
        "key": API_KEY,
        "maxResults": max_results,
        "textFormat": "plainText"
    }
    response = requests.get(url, params=params)
    print(f"Status Code: {response.status_code}")
    print("YouTube API Response:", response.json())

    if response.status_code != 200:
        return []

    items = response.json().get("items", [])
    return [
        item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
        for item in items
    ]