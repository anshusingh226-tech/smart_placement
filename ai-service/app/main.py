"""Resume AI service (FastAPI).

POST /parse      resume file          -> structured resume data
POST /analyze    resume file + job    -> match %, extracted / missing / recommended skills
POST /analyze-text  JSON (text + job) -> same, for text you already have
POST /recommend  resume file + jobs   -> jobs ranked by match
GET  /health

If AI_SERVICE_KEY is set, every endpoint except /health needs header X-API-Key.
"""
from __future__ import annotations

import hmac
import json
import os

from fastapi import Depends, FastAPI, File, Form, Header, HTTPException, UploadFile
from pydantic import BaseModel, Field

from .matcher import analyze, recommend_jobs
from .parser import extract_text, parse_resume

MAX_BYTES = 5 * 1024 * 1024

app = FastAPI(title="Smart Placement - Resume AI", version="1.0.0")


def require_key(x_api_key: str | None = Header(default=None)) -> None:
    expected = os.getenv("AI_SERVICE_KEY", "")
    if not expected:
        return  # open (local development)
    if not x_api_key or not hmac.compare_digest(x_api_key, expected):
        raise HTTPException(status_code=401, detail="Invalid or missing API key.")


async def read_resume(file: UploadFile) -> str:
    data = await file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="Resume is larger than 5 MB.")
    if not data:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    is_pdf = data[:5] == b"%PDF-"
    is_text = (file.filename or "").lower().endswith(".txt")
    if not (is_pdf or is_text):
        raise HTTPException(status_code=415, detail="Only PDF (or .txt) resumes are supported.")
    try:
        text = extract_text(data, file.filename or "")
    except Exception:
        raise HTTPException(status_code=422, detail="Could not read this PDF.")
    if len(text.strip()) < 30:
        raise HTTPException(
            status_code=422,
            detail="No readable text found. Scanned/image-only resumes are not supported.",
        )
    return text


def as_list(value: str) -> list[str]:
    """Accepts a JSON array ('["Java","SQL"]') or a comma-separated string."""
    value = (value or "").strip()
    if not value:
        return []
    if value.startswith("["):
        try:
            parsed = json.loads(value)
            return [str(x).strip() for x in parsed if str(x).strip()]
        except json.JSONDecodeError:
            pass
    return [p.strip() for p in value.split(",") if p.strip()]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/parse", dependencies=[Depends(require_key)])
async def parse(file: UploadFile = File(...)):
    return parse_resume(await read_resume(file))


@app.post("/analyze", dependencies=[Depends(require_key)])
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    required_skills: str = Form(""),
):
    text = await read_resume(file)
    parsed = parse_resume(text)
    result = analyze(text, parsed["skills"], job_description, as_list(required_skills))
    result["parsed"] = {
        "education": parsed["education"],
        "years_of_experience": parsed["years_of_experience"],
        "projects": parsed["projects"],
        "certifications": parsed["certifications"],
    }
    return result


class AnalyzeTextBody(BaseModel):
    resume_text: str = Field(min_length=30, max_length=60000)
    job_description: str = ""
    required_skills: list[str] = []


@app.post("/analyze-text", dependencies=[Depends(require_key)])
def analyze_text(body: AnalyzeTextBody):
    parsed = parse_resume(body.resume_text)
    return analyze(body.resume_text, parsed["skills"], body.job_description, body.required_skills)


@app.post("/recommend", dependencies=[Depends(require_key)])
async def recommend(file: UploadFile = File(...), jobs: str = Form(...), top_n: int = Form(10)):
    try:
        job_list = json.loads(jobs)
        assert isinstance(job_list, list)
    except Exception:
        raise HTTPException(status_code=400, detail="`jobs` must be a JSON array.")
    text = await read_resume(file)
    parsed = parse_resume(text)
    return {
        "extracted_skills": parsed["skills"],
        "recommendations": recommend_jobs(text, parsed["skills"], job_list[:200], max(1, min(top_n, 50))),
    }
