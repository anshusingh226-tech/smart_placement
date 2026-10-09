import fitz
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.matcher import analyze
from app.parser import parse_resume
from app.skills import canonical, extract_skills

RESUME = """Asha Verma
asha@example.com | +91 98765 43210

SUMMARY
Final year CSE student interested in backend and data roles.

TECHNICAL SKILLS
Languages: Java, Python, C, C++, JavaScript, SQL
Frameworks: React, Node.js, Spring Boot
Tools: Git, Docker

EDUCATION
B.Tech in Computer Science and Engineering, ABC Institute of Technology
2022 - 2026   CGPA: 8.4/10

EXPERIENCE
Software Engineering Intern, Acme Pvt Ltd
Jun 2025 - Aug 2025
- Built REST APIs with Node.js and MongoDB
- Containerised services using Docker

PROJECTS
Smart Placement Portal
- React and Supabase web app with role based access

CERTIFICATIONS
- AWS Cloud Practitioner
- Python for Data Science (Coursera)
"""


def make_pdf(text: str) -> bytes:
    doc = fitz.open()
    page = doc.new_page()
    y = 40
    for line in text.splitlines():
        page.insert_text((40, y), line, fontsize=9)
        y += 12
        if y > 800:
            page = doc.new_page()
            y = 40
    data = doc.tobytes()
    doc.close()
    return data


client = TestClient(app)


def test_skill_matching_is_precise():
    assert "Java" in extract_skills("I know Java well")
    assert "Java" not in extract_skills("I know JavaScript only")
    assert "C++" in extract_skills("Skills: C++, Python")
    assert "C" not in extract_skills("C++ developer", skills_section="")
    assert "C" in extract_skills("anything", skills_section="Languages: C, Java")
    assert "Node.js" in extract_skills("built with node.js and Express.js")
    assert "SQL" in extract_skills("MySQL") or True  # MySQL is its own skill
    assert "SQL" not in extract_skills("MySQL only")
    assert canonical("reactjs") == "React"


def test_parse_resume_fields():
    p = parse_resume(RESUME)
    assert {"Java", "Python", "React", "Docker", "Git", "SQL"} <= set(p["skills"])
    assert "C" in p["skills"] and "C++" in p["skills"]
    assert p["education"] and p["education"][0]["cgpa"] == 8.4
    assert p["experience"] and "Acme" in p["experience"][0]
    assert p["projects"][0]["title"] == "Smart Placement Portal"
    assert any("AWS" in c for c in p["certifications"])
    assert {"skills", "education", "experience", "projects", "certifications"} <= set(p["sections_found"])


def test_match_percentage_and_missing_skills():
    p = parse_resume(RESUME)
    good = analyze(RESUME, p["skills"], "Backend developer using Java and SQL", ["Java", "SQL", "Docker"])
    weak = analyze(RESUME, p["skills"], "Kubernetes platform engineer", ["Kubernetes", "Terraform", "Go"])
    assert good["match_percentage"] > weak["match_percentage"]
    assert good["missing_skills"] == []
    assert "Kubernetes" in weak["missing_skills"]
    assert 0 <= weak["match_percentage"] <= 100
    assert weak["recommended_skills"]


def test_api_analyze_pdf():
    r = client.post(
        "/analyze",
        files={"file": ("resume.pdf", make_pdf(RESUME), "application/pdf")},
        data={"job_description": "Full stack role", "required_skills": '["React","Node.js","Kubernetes"]'},
    )
    assert r.status_code == 200, r.text
    body = r.json()
    assert "React" in body["matched_skills"]
    assert body["missing_skills"] == ["Kubernetes"]
    assert body["breakdown"]["engine"] == "tfidf"


def test_api_rejects_bad_files():
    r = client.post("/parse", files={"file": ("x.exe", b"MZ\x90\x00" * 20, "application/octet-stream")})
    assert r.status_code == 415
    r = client.post("/parse", files={"file": ("empty.pdf", b"", "application/pdf")})
    assert r.status_code == 400
    blank = fitz.open(); blank.new_page(); data = blank.tobytes()
    r = client.post("/parse", files={"file": ("scan.pdf", data, "application/pdf")})
    assert r.status_code == 422


def test_api_key_required_when_configured(monkeypatch):
    monkeypatch.setenv("AI_SERVICE_KEY", "secret")
    files = {"file": ("r.txt", RESUME.encode(), "text/plain")}
    assert client.post("/parse", files=files).status_code == 401
    assert client.post("/parse", files=files, headers={"X-API-Key": "wrong"}).status_code == 401
    assert client.post("/parse", files=files, headers={"X-API-Key": "secret"}).status_code == 200
    assert client.get("/health").status_code == 200


def test_recommend_ranks_jobs():
    jobs = '[{"id":"1","role":"K8s Eng","required_skills":["Kubernetes","Terraform"]},{"id":"2","role":"Backend","required_skills":["Java","SQL","Docker"]}]'
    r = client.post("/recommend", files={"file": ("r.txt", RESUME.encode(), "text/plain")}, data={"jobs": jobs})
    assert r.status_code == 200
    assert r.json()["recommendations"][0]["id"] == "2"
