"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Briefcase,
    FolderGit2,
    Wrench,
    GraduationCap,
    FileText,
    LucideIcon,
} from "lucide-react";

import RecommendationItem from "./RecommendationItem";

interface Props {
    title: string;
    icon: LucideIcon;
    recommendations: string[];
}

export default function RecommendationCard({
    title,
    icon: Icon,
    recommendations,
}: Props) {
    const [expanded, setExpanded] = useState(false);

    const visible = expanded
        ? recommendations
        : recommendations.slice(0, 3);

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-blue-500/10 p-3">
                        <Icon className="h-6 w-6 text-blue-400" />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            {title}
                        </h3>

                        <p className="text-sm text-zinc-500">
                            {recommendations.length} recommendations
                        </p>
                    </div>
                </div>

                {recommendations.length > 3 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="rounded-lg p-2 transition hover:bg-zinc-800"
                    >
                        {expanded ? (
                            <ChevronUp className="h-5 w-5 text-zinc-400" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-zinc-400" />
                        )}
                    </button>
                )}
            </div>

            <div className="space-y-3 p-6">
                {visible.map((item, index) => (
                    <RecommendationItem
                        key={index}
                        text={item}
                    />
                ))}
            </div>
        </div>
    );
}