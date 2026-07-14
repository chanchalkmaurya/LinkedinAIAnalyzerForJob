import AnalyzeForm from "./AnalyzeForm";
import FeatureBadges from "./FeatureBadges";

export default function AnalyzerHero() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

                <div className="absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

                <div className="absolute -right-32 top-1/3 h-[280px] w-[280px] rounded-full bg-indigo-600/10 blur-[120px]" />
            </div>

            <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20">
                <div className="mx-auto w-full max-w-3xl text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                        <span className="text-sm font-medium tracking-wide text-blue-300">
                            AI-Powered Resume Intelligence
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
                        Analyze Your{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            LinkedIn
                        </span>
                        <br />
                        Profile
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                        Compare your LinkedIn profile with any job description,
                        calculate ATS compatibility, discover missing skills,
                        and receive actionable AI-powered recommendations to
                        improve your chances of getting shortlisted.
                    </p>

                    {/* Feature Pills */}
                    <div className="mt-8 flex justify-center">
                        <FeatureBadges />
                    </div>
                    <br /><br />
                    {/* Form */}
                    <div className="mt-12">
                        <AnalyzeForm />
                    </div>
                </div>
            </section>
        </main>
    );
}