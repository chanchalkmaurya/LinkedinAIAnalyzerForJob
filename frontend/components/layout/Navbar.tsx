import Link from "next/link";

import Logo from "@/components/common/Logo";
import PageContainer from "@/components/layout/PageContainer";
import { APP_CONFIG } from "@/constants/app";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur">
            <PageContainer>
                <div className="flex h-16 items-center justify-between">
                    {/* Left */}
                    <Logo />

                    {/* Right */}
                    <nav className="flex items-center gap-4">
                        <Link
                            href={APP_CONFIG.GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                        >
                            GitHub
                        </Link>

                        <Link
                            href="/"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            Analyze
                        </Link>
                    </nav>
                </div>
            </PageContainer>
        </header>
    );
}