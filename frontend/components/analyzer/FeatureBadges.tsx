import { Brain, ChartColumn, CheckCircle2, Search } from "lucide-react";

const FEATURES = [
    {
        title: "ATS Match",
        icon: ChartColumn,
    },
    {
        title: "Missing Keywords",
        icon: Search,
    },
    {
        title: "AI Suggestions",
        icon: Brain,
    },
    {
        title: "Resume Insights",
        icon: CheckCircle2,
    },
];

export default function FeatureBadges() {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                    <div
                        key={feature.title}
                        className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3"
                    >
                        <Icon
                            size={18}
                            className="text-blue-500"
                        />

                        <span className="text-sm font-medium text-zinc-300">
                            {feature.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}