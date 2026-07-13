"use client";

import { createContext } from "react";

import { AnalysisResult } from "@/types/analysis";

export interface AnalysisContextType {
    analysisResult: AnalysisResult | null;
    setAnalysisResult: React.Dispatch<
        React.SetStateAction<AnalysisResult | null>
    >;
    clearAnalysisResult: () => void;
}

export const AnalysisContext =
    createContext<AnalysisContextType | null>(null);