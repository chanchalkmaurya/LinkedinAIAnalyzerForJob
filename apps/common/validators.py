import re
from django.core.exceptions import ValidationError


LINKEDIN_REGEX = (
    r"^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$"
)


def validate_linkedin_url(value):
    if not re.match(LINKEDIN_REGEX, value):
        raise ValidationError("Invalid LinkedIn profile URL.")