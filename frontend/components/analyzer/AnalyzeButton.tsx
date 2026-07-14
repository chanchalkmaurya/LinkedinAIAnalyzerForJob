interface AnalyzeButtonProps {
    loading?: boolean;
    disabled?: boolean;
}

export default function AnalyzeButton({
    loading = false,
    disabled = false,
}: Readonly<AnalyzeButtonProps>) {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className="
                group
                relative
                h-14
                w-full
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-blue-500/30
                disabled:cursor-not-allowed
                disabled:opacity-60
            "
        >
            <span className="relative z-10">
                {loading
                    ? "Analyzing..."
                    : "Analyze Profile"}
            </span>

            <div
                className="
                    absolute
                    inset-0
                    bg-white/10
                    opacity-0
                    transition
                    duration-300
                    group-hover:opacity-100
                "
            />
        </button>
    );
}