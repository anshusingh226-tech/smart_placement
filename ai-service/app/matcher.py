"""Resume <-> job matching.

The match % combines five parts. A part that cannot be judged (for example
eligibility when we know nothing about the student) is skipped and the other
weights are scaled up, so the score is always out of 100.

  skills       40  required skills on the resume, or proven by an assessment
  experience   20  internships/projects that actually use the job's skills,
                   plus relevant years vs. what the description asks for
  eligibility  15  CGPA, branch and aptitude vs. the job's minimums
  education    10  highest degree level
  similarity   15  how close the resume wording is to the job description

Text similarity is TF-IDF by default; set EMBEDDING_MODEL to use
sentence-transformers (needs more RAM).
"""
from __future__ import annotations

import os
import re
from functools import lru_cache

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .skills import RELATED, canonical, extract_skills

WEIGHTS = {"skills": 40, "experience": 20, "eligibility": 15, "education": 10, "similarity": 15}
LABELS = {
    "skills": "Required skills",
    "experience": "Relevant experience",
    "eligibility": "Eligibility fit",
    "education": "Education",
    "similarity": "Description similarity",
}
DEFAULT_SKILL_PASS = 60.0  # assessment % that proves a skill when the job sets none
TFIDF_FULL_SCORE = 0.5     # TF-IDF cosine rarely exceeds ~0.5 for resume vs job post


@lru_cache(maxsize=1)
def _embedder():
    name = os.getenv("EMBEDDING_MODEL", "").strip()
    if not name:
        return None
    try:
        from sentence_transformers import SentenceTransformer

        return SentenceTransformer(name)
    except Exception as exc:  # library or model unavailable -> TF-IDF
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
    except ValueError:
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


def min_years_required(description: str) -> int | None:
    m = re.search(r"(\d{1,2})\s*\+?\s*(?:-\s*\d{1,2}\s*)?(?:years?|yrs?)\b", description or "", re.I)
    return int(m.group(1)) if m else None


def _ratio(x: float | None) -> float | None:
    return None if x is None else max(0.0, min(1.0, x))


# ---------------------------------------------------------------- components

def skills_component(resume_skills, job_skills, student_scores, pass_pct):
    if not job_skills:
        return None, "The job lists no required skills."
    have = {s.lower() for s in resume_skills}
    scores = {canonical(k).lower(): float(v) for k, v in (student_scores or {}).items()}
    threshold = pass_pct if pass_pct and pass_pct > 0 else DEFAULT_SKILL_PASS

    points, verified, resume_only, missing = [], [], [], []
    for skill in job_skills:
        key = skill.lower()
        on_resume = key in have
        proven = scores.get(key, -1) >= threshold
        if on_resume and proven:
            points.append(1.0); verified.append(skill)
        elif proven:
            points.append(0.85); verified.append(skill)
        elif on_resume:
            points.append(0.7); resume_only.append(skill)
        else:
            points.append(0.0); missing.append(skill)
    note = f"{len(verified)} verified by assessment, {len(resume_only)} on resume only, {len(missing)} missing."
    return sum(points) / len(points), note


def _skills_used_in(texts: list[str], job_skills: list[str]) -> set[str]:
    wanted = {s.lower() for s in job_skills}
    found: set[str] = set()
    for t in texts:
        # ambiguous one-letter skills are not trusted outside a skills section
        found |= {s.lower() for s in extract_skills(t, "") if s.lower() in wanted}
    return found


def experience_component(parsed, job_skills, description):
    if parsed is None:
        return None, "Resume details were not available."
    exp_texts = parsed.get("experience", [])
    proj_texts = [f"{p.get('title', '')} {p.get('description', '')}" for p in parsed.get("projects", [])]

    used_exp = _skills_used_in(exp_texts, job_skills)
    used_proj = _skills_used_in(proj_texts, job_skills)
    relevant_experience = bool(used_exp)
    relevant_project = bool(used_proj)

    if job_skills:
        demonstrated = len(used_exp | used_proj) / len(job_skills)
    else:
        demonstrated = 0.5 if exp_texts else 0.3

    needed = min_years_required(description)
    years = float(parsed.get("years_of_experience", 0)) if relevant_experience else 0.0
    if needed:
        years_score = min(1.0, years / needed)
        years_note = f"{years:g} relevant year(s) vs {needed}+ asked"
    else:
        years_score = 1.0 if relevant_experience else (0.6 if relevant_project else 0.2)
        years_note = "relevant internship/job found" if relevant_experience else (
            "relevant project found, no relevant internship" if relevant_project else "no relevant experience found")

    note = f"{len(used_exp | used_proj)} of {len(job_skills)} required skills used in experience/projects; {years_note}."
    return 0.6 * demonstrated + 0.4 * years_score, note


