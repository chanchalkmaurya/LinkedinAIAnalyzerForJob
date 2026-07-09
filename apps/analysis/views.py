import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.linkedin.services.profile_sync_service import (
    ProfileSyncService,
)
from apps.common.response import ApiResponse
from apps.analysis.services import ProfileAnalysisService
from .serializers import AnalyzeProfileSerializer

logger = logging.getLogger(__name__)


class AnalyzeProfileAPIView(APIView):

    serializer_class = AnalyzeProfileSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        profile = ProfileSyncService().sync(
            linkedin_url=data["linkedin_url"],
            updated_in_last_30_days=data["updated_in_last_30_days"],
        )

        result = ProfileAnalysisService().analyze(
            profile_id=profile.id,
            job_description=data["job_description"],
        )

        return ApiResponse.success(
            data=result,
            message="Profile analyzed successfully.",
            status_code=status.HTTP_200_OK,
        )