import json
from core.constants import AIConstant

class PromptBuilder:
    """
    Builds the prompt for the AI model.

    The prompt consists of:
    - System instructions
    - Job Description
    - LinkedIn Profile
    - Expected JSON Schema
    """

    def build(
        self,
        profile_context: dict,
        job_description: str,
    ) -> str:
        """
        Returns the complete prompt.
        """

        return f"""
You are an expert ATS Resume Reviewer and Senior Technical Recruiter.

Your task is to compare a LinkedIn profile against the given Job Description.

===========================
SCORING RULES
===========================

Overall Score = 100

Experience = {AIConstant.SCORE_DISTRIBUTION["experience"]}

Projects = {AIConstant.SCORE_DISTRIBUTION["projects"]}

Skills = {AIConstant.SCORE_DISTRIBUTION["skills"]}

Summary = {AIConstant.SCORE_DISTRIBUTION["summary"]}

Evaluate each section independently.

Do NOT inflate scores.

Be strict.

===========================
IMPORTANT
===========================

Skills are NOT available from LinkedIn scraping.

Infer skills ONLY from:

- Experience
- Projects
- Certifications
- Summary

If a required skill is missing, deduct marks.

===========================
JOB DESCRIPTION
===========================

{job_description}

===========================
LINKEDIN PROFILE
===========================

{json.dumps(profile_context, indent=2)}

===========================
RETURN FORMAT
===========================

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT wrap inside ```.

Return EXACTLY this structure.

{json.dumps(AIConstant.RESPONSE_SCHEMA, indent=2)}

===========================
SUGGESTION RULES
===========================

Suggestions should be specific.

Instead of:

"Improve experience"

Write:

"Add REST API development, authentication, Docker and deployment responsibilities to your Backend Developer experience."

Instead of:

"Improve projects"

Write:

"Add a scalable Django REST Framework project with Redis caching and Celery."

Suggestions should be actionable.

Return ONLY JSON.
"""