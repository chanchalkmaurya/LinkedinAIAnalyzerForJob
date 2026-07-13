interface ScoreCircleProps {
    score: number;
}

export default function ScoreCircle({
    score,
}: ScoreCircleProps) {
    const percentage = Math.min(Math.max(score, 0), 100);

    const getColor = () => {
        if (percentage >= 80) return "text-emerald-400";
        if (percentage >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const getStatus = () => {
        if (percentage >= 80) return "Excellent Match";
        if (percentage >= 60) return "Good Match";
        if (percentage >= 40) return "Average Match";
        return "Poor Match";
    };

    return (
        <div className="flex flex-col items-center">
            <div className={`text-7xl font-extrabold ${getColor()}`}>
                {score}
            </div>

            <div className="mt-2 text-zinc-400">
                /100
            </div>

            <div className={`mt-3 text-xl font-semibold ${getColor()}`}>
                {getStatus()}
            </div>

            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}