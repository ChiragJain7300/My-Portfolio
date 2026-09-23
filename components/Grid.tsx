"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCpu,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconLayersLinked,
  IconShieldCheck,
  IconWorld,
  IconSparkles,
  IconBolt,
  IconDatabase,
  IconCode,
  IconRobot,
  IconPlayerPlay,
  IconLoader2,
  IconClock,
  IconGitBranch,
} from "@tabler/icons-react";

type StackCategory = "all" | "frontend" | "backend" | "ai" | "devops";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops";
  level: "Expert" | "Advanced" | "Proficient";
  highlight?: boolean;
}

const skills: SkillItem[] = [
  { name: "Next.js", category: "frontend", level: "Expert", highlight: true },
  { name: "React", category: "frontend", level: "Expert", highlight: true },
  { name: "TypeScript", category: "frontend", level: "Expert", highlight: true },
  { name: "Tailwind CSS", category: "frontend", level: "Expert" },
  { name: "Framer Motion", category: "frontend", level: "Advanced" },
  { name: "Node.js", category: "backend", level: "Expert", highlight: true },
  { name: "Express.js", category: "backend", level: "Expert" },
  { name: "NestJS", category: "backend", level: "Expert" },
  { name: "PostgreSQL", category: "backend", level: "Advanced" },
  { name: "Supabase", category: "backend", level: "Proficient" },
  { name: "MongoDB", category: "backend", level: "Expert", highlight: true },
  { name: "REST APIs", category: "backend", level: "Expert" },
  { name: "LLM Pipelines & OpenAI", category: "ai", level: "Expert", highlight: true },
  { name: "n8n Automation", category: "ai", level: "Expert", highlight: true },
  { name: "Make.com", category: "ai", level: "Advanced" },
  { name: "Web Scraping & ETL", category: "ai", level: "Advanced" },
  { name: "Docker", category: "devops", level: "Proficient" },
  { name: "Git & GitHub CI", category: "devops", level: "Expert" },
  { name: "Vercel & Render", category: "devops", level: "Expert" },
];

