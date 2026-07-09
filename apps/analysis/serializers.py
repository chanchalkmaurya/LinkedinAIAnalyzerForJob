from rest_framework import serializers


class AnalyzeProfileSerializer(serializers.Serializer):

    linkedin_url = serializers.URLField()

    job_description = serializers.CharField()

    updated_in_last_30_days = serializers.BooleanField(
        default=False
    )