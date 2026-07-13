import { CheckCircle2, Trophy } from "lucide-react";

interface StrengthsCardProps {
    strengths: string[];
}

export default function StrengthsCard({
    strengths,
}: StrengthsCardProps) {
    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-emerald-500/20 p-3">
                    <Trophy className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Profile Strengths
                    </h2>

                    <p className="text-zinc-400">
                        These are the strongest aspects of your LinkedIn profile that
                        align with this job description.
                    </p>
                </div>
            </div>

            {strengths.length === 0 ? (
                <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-6">
                    <p className="text-zinc-400">
                        No strengths were identified.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {strengths.map((strength, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/10"
                        >
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                            <p className="text-zinc-200">
                                {strength}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}