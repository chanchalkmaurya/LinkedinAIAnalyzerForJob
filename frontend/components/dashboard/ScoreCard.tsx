import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";


interface ScoreCardProps {
    title: string;
    score: number;
    maxScore: number;
    icon: LucideIcon;
}

export default function ScoreCard({
    title,
    score,
    maxScore,
    icon: Icon,
}: ScoreCardProps) {
    const percentage = Math.round((score / maxScore) * 100);

    const getColor = () => {
        if (percentage >= 80) return "text-emerald-400";
        if (percentage >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const getBarColor = () => {
        if (percentage >= 80) return "bg-emerald-500";
        if (percentage >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl transition-all hover:border-blue-500">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600/20 p-3">
                    <Icon className="h-6 w-6 text-blue-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                    {title}
                </h3>
            </div>

            <div className={`mt-6 text-5xl font-bold ${getColor()}`}>
                <AnimatedCounter value={score} />
                <span className="text-xl text-zinc-500">
                    /{maxScore}
                </span>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                    className={`h-full ${getBarColor()} transition-all duration-700`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <div className="mt-3 flex justify-between text-sm">
                <span className="text-zinc-500">
                    Match
                </span>

                <span className={getColor()}>
                    {percentage}%
                </span>
            </div>
        </div>
    );
}