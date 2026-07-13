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
            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? "Analyzing..." : "Analyze Profile"}
        </button>
    );
}