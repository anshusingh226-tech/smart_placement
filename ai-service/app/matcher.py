"""Resume <-> job matching.

score = 70% skill coverage + 30% text similarity (when the job lists skills),
otherwise 100% text similarity. Text similarity is TF-IDF cosine by default;
set EMBEDDING_MODEL to use sentence-transformers instead (needs more RAM).
"""
from __future__ import annotations

import os
from functools import lru_cache

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .skills import RELATED, canonical, extract_skills

SKILL_WEIGHT = 0.7
TEXT_WEIGHT = 0.3
# TF-IDF cosine between a resume and a short job post rarely exceeds ~0.5,
# so scale it so a strong textual match can reach 100%.
TFIDF_FULL_SCORE = 0.5


@lru_cache(maxsize=1)
def _embedder():
    name = os.getenv("EMBEDDING_MODEL", "").strip()
    if not name:
        return None
    try:
        from sentence_transformers import SentenceTransformer

        return SentenceTransformer(name)
    except Exception as exc:  # library or model not available -> fall back to TF-IDF
        print(f"[matcher] embeddings unavailable ({exc}); using TF-IDF")
        return None


def text_similarity(a: str, b: str) -> float:
    if not a.strip() or not b.strip():
        return 0.0
    model = _embedder()
    if model is not None:
        vecs = model.encode([a[:4000], b[:4000]], normalize_embeddings=True)
        return float(max(0.0, min(1.0, vecs[0] @ vecs[1])))
    try:
        tfidf = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), sublinear_tf=True)
        m = tfidf.fit_transform([a, b])
        raw = float(cosine_similarity(m[0], m[1])[0][0])
    except ValueError:  # empty vocabulary
        return 0.0
    return min(1.0, raw / TFIDF_FULL_SCORE)


def normalise_required(required_skills: list[str]) -> list[str]:
    seen, out = set(), []
    for s in required_skills:
        c = canonical(s)
        if c and c.lower() not in seen:
            seen.add(c.lower())
            out.append(c)
    return out


def analyze(
    resume_text: str,
    resume_skills: list[str],
    job_description: str = "",
    required_skills: list[str] | None = None,
) -> dict:
    required = normalise_required(required_skills or [])
    # Skills mentioned in the description also count as expected skills
    described = extract_skills(job_description or "", skills_section=job_description or "")
    job_skills = normalise_required(required + described)

    have = {s.lower() for s in resume_skills}
    matched = [s for s in job_skills if s.lower() in have]
    missing = [s for s in job_skills if s.lower() not in have]

    sim = text_similarity(resume_text, f"{job_description}\n{' '.join(job_skills)}")
    if job_skills:
        coverage = len(matched) / len(job_skills)
        score = SKILL_WEIGHT * coverage + TEXT_WEIGHT * sim
    else:
        coverage = None
        score = sim

    # Recommended: missing skills first, then skills related to what the job wants
    recommended = list(missing)
    for s in job_skills:
        for rel in RELATED.get(s, []):
            if rel.lower() not in have and rel not in recommended and rel not in job_skills:
                recommended.append(rel)

    return {
        "match_percentage": round(score * 100, 1),
        "extracted_skills": sorted(resume_skills),
        "matched_skills": matched,
        "missing_skills": missing,
        "recommended_skills": recommended[:10],
        "breakdown": {
            "skill_coverage": None if coverage is None else round(coverage * 100, 1),
            "text_similarity": round(sim * 100, 1),
            "engine": "embeddings" if _embedder() is not None else "tfidf",
        },
    }


def recommend_jobs(resume_text: str, resume_skills: list[str], jobs: list[dict], top_n: int = 10) -> list[dict]:
    ranked = []
    for job in jobs:
        res = analyze(resume_text, resume_skills, job.get("description", ""), job.get("required_skills", []))
        ranked.append(
            {
                "id": job.get("id"),
                "role": job.get("role"),
                "match_percentage": res["match_percentage"],
                "missing_skills": res["missing_skills"],
            }
        )
    ranked.sort(key=lambda r: r["match_percentage"], reverse=True)
    return ranked[:top_n]
