"use client";

import { cn } from "@/lib/utils";

const sections = [
    { id: "breakdown", label: "Breakdown" },
    { id: "strengths", label: "Strengths" },
    { id: "keywords", label: "Missing Skills" },
    { id: "recommendations", label: "Recommendations" },
];

export default function SidebarNavigation() {
    const scrollTo = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <aside className="sticky top-24 hidden h-fit xl:block">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Navigation
                </p>

                <nav className="space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollTo(section.id)}
                            className={cn(
                                "flex w-full rounded-xl px-4 py-3 text-left text-sm transition-all",
                                "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}