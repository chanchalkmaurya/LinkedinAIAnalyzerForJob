from django.shortcuts import get_object_or_404

from apps.analysis.models import Analysis


class AnalysisQueryService:
    @staticmethod
    def get_analysis(analysis_id):
        return Analysis.objects.select_related("profile").get(id=analysis_id)


analysis_query_service = AnalysisQueryService()
