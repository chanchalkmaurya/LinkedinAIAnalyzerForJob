import uuid

from django.db import models

from apps.linkedin.models import LinkedInProfile


class Analysis(models.Model):
    """
    Stores the AI analysis generated for a LinkedIn profile
    against a specific Job Description.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    profile = models.ForeignKey(
        LinkedInProfile,
        on_delete=models.CASCADE,
        related_name="analyses",
    )

    job_description = models.TextField()

    overall_score = models.PositiveSmallIntegerField()

    experience_score = models.PositiveSmallIntegerField()

    projects_score = models.PositiveSmallIntegerField()

    skills_score = models.PositiveSmallIntegerField()

    summary_score = models.PositiveSmallIntegerField()

    strengths = models.JSONField(
        default=list,
        blank=True,
    )

    missing_keywords = models.JSONField(
        default=list,
        blank=True,
    )

    suggestions = models.JSONField(default=list)

    llm_response = models.JSONField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["profile"]),
        ]

    def __str__(self):
        return f"{self.profile.linkedin_url} - {self.id}"
