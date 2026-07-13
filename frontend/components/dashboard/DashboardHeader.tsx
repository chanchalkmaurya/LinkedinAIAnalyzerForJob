import { FileSearch } from "lucide-react";

interface DashboardHeaderProps {
    linkedinUrl: string;
}

export default function DashboardHeader({
    linkedinUrl,
}: DashboardHeaderProps) {
    return (
        <header className="mb-10">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-600 p-3">
                    <FileSearch className="h-6 w-6 text-white" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        ATS Analysis Report
                    </h1>

                    <p className="mt-1 text-sm text-zinc-400">
                        {linkedinUrl}
                    </p>
                </div>
            </div>
        </header>
    );
}