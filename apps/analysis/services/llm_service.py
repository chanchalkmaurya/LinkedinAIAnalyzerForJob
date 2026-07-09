import logging

from openai import OpenAI
from django.conf import settings


logger = logging.getLogger(__name__)


class LLMService:
    """
    Wrapper around OpenAI Responses API.
    """

    DEFAULT_MODEL = "gpt-5-mini"

    def __init__(self):

        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY,
        )

    def generate(
        self,
        prompt: str,
        model: str | None = None,
    ) -> str:
        """
        Sends prompt to OpenAI and returns raw response text.
        """

        model = model or self.DEFAULT_MODEL

        logger.info(
            "Generating AI response.",
            extra={
                "model": model,
            },
        )

        try:

            response = self.client.responses.create(
                model=model,
                input=prompt,
                temperature=0.2,
            )

            output = response.output_text.strip()

            logger.info(
                "AI response generated successfully."
            )

            return output

        except Exception:

            logger.exception(
                "OpenAI API request failed."
            )

            raise