import logging

from apps.analysis.services.profile_context_builder import (
    ProfileContextBuilder,
)
from apps.analysis.services.prompt_builder import (
    PromptBuilder,
)
from apps.analysis.services.llm_service import (
    LLMService,
)
from apps.analysis.services.response_parser import (
    AIResponseParser,
)


logger = logging.getLogger(__name__)


class ProfileAnalysisService:
    """
    Orchestrates the complete AI analysis pipeline.
    """

    def __init__(self):

        self.context_builder = ProfileContextBuilder()
        self.prompt_builder = PromptBuilder()
        self.llm_service = LLMService()
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

        profile, profile_context = self.context_builder.build(
            profile_id
        )

        logger.info(
            "Profile context built successfully."
        )

        # --------------------------------------------------
        # Build Prompt
        # --------------------------------------------------

        prompt = self.prompt_builder.build(
            profile_context=profile_context,
            job_description=job_description,
        )

        logger.info(
            "Prompt generated successfully."
        )

        # --------------------------------------------------
        # Call OpenAI
        # --------------------------------------------------

        ai_response = self.llm_service.generate(
            prompt=prompt,
        )

        logger.info(
            "AI response received."
        )

        # --------------------------------------------------
        # Parse Response
        # --------------------------------------------------

        analysis = self.response_parser.parse(
            ai_response
        )

        logger.info(
            "AI response parsed successfully."
        )

        return {
        "profile": {
            "id": profile.id,
            "name": profile.name,
            "headline": profile.headline,
            "location": profile.location,
            "linkedin_url": profile.linkedin_url,
            "current_company": profile.current_company_name,
            "last_synced_at": profile.last_synced_at,
        },
        "analysis": analysis,
    }