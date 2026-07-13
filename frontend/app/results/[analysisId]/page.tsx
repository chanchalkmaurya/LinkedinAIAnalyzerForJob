"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverallScoreCard from "@/components/dashboard/OverallScoreCard";
import StrengthsCard from "@/components/dashboard/StrengthsCard";
import MissingKeywordsCard from "@/components/dashboard/MissingKeywordsCard";
import RecommendationsSection from "@/components/dashboard/RecommendationsSection";
import JobDescriptionCard from "@/components/dashboard/JobDescriptionCard";

import ScoreCard from "@/components/dashboard/ScoreCard";
import AnalysisService from "@/services/analysis.service";
import { AnalysisResult } from "@/types/analysis";
import { ApiError } from "@/utils/api-error";
import {
    Briefcase,
    FolderGit2,
    Wrench,
    FileText,
} from "lucide-react";


export default function ResultsPage() {
    const router = useRouter();
    const params = useParams();

    const analysisId = params.analysisId as string;

    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!analysisId) {
            router.replace("/");
            return;
        }

        fetchAnalysis();
    }, [analysisId]);

    const fetchAnalysis = async () => {
        try {
            setLoading(true);

            const response = await AnalysisService.getAnalysis(analysisId);

            if (!response.success) {
                toast.error(response.message);
                router.replace("/");
                return;
            }

            setAnalysis(response.data);
        } catch (error) {
            if (error instanceof ApiError) {
                toast.error(error.message);
            } else {
                toast.error("Failed to load analysis.");
            }

            router.replace("/");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                    <h2 className="mt-6 text-2xl font-semibold text-white">
                        Loading Analysis...
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Please wait while we fetch your analysis.
                    </p>
                </div>
            </main>
        );
    }

    if (!analysis) {
        return null;
    }

    return (
        <DashboardContainer>
            <DashboardHeader linkedinUrl={analysis.linkedin_url} />

            <OverallScoreCard
                score={analysis.overall_score}
            />

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <ScoreCard
                    title="Experience"
                    score={analysis.experience_score}
                    maxScore={30}
                    icon={Briefcase}
                />

                <ScoreCard
                    title="Projects"
                    score={analysis.projects_score}
                    maxScore={30}
                    icon={FolderGit2}
                />

                <ScoreCard
                    title="Skills"
                    score={analysis.skills_score}
                    maxScore={30}
                    icon={Wrench}
                />

                <ScoreCard
                    title="Summary"
                    score={analysis.summary_score}
                    maxScore={10}
                    icon={FileText}
                />
            </div>

            <div className="mt-8">
                <StrengthsCard
                    strengths={analysis.strengths}
                />
            </div>

            <div className="mt-8">
                <MissingKeywordsCard
                    keywords={analysis.missing_keywords}
                />
            </div>

            <RecommendationsSection
                suggestions={analysis.suggestions}
            />

            <JobDescriptionCard
                jobDescription={analysis.job_description}
            />
        </DashboardContainer>
    );
}