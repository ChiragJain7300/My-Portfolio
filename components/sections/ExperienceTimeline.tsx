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
      <div className="absolute -left-[25px] md:-left-[41px] top-2.5 w-3 h-3 rounded-full bg-[#121217] border-2 border-[#e8e4dc] group-hover:scale-125 transition-transform" />

      {/* ── Header block: stacks on mobile, inline on md+ ── */}
      <div className="mb-2 space-y-0.5">
        {/* Row 1: Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold font-sans text-white leading-tight">
          {item.title}
        </h3>

        {/* Row 2: Company + date — always on their own row, no overflow fighting */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-zinc-500 text-xs">@</span>
          <span className="text-sm text-zinc-300 font-medium">{item.company}</span>
          <span className="text-zinc-600 text-xs">·</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
            <Calendar className="w-3 h-3 shrink-0" />
            {item.duration}
          </span>
        </div>
      </div>

      {/* Brief Overview */}
      <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed max-w-[52ch]">
        {item.desc}
      </p>

      {/* Expandable Deliverables */}
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="group/btn flex items-center gap-1.5 font-mono text-xs text-[#e8e4dc] hover:text-white transition-colors"
        >
          <span className="underline underline-offset-4 decoration-[#e8e4dc]/40 group-hover/btn:decoration-[#e8e4dc]">
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
              <ul className="mt-3 space-y-2 pt-3 border-t border-white/8 text-xs text-zinc-300 max-w-[52ch]">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e8e4dc] shrink-0 mt-0.5" />
                    <span className="text-zinc-200">{bullet}</span>
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
            className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/6 font-mono text-[10px] sm:text-xs text-zinc-300"
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
      className="min-h-screen flex flex-col justify-start py-14 sm:py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-[#09090b] border-t border-white/8"
    >
      <div className="max-w-5xl mx-auto w-full space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#e8e4dc] font-bold">[03]</span>
            <span className="tracking-wide uppercase text-zinc-300 font-semibold text-[11px] sm:text-xs">
              CHRONOLOGICAL PRODUCTION LOG
            </span>
          </div>

          <h2 className="text-[clamp(1.8rem,5.5vw,5rem)] font-sans font-black tracking-tight text-white uppercase">
            Engineering Trajectory
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-[52ch]">
            4+ years shipping enterprise web applications, backend integrations,
            and autonomous LLM orchestration pipelines.
          </p>
        </div>

        {/* Timeline — tighter left margin on mobile so node doesn't fall off screen */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 md:ml-6 pl-5 sm:pl-7 md:pl-10 space-y-10 sm:space-y-12">
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
