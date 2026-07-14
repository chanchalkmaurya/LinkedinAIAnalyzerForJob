import {
    CheckCircle2,
    Search,
    Lightbulb,
} from "lucide-react";

interface Props {
    strengths: number;
    missingKeywords: number;
    suggestions: number;
}

export default function QuickStats({
    strengths,
    missingKeywords,
    suggestions,
}: Props) {
    const stats = [
        {
            title: "Profile Strengths",
            value: strengths,
            icon: CheckCircle2,
            color: "text-emerald-400",
            progress: Math.min(strengths * 15, 100),
            description: "Strong matching areas",
        },
        {
            title: "Missing Keywords",
            value: missingKeywords,
            icon: Search,
            color: "text-red-400",
            progress: Math.min(missingKeywords * 3, 100),
            description: "Important ATS gaps",
        },
        {
            title: "AI Suggestions",
            value: suggestions,
            icon: Lightbulb,
            color: "text-blue-400",
            progress: Math.min(suggestions * 4, 100),
            description: "Recommended improvements",
        },
    ];

    return (
        <div className="grid gap-5 md:grid-cols-3">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="
                            group
                            rounded-2xl
                            border
                            border-zinc-800
                            bg-zinc-900/60
                            p-6
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-500
                            hover:bg-zinc-900
                        "
                    >
                        <div className="flex items-start justify-between">

                            <div>
                                <Icon
                                    className={`h-7 w-7 ${item.color}`}
                                />

                                <p className="mt-5 text-sm font-medium text-zinc-300">
                                    {item.title}
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                    {item.description}
                                </p>
                            </div>

                            <span className="text-5xl font-black text-white">
                                {item.value}
                            </span>

                        </div>

                        <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-800">

                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                                style={{
                                    width: `${item.progress}%`,
                                }}
                            />

                        </div>
                    </div>
                );
            })}
        </div>
    );
}