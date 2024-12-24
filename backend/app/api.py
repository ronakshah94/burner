from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dummy_data = [
    {
        "id": "1",
        "title": "Dancing Queen - ABBA"
    },
    {
        "id": "2",
        "title": "Stayin' Alive - Bee Gees"
    },
    {
        "id": "3",
        "title": "Hotel California - Eagles"
    },
    {
        "id": "4",
        "title": "Bohemian Rhapsody - Queen"
    },
    {
        "id": "5",
        "title": "Super Max! - Pitstop Boys"
    }
]

@app.get("/", tags=["root"])
async def serve_frontend():
    return {"message": "hello world!"}

@app.get("/samples", tags=["samples"])
async def sample_songs():
    return {"data": dummy_data}

@app.post("/add_songs", tags=["add", "songs"], description="Add songs to a playlist")
async def add_songs(song: dict):
    dummy_data.append(song)
    return { "data": "added song {}".format(song["title"])}
