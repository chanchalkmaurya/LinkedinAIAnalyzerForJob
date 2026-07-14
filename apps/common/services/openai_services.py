import logging

from django.conf import settings
from openai import OpenAI

logger = logging.getLogger(__name__)


class OPENAIServices:

    def __init__(self, model="gpt-5-mini"):
        self.model = model
        self.client = OpenAI(
            api_key=settings.OPENAI["OPENAI_API_KEY"],
        )

    def generate(self, prompt):
        logger.info(
            "Generating AI response.",
            extra={
                "provider": "openai",
                "model": self.model,
            },
        )

        try:

            response = self.client.responses.create(model=self.model, input=prompt)

            output = response.output_text.strip()

            logger.info("AI response generated successfully.")

            return output

        except Exception:

            logger.exception("OpenAI API request failed.")

            raise
