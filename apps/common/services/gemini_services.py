import logging

from google import genai
from django.conf import settings

logger = logging.getLogger(__name__)


class GeminiServices:

    def __init__(self, model="gemini-2.5-flash"):
        self.model = model
        self.client = genai.Client(
            api_key=settings.GEMINI["GEMINI_API_KEY"],
        )

    def generate(self, prompt):
        logger.info(
            "Generating AI response.",
            extra={
                "provider": "gemini",
                "model": self.model,
            },
        )

        try:

            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )

            output = response.text.strip()

            logger.info("AI response generated successfully.")

            return output

        except Exception:

            logger.exception("Gemini API request failed.")

            raise
