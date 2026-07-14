"use client";

import { LucideIcon } from "lucide-react";


interface BreakdownCardProps {
    title: string;
    icon: LucideIcon;
    score: number;
    maxScore: number;
    description: string;
}

export default function BreakdownCard({
    title,
    icon: Icon,
    score,
    maxScore,
    description,
}: BreakdownCardProps) {
    const percentage = (score / maxScore) * 100;

    const status =
        percentage >= 80
            ? "Excellent"
            : percentage >= 60
            ? "Good"
            : percentage >= 40
            ? "Average"
            : "Needs Improvement";

    const color =
        percentage >= 80
            ? "text-emerald-400"
            : percentage >= 60
            ? "text-blue-400"
            : percentage >= 40
            ? "text-amber-400"
            : "text-red-400";

    const progressColor =
        percentage >= 80
            ? "bg-emerald-500"
            : percentage >= 60
            ? "bg-blue-500"
            : percentage >= 40
            ? "bg-amber-500"
            : "bg-red-500";

    return (
        <div
            className="
                group
                rounded-3xl
                border
                border-zinc-800
                bg-gradient-to-b
                from-zinc-900
                to-zinc-950
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500
                hover:shadow-2xl
            "
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-zinc-800 p-3">
                        <Icon className="h-5 w-5 text-blue-400" />
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            {title}
                        </h3>

                        <p className={`text-sm ${color}`}>
                            {status}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                        {score}
                    </div>

                    <p className="text-sm text-zinc-500">
                        / {maxScore}
                    </p>
                </div>
            </div>

            <div className="mt-8 h-2 rounded-full bg-zinc-800">
                <div
                    className={`${progressColor} h-full rounded-full transition-all duration-1000`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <p className="mt-6 text-sm leading-6 text-zinc-400">
                {description}
            </p>
        </div>
    );
}