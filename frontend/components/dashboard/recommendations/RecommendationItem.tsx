import { CheckCircle2 } from "lucide-react";

interface RecommendationItemProps {
    text: string;
}

export default function RecommendationItem({
    text,
}: RecommendationItemProps) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-blue-500/50">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />

            <p className="text-sm leading-6 text-zinc-300">
                {text}
            </p>
        </div>
    );
}