import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShellLayout } from "@/components/layout/ShellLayout";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Iosevka+Charon+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#cbe3b3] selection:text-[#1c2225]">
        <div className="grain-overlay" aria-hidden="true" />
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}