def eligibility_component(student, job_rules):
    if not student:
        return None, "Student profile was not available."
    parts, notes = [], []
    min_cgpa = job_rules.get("min_cgpa") or 0
    cgpa = student.get("cgpa")
    if cgpa is None:
        parts.append(0.0); notes.append("CGPA missing")
    elif min_cgpa:
        parts.append(min(1.0, float(cgpa) / float(min_cgpa)))
        notes.append(f"CGPA {cgpa} vs {min_cgpa}")
    else:
        parts.append(1.0)

    branches = [b.lower() for b in job_rules.get("eligible_branches") or []]
    if branches:
        ok = (student.get("branch") or "").lower() in branches
        parts.append(1.0 if ok else 0.0)
        notes.append("branch eligible" if ok else "branch not eligible")

    min_apt = job_rules.get("min_aptitude") or 0
    apt = student.get("aptitude")
    if min_apt:
        if apt is None:
            parts.append(0.0); notes.append("aptitude not taken")
        else:
            parts.append(min(1.0, float(apt) / float(min_apt)))
            notes.append(f"aptitude {apt}% vs {min_apt}%")
    return sum(parts) / len(parts), "; ".join(notes) + "."


def education_component(parsed):
    if parsed is None:
        return None, "Resume details were not available."
    level = int(parsed.get("highest_degree_level", 0))
    score = {5: 1.0, 4: 1.0, 3: 1.0, 2: 0.6, 1: 0.3, 0: 0.4}[level]
    names = {5: "PhD", 4: "Master's", 3: "Bachelor's", 2: "Diploma", 1: "School level", 0: "not detected"}
    return score, f"Highest education: {names[level]}."


# ------------------------------------------------------------------- analyze

def analyze(
    resume_text: str,
    resume_skills: list[str],
    job_description: str = "",
    required_skills: list[str] | None = None,
    parsed: dict | None = None,
    context: dict | None = None,
) -> dict:
    context = context or {}
    student = context.get("student") or {}
    job_rules = context.get("job") or {}

    required = normalise_required(required_skills or [])
    described = extract_skills(job_description or "", skills_section=job_description or "")
    job_skills = normalise_required(required + described)

    scores = student.get("skill_scores") or {}
    threshold = job_rules.get("required_skill_percentage")
    have = {s.lower() for s in resume_skills}
    proven = {
        canonical(k).lower()
        for k, v in scores.items()
        if float(v) >= (threshold if threshold and threshold > 0 else DEFAULT_SKILL_PASS)
    }
    matched = [s for s in job_skills if s.lower() in have or s.lower() in proven]
    missing = [s for s in job_skills if s.lower() not in have and s.lower() not in proven]
    verified = [s for s in job_skills if s.lower() in proven]

    sim = text_similarity(resume_text, f"{job_description}\n{' '.join(job_skills)}")

    raw = {
        "skills": skills_component(resume_skills, job_skills, scores, threshold),
        "experience": experience_component(parsed, job_skills, job_description),
        "eligibility": eligibility_component(student, job_rules),
        "education": education_component(parsed),
        "similarity": (sim, "Wording overlap between the resume and the job."),
    }

    components, total_weight, weighted = [], 0, 0.0
    for key, (score, note) in raw.items():
        score = _ratio(score)
        components.append(
            {
                "key": key,
                "label": LABELS[key],
                "weight": WEIGHTS[key] if score is not None else 0,
                "score": None if score is None else round(score * 100, 1),
                "note": note,
            }
        )
        if score is not None:
            total_weight += WEIGHTS[key]
            weighted += WEIGHTS[key] * score
    # Scale weights so the available parts add up to 100
    for c in components:
        if c["weight"]:
            c["weight"] = round(c["weight"] * 100 / total_weight, 1)
    match = (weighted / total_weight * 100) if total_weight else 0.0

    recommended = list(missing)
    for s in job_skills:
        for rel in RELATED.get(s, []):
            if rel.lower() not in have and rel.lower() not in proven and rel not in recommended and rel not in job_skills:
                recommended.append(rel)

    return {
        "match_percentage": round(match, 1),
        "extracted_skills": sorted(resume_skills),
        "matched_skills": matched,
        "verified_skills": verified,
        "missing_skills": missing,
        "recommended_skills": recommended[:10],
        "breakdown": {
            "engine": "embeddings" if _embedder() is not None else "tfidf",
            "components": components,
        },
    }


def recommend_jobs(resume_text, resume_skills, jobs, top_n=10, parsed=None, context_student=None):
    ranked = []
    for job in jobs:
        ctx = {
            "student": context_student or {},
            "job": {
                "min_cgpa": job.get("minimum_cgpa"),
                "eligible_branches": job.get("eligible_branches"),
                "min_aptitude": job.get("minimum_aptitude_percentage"),
                "required_skill_percentage": job.get("required_skill_percentage"),
            },
        }
        res = analyze(resume_text, resume_skills, job.get("description", ""), job.get("required_skills", []), parsed, ctx)
        ranked.append({"id": job.get("id"), "role": job.get("role"),
                       "match_percentage": res["match_percentage"], "missing_skills": res["missing_skills"]})
    ranked.sort(key=lambda r: r["match_percentage"], reverse=True)
    return ranked[:top_n]
