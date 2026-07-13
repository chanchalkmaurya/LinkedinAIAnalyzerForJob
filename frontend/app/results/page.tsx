"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAnalysis from "@/hooks/useAnalysis";

export default function ResultsPage() {
    const router = useRouter();

    const { analysisResult } = useAnalysis();

    useEffect(() => {
        if (!analysisResult) {
            router.replace("/");
        }
    }, [analysisResult, router]);

    if (!analysisResult) {
        return null;
    }

    return (
        <main className="min-h-screen bg-zinc-950 p-10 text-white">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-8 text-4xl font-bold">
                    Analysis Result
                </h1>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <pre className="overflow-auto text-sm">
                        {JSON.stringify(
                            analysisResult,
                            null,
                            4
                        )}
                    </pre>
                </div>
            </div>
        </main>
    );
}