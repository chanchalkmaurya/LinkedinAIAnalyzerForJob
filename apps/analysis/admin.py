from django.contrib import admin

from .models import Analysis


@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "profile",
        "overall_score",
        "created_at",
    )

    search_fields = ("profile__linkedin_url",)

    list_filter = ("created_at",)

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )
