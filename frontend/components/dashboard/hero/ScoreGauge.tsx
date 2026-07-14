"use client";

import AnimatedCounter from "../AnimatedCounter";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
    score: number;
}

export default function ScoreGauge({
    score,
}: Props) {

    const color =
        score >= 80
            ? "#10B981"
            : score >= 60
            ? "#F59E0B"
            : "#EF4444";

    const label =
        score >= 80
            ? "Excellent Match"
            : score >= 60
            ? "Good Match"
            : score >= 40
            ? "Average Match"
            : "Poor Match";

    return (
        <div className="flex flex-col items-center">

            <p className="mb-8 text-xs uppercase tracking-[0.45em] text-zinc-500">
                ATS SCORE
            </p>

            <div className="h-72 w-72">

                <CircularProgressbarWithChildren
                    value={score}
                    strokeWidth={8}
                    styles={buildStyles({
                        pathColor: color,
                        trailColor: "#27272A",
                    })}
                >

                    <div className="text-center">

                        <div
                            className="text-7xl font-black"
                            style={{ color }}
                        >
                            <AnimatedCounter value={score} />
                        </div>

                        <div className="mt-2 text-lg text-zinc-400">
                            /100
                        </div>

                        <div
                            className="mt-4 text-2xl font-semibold"
                            style={{ color }}
                        >
                            {label}
                        </div>

                    </div>

                </CircularProgressbarWithChildren>

            </div>

        </div>
    );
}