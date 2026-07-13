from django.shortcuts import get_object_or_404

from apps.linkedin.models import LinkedInProfile

from .format_date import format_partial_date


class ProfileContextBuilder:
    """
    Builds an optimized JSON context for AI analysis.
    """

    def build(self, profile_id: int) -> dict:

        profile = self._get_profile(profile_id)

        context = {
            "profile": {
                "headline": profile.headline,
                "summary": profile.summary,
                "current_company": profile.current_company_name,
                "location": profile.location,
            },
            "experience": [
                {
                    "company": experience.company,
                    "title": experience.title,
                    "description": experience.description_HTML,
                    "start_date": format_partial_date(
                        experience.start_year,
                        experience.start_month,
                        experience.start_day,
                    ),
                    "end_date": format_partial_date(
                        experience.end_year, experience.end_month, experience.end_day
                    ),
                }
                for experience in profile.experiences.all()
            ],
            "education": [
                {
                    "school": education.school,
                    "degree": education.degree_name,
                    "field_of_study": education.field_of_study,
                    "description": education.description,
                    "grade": education.grade,
                }
                for education in profile.educations.all()
            ],
            "projects": [
                {
                    "title": project.title,
                    "description": project.description,
                }
                for project in profile.projects.all()
            ],
            "certifications": [
                {
                    "name": certification.name,
                    "authority": certification.authority,
                }
                for certification in profile.certifications.all()
            ],
        }

        return profile, context

    def _get_profile(self, profile_id: int) -> LinkedInProfile:
        """
        Fetch profile with all related objects to avoid N+1 queries.
        """

        return get_object_or_404(
            LinkedInProfile.objects.prefetch_related(
                "experiences",
                "educations",
                "projects",
                "certifications",
            ),
            pk=profile_id,
        )
