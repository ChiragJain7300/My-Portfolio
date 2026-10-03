"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/LenisProvider";
import { developerProfile } from "@/data";
import { ArrowDown, Terminal } from "lucide-react";

// Dynamically import the Three.js scene — browser-only, no SSR
const HeroScene = dynamic(
  () => import("@/components/sections/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

const titleLines = [
  "ENGINEERING",
  "RESILIENT WEB PLATFORMS &",
  "INTERACTIVE ARCHITECTURE",
];

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-between px-5 sm:px-8 md:px-10 lg:px-16 pt-16 sm:pt-24 md:pt-28 pb-8 overflow-hidden bg-[#09090b]"
    >
      {/* Three.js dual-layer scene: neural network + particle text */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Vignette overlay to ground the text content */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 50%, transparent 30%, rgba(9,9,11,0.62) 100%)",
        }}
      />

      {/* Top Monospace Metadata Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-300" />
          <span>Production Systems &amp; Full Stack Architecture</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-zinc-400">
          <span>BASED: {developerProfile.location}</span>
          <span>·</span>
          <span>EXP: {developerProfile.yearsInProd}</span>
        </div>
      </div>

      {/* Main Editorial Headline — sits in lower half, below the 3D particle text scene */}
      <div className="relative z-10 mt-auto mb-2 md:mb-4 py-2 md:py-4">
        <div className="overflow-hidden">
          {titleLines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="text-[clamp(1.75rem,3.7vw,3.25rem)] font-sans font-black tracking-[-0.04em] leading-[0.96] uppercase text-white/90 select-none">
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subtitle Monospace Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 font-mono text-xs md:text-sm text-zinc-400 max-w-3xl"
        >
          <span className="text-[#e8e4dc] font-semibold">[ CHIRAG JAIN ]</span>
          <span className="text-zinc-600">—</span>
          <span>Full Stack Developer · AI Automation · Production Systems</span>
        </motion.div>
      </div>

      {/* Bottom Editorial Anchors */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/[0.08] text-xs font-mono">
        <button
          onClick={() => scrollTo("#projects")}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <span className="text-white/40 group-hover:text-white/70">[01]</span>
          <span className="tracking-widest uppercase font-semibold">FEATURED WORK</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
        </button>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-zinc-400 tracking-wider">
            STACK: NEXT.JS 16 · TYPESCRIPT · LENIS
          </span>
          <button
            onClick={() => scrollTo("#projects")}
            className="group flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors tracking-widest uppercase"
          >
            <span>SCROLL</span>
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
