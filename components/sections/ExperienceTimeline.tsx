"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExperience, WorkExperience } from "@/data";
import { Calendar, ChevronDown, CheckCircle2 } from "lucide-react";

function ExperienceCard({
  item,
  defaultExpanded,
}: {
  item: WorkExperience;
  index: number;
  defaultExpanded: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="relative group">
      {/* Timeline Node — sized so it sits on the border-l line */}
      <div className="absolute -left-[25px] md:-left-[41px] top-2.5 w-3 h-3 rounded-full bg-[#1c2225] border-2 border-[var(--color-green)] group-hover:scale-125 transition-transform" />

      {/* ── Header block: stacks on mobile, inline on md+ ── */}
      <div className="mb-2 space-y-0.5">
        {/* Row 1: Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold font-sans text-[var(--color-text)] leading-tight">
          {item.title}
        </h3>

        {/* Row 2: Company + date — always on their own row, no overflow fighting */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[var(--color-green)] text-xs">@</span>
          <span className="text-sm text-[var(--color-green)] font-medium">{item.company}</span>
          <span className="text-[var(--color-overlay0)] text-xs">·</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[var(--color-overlay2)]">
            <Calendar className="w-3 h-3 shrink-0" />
            {item.duration}
          </span>
        </div>
      </div>

      {/* Brief Overview */}
      <p className="text-xs sm:text-sm text-[var(--color-subtext2)] mb-4 leading-relaxed max-w-[52ch]">
        {item.desc}
      </p>

      {/* Expandable Deliverables */}
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="group/btn flex items-center gap-1.5 font-mono text-xs text-[var(--color-green)] hover:text-white transition-colors"
        >
          <span className="underline underline-offset-4 decoration-[var(--color-green)]/40 group-hover/btn:decoration-[var(--color-green)]">
            {isExpanded
              ? "Hide deliverables"
              : `Show deliverables (${item.bullets.length})`}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2 pt-3 border-t border-[var(--color-overlay0)]/30 text-xs text-[var(--color-subtext2)] max-w-[52ch]">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text)]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tech Stack chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {item.tech.map((tech, tIdx) => (
          <span
            key={tIdx}
            className="px-2 py-0.5 rounded bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/30 font-mono text-[10px] sm:text-xs text-[var(--color-subtext1)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  const sortedExperience = [...workExperience].reverse();

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-start py-14 sm:py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-[#1c2225] border-t border-[var(--color-overlay0)]/30"
    >
      <div className="max-w-5xl mx-auto w-full space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[var(--color-green)] font-bold">[03]</span>
            <span className="tracking-wide uppercase text-[var(--color-subtext2)] font-semibold text-[11px] sm:text-xs">
              CHRONOLOGICAL PRODUCTION LOG
            </span>
          </div>

          <h2 className="text-[clamp(1.8rem,5.5vw,5rem)] font-sans font-black tracking-tight text-[var(--color-text)] uppercase">
            Engineering Trajectory
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[var(--color-subtext2)] leading-relaxed max-w-[52ch]">
            4+ years shipping enterprise web applications, backend integrations,
            and autonomous LLM orchestration pipelines.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-[var(--color-overlay0)]/30 ml-2 sm:ml-4 md:ml-6 pl-5 sm:pl-7 md:pl-10 space-y-10 sm:space-y-12">
          {sortedExperience.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
