from rest_framework import serializers

from apps.analysis.models import Analysis


class AnalyzeProfileSerializer(serializers.Serializer):

    linkedin_url = serializers.URLField()

    job_description = serializers.CharField()

    updated_in_last_30_days = serializers.BooleanField(default=False)


class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = (
            "id",
            "overall_score",
            "experience_score",
            "projects_score",
            "skills_score",
            "summary_score",
            "strengths",
            "missing_keywords",
            "suggestions",
            "created_at",
        )


class AnalysisDetailSerializer(serializers.ModelSerializer):
    profile_id = serializers.UUIDField(
        source="profile.id",
        read_only=True,
    )

    linkedin_url = serializers.CharField(
        source="profile.linkedin_url",
        read_only=True,
    )

    class Meta:
        model = Analysis
        fields = (
            "id",
            "profile_id",
            "linkedin_url",
            "job_description",
            "overall_score",
            "experience_score",
            "projects_score",
            "skills_score",
            "summary_score",
            "strengths",
            "missing_keywords",
            "suggestions",
            "created_at",
        )
