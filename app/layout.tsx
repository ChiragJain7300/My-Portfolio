import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chirag Jain | Full-Stack & AI Automation Engineer",
  description:
    "Portfolio of Chirag Jain, Full-Stack Developer & AI Automation Engineer specializing in Next.js, TypeScript, LLM pipelines, and production backend systems.",
  keywords: [
    "Chirag Jain",
    "Full Stack Developer",
    "AI Automation Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "LLM Pipelines",
    "Software Engineer",
  ],
  authors: [{ name: "Chirag Jain" }],
  openGraph: {
    title: "Chirag Jain | Full-Stack & AI Automation Engineer",
    description:
      "Crafting high-performance web platforms, intelligent automation workflows, and production AI pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} bg-[#F8F9FB] dark:bg-[#050508] text-zinc-900 dark:text-zinc-100 min-h-screen antialiased selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-200 transition-colors duration-200`}
      >
        {/* Subtle Editorial Film Grain Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
