from django.urls import path

from .views import AnalyzeProfileAPIView, AnalysisDetailView

urlpatterns = [
    path(
        "/",
        AnalyzeProfileAPIView.as_view(),
        name="analyze-profile",
    ),
    path(
        "/<uuid:analysis_id>/",
        AnalysisDetailView.as_view(),
        name="analysis-detail",
    ),
]
