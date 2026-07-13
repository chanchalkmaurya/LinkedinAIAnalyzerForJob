import requests

from django.conf import settings

from .exceptions import (
    EnrichLayerAPIException,
    EnrichLayerTimeoutException,
    EnrichLayerResponseException,
)

from core.constants import Endpoints
import logging

logger = logging.getLogger(__name__)


class EnrichLayerService:

    def __init__(self):
        self.base_url = settings.ENRICHLAYER["BASE_URL"]
        self.api_key = settings.ENRICHLAYER["API_KEY"]
        self.profile = Endpoints.PROFILE

    def get_profile(self, linkedin_url: str) -> dict:
        """
        Public method.
        """

        logger.info(
            "Fetching LinkedIn profile.",
            extra={
                "linkedin_url": linkedin_url,
            },
        )

        response = self._fetch_profile(linkedin_url)

        logger.info(
            "Profile fetched successfully.",
            extra={
                "linkedin_url": linkedin_url,
            },
        )

        return response

    @property
    def headers(self):
        return {"Authorization": f"Bearer {self.api_key}"}

    def _fetch_profile(self, linkedin_url: str) -> dict:
        """
        Fetch LinkedIn profile from EnrichLayer.
        """

        url = f"{self.base_url}/{self.profile}"
        params = {
            "profile_url": linkedin_url,
            "use_cache": "if-recent",
        }

        try:
            response = requests.get(url, params=params, headers=self.headers)

        except requests.Timeout as exc:
            logger.exception("Enrich Layer request Timeout.")
            raise EnrichLayerTimeoutException("EnrichLayer request timed out.") from exc

        except requests.HTTPError as exc:
            logger.exception("Enrich Layer HTTP Error.")
            raise EnrichLayerAPIException(
                f"HTTP {response.status_code}: {response.text}"
            ) from exc

        except requests.RequestException as exc:
            logger.exception("Network error while contacting EnrichLayer")
            raise EnrichLayerAPIException(str(exc)) from exc

        try:
            data = response.json()
        except ValueError as exc:
            logger.exception("Invalid JSON returned.")
            raise EnrichLayerResponseException("Invalid JSON response.") from exc

        if not isinstance(data, dict):
            logger.error("Unexpected response format received.")
            raise EnrichLayerResponseException("Unexpected response format.")
        logger.info("LinkedIn profile fetched successfully")
        return data
