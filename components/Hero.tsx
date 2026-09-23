"use client";

import React from "react";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconDownload,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { LiveTerminal } from "./ui/LiveTerminal";

const Hero = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const yearsExperience = Math.max(3, currentYear - startYear);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12">
      {/* Atmospheric glows — constrained to not bleed layout */}
      <div className="absolute top-0 left-1/3 w-[420px] h-[420px] bg-cyan-500/8 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-indigo-500/6 dark:bg-indigo-500/8 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Editorial corner marks — only on large screens */}
      <div className="absolute top-[88px] left-6 text-zinc-400 dark:text-zinc-600 font-mono text-[10px] select-none pointer-events-none hidden xl:block tracking-wider">
        01 / HERO
      </div>
      <div className="absolute top-[88px] right-6 text-zinc-400 dark:text-zinc-600 font-mono text-[10px] select-none pointer-events-none hidden xl:block tracking-wider">
        28.61° N · 77.20° E
      </div>

      {/* Main responsive grid: stacked below 1024px (lg), split 2-column on lg+ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">

        {/* ── Left Column ── */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 sm:gap-6 min-w-0">

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 dark:bg-cyan-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-700 dark:text-zinc-300 font-medium">
              Full Stack &amp; AI Automation
            </span>
            <span className="text-zinc-300 dark:text-zinc-600 select-none">/</span>
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">Available</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white leading-[1.08]">
            Architecting{" "}
            <span className="font-light italic text-zinc-400 dark:text-zinc-500">
              digital systems
            </span>{" "}
            &amp;{" "}
            <span className="text-gradient-cyan">intelligent</span>{" "}
            pipelines.
          </h1>

          {/* Subtext */}
          <p className="text-[clamp(0.9375rem,1.4vw,1.0625rem)] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[56ch] font-light">
            I am Chirag Jain. I engineer production web applications, autonomous
            LLM workflows, and modular cloud architectures where high
            performance meets refined aesthetics.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-zinc-950/10 active:scale-[0.97] cursor-pointer"
            >
              <span>Selected Works</span>
              <IconArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="https://github.com/ChiragJain7300"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-sm"
            >
              <IconDownload className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Resume PDF</span>
            </a>

            {/* Social icon pills */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ChiragJain7300"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors shadow-sm"
              >
                <IconBrandGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/chirag-jain-7300"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
              >
                <IconBrandLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Spec strip */}
          <div className="w-full pt-5 border-t border-zinc-200 dark:border-white/10 grid grid-cols-3 gap-x-4 gap-y-1 font-mono max-w-lg text-center lg:text-left mx-auto lg:mx-0">
            <div>
              <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-zinc-950 dark:text-white tabular-nums">
                {yearsExperience}<span className="text-cyan-600 dark:text-cyan-400 font-light">+</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-sans mt-0.5 leading-tight">
                Years in Production
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-zinc-950 dark:text-zinc-200 tabular-nums">
                10<span className="text-indigo-500 dark:text-indigo-400 font-light">+</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-sans mt-0.5 leading-tight">
                Shipped Systems
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
                100<span className="text-zinc-400 dark:text-zinc-500 font-light">%</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-sans mt-0.5 leading-tight">
                TypeScript &amp; AI
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Terminal ── */}
        <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end min-w-0 pt-2 lg:pt-0">
          <div className="w-full max-w-xl lg:max-w-none">
            <LiveTerminal />
          </div>
        </div>
      </div>

      {/* Bottom gradient hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </section>
  );
};

export default Hero;
