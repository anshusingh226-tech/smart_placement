"""Skill vocabulary: canonical name -> aliases (all matched case-insensitively).

Skills in AMBIGUOUS are short or common words ("C", "R", "Go"). They are only
trusted when they appear in the resume's skills section.
"""
import re

SKILLS: dict[str, list[str]] = {
    # Languages
    "Java": ["java", "core java"],
    "Python": ["python", "python3"],
    "C": ["c", "c programming", "c language"],
    "C++": ["c++", "cpp"],
    "C#": ["c#", "csharp"],
    "JavaScript": ["javascript", "js", "es6", "ecmascript"],
    "TypeScript": ["typescript"],
    "Go": ["go", "golang"],
    "R": ["r"],
    "PHP": ["php"],
    "Kotlin": ["kotlin"],
    "Swift": ["swift"],
    "Rust": ["rust"],
    # Web
    "HTML": ["html", "html5"],
    "CSS": ["css", "css3"],
    "React": ["react", "reactjs", "react.js"],
    "Angular": ["angular", "angularjs"],
    "Vue": ["vue", "vuejs", "vue.js"],
    "Next.js": ["next.js", "nextjs"],
    "Node.js": ["node.js", "nodejs", "node js"],
    "Express": ["express.js", "expressjs"],
    "Tailwind CSS": ["tailwind", "tailwind css", "tailwindcss"],
    "Bootstrap": ["bootstrap"],
    "Redux": ["redux"],
    "REST API": ["rest api", "rest apis", "restful", "restful api", "restful apis"],
    "GraphQL": ["graphql"],
    # Backend frameworks
    "Spring Boot": ["spring boot", "springboot"],
    "Django": ["django"],
    "Flask": ["flask"],
    "FastAPI": ["fastapi"],
    # Databases
    "SQL": ["sql"],
    "MySQL": ["mysql"],
    "PostgreSQL": ["postgresql", "postgres"],
    "MongoDB": ["mongodb", "mongo"],
    "Redis": ["redis"],
    "Firebase": ["firebase"],
    "Supabase": ["supabase"],
    "DBMS": ["dbms", "database management", "database management systems"],
    # CS fundamentals
    "Data Structures": ["data structures", "dsa", "data structures and algorithms"],
    "Algorithms": ["algorithms", "algorithm design"],
    "Operating Systems": ["operating systems", "operating system", "os concepts"],
    "Computer Networks": ["computer networks", "computer networking", "networking"],
    "OOP": ["oop", "oops", "object oriented programming", "object-oriented programming"],
    "System Design": ["system design"],
    # Data / ML
    "Machine Learning": ["machine learning", "ml"],
    "Deep Learning": ["deep learning"],
    "NLP": ["nlp", "natural language processing"],
    "Data Analysis": ["data analysis", "data analytics"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Scikit-learn": ["scikit-learn", "sklearn", "scikit learn"],
    "TensorFlow": ["tensorflow"],
    "PyTorch": ["pytorch"],
    "Power BI": ["power bi", "powerbi"],
    "Tableau": ["tableau"],
    # Cloud / DevOps
    "Cloud Computing": ["cloud computing"],
    "AWS": ["aws", "amazon web services"],
    "Azure": ["azure"],
    "GCP": ["gcp", "google cloud"],
    "Docker": ["docker"],
    "Kubernetes": ["kubernetes", "k8s"],
    "Git": ["git", "github", "gitlab"],
    "CI/CD": ["ci/cd", "cicd", "jenkins", "github actions"],
    "Linux": ["linux", "unix"],
    # Other
    "Aptitude": ["aptitude", "quantitative aptitude", "logical reasoning"],
    "Agile": ["agile", "scrum"],
    "Testing": ["unit testing", "junit", "pytest", "jest", "selenium", "manual testing"],
}

# Short / common words that are only trusted inside a skills section.
AMBIGUOUS = {"C", "R", "Go"}

# Used for "recommended skills": things worth learning next to a given skill.
RELATED: dict[str, list[str]] = {
    "Java": ["Spring Boot", "SQL", "Data Structures"],
    "Python": ["Django", "FastAPI", "Pandas", "Machine Learning"],
    "JavaScript": ["TypeScript", "React", "Node.js"],
    "React": ["Redux", "TypeScript", "Next.js", "REST API"],
    "Node.js": ["Express", "MongoDB", "REST API"],
    "SQL": ["PostgreSQL", "MySQL", "DBMS"],
    "MongoDB": ["Node.js", "Express"],
    "Docker": ["Kubernetes", "CI/CD", "Linux"],
    "AWS": ["Docker", "Linux", "CI/CD"],
    "Cloud Computing": ["AWS", "Docker", "Kubernetes"],
    "Machine Learning": ["Python", "Scikit-learn", "TensorFlow", "Pandas"],
    "Deep Learning": ["PyTorch", "TensorFlow", "Machine Learning"],
    "Data Analysis": ["Pandas", "SQL", "Power BI", "Tableau"],
    "HTML": ["CSS", "JavaScript"],
    "CSS": ["Tailwind CSS", "Bootstrap"],
    "Git": ["CI/CD", "Docker"],
    "C++": ["Data Structures", "Algorithms", "Operating Systems"],
    "C": ["Operating Systems", "Data Structures", "Computer Networks"],
    "Data Structures": ["Algorithms", "System Design"],
    "Algorithms": ["Data Structures", "System Design"],
}


def _alias_pattern(alias: str) -> str:
    # Letters/digits/+/#/. may not touch the match, so "Java" != "JavaScript"
    # and "C" != "C++". A trailing "." (end of sentence) is allowed.
    return rf"(?<![A-Za-z0-9+#.]){re.escape(alias)}(?![A-Za-z0-9+#]|\.[A-Za-z0-9])"


_COMPILED = {
    name: re.compile("|".join(_alias_pattern(a) for a in sorted(aliases, key=len, reverse=True)), re.I)
    for name, aliases in SKILLS.items()
}

_LOOKUP = {a.lower(): name for name, aliases in SKILLS.items() for a in aliases}
_LOOKUP.update({name.lower(): name for name in SKILLS})


def canonical(name: str) -> str:
    """Map any alias ("reactjs") to its canonical name ("React"); unknown names pass through."""
    key = name.strip().lower()
    return _LOOKUP.get(key, name.strip())


def extract_skills(text: str, skills_section: str = "") -> list[str]:
    """Find known skills in `text`. Ambiguous ones need to appear in `skills_section`."""
    found: list[str] = []
    for name, pattern in _COMPILED.items():
        if name in AMBIGUOUS:
            if pattern.search(skills_section or ""):
                found.append(name)
        elif pattern.search(text):
            found.append(name)
    return sorted(found)
