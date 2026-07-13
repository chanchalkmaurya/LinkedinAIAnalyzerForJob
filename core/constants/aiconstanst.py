class AIConstant:
    SCORE_DISTRIBUTION = {
        "experience": 30,
        "projects": 30,
        "skills": 30,
        "summary": 10,
    }

    RESPONSE_SCHEMA = {
        "overall_score": 0,
        "breakdown": {
            "experience": 0,
            "projects": 0,
            "skills": 0,
            "summary": 0,
        },
        "strengths": [],
        "missing_keywords": [],
        "suggestions": {
            "summary": [],
            "experience": [],
            "education": [],
            "projects": [],
            "skills": [],
        },
    }
