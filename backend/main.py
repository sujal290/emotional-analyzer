# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from twitter_fetcher import fetch_tweets
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# # ✅ CORS (THIS IS WHERE IT GOES)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class AnalyzeRequest(BaseModel):
#     username: str

# @app.post("/analyze")
# def analyze(req: AnalyzeRequest):
#     tweets = fetch_tweets(req.username)

#     if not tweets:
#         return {"error": "No tweets found"}

#     return {
#         "username": req.username,
#         "tweets": tweets
#     }


# import os
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from apify_client import ApifyClient

# # ---------------- CONFIG ----------------

# APIFY_TOKEN = os.getenv("APIFY_TOKEN")
# if not APIFY_TOKEN:
#     raise RuntimeError("APIFY_TOKEN not set")

# client = ApifyClient(APIFY_TOKEN)

# # ---------------- APP ----------------

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],   # later restrict to vercel domain
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------- SCHEMA ----------------

# class AnalyzeRequest(BaseModel):
#     username: str

# # ---------------- ROUTE ----------------

# @app.post("/analyze")
# def analyze(req: AnalyzeRequest):
#     username = req.username.replace("@", "").strip()

#     if not username:
#         raise HTTPException(status_code=400, detail="Invalid username")

#     run = client.actor("CJdippxWmn9uRfooo").call(
#         run_input={
#             "from": username,
#             "maxItems": 30,
#             "lang": "en",
#             "-filter:replies": True,
#         }
#     )

#     tweets = []
#     dataset = client.dataset(run["defaultDatasetId"])

#     for item in dataset.iterate_items():
#         if "text" in item:
#             tweets.append({
#                 "id": item.get("id"),
#                 "text": item.get("text"),
#                 "likes": item.get("likeCount", 0),
#                 "retweets": item.get("retweetCount", 0),
#                 "replies": item.get("replyCount", 0),
#                 "url": item.get("url"),
#                 "createdAt": item.get("createdAt"),
#             })

#     return {
#         "username": username,
#         "tweets": tweets
#     }





# import os
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from apify_client import ApifyClient

# # ---------------- CONFIG ----------------

# APIFY_TOKEN = os.getenv("APIFY_TOKEN")

# # DO NOT crash app at startup
# client = ApifyClient(APIFY_TOKEN) if APIFY_TOKEN else None

# # ---------------- APP ----------------

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # restrict later to Vercel domain
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------- SCHEMA ----------------

# class AnalyzeRequest(BaseModel):
#     username: str

# # ---------------- ROUTES ----------------

# @app.get("/")
# def health():
#     return {"status": "ok"}

# @app.post("/analyze")
# def analyze(req: AnalyzeRequest):
#     if not client:
#         raise HTTPException(
#             status_code=500,
#             detail="APIFY_TOKEN not configured on server"
#         )

#     username = req.username.replace("@", "").strip()

#     if not username:
#         raise HTTPException(status_code=400, detail="Invalid username")

#     run = client.actor("CJdippxWmn9uRfooo").call(
#         run_input={
#             "from": username,
#             "maxItems": 30,
#             "lang": "en",
#             "-filter:replies": True,
#         }
#     )

#     tweets = []
#     dataset = client.dataset(run["defaultDatasetId"])

#     for item in dataset.iterate_items():
#         if "text" not in item:
#             continue

#         tweets.append({
#             "id": item.get("id"),
#             "text": item.get("text"),
#             "likes": item.get("likeCount", 0),
#             "retweets": item.get("retweetCount", 0),
#             "replies": item.get("replyCount", 0),
#             "url": item.get("url"),
#             "createdAt": item.get("createdAt"),
#         })

#     return {
#         "username": username,
#         "tweets": tweets
#     }















import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apify_client import ApifyClient

app = FastAPI(title="Twitter Posts API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to Vercel domain
    allow_methods=["*"],
    allow_headers=["*"],
)

APIFY_TOKEN = os.getenv("APIFY_TOKEN")
client = ApifyClient(APIFY_TOKEN) if APIFY_TOKEN else None

class AnalyzeRequest(BaseModel):
    username: str

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="APIFY_TOKEN not configured on server"
        )

    username = req.username.replace("@", "").strip()
    if not username:
        raise HTTPException(status_code=400, detail="Invalid username")

    run = client.actor("CJdippxWmn9uRfooo").call(
        run_input={
            "from": username,
            "maxItems": 30,
            "lang": "en",
            "-filter:replies": True,
        }
    )

    tweets = []
    dataset = client.dataset(run["defaultDatasetId"])

    for item in dataset.iterate_items():
        if "text" not in item:
            continue

        tweets.append({
            "id": item.get("id"),
            "text": item.get("text"),
            "likes": item.get("likeCount", 0),
            "retweets": item.get("retweetCount", 0),
            "replies": item.get("replyCount", 0),
            "url": item.get("url"),
            "createdAt": item.get("createdAt"),
        })

    return {
        "username": username,
        "count": len(tweets),
        "tweets": tweets
    }
