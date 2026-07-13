import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
} from "@/types/analysis";
import { ApiSuccessResponse } from "@/types/api";

export async function analyzeProfile(
    payload: AnalyzeProfileRequest
): Promise<ApiSuccessResponse<AnalyzeProfileResponse>> {

    const response = await axiosInstance.post(
        API_ENDPOINTS.ANALYZE_PROFILE,
        payload
    );

    return response.data;
}