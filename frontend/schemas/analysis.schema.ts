import { z } from "zod";

export const analyzeSchema = z.object({
    linkedin_url: z
        .string()
        .trim()
        .min(1, "LinkedIn profile URL is required")
        .url("Please enter a valid URL")
        .refine(
            (url) =>
                url.startsWith("https://www.linkedin.com/in/") ||
                url.startsWith("https://linkedin.com/in/"),
            {
                message: "Please enter a valid LinkedIn profile URL.",
            }
        ),

    job_description: z
        .string()
        .trim()
        .min(30, "Job description must contain at least 30 characters")
        .max(10000, "Job description is too long"),

    profile_updated_recently: z.boolean(),
});

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;