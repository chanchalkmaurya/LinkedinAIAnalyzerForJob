import {
    Briefcase,
    FolderGit2,
    Wrench,
    FileText,
} from "lucide-react";

import BreakdownCard from "./BreakdownCard";

interface Props {
    breakdown: {
        experience_score: number;
        projects_score: number;
        skills_score: number;
        summary_score: number;
    };
}

export default function BreakdownGrid({
    breakdown,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <BreakdownCard
                title="Experience"
                icon={Briefcase}
                score={breakdown.experience_score}
                maxScore={30}
                description="Relevant work experience aligned with the job description."
            />

            <BreakdownCard
                title="Projects"
                icon={FolderGit2}
                score={breakdown.projects_score}
                maxScore={30}
                description="Project quality, impact, and technology relevance."
            />

            <BreakdownCard
                title="Skills"
                icon={Wrench}
                score={breakdown.skills_score}
                maxScore={30}
                description="Technical skills that match the required stack."
            />

            <BreakdownCard
                title="Summary"
                icon={FileText}
                score={breakdown.summary_score}
                maxScore={10}
                description="Professional summary and keyword relevance."
            />
        </div>
    );
}