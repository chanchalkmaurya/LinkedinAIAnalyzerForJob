import { LucideIcon, CheckCircle2 } from "lucide-react";

interface RecommendationCardProps {
    title: string;
    icon: LucideIcon;
    recommendations: string[];
}

export default function RecommendationCard({
    title,
    icon: Icon,
    recommendations,
}: RecommendationCardProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/20 p-3">
                    <Icon className="h-5 w-5 text-blue-400" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                    {title}
                </h3>
            </div>

            <div className="space-y-4">
                {recommendations.length === 0 ? (
                    <p className="text-zinc-500">
                        No recommendations.
                    </p>
                ) : (
                    recommendations.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3"
                        >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />

                            <p className="text-sm leading-6 text-zinc-300">
                                {item}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}