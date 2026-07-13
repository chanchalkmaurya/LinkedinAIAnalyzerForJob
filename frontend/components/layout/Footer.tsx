import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { APP_CONFIG } from "@/constants/app";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-[#09090b]">
            <PageContainer>
                <div className="flex flex-col items-center justify-between gap-6 py-8 text-center md:flex-row md:text-left">
                    <div>
                       
                    </div>

                    <div className="text-sm text-zinc-500">
                        <p>
                            © {new Date().getFullYear()} {APP_CONFIG.NAME}
                        </p>

                        <p className="mt-2">
                            Built with{" "}
                            <span className="font-medium text-zinc-300">
                                Next.js
                            </span>{" "}
                            •{" "}
                            <span className="font-medium text-zinc-300">
                                Django
                            </span>{" "}
                            •{" "}
                            <span className="font-medium text-zinc-300">
                                OpenAI
                            </span>
                        </p>
                    </div>

                    <Link
                        href={APP_CONFIG.GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        
                    </Link>
                </div>
            </PageContainer>
        </footer>
    );
}