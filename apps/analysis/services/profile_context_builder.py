from django.shortcuts import get_object_or_404

from apps.linkedin.models import LinkedInProfile


class ProfileContextBuilder:
    """
    Builds an optimized JSON context for AI analysis.
    """

    def build(self, profile_id: int) -> dict:

        profile = self._get_profile(profile_id)

        context = {
            "profile": {
                "headline": profile.headline,
                "summary": profile.about,
                "current_company": profile.current_company_name,
                "location": profile.location,
            },
            "experience": [
                {
                    "company": experience.company,
                    "title": experience.title,
                    "description": experience.description,
                    "start_date": experience.start_date.isoformat()
                    if experience.start_date else None,
                    "end_date": experience.end_date.isoformat()
                    if experience.end_date else None,
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