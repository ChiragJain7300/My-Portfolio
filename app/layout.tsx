import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ShellLayout } from "@/components/layout/ShellLayout";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c2225",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Chirag Jain — Full Stack Developer & AI Automation Engineer",
  description:
    "Production portfolio of Chirag Jain. Next.js App Router, TypeScript, resilient Node.js microservices, LLM pipelines, and high-throughput automation architectures.",
  keywords: [
    "Chirag Jain",
    "Full Stack Developer",
    "AI Automation Engineer",
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Node.js",
    "n8n",
    "LLM Pipelines",
    "Digital Meadow Style Portfolio",
  ],
  authors: [{ name: "Chirag Jain", url: "https://github.com/ChiragJain7300" }],
  openGraph: {
    title: "Chirag Jain — Full Stack Developer & AI Automation Engineer",
    description:
      "Craft-driven portfolio showcasing production Next.js apps, concurrency engines, and LLM automation pipelines.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased selection:bg-[#cbe3b3] selection:text-[#1c2225]">
        <div className="grain-overlay" aria-hidden="true" />
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}
