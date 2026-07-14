import KeywordChip from "./keywordChip";

interface Props {
    keywords: string[];
}

export default function KeywordSection({
    keywords,
}: Props) {
    return (
        <div>
            <br />
            <div className="flex flex-wrap gap-3">
                {keywords.map((keyword) => (
                    <KeywordChip
                        key={keyword}
                        keyword={keyword}
                    />
                ))}
            </div>
        </div>
    );
}