"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/LenisProvider";
import { ArrowDown, ArrowUpRight, FileText, Terminal } from "lucide-react";

// Dynamically import the 3D Organic Spire — browser-only, zero SSR jitter
const HeroScene = dynamic(
  () => import("@/components/sections/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 pt-24 pb-8 overflow-hidden bg-[#141719] select-none"
    >
      {/* ── Technical Cross/Dot Grid Pattern ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(203, 227, 179, 0.09) 1.2px, transparent 1.2px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Atmospheric Radial Vignette ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 20%, rgba(20,23,25,0.92) 100%)",
        }}
      />

      {/* ── 3D Organic Spire & Luminous Nodes Scene ───────────────────────── */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* ── Iconic Bold Lime Ribbon Sweep (Bottom-Right Accent) ───────────── */}
      <motion.div
        initial={{ opacity: 0, x: 70, y: 70 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 -right-6 pointer-events-none select-none z-10 w-[260px] sm:w-[380px] md:w-[480px] lg:w-[560px] h-auto"
      >
        <svg
          viewBox="0 0 520 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_40px_rgba(158,240,26,0.5)]"
        >
          <path
            d="M 20 230 C 180 205, 360 165, 510 15"
            stroke="#9ef01a"
            strokeWidth="38"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* ── Spacer for top clearance ─────────────────────────────────────── */}
      <div className="w-full h-4 sm:h-8" />

      {/* ── Centered Haute-Couture Editorial Hero Typography ─────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-5xl mx-auto my-auto space-y-3 sm:space-y-4">
        {/* Top Kicker Label matching Behance 'reputationsquad™' minimalism */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-center select-none pb-1"
        >
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.28em] text-[#b0beae]/90 lowercase">
            chiragjain™
          </span>
        </motion.div>

        {/* Main Statuesque Headline in Tall Condensed Bebas Neue Typography */}
        <h1 className="overflow-hidden space-y-0.5 sm:space-y-1 font-[family-name:var(--font-bebas)] text-[clamp(2.75rem,7.5vw,6.4rem)] tracking-[0.02em] leading-[0.92] uppercase text-[#f7f8ee] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
          <motion.span
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            ENGINEERING RESILIENT,
          </motion.span>

          <motion.span
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            REACTIVE &amp; INTELLIGENT SYSTEMS
          </motion.span>
        </h1>

        {/* Bottom Editorial Subtitle in Classical Refined Cinzel Serif */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="pt-2"
        >
          <span className="font-[family-name:var(--font-cinzel)] font-normal text-xs sm:text-[13px] md:text-sm tracking-[0.38em] text-[#c1d3be]/85 uppercase">
            FULL STACK ARCHITECTURE · AI AUTOMATION
          </span>
        </motion.div>

        {/* ── Refined Non-Oversized Direct Action Buttons ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 pt-3"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#projects");
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c2225]/80 hover:bg-[#232a2e] border border-[var(--color-green)]/30 hover:border-[var(--color-green)]/60 text-[var(--color-green)] hover:text-white font-mono text-[11px] font-semibold tracking-wider transition-all active:scale-95 shadow-sm"
          >
            <span>Explore my work</span>
            <ArrowDown className="w-3.5 h-3.5 text-[var(--color-green)]" />
          </a>

          <a
            href="mailto:chiragjain7300@gmail.com?subject=Resume%20Request%20%E2%80%94%20Chirag%20Jain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 text-[var(--color-subtext2)] hover:text-white font-mono text-[11px] font-semibold tracking-wider transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-overlay2)]" />
          </a>
        </motion.div>
      </div>

      {/* ── Bottom Editorial Anchors ───────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-6xl flex items-center justify-between pt-6 border-t border-[var(--color-overlay0)]/25 text-xs font-mono text-[var(--color-overlay2)]">
        <button
          type="button"
          onClick={() => scrollTo("#projects")}
          className="group flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[#9ef01a] font-bold">[01]</span>
          <span className="tracking-widest uppercase font-semibold text-[11px] text-[var(--color-subtext2)] group-hover:text-white">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#9ef01a] transition-transform group-hover:translate-y-1" />
        </button>

        <div className="hidden sm:flex items-center gap-3 text-[11px] tracking-wider text-[var(--color-subtext1)] font-mono">
          <Terminal className="w-3.5 h-3.5 text-[#9ef01a]" />
          <span>PRODUCTION PLATFORMS · NODE.JS · NEXT.JS · LLM PIPELINES</span>
        </div>

        <div className="text-[11px] tracking-widest text-[#9ef01a] font-semibold uppercase">
          ● OPEN TO ROLES
        </div>
      </div>
    </section>
  );
}
export default Hero;
