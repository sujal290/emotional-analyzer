from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from twitter_fetcher import fetch_tweets
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ✅ CORS (THIS IS WHERE IT GOES)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    username: str

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    tweets = fetch_tweets(req.username)

    if not tweets:
        return {"error": "No tweets found"}

    return {
        "username": req.username,
        "tweets": tweets
    }
