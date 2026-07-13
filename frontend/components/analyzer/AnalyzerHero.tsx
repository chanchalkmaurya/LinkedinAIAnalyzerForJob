import AnalyzeForm from "./AnalyzeForm";
import FeatureBadges from "./FeatureBadges";

import PageContainer from "@/components/layout/PageContainer";

export default function AnalyzerHero() {
    return (
        <section className="py-20 lg:py-28">
            <PageContainer>
                <div className="mx-auto max-w-4xl">
                    {/* Badge */}
                    <div className="flex justify-center">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                            AI-Powered Resume Intelligence
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-8 text-center text-5xl font-bold leading-tight text-white md:text-6xl">
                        Analyze Your
                        <span className="text-blue-500">
                            {" "}
                            LinkedIn Profile
                        </span>

                        <br />

                        Against Any Job Description
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-zinc-400">
                        Compare your LinkedIn profile with any job description,
                        calculate ATS compatibility, identify missing keywords,
                        and receive AI-powered improvement suggestions.
                    </p>

                    {/* Form */}
                    <div className="mt-16">
                        <AnalyzeForm />
                    </div>

                    {/* Features */}
                    <div className="mt-10">
                        <FeatureBadges />
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}