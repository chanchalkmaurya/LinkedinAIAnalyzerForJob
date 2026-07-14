"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardContainer from "@/components/dashboard/layout/DashboardContainer";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import Section from "@/components/dashboard/layout/Section";
import HeroSection from "@/components/dashboard/hero/HeroSection";
import BreakdownGrid from "@/components/dashboard/breakdown/BreakdownGrid";
import StrengthGrid from "@/components/dashboard/strengths/StrengthGrid";
import KeywordSection from "@/components/dashboard/keywords/KeywordSection";
import RecommendationsGrid from "@/components/dashboard/recommendations/RecommendationsGrid";


import AnalysisService from "@/services/analysis.service";
import { AnalysisResult } from "@/types/analysis";
import { ApiError } from "@/utils/api-error";
import { Briefcase, FolderGit2, Wrench, FileText, } from "lucide-react";


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
                router.replace("/"); return;
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
                <div className="text-center"> <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent">
                </div>
                
                <h2 className="mt-6 text-2xl font-semibold text-white"> Loading Analysis... </h2>
                <p className="mt-2 text-zinc-400"> Please wait while we fetch your analysis. </p>
                
                </div>
            </main>
            );
    }
        
    if (!analysis) {
            return null;
    }
    
    const strengthsCount = analysis.strengths.length;
    const missingKeywordsCount = analysis.missing_keywords.length;
    const suggestionCount = analysis.suggestions.summary.length + analysis.suggestions.experience.length + analysis.suggestions.education.length + analysis.suggestions.projects.length + analysis.suggestions.skills.length;
    
    return (
        <DashboardContainer> <DashboardHeader linkedinUrl={analysis.linkedin_url} />
            <HeroSection score={analysis.overall_score} strengths={strengthsCount} missingKeywords={missingKeywordsCount} suggestions={suggestionCount} />
                <br /><br />
                <Section 
                    title="Section Breakdown"
                    description="See how each area contributes to your ATS score." 
                >
                    <BreakdownGrid breakdown={analysis} />
                </Section>
                
                <br /><br />
                <Section 
                    title="Strengths"
                    description="See What is Your Strength for This Job Post" 
                >
                    <StrengthGrid strengths={analysis.strengths} />
                </Section>

                <br /><br />
                <Section
                    title="Skills Missing from Your Profile"
                    description="These skills appear in the job description but were not found in your profile."
                >
                    <KeywordSection keywords={analysis.missing_keywords} />
                    
                </Section>
                
                <br /><br />
                <Section
                    title="AI Recommendations"
                    description="Actionable suggestions to improve your ATS compatibility."
                >
                    <RecommendationsGrid
                        suggestions={analysis.suggestions}
                    />
                </Section>
        </DashboardContainer>
    ); 
}