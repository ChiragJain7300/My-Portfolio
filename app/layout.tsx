import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Cinzel } from "next/font/google";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "./globals.css";
import { AstryxProvider } from "@/components/providers/AstryxProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { RecruiterModeProvider } from "@/components/providers/RecruiterModeContext";
import { GlobalEffects } from "@/components/ui/GlobalEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${cinzel.variable} min-h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#1c2225] text-[#adc9bc] selection:bg-[#cbe3b3]/25 selection:text-white antialiased">
        <AstryxProvider>
          <GlobalEffects />
          <LenisProvider>
            <RecruiterModeProvider>
              {children}
            </RecruiterModeProvider>
          </LenisProvider>
        </AstryxProvider>
      </body>
    </html>
  );
}
