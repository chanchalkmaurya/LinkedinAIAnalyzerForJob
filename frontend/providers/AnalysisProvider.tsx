"use client";

import { ReactNode, useMemo, useState } from "react";

import {
    AnalysisContext,
} from "@/context/AnalysisContext";

import { AnalysisResult } from "@/types/analysis";

interface AnalysisProviderProps {
    children: ReactNode;
}

export default function AnalysisProvider({
    children,
}: AnalysisProviderProps) {
    const [analysisResult, setAnalysisResult] =
        useState<AnalysisResult | null>(null);

    const clearAnalysisResult = () => {
        setAnalysisResult(null);
    };

    const value = useMemo(
        () => ({
            analysisResult,
            setAnalysisResult,
            clearAnalysisResult,
        }),
        [analysisResult]
    );

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
}