from django.db import models

from apps.common.models import BaseModel, DateRangeMixin


class LinkedInProfile(BaseModel):

    linkedin_url = models.URLField(
        unique=True,
        db_index=True,
    )

    linkedin_id = models.CharField(
        max_length=200,
        blank=True,
    )

    linkedin_num_id = models.CharField(
        max_length=100,
        blank=True,
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100,
        blank=True,
    )

    full_name = models.CharField(
        max_length=255
    )

    headline = models.CharField(
        max_length=500,
        blank=True,
    )

    summary = models.TextField(
        blank=True,
        default=""
    )

    city = models.CharField(
        max_length=120,
        blank=True,
    )

    location = models.CharField(
        max_length=255,
        blank=True,
    )

    country_code = models.CharField(
        max_length=5,
        blank=True,
    )

    avatar = models.URLField(
        blank=True
    )

    followers = models.IntegerField(
        null=True,
        blank=True,
    )

    connections = models.IntegerField(
        null=True,
        blank=True,
    )

    current_company_name = models.CharField(
        max_length=255,
        blank=True,
    )

    last_synced = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "linkedin_profiles"

        ordering = ["-updated_at"]

        indexes = [
            models.Index(fields=["linkedin_url"]),
            models.Index(fields=["linkedin_id"]),
            models.Index(fields=["last_synced"]),
        ]

    def __str__(self):
        return self.full_name
    
    
    
    
class Experience(DateRangeMixin, BaseModel):

    profile = models.ForeignKey(
        LinkedInProfile,
        on_delete=models.CASCADE,
        related_name="experiences",
    )

    company = models.CharField(
        max_length=255
    )

    title = models.CharField(
        max_length=255
    )

    description_HTML = models.TextField(
        blank=True,
        default=""
    )

    company_logo_url = models.URLField(
        blank=True,
    )

    display_order = models.PositiveSmallIntegerField(
        default=0
    )

    class Meta:

        db_table = "linkedin_experiences"

        ordering = ["display_order"]

        indexes = [
            models.Index(fields=["profile"]),
            models.Index(fields=["company"]),
        ]

    def __str__(self):
        return f"{self.company} - {self.title}"
    
    
    
    
class Project(DateRangeMixin, BaseModel):

    profile = models.ForeignKey(
        LinkedInProfile,
        on_delete=models.CASCADE,
        related_name="projects",
    )

    title = models.CharField(
        max_length=255,
        db_index=True,
    )

    description = models.TextField(
        blank=True,
        default="",
    )

    project_url = models.URLField(
        blank=True,
    )

    display_order = models.PositiveSmallIntegerField(
        default=0,
    )

    class Meta:

        db_table = "linkedin_projects"

        ordering = ["display_order"]

        indexes = [
            models.Index(fields=["profile"]),
            models.Index(fields=["title"]),
            models.Index(fields=["start_year"]),
        ]

    def __str__(self):
        return self.title
    


class Education(DateRangeMixin, BaseModel):
    profile = models.ForeignKey(
        "linkedin.LinkedInProfile",
        on_delete=models.CASCADE,
        related_name="educations",
    )

    school = models.CharField(
        max_length=255,
        db_index=True,
    )

    degree_name = models.CharField(
        max_length=255,
        blank=True,
        default="",
    )

    field_of_study = models.CharField(
        max_length=255,
        blank=True,
        default="",
    )

    description = models.TextField(
        blank=True,
        default="",
    )

    grade = models.CharField(
        max_length=100,
        blank=True,
        default="",
    )

    activities_and_societies = models.TextField(
        blank=True,
        default="",
    )

    school_linkedin_url = models.URLField(
        blank=True,
        default="",
    )

    school_facebook_url = models.URLField(
        blank=True,
        default="",
    )

    logo_url = models.URLField(
        blank=True,
        default="",
    )

    display_order = models.PositiveSmallIntegerField(
        default=0,
    )

    class Meta:
        db_table = "linkedin_educations"

        ordering = ["display_order"]

        indexes = [
            models.Index(fields=["profile"]),
            models.Index(fields=["school"]),
            models.Index(fields=["start_year"]),
            models.Index(fields=["end_year"]),
        ]

    def __str__(self):
        return f"{self.school} - {self.degree_name}"
    
class Certification(DateRangeMixin, BaseModel):

    profile = models.ForeignKey(
        LinkedInProfile,
        on_delete=models.CASCADE,
        related_name="certifications",
    )

    name = models.CharField(
        max_length=255,
        db_index=True,
    )

    authority = models.CharField(
        max_length=255,
        blank=True,
    )

    license_number = models.CharField(
        max_length=255,
        blank=True,
    )

    display_source = models.CharField(
        max_length=255,
        blank=True,
    )

    url = models.URLField(
        blank=True,
    )

    display_order = models.PositiveSmallIntegerField(
        default=0,
    )

    class Meta:

        db_table = "linkedin_certifications"

        ordering = ["display_order"]

        indexes = [
            models.Index(fields=["profile"]),
            models.Index(fields=["authority"]),
            models.Index(fields=["name"]),
        ]

    def __str__(self):
        return self.name