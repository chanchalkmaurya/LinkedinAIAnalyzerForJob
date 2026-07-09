from urllib.parse import urlparse

from .date_parser import parse_date_range


class ProfileNormalizer:
    """
    Converts raw EnrichLayer response into a normalized Python dictionary.
    """

    def normalize(self, data: dict) -> dict:
        return {
            "profile": self._normalize_profile(data),
            "experiences": self._normalize_experiences(
                data.get("experience", [])
            ),
            "educations": self._normalize_educations(
                data.get("education", [])
            ),
            "projects": self._normalize_projects(
                data.get("accomplishment_projects", [])
            ),
            "certifications": self._normalize_certifications(
                data.get("certifications", [])
            ),
        }

    # ------------------------------------------------------
    # Profile
    # ------------------------------------------------------

    def _normalize_profile(self, profile):

        return {

            "linkedin_id": profile.get("linkedin_id"),

            "linkedin_num_id": profile.get("linkedin_num_id"),

            "linkedin_url": self._normalize_url(
                profile.get("url")
            ),

            "full_name": profile.get("name", ""),

            "first_name": profile.get("first_name", ""),

            "last_name": profile.get("last_name", ""),

            "headline": profile.get("position", ""),

            "summary": profile.get("about") or "",

            "city": profile.get("city") or "",

            "location": profile.get("location") or "",

            "country_code": profile.get("country_code") or "",

            "avatar": self._normalize_url(
                profile.get("avatar")
            ),

            "followers": profile.get("followers"),

            "connections": profile.get("connections"),

            "current_company_name": profile.get(
                "current_company_name"
            )
            or "",
        }

    # ------------------------------------------------------
    # Experience
    # ------------------------------------------------------

    def _normalize_experiences(self, experiences):
        normalized = []
        for order, exp in enumerate(experiences or []):
            item = {
                "company": exp.get("company") or "",
                "title": exp.get("title") or "",
                "description": exp.get("description_html")
                or "",
                "company_logo_url": self._normalize_url(
                    exp.get("company_logo_url")
                ),
                "display_order": order,
            }

            item.update(
                parse_date_range(
                    exp.get("starts_at"),
                    exp.get("ends_at"),
                )
            )

            normalized.append(item)

        return normalized

    # ------------------------------------------------------
    # Education
    # ------------------------------------------------------

    def _normalize_educations(self, educations):

        normalized = []

        for order, edu in enumerate(educations):

            item = {
                "school": edu.get("school") or "",
                "degree_name": edu.get("degree_name") or "",
                "field_of_study": edu.get("field_of_study") or "",
                "description": edu.get("description") or "",
                "grade": edu.get("grade") or "",
                "activities_and_societies": edu.get(
                    "activities_and_societies"
                )
                or "",
                "school_linkedin_url": self._normalize_url(
                    edu.get("school_linkedin_profile_url")
                ),
                "school_facebook_url": self._normalize_url(
                    edu.get("school_facebook_profile_url")
                ),
                "logo_url": self._normalize_url(
                    edu.get("logo_url")
                ),
                "display_order": order,
            }

            item.update(
                parse_date_range(
                    edu.get("starts_at"),
                    edu.get("ends_at"),
                )
            )

            normalized.append(item)

        return normalized

    # ------------------------------------------------------
    # Projects
    # ------------------------------------------------------

    def _normalize_projects(self, projects):

        normalized = []

        for order, project in enumerate(projects):

            item = {
                "title": project.get("title") or "",
                "description": project.get("description") or "",
                "url": self._normalize_url(
                    project.get("url")
                ),
                "display_order": order,
            }

            item.update(
                parse_date_range(
                    project.get("starts_at"),
                    project.get("ends_at"),
                )
            )

            normalized.append(item)

        return normalized

    # ------------------------------------------------------
    # Certifications
    # ------------------------------------------------------

    def _normalize_certifications(self, certifications):

        normalized = []

        for order, cert in enumerate(certifications):

            item = {
                "name": cert.get("name") or "",
                "authority": cert.get("authority") or "",
                "license_number": cert.get("license_number") or "",
                "display_source": cert.get("display_source") or "",
                "url": self._normalize_url(cert.get("url")),
                "display_order": order,
            }

            item.update(
                parse_date_range(
                    cert.get("starts_at"),
                    cert.get("ends_at"),
                )
            )

            normalized.append(item)

        return normalized

    # ------------------------------------------------------
    # Helpers
    # ------------------------------------------------------

    def _normalize_url(self, url):

        if not url:
            return ""

        url = url.strip()

        parsed = urlparse(url)

        if parsed.scheme:
            return url

        return f"https://{url}"