"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBriefcase,
  IconCalendar,
  IconBuildingSkyscraper,
  IconCheck,
} from "@tabler/icons-react";

import { workExperience } from "@/data";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(workExperience.length - 1);
  const activeExp = workExperience[activeTab];

  return (
    <section className="py-28 w-full scroll-mt-28 relative" id="experience">
      {/* Laser Gradient Divider Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-indigo-500/20 to-transparent" />

      {/* Editorial Corner Stamp */}
      <div className="absolute top-28 left-6 text-zinc-400 dark:text-zinc-600 font-mono text-xs select-none pointer-events-none hidden md:block">
        + 03 / TRAJECTORY
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-cyan-700 dark:text-cyan-400 shadow-sm">
          <IconBriefcase className="w-3.5 h-3.5" />
          <span>Production Track Record</span>
        </div>
        <h2 className="heading">
          Experience & <span className="text-gradient-cyan">Trajectory</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-sans font-light">
          A track record of engineering scalable platforms, multi-step LLM automation workflows, and high-throughput backend APIs.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch justify-start gap-8 min-h-[440px]">
        {/* Company Tab List */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-zinc-200 dark:border-white/10 shrink-0 select-none pb-2 md:pb-0 scrollbar-none">
          {workExperience.map((exp, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-4 text-left font-mono text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer whitespace-nowrap min-w-[150px] md:min-w-[210px] rounded-r-2xl ${
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeExperienceTab"
                    className="absolute inset-0 bg-white dark:bg-white/10 border-b-2 md:border-b-0 md:border-l-2 border-cyan-600 dark:border-cyan-400 z-0 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center space-x-2.5">
                  <IconBuildingSkyscraper className={`w-4 h-4 ${isActive ? "text-cyan-700 dark:text-cyan-400" : "text-zinc-400 dark:text-zinc-500"}`} />
                  <span className="truncate">{exp.company}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detail Panel */}
        <div className="flex-1 glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between border border-black/[0.08] dark:border-white/10 shadow-sm backdrop-blur-2xl bg-white/90 dark:bg-[#0d0e17]/90">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              {/* Role Title & Date Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-white/10 pb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                    {activeExp.title}{" "}
                    <span className="text-cyan-700 dark:text-cyan-400 font-light">@ {activeExp.company}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono">
                    <IconCalendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{activeExp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Quantifiable Responsibilities & Bullets */}
              <ul className="mt-6 space-y-3.5 text-zinc-700 dark:text-zinc-300">
                {activeExp.bullets?.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed font-sans font-light">
                    <span className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0">
                      <IconCheck className="w-4 h-4" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                )) || <li>{activeExp.desc}</li>}
              </ul>

              {/* Technologies Applied */}
              {activeExp.tech && (
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/10">
                  <h4 className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                    Technologies & Applied Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.tech.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
