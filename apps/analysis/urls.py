from django.urls import path

from .views import AnalyzeProfileAPIView

urlpatterns = [
    path(
        "analyze/",
        AnalyzeProfileAPIView.as_view(),
        name="analyze-profile",
    ),
]