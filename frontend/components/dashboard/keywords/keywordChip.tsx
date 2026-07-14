interface Props {
    keyword: string;
}

export default function KeywordChip({
    keyword,
}: Props) {
    return (
        <div
            className="
                group
                rounded-full
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-2
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-400
                hover:bg-red-500/10
            "
        >
            <span className="text-sm font-medium text-red-300">
                {keyword}
            </span>
        </div>
    );
}