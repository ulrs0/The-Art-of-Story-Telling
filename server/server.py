import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from moviepy.editor import AudioFileClip
import asyncio
import time
from agents import *
from utils import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

writer = Writer("meta-llama/Meta-Llama-3.1-8B-Instruct", "cuda")
reviewer = Reviewer("gpt-4o")
movieDirector = MovieDirector("gpt-4o")
animator = Animator("THUDM/CogVideoX-5b", "cuda")
musicDirector = MusicDirector("gpt-4o")
musician = Musician("facebook/musicgen-large", "cuda")
narrator = Narrator("tts_models/multilingual/multi-dataset/xtts_v2", "cuda")

class WriterInput(BaseModel):
    prompt: str

class AnimatorInput(BaseModel):
    paragraph: str

class NarratorInput(BaseModel):
    story: str

@app.post("/writer")
async def generate_story(writer_input: WriterInput):
    story = writer.forward(writer_input.prompt)
    review = reviewer.forward(story, REVIEWER_PROMPT)
    if "false" in review.lower():
        story = reviewer.forward(f"### Story:\n{story}\n\n### Review:\n{review}", REVIEWER_EDITS_PROMPT)
    return {"story": story}

@app.post("/animator")
async def generate_animation(animator_input: AnimatorInput):
    scene = movieDirector.forward(animator_input.paragraph)
    composition = musicDirector.forward(scene)
    video_task = animator.forward(scene)
    music_task = musician.forward(composition)
    video, music_file = await asyncio.gather(video_task, music_task)
    music = AudioFileClip(music_file)
    video = video.set_audio(music)
    video_file = time.strftime("%Y%m%d-%H%M%S") + ".mp4"
    video.write_videofile(video_file, codec="libx264", fps=24)
    def iterfile():
        with open(video_file, mode="rb") as f:
            yield from f
        os.remove(video_file)
        os.remove(music_file)

    return StreamingResponse(iterfile(), media_type="video/mp4")

@app.post("/narrator")
async def generate_animation(narrator_input: NarratorInput):
    narration = narrator.forward(narrator_input.story, "audio samples/male-voice.wav")
    def iterfile():
        with open(narration, mode="rb") as f:
            yield from f
        os.remove(narration)

    return StreamingResponse(iterfile(), media_type="audio/wav")