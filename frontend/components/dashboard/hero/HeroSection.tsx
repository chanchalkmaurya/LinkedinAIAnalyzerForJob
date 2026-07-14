import ScoreGauge from "./ScoreGauge";
import QuickStats from "./QuickStats";

interface HeroSectionProps {
    score: number;
    strengths: number;
    missingKeywords: number;
    suggestions: number;
}

export default function HeroSection({
    score,
    strengths,
    missingKeywords,
    suggestions,
}: HeroSectionProps) {
    return (
        <section className="mb-12">
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-gradient-to-br
                    from-zinc-900
                    via-zinc-950
                    to-black
                    p-8
                    shadow-2xl
                    lg:p-10
                "
            >
                {/* Background Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                    <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600 blur-[140px]" />
                </div>

                <div className="relative z-10 grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center">

                    {/* Left */}
                    <div className="flex flex-col items-center">
                        <ScoreGauge score={score} />

                        <p className="mt-6 max-w-sm text-center text-zinc-400 leading-7">
                            This score represents how well your LinkedIn profile
                            matches the provided job description.
                        </p>
                    </div>

                    {/* Right */}
                    <div>

                        <div className="mb-8">
                            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                                AI Analysis Summary
                            </p>

                            <h2 className="mt-3 text-4xl font-bold text-white">
                                Your Profile Snapshot
                            </h2>

                            <p className="mt-4 max-w-xl text-zinc-400 leading-7">
                                Focus on improving the missing skills and applying
                                the AI recommendations below to significantly
                                increase your ATS score.
                            </p>
                        </div>

                        <QuickStats
                            strengths={strengths}
                            missingKeywords={missingKeywords}
                            suggestions={suggestions}
                        />

                    </div>

                </div>
            </div>
        </section>
    );
}