import { Search, X } from "lucide-react";

interface MissingKeywordsCardProps {
    keywords: string[];
}

export default function MissingKeywordsCard({
    keywords,
}: MissingKeywordsCardProps) {
    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-red-500/20 p-3">
                    <Search className="h-6 w-6 text-red-400" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Missing Keywords
                    </h2>

                    <p className="text-zinc-400">
                        These keywords could improve your ATS score if they genuinely
                        reflect your experience.
                    </p>
                </div>
            </div>

            {keywords.length === 0 ? (
                <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-5">
                    <p className="text-emerald-400">
                        🎉 Excellent! No important keywords are missing.
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {keywords.map((keyword) => (
                        <div
                            key={keyword}
                            className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-400 hover:bg-red-500/20"
                        >
                            <X className="h-4 w-4" />
                            {keyword}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}