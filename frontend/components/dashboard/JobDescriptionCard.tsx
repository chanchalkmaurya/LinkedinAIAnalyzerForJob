"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

interface JobDescriptionCardProps {
    jobDescription: string;
}

export default function JobDescriptionCard({
    jobDescription,
}: JobDescriptionCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center justify-between p-6 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-500/20 p-3">
                        <FileText className="h-6 w-6 text-blue-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Job Description
                        </h2>

                        <p className="text-zinc-400">
                            Review the job description used for this analysis.
                        </p>
                    </div>
                </div>

                {expanded ? (
                    <ChevronUp className="h-6 w-6 text-zinc-400" />
                ) : (
                    <ChevronDown className="h-6 w-6 text-zinc-400" />
                )}
            </button>

            {expanded && (
                <div className="border-t border-zinc-800 px-6 pb-6">
                    <div className="max-h-[500px] overflow-y-auto rounded-xl bg-zinc-950 p-6">
                        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-zinc-300">
                            {jobDescription}
                        </pre>
                    </div>
                </div>
            )}
        </section>
    );
}