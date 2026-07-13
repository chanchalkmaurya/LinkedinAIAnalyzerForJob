import AnimatedCounter from "./AnimatedCounter";

interface OverallScoreCardProps {
    score: number;
}

export default function OverallScoreCard({
    score,
}: OverallScoreCardProps) {
    const getStatus = () => {
        if (score >= 90) return "Outstanding Match";
        if (score >= 75) return "Excellent Match";
        if (score >= 60) return "Good Match";
        if (score >= 40) return "Average Match";
        return "Needs Improvement";
    };

    const getColor = () => {
        if (score >= 90) return "text-emerald-400";
        if (score >= 75) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        if (score >= 40) return "text-orange-400";
        return "text-red-400";
    };

    const getProgressColor = () => {
        if (score >= 90) return "bg-emerald-500";
        if (score >= 75) return "bg-green-500";
        if (score >= 60) return "bg-yellow-500";
        if (score >= 40) return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
            <div className="text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    ATS SCORE
                </p>

                <h1 className={`mt-4 text-8xl font-black ${getColor()}`}>
                    <AnimatedCounter value={score} />
                </h1>

                <p className="mt-2 text-2xl font-semibold text-white">
                    {getStatus()}
                </p>

                <div className="mx-auto mt-8 h-4 max-w-3xl overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className={`h-full ${getProgressColor()} transition-all duration-700`}
                        style={{
                            width: `${score}%`,
                        }}
                    />
                </div>

                <p className="mt-4 text-zinc-400">
                    Overall ATS compatibility with this job description
                </p>

            </div>
        </section>
    );
}