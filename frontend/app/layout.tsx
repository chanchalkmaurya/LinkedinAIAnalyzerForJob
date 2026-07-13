import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import AnalysisProvider from "@/providers/AnalysisProvider";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LinkedIn Analyzer AI",
    description:
        "Analyze your LinkedIn profile against any Job Description using AI.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AnalysisProvider>
                    {children}
                </AnalysisProvider>

                <Toaster
                    position="top-right"
                    richColors
                    closeButton
                    duration={4000}
                    expand={false}
                    visibleToasts={3}
                />
            </body>
        </html>
    );
}