import StrengthCard from "./StrengthCard";

interface Props {
    strengths: string[];
}

export default function StrengthGrid({
    strengths,
}: Props) {
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {strengths.map((strength, index) => (
                <StrengthCard
                    key={index}
                    strength={strength}
                />
            ))}
        </div>
    );
}