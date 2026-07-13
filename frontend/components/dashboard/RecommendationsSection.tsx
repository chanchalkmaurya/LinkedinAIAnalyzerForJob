import {
    Briefcase,
    FolderGit2,
    GraduationCap,
    FileText,
    Wrench,
} from "lucide-react";

import RecommendationCard from "./RecommendationCard";

import { Suggestions } from "@/types/analysis";

interface RecommendationsSectionProps {
    suggestions: Suggestions;
}

export default function RecommendationsSection({
    suggestions,
}: RecommendationsSectionProps) {
    return (
        <section className="mt-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                    AI Recommendations
                </h2>

                <p className="mt-2 text-zinc-400">
                    Personalized suggestions to improve your LinkedIn profile
                    and ATS compatibility.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <RecommendationCard
                    title="Experience"
                    icon={Briefcase}
                    recommendations={suggestions.experience}
                />

                <RecommendationCard
                    title="Projects"
                    icon={FolderGit2}
                    recommendations={suggestions.projects}
                />

                <RecommendationCard
                    title="Skills"
                    icon={Wrench}
                    recommendations={suggestions.skills}
                />

                <RecommendationCard
                    title="Summary"
                    icon={FileText}
                    recommendations={suggestions.summary}
                />

                <div className="lg:col-span-2">
                    <RecommendationCard
                        title="Education"
                        icon={GraduationCap}
                        recommendations={suggestions.education}
                    />
                </div>
            </div>
        </section>
    );
}