import logging

from apps.analysis.models import Analysis
from apps.analysis.services.llm_service import LLMService
from apps.analysis.services.profile_context_builder import \
    ProfileContextBuilder
from apps.analysis.services.prompt_builder import PromptBuilder
from apps.analysis.services.response_parser import AIResponseParser

logger = logging.getLogger(__name__)


class ProfileAnalysisService:
    """
    Orchestrates the complete AI analysis pipeline.
    service can be:
    gemini -> for Gemini AI Integration
    openai -> for OpenAI Integration
    """

    service = "openai"

    def __init__(self):

        self.context_builder = ProfileContextBuilder()
        self.prompt_builder = PromptBuilder()
        self.llm_service = LLMService(ProfileAnalysisService.service)
        self.response_parser = AIResponseParser()

    def analyze(
        self,
        profile_id: int,
        job_description: str,
    ) -> dict:
        """
        Analyze LinkedIn profile against job description.
        """

        logger.info(
            "Starting profile analysis.",
            extra={
                "profile_id": profile_id,
            },
        )

        # --------------------------------------------------
        # Build Profile Context
        # --------------------------------------------------

        profile, profile_context = self.context_builder.build(profile_id)

        logger.info("Profile context built successfully.")

        # --------------------------------------------------
        # Build Prompt
        # --------------------------------------------------

        prompt = self.prompt_builder.build(
            profile_context=profile_context,
            job_description=job_description,
        )

        logger.info(f"Prompt generated successfully. prompt = {prompt}")

        # --------------------------------------------------
        # Call AI Services
        # --------------------------------------------------
        # ai_response = self.llm_service.generate(
        #     prompt=prompt,
        # )
        # Since AI Services needs some amount of money to access the APIs, here is the sample data received from chatgpt usi response for the same prompt
        ai_response = {
            "overall_score": 69,
            "breakdown": {"experience": 23, "projects": 23, "skills": 18, "summary": 5},
            "strengths": [
                "More than 2 years of software engineering experience across recognized organizations.",
                "Strong Python foundation supported by multiple Python certifications.",
                "Experience with backend-oriented projects using Django and Python.",
                "Good exposure to SQL/MySQL through certifications and Python database projects.",
                "Bachelor of Technology in Computer Science aligns with job requirements.",
                "Git and GitHub certification supports version control knowledge.",
            ],
            "missing_keywords": [
                "FastAPI",
                "Flask",
                "REST API",
                "GraphQL",
                "Django REST Framework",
                "PostgreSQL",
                "Django ORM",
                "SQLAlchemy",
                "asyncio",
                "Asynchronous Programming",
                "pytest",
                "unittest",
                "Unit Testing",
                "Integration Testing",
                "Docker",
                "AWS",
                "Google Cloud",
                "Azure",
                "Redis",
                "MongoDB",
                "NoSQL",
                "CI/CD",
                "Performance Optimization",
                "Code Reviews",
                "Agile",
                "Sprint Planning",
                "Virtual Environments",
                "venv",
                "Poetry",
                "Scalable Backend Services",
                "Microservices",
            ],
            "suggestions": {
                "summary": [
                    "Add a professional summary highlighting 2+ years of Python backend development experience.",
                    "Mention expertise in Python, Django, REST APIs, SQL databases, Git and backend architecture.",
                    "Include experience building scalable backend services, debugging production issues and optimizing application performance.",
                    "Mention collaboration with cross-functional teams using Agile methodologies.",
                    "Add keywords such as Django, FastAPI, REST API, MySQL, PostgreSQL, Docker, AWS and CI/CD where applicable.",
                ],
                "experience": [
                    "Expand each Software Engineer role by describing backend responsibilities instead of only job titles.",
                    "Mention Python, Django, REST API development, authentication, database schema design and ORM usage if applicable.",
                    "Add measurable achievements such as API response improvements, performance optimization, scalability enhancements or production bug fixes.",
                    "Include testing responsibilities using pytest or unittest and participation in code reviews.",
                    "Highlight Git workflows, Agile ceremonies, sprint planning and collaboration with product teams.",
                    "Mention cloud deployments, Docker, Redis, MongoDB or CI/CD exposure if you have worked with them.",
                ],
                "education": [
                    "Add relevant coursework such as Data Structures, Operating Systems, Database Management Systems and Software Engineering.",
                    "Include notable academic backend projects if they demonstrate Python or web development expertise.",
                ],
                "projects": [
                    "Expand every project with the technology stack, architecture and your individual contributions.",
                    "Enhance the URL Shortener project by mentioning Django REST Framework, authentication, database design, caching, testing and deployment.",
                    "Add a production-style backend project using FastAPI or Django REST Framework with JWT authentication and Swagger documentation.",
                    "Include Docker, Redis, Celery, PostgreSQL and cloud deployment in at least one backend project.",
                    "Describe performance metrics such as reduced response time, concurrent users supported or optimized database queries.",
                    "Add GitHub links and quantify project outcomes where possible.",
                    "Include unit testing and integration testing details for backend applications.",
                ],
                "skills": [
                    "Demonstrate Django ORM or SQLAlchemy usage through experience or projects.",
                    "Show evidence of REST API development and API documentation.",
                    "Learn and showcase Docker containerization.",
                    "Gain experience with AWS, Azure or Google Cloud deployment.",
                    "Add Redis or MongoDB experience through practical projects.",
                    "Include pytest or unittest in projects and work experience.",
                    "Mention Git workflows, virtual environments (venv or Poetry), CI/CD pipelines and asynchronous programming using asyncio.",
                    "Ensure all inferred skills are supported by project or experience descriptions rather than certifications alone.",
                ],
            },
        }

        logger.info("AI response received.")

        # --------------------------------------------------
        # Parse Response
        # --------------------------------------------------
        # since i'm using API from backend now, we can ignore parser. i have taken parsed data only.
        # analysis = self.response_parser.parse(ai_response)

        analysis = ai_response

        logger.info("AI response parsed successfully.")

        # --------------------------------------------------
        # Store Analysis and return analysis id
        # --------------------------------------------------

        analysis_result = Analysis.objects.create(
            profile=profile,
            job_description=job_description,
            overall_score=analysis["overall_score"],
            experience_score=analysis["breakdown"]["experience"],
            projects_score=analysis["breakdown"]["projects"],
            skills_score=analysis["breakdown"]["skills"],
            summary_score=analysis["breakdown"]["summary"],
            strengths=analysis["strengths"],
            missing_keywords=analysis["missing_keywords"],
            suggestions=analysis["suggestions"],
            llm_response=analysis,
        )
        return analysis_result
