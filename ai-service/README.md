# Resume AI service

FastAPI service that parses resumes (PDF) and scores how well they match a job.
Used by the Express backend (`/api/placement-officer/applications/:id/analyze`).

| Endpoint | What it does |
|---|---|
| `GET /health` | liveness check |
| `POST /parse` | resume file -> skills, education, experience, projects, certifications |
| `POST /analyze` | resume file + `job_description` + `required_skills` -> match %, extracted / missing / recommended skills |
| `POST /analyze-text` | same, from text you already have (JSON) |
| `POST /recommend` | resume file + `jobs` JSON -> jobs ranked by match |

Every endpoint except `/health` needs header `X-API-Key` when `AI_SERVICE_KEY` is set.

## Run locally (Windows PowerShell)
```
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```
Open http://localhost:8000/docs to try it. Then add to `backend/.env`:
```
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_KEY=<same value as in ai-service/.env, or leave both empty locally>
```

## Tests
```
pip install -r requirements-dev.txt
pytest
```

## How the score works
`70% skill coverage + 30% text similarity` (TF-IDF by default). If the job lists no
skills, the score is text similarity only. Set `EMBEDDING_MODEL` (see
`requirements-optional.txt`) for sentence-transformer embeddings; this needs more RAM
than Render's free plan.

## Deploy (Render)
`render.yaml` at this folder defines the web service. Set `AI_SERVICE_URL` and
`AI_SERVICE_KEY` on the Express backend to the deployed URL and the generated key.
The free plan sleeps when idle, so the first analysis after a pause can take ~1 minute.
