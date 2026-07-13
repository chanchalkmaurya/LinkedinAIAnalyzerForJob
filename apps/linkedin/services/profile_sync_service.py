from __future__ import annotations

import logging

from django.db import transaction
from django.utils import timezone

from apps.linkedin.models import (
    LinkedInProfile,
    Experience,
    Education,
    Project,
    Certification,
)

from .enrichlayer_service import EnrichLayerService
from .profile_normalizer import ProfileNormalizer

logger = logging.getLogger(__name__)


class ProfileSyncService:
    """
    Fetches a LinkedIn profile from EnrichLayer (when required),
    normalizes it and synchronizes it with the database.
    """

    def __init__(self):

        self.enrichlayer = EnrichLayerService()
        self.normalizer = ProfileNormalizer()

    def sync(
        self,
        linkedin_url: str,
        updated_in_last_30_days: bool = False,
    ) -> LinkedInProfile:
        """
        Synchronize a LinkedIn profile.

        Flow

        1. Check cache.
        2. Decide refresh.
        3. Fetch latest profile if required.
        4. Normalize response.
        5. Save all records.
        """

        profile = self._get_existing_profile(linkedin_url)

        if profile and not updated_in_last_30_days:

            logger.info(
                "Using cached LinkedIn profile.",
                extra={
                    "linkedin_url": linkedin_url,
                },
            )

            return profile

        logger.info(
            "Fetching latest LinkedIn profile.",
            extra={
                "linkedin_url": linkedin_url,
            },
        )

        raw_profile = self.enrichlayer.get_profile(linkedin_url)

        normalized = self.normalizer.normalize(linkedin_url, raw_profile)

        print("=" * 20)
        print(normalized)
        print("=" * 20)

        with transaction.atomic():

            profile = self._create_or_update_profile(
                linkedin_url=linkedin_url,
                profile_data=normalized["profile"],
            )

            self._sync_experiences(
                profile,
                normalized["experiences"],
            )

            self._sync_educations(
                profile,
                normalized["educations"],
            )

            self._sync_projects(
                profile,
                normalized["projects"],
            )

            self._sync_certifications(
                profile,
                normalized["certifications"],
            )

        logger.info(
            "Profile synchronized successfully.",
            extra={
                "linkedin_profile_id": profile.id,
            },
        )

        return profile

    def _get_existing_profile(
        self,
        linkedin_url: str,
    ) -> LinkedInProfile | None:

        return LinkedInProfile.objects.filter(linkedin_url=linkedin_url).first()

    def _create_or_update_profile(
        self,
        linkedin_url: str,
        profile_data: dict,
    ) -> LinkedInProfile:

        profile, created = LinkedInProfile.objects.update_or_create(
            linkedin_url=linkedin_url,
            defaults={
                **profile_data,
                "last_synced": timezone.now(),
            },
        )

        logger.info(
            "%s LinkedIn profile.",
            "Created" if created else "Updated",
            extra={
                "linkedin_profile_id": profile.id,
            },
        )

        return profile

    def _sync_experiences(
        self,
        profile: LinkedInProfile,
        experiences: list[dict],
    ) -> None:
        """
        Replace all experiences of a profile.
        """

        Experience.objects.filter(profile=profile).delete()

        if not experiences:
            logger.info(
                "No experiences found.",
                extra={"profile_id": profile.id},
            )
            return

        experience_objects = [
            Experience(
                profile=profile,
                **experience,
            )
            for experience in experiences
        ]

        Experience.objects.bulk_create(experience_objects)

        logger.info(
            "%s experiences synchronized.",
            len(experience_objects),
            extra={"profile_id": profile.id},
        )

    def _sync_educations(
        self,
        profile: LinkedInProfile,
        educations: list[dict],
    ) -> None:
        """
        Replace all educations of a profile.
        """

        Education.objects.filter(profile=profile).delete()

        if not educations:
            logger.info(
                "No educations found.",
                extra={"profile_id": profile.id},
            )
            return

        education_objects = [
            Education(
                profile=profile,
                **education,
            )
            for education in educations
        ]

        Education.objects.bulk_create(education_objects)

        logger.info(
            "%s educations synchronized.",
            len(education_objects),
            extra={"profile_id": profile.id},
        )

    def _sync_projects(
        self,
        profile: LinkedInProfile,
        projects: list[dict],
    ) -> None:
        """
        Replace all projects of a profile.
        """

        Project.objects.filter(profile=profile).delete()

        if not projects:
            logger.info(
                "No projects found.",
                extra={"profile_id": profile.id},
            )
            return

        project_objects = [
            Project(
                profile=profile,
                **project,
            )
            for project in projects
        ]

        Project.objects.bulk_create(project_objects)

        logger.info(
            "%s projects synchronized.",
            len(project_objects),
            extra={"profile_id": profile.id},
        )

    def _sync_certifications(
        self,
        profile: LinkedInProfile,
        certifications: list[dict],
    ) -> None:
        """
        Replace all certifications of a profile.
        """

        Certification.objects.filter(profile=profile).delete()

        if not certifications:
            logger.info(
                "No certifications found.",
                extra={"profile_id": profile.id},
            )
            return

        certification_objects = [
            Certification(
                profile=profile,
                **certification,
            )
            for certification in certifications
        ]

        Certification.objects.bulk_create(certification_objects)

        logger.info(
            "%s certifications synchronized.",
            len(certification_objects),
            extra={"profile_id": profile.id},
        )
