import json
import logging


logger = logging.getLogger(__name__)


class AIResponseParser:
    """
    Parses and validates the AI response.

    Expected Response:

    {
        "overall_score": int,
        "breakdown": {...},
        "strengths": [],
        "missing_keywords": [],
        "suggestions": {...}
    }
    """

    REQUIRED_KEYS = {
        "overall_score",
        "breakdown",
        "strengths",
        "missing_keywords",
        "suggestions",
    }

    BREAKDOWN_KEYS = {
        "experience",
        "projects",
        "skills",
        "summary",
    }

    SUGGESTION_KEYS = {
        "summary",
        "experience",
        "education",
        "projects",
        "skills",
    }

    MAX_SCORE = 100

    def parse(self, response: str) -> dict:
        """
        Parse and validate AI response.
        """

        response = self._clean_response(response)

        try:
            data = json.loads(response)

        except json.JSONDecodeError as exc:

            logger.exception("Invalid JSON returned by AI.")

            raise ValueError(
                "AI returned invalid JSON."
            ) from exc

        self._validate(data)

        return data

    ##########################################################

    def _clean_response(self, response: str) -> str:
        """
        Removes markdown if AI accidentally returns it.
        """

        response = response.strip()

        if response.startswith("```json"):
            response = response.replace("```json", "", 1)

        if response.startswith("```"):
            response = response.replace("```", "", 1)

        if response.endswith("```"):
            response = response[:-3]

        return response.strip()

    ##########################################################

    def _validate(self, data: dict) -> None:

        self._validate_root(data)

        self._validate_breakdown(data["breakdown"])

        self._validate_suggestions(data["suggestions"])

    ##########################################################

    def _validate_root(self, data: dict):

        missing = self.REQUIRED_KEYS - set(data.keys())

        if missing:

            raise ValueError(
                f"Missing response keys: {missing}"
            )

        if not isinstance(data["overall_score"], int):

            raise ValueError(
                "overall_score must be integer."
            )

        if not 0 <= data["overall_score"] <= self.MAX_SCORE:

            raise ValueError(
                "overall_score must be between 0-100."
            )

        if not isinstance(data["strengths"], list):

            raise ValueError(
                "strengths must be list."
            )

        if not isinstance(
            data["missing_keywords"],
            list,
        ):

            raise ValueError(
                "missing_keywords must be list."
            )

    ##########################################################

    def _validate_breakdown(
        self,
        breakdown: dict,
    ):

        missing = self.BREAKDOWN_KEYS - set(
            breakdown.keys()
        )

        if missing:

            raise ValueError(
                f"Missing breakdown keys: {missing}"
            )

        total = 0

        for key in self.BREAKDOWN_KEYS:

            score = breakdown[key]

            if not isinstance(score, int):

                raise ValueError(
                    f"{key} score must be integer."
                )

            if score < 0:

                raise ValueError(
                    f"{key} score cannot be negative."
                )

            total += score

        if total > self.MAX_SCORE:

            raise ValueError(
                "Breakdown score exceeds 100."
            )

    ##########################################################

    def _validate_suggestions(
        self,
        suggestions: dict,
    ):

        missing = self.SUGGESTION_KEYS - set(
            suggestions.keys()
        )

        if missing:

            raise ValueError(
                f"Missing suggestion keys: {missing}"
            )

        for key in self.SUGGESTION_KEYS:

            value = suggestions[key]

            if not isinstance(value, list):

                raise ValueError(
                    f"{key} suggestions must be list."
                )

            for item in value:

                if not isinstance(item, str):

                    raise ValueError(
                        f"{key} suggestions must contain only strings."
                    )