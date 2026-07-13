import axios, { AxiosError } from "axios";

import api from "@/lib/axios";
import { ApiError } from "@/utils/api-error";

import {
    AnalyzeRequest,
    AnalyzeResponse,
    AnalysisDetailResponse,
} from "@/types/analysis";

class AnalysisService {
    async analyze(
        payload: AnalyzeRequest
    ): Promise<AnalyzeResponse> {
        try {
            const response =
                await api.post<AnalyzeResponse>(
                    "/api/analyze/",
                    payload
                );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw this.handleAxiosError(error);
            }

            throw new ApiError("Unexpected error occurred.");
        }
    }

    async getAnalysis(
        analysisId: string
    ): Promise<AnalysisDetailResponse> {
        try {
            const response =
                await api.get<AnalysisDetailResponse>(
                    `/api/analyze/${analysisId}/`
                );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw this.handleAxiosError(error);
            }

            throw new ApiError("Unexpected error occurred.");
        }
    }

    private handleAxiosError(
        error: AxiosError<any>
    ): ApiError {
        if (error.response) {
            return new ApiError(
                error.response.data?.message ??
                    "Server error.",
                error.response.status,
                error.response.data?.errors
            );
        }

        if (error.request) {
            return new ApiError(
                "Unable to reach the server."
            );
        }

        return new ApiError(
            error.message || "Something went wrong."
        );
    }
}

export default new AnalysisService();