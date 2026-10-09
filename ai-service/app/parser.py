"""Resume parsing: PDF/text -> structured fields (skills, education, experience, ...)."""
from __future__ import annotations

import re
from datetime import date

from .skills import extract_skills

SECTION_ALIASES = {
    "skills": ["skills", "technical skills", "key skills", "core competencies", "technologies", "tech stack"],
    "education": ["education", "academic background", "academics", "educational qualification", "qualifications"],
    "experience": ["experience", "work experience", "professional experience", "internships", "internship experience", "employment", "work history"],
    "projects": ["projects", "academic projects", "personal projects", "project work", "key projects"],
    "certifications": ["certifications", "certificates", "courses", "licenses", "certifications and courses", "licenses & certifications"],
    "summary": ["summary", "objective", "career objective", "profile", "about me", "professional summary"],
    "other": ["achievements", "awards", "extracurricular", "extracurricular activities", "interests", "hobbies", "languages", "references", "positions of responsibility"],
}
_HEADING_LOOKUP = {a: k for k, v in SECTION_ALIASES.items() for a in v}

DEGREE_RE = re.compile(
    r"\b(b\.?\s?tech|m\.?\s?tech|b\.?\s?e\.?|m\.?\s?e\.?|b\.?\s?sc|m\.?\s?sc|bca|mca|bba|mba|b\.?\s?com|m\.?\s?com|"
    r"bachelor(?:'s)?(?: of [a-z ]+)?|master(?:'s)?(?: of [a-z ]+)?|diploma|ph\.?\s?d|hsc|ssc|"
    r"higher secondary|senior secondary|secondary school|class (?:x|xii|10|12)|intermediate)\b",
    re.I,
)
CGPA_RE = re.compile(r"(?:cgpa|gpa|cpi)\s*[:\-]?\s*(\d{1,2}(?:\.\d{1,2})?)(?:\s*/\s*(\d{1,2}))?", re.I)
PERCENT_RE = re.compile(r"(\d{2}(?:\.\d{1,2})?)\s*%")
YEAR_RE = re.compile(r"\b(19|20)\d{2}\b")
RANGE_RE = re.compile(
    r"\b((?:19|20)\d{2})\s*(?:-|–|—|to)\s*((?:19|20)\d{2}|present|current|ongoing|now)\b", re.I
)
BULLET_RE = re.compile(r"^\s*[•●▪‣\-\*•·▪►➢]+\s*")


def extract_text(data: bytes, filename: str = "") -> str:
    """Text from a PDF (PyMuPDF) or a plain-text upload."""
    if data[:5] == b"%PDF-":
        import fitz  # PyMuPDF

        with fitz.open(stream=data, filetype="pdf") as doc:
            return "\n".join(page.get_text("text") for page in doc)
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError:
        return data.decode("latin-1", errors="ignore")


def _heading_key(line: str) -> str | None:
    cleaned = re.sub(r"[^a-z& ]", "", line.lower()).strip()
    cleaned = re.sub(r"\s+", " ", cleaned)
    if not cleaned or len(cleaned) > 40:
        return None
    return _HEADING_LOOKUP.get(cleaned)


def split_sections(text: str) -> dict[str, str]:
    sections: dict[str, list[str]] = {"header": []}
    current = "header"
    for raw in text.splitlines():
        line = raw.strip()
        key = _heading_key(line) if line else None
        if key:
            current = key
            sections.setdefault(current, [])
            continue
        sections.setdefault(current, []).append(raw.rstrip())
    return {k: "\n".join(v).strip() for k, v in sections.items() if "\n".join(v).strip()}


def _clean(line: str) -> str:
    return BULLET_RE.sub("", line).strip()


def _paragraphs(block: str) -> list[list[str]]:
    """Group lines into entries separated by blank lines."""
    entries, cur = [], []
    for line in block.splitlines():
        if line.strip():
            cur.append(_clean(line))
        elif cur:
            entries.append(cur)
            cur = []
    if cur:
        entries.append(cur)
    return entries


def parse_education(section: str, full_text: str) -> list[dict]:
    source = section or full_text
    results = []
    lines = [l for l in (_clean(x) for x in source.splitlines()) if l]
    i = 0
    while i < len(lines):
        line = lines[i]
        if DEGREE_RE.search(line):
            window = " ".join(lines[i : i + 3])
            cg = CGPA_RE.search(window)
            pct = PERCENT_RE.search(window)
            years = [m.group(0) for m in YEAR_RE.finditer(window)]
            results.append(
                {
                    "degree": line[:160],
                    "cgpa": float(cg.group(1)) if cg else None,
                    "percentage": float(pct.group(1)) if pct else None,
                    "years": years[:2],
                }
            )
            i += 2
        else:
            i += 1
    return results[:8]


def estimate_years_of_experience(section: str) -> float:
    total = 0.0
    this_year = date.today().year
    for m in RANGE_RE.finditer(section):
        start = int(m.group(1))
        end_raw = m.group(2).lower()
        end = this_year if end_raw in {"present", "current", "ongoing", "now"} else int(end_raw)
        if end >= start:
            total += min(end - start, 15)
    # month-level precision is not available, so internships under a year count as 0.5
    if total == 0 and section.strip():
        total = 0.5
    return round(total, 1)


def parse_resume(text: str) -> dict:
    sections = split_sections(text)
    skills_section = sections.get("skills", "")
    exp = sections.get("experience", "")
    projects_block = sections.get("projects", "")
    cert_block = sections.get("certifications", "")

    experience = [" ".join(e)[:400] for e in _paragraphs(exp)][:10]
    projects = [
        {"title": e[0][:120], "description": " ".join(e[1:])[:400]}
        for e in _paragraphs(projects_block)
    ][:10]
    certifications = [l for l in (_clean(x) for x in cert_block.splitlines()) if l][:15]

    return {
        "skills": extract_skills(text, skills_section),
        "education": parse_education(sections.get("education", ""), text),
        "experience": experience,
        "years_of_experience": estimate_years_of_experience(exp) if exp else 0.0,
        "projects": projects,
        "certifications": certifications,
        "sections_found": sorted(k for k in sections if k != "header"),
        "text_length": len(text),
    }