const Grid = () => {
  const [activeCategory, setActiveCategory] = useState<StackCategory>("all");
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("chiragjain7300@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePipeline = () => {
    if (simulating) return;
    setSimulating(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setSimulating(false);
          setActiveStep(0);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="about" className="py-28 scroll-mt-28 relative">
      {/* Laser Gradient Divider Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-indigo-500/20 to-transparent" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-cyan-700 dark:text-cyan-400 shadow-sm">
          <IconCpu className="w-3.5 h-3.5" />
          <span>Core Competencies & Architecture</span>
        </div>
        <h2 className="heading">
          Engineering Matrix &{" "}
          <span className="text-gradient-cyan">System Highlights</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-sans font-light">
          A breakdown of technical domains, production automation pipelines, and core software engineering standards.
        </p>
      </div>

      {/* Bento Grid 2.0 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: AI & Automation Architecture (7 cols on desktop) */}
        <div className="lg:col-span-7 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/50 text-xs font-mono text-cyan-800 dark:text-cyan-300 font-medium">
                <IconRobot className="w-3.5 h-3.5" />
                <span>Production AI & Workflows</span>
              </div>
              <button
                onClick={handleSimulatePipeline}
                disabled={simulating}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800/60 text-xs font-mono text-cyan-800 dark:text-cyan-300 transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-sm"
              >
                {simulating ? (
                  <>
                    <IconLoader2 className="w-3 h-3 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <IconPlayerPlay className="w-3 h-3 text-cyan-700 dark:text-cyan-400" />
                    <span>Run Pipeline Sim</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mb-2 tracking-tight">
              LLM Pipelines & Enterprise Automations
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans font-light">
              Architecting intelligent automation systems: custom SEO recommendation engines, automated data ingestion pipelines, and multi-step n8n workflows built for scale.
            </p>

            {/* Visual Pipeline Node Diagram */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#08090f]/90 border border-zinc-200 dark:border-white/10 space-y-3 font-mono text-xs shadow-inner">
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">LIVE PIPELINE FLOW</span>
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  {simulating ? `Step ${activeStep} of 3 Active` : "Ready for Trigger"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                {/* Step 1 */}
                <div
                  className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                    activeStep === 1
                      ? "bg-cyan-100 dark:bg-cyan-950/70 border-cyan-500 shadow-md scale-105"
                      : "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 shadow-sm"
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">1. INGESTION</span>
                  <span className="text-zinc-950 dark:text-white font-semibold text-xs">Webhook / Scraper</span>
                  {activeStep === 1 && (
                    <span className="text-[9.5px] text-cyan-800 dark:text-cyan-300 font-mono">Payload buffered</span>
                  )}
                </div>

                {/* Step 2 */}
                <div
                  className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                    activeStep === 2
                      ? "bg-indigo-100 dark:bg-indigo-950/70 border-indigo-500 shadow-md scale-105"
                      : "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 shadow-sm"
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">2. LLM AGENT</span>
                  <span className="text-zinc-950 dark:text-white font-semibold text-xs">OpenAI + n8n ETL</span>
                  {activeStep === 2 && (
                    <span className="text-[9.5px] text-indigo-800 dark:text-indigo-300 font-mono">JSON Structured</span>
                  )}
                </div>

                {/* Step 3 */}
                <div
                  className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                    activeStep === 3
                      ? "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-500 shadow-md scale-105"
                      : "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 shadow-sm"
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">3. PERSISTENCE</span>
                  <span className="text-zinc-950 dark:text-white font-semibold text-xs">Postgres / Next.js</span>
                  {activeStep === 3 && (
                    <span className="text-[9.5px] text-emerald-800 dark:text-emerald-300 font-mono">Sync completed</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center space-x-1.5 font-mono text-zinc-700 dark:text-zinc-300">
              <IconSparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Prompt Engineering · Structured JSON · ETL</span>
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">Zero Data Loss</span>
          </div>
        </div>

        {/* Card 2: Interactive Tech Radar (5 cols on desktop) */}
        <div className="lg:col-span-5 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/50 text-xs font-mono text-indigo-800 dark:text-indigo-300 font-medium">
                <IconLayersLinked className="w-3.5 h-3.5" />
                <span>Interactive Tech Radar</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 tracking-tight">
              Categorized Stack
            </h3>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { id: "all", label: "All" },
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend" },
                { id: "ai", label: "AI/Automation" },
                { id: "devops", label: "Tools" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as StackCategory)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-sm"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-none">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      skill.highlight
                        ? "bg-zinc-100 dark:bg-white/10 border-zinc-300 dark:border-white/20 text-zinc-950 dark:text-white font-semibold shadow-sm"
                        : "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20"
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-400">· {skill.level}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span>{filteredSkills.length} Technologies</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">TypeScript Native</span>
          </div>
        </div>

        {/* Card 3: Engineering Standards (6 cols on desktop) */}
        <div className="lg:col-span-6 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-xs font-mono text-emerald-800 dark:text-emerald-300 font-medium mb-4">
              <IconShieldCheck className="w-3.5 h-3.5" />
              <span>Engineering Quality & Standards</span>
            </div>

            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 tracking-tight">
              Production-Grade Standards
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {/* Point 1 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconBolt className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">High Concurrency & Safety</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    Atomic database locks and cached token buffers that prevent collisions across parallel background jobs.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">Self-Healing Automation</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    Automated audit-backed recovery runners that detect and retry failed tasks in-place with zero data loss.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconDatabase className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">Fast & Lightweight ETL</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    Streaming data parsers and optimized catalog queries that process large feeds with low memory overhead.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">Strict Type-Safety</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    End-to-end TypeScript contracts, robust schema validations, and proactive error telemetry via Sentry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span>Production Tested · Zero Data Loss</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">99.9% Reliability</span>
          </div>
        </div>

        {/* Card 4: Global Availability (6 cols on desktop) */}
        <div className="lg:col-span-6 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 text-xs font-mono text-blue-800 dark:text-blue-300 font-medium mb-4">
              <IconWorld className="w-3.5 h-3.5" />
              <span>Worldwide Collaboration</span>
            </div>

            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 tracking-tight">
              Global Delivery & Availability
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans font-light">
              Experienced working with distributed international clients with seamless async workflows and sprint deliveries.
            </p>

            {/* 2 Key Collaboration Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mb-4">
              {/* Point 1 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconClock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">Timezone Overlap</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    4+ hours daily synchronous overlap with US, UK & European engineering teams (EST / GMT / CET).
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <IconGitBranch className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="font-semibold text-zinc-950 dark:text-white text-xs">Async-First Velocity</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-light">
                    Structured PRs, transparent Linear/Slack updates, and clean documentation for smooth handoffs.
                  </p>
                </div>
              </div>
            </div>

            {/* Streamlined 1-Click Email Action Pill */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-mono text-xs shadow-inner">
              <div className="flex items-center space-x-2.5 min-w-0 mr-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] hidden sm:inline">Direct Contact:</span>
                <span className="text-zinc-900 dark:text-white font-medium truncate text-xs">chiragjain7300@gmail.com</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all active:scale-95 shrink-0 cursor-pointer shadow-sm text-xs font-semibold"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                    <span className="text-emerald-400 dark:text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span>Remote Worldwide · India (IST)</span>
            <span className="text-blue-700 dark:text-blue-400 font-semibold">Response &lt;24h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
