import { ApiResponse } from "./api";

export interface AnalyzeRequest {
    linkedin_url: string;
    job_description: string;
    profile_updated_recently: boolean;
}

export interface Suggestions {
    summary: string[];
    experience: string[];
    education: string[];
    projects: string[];
    skills: string[];
}

export interface AnalysisResult {
    id: string;

    profile_id: string;

    linkedin_url: string;

    job_description: string;

    overall_score: number;

    experience_score: number;

    projects_score: number;

    skills_score: number;

    summary_score: number;

    strengths: string[];

    missing_keywords: string[];

    suggestions: Suggestions;

    created_at: string;
}

export interface AnalyzeResponseData {
    analysis_id: string;

    overall_score: number;

    experience_score: number;

    projects_score: number;

    skills_score: number;

    summary_score: number;

    strengths: string[];

    missing_keywords: string[];

    suggestions: Suggestions;

    created_at: string;
}

export type AnalyzeResponse =
    ApiResponse<AnalyzeResponseData>;

export type AnalysisDetailResponse =
    ApiResponse<AnalysisResult>;