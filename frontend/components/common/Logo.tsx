import Link from "next/link";

import { APP_CONFIG } from "@/constants/app";

interface LogoProps {
    showTagline?: boolean;
}

export default function Logo({
    showTagline = false,
}: Readonly<LogoProps>) {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
        >
            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg">
                AI
            </div>

            {/* Logo Text */}
            <div>
                <h1 className="text-lg font-bold tracking-tight text-white">
                    {APP_CONFIG.NAME}
                </h1>

                {showTagline && (
                    <p className="text-sm text-zinc-400">
                        Optimize your LinkedIn with AI
                    </p>
                )}
            </div>
        </Link>
    );
}