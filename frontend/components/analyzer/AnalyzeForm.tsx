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

import { useRouter } from "next/navigation";
import { url } from "inspector";

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

    const jobDescription =
        watch("job_description") || "";

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
            const url = `/results/${response.data.analysis_id}`;
            router.push(url);
            
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
        <div className="mx-auto w-full max-w-3xl">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-900/70
                    backdrop-blur-xl
                    shadow-2xl
                    p-8
                    md:p-10
                "
            >
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Start Your ATS Analysis
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Compare your LinkedIn profile against a job description
                            and receive an AI-powered ATS compatibility report.
                        </p>
                    </div>

                    {/* Inputs */}
                    <LinkedInInput
                        {...register("linkedin_url")}
                        error={
                            errors.linkedin_url?.message
                        }
                        disabled={isSubmitting}
                    />

                    <JobDescriptionInput
                        {...register("job_description")}
                        valueLength={
                            jobDescription.length
                        }
                        error={
                            errors.job_description
                                ?.message
                        }
                        disabled={isSubmitting}
                    />

                    {/* Checkbox */}
                    <label
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-zinc-800
                            bg-zinc-950/40
                            p-4
                        "
                    >
                        <input
                            type="checkbox"
                            {...register(
                                "profile_updated_recently"
                            )}
                            disabled={isSubmitting}
                            className="mt-1 h-4 w-4 rounded border-zinc-700"
                        />

                        <div>
                            <p className="font-medium text-white">
                                LinkedIn updated recently
                            </p>

                            <p className="mt-1 text-sm text-zinc-400">
                                Check this if you've updated your profile
                                within the last 30 days.
                            </p>
                        </div>
                    </label>

                    {/* Button */}
                    <AnalyzeButton
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
}