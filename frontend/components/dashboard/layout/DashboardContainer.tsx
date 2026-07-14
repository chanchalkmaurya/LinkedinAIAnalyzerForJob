interface DashboardContainerProps {
    children: React.ReactNode;
}

export default function DashboardContainer({
    children,
}: DashboardContainerProps) {
    return (
        <main className="min-h-screen bg-zinc-950">
            <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
                {children}
            </div>
        </main>
    );
}