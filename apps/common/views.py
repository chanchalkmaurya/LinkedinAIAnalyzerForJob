from django.db import connection
from rest_framework.views import APIView

from .response import ApiResponse


class HealthCheckAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            connection.ensure_connection()
            db_status = "connected"
        except Exception:
            db_status = "disconnected"

        return ApiResponse.success(
            {
                "service": "linkedin-ai-analyzer",
                "version": "1.0.0",
                "database": db_status,
            },
            message="Service is healthy.",
        )