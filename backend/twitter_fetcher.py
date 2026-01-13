import os
from apify_client import ApifyClient

APIFY_TOKEN = os.getenv("APIFY_TOKEN")

if not APIFY_TOKEN:
    raise RuntimeError("APIFY_TOKEN not set")

client = ApifyClient(APIFY_TOKEN)

ACTOR_ID = "CJdippxWmn9uRfooo"  # Twitter scraper actor

def fetch_tweets(username: str, limit: int = 20):
    run_input = {
        "from": username,
        "maxItems": limit,
        "lang": "en",
        "-filter:replies": True
    }

    run = client.actor(ACTOR_ID).call(run_input=run_input)

    tweets = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        if "text" in item:
            tweets.append(item["text"])

    return tweets
