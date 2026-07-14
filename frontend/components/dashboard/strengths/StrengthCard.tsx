import { CheckCircle2 } from "lucide-react";

interface StrengthCardProps {
    strength: string;
}

export default function StrengthCard({
    strength,
}: StrengthCardProps) {
    return (
        <div
            className="
                group
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-emerald-500/15
                bg-emerald-500/5
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-500/40
            "
        >
            <div className="rounded-full bg-emerald-500/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

            <p className="leading-7 text-zinc-300">
                {strength}
            </p>
        </div>
    );
}