"use client";

import AnalysisService from "@/services/analysis.service";
import {
    analyzeSchema,
    AnalyzeFormData,
} from "@/schemas/analysis.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AnalyzeButton from "./AnalyzeButton";
import JobDescriptionInput from "./JobDescriptionInput";
import LinkedInInput from "./LinkedInInput";

import { toast } from "sonner";
import { ApiError } from "@/utils/api-error";

import useAnalysis from "@/hooks/useAnalysis";
import { useRouter } from "next/navigation";



export default function AnalyzeForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<AnalyzeFormData>({
        resolver: zodResolver(analyzeSchema),

        defaultValues: {
            linkedin_url: "",
            job_description: "",
            profile_updated_recently: false,
        },
    });
    const router = useRouter();

    const { setAnalysisResult } = useAnalysis();
    const jobDescription = watch("job_description") || "";

    const onSubmit = async (
        data: AnalyzeFormData
    ) => {
        const loadingToast = toast.loading(
            "Analyzing your LinkedIn profile..."
        );

        try {
            const response =
                await AnalysisService.analyze(data);

            toast.dismiss(loadingToast);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
            router.push(
                `/results/${response.data.analysis_id}`
            );

        } catch (error) {
            toast.dismiss(loadingToast);

            if (error instanceof ApiError) {
                toast.error(error.message);
                return;
            }

            toast.error(
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-xl"
        >
            <LinkedInInput
                {...register("linkedin_url")}
                error={errors.linkedin_url?.message}
                disabled={isSubmitting}
            />

            <JobDescriptionInput
                {...register("job_description")}
                valueLength={jobDescription.length}
                error={errors.job_description?.message}
                disabled={isSubmitting}
            />

            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    {...register("profile_updated_recently")}
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border-zinc-700"
                />

                <span className="text-sm text-zinc-300">
                    My LinkedIn profile has been updated within
                    the last 30 days.
                </span>
            </label>

            <AnalyzeButton
                loading={isSubmitting}
                disabled={isSubmitting}
            />
        </form>
    );
}