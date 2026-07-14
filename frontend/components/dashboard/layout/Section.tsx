interface SectionProps {
    id?: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Section({
    id,
    title,
    description,
    children,
}: SectionProps) {
    return (
        <section id={id} className="py-8 first:pt-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    {title}
                </h2>

                {description && (
                    <p className="mt-2 max-w-3xl text-zinc-400">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}