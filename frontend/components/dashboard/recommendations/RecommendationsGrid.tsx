import {
    Briefcase,
    FolderGit2,
    Wrench,
    GraduationCap,
    FileText,
} from "lucide-react";

import RecommendationCard from "./RecommendationCard";

interface Props {
    suggestions: {
        summary: string[];
        experience: string[];
        education: string[];
        projects: string[];
        skills: string[];
    };
}

export default function RecommendationsGrid({
    suggestions,
}: Props) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <RecommendationCard
                title="Summary"
                icon={FileText}
                recommendations={suggestions.summary}
            />

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
                title="Education"
                icon={GraduationCap}
                recommendations={suggestions.education}
            />
        </div>
    );
}