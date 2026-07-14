import { FileSearch } from "lucide-react";

interface Props {
    linkedinUrl: string;
}

export default function DashboardHeader({
    linkedinUrl,
}: Props) {
    return (
        <header className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-8">
            <div>
                <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-xl bg-blue-600/20 p-3">
                        <FileSearch className="h-7 w-7 text-blue-400" />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            ATS Analysis Report
                        </h1>

                        <p className="mt-1 text-zinc-400">
                            AI-powered analysis of your LinkedIn profile.
                        </p>
                    </div>
                </div>

                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300"
                >
                    {linkedinUrl}
                </a>
            </div>

            <div className="hidden rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-4 lg:block">
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Analysis
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                    Complete
                </p>
            </div>
        </header>
    );
}