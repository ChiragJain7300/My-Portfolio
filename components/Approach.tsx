"use client";

import React from "react";
import {
  IconCpu,
  IconCode,
  IconRocket,
  IconCheck,
  IconLayersLinked,
} from "@tabler/icons-react";

const steps = [
  {
    phase: "01 / ARCHITECTURE",
    title: "System Modeling & Schema Design",
    description:
      "Transforming complex product requirements into resilient data schemas, type-safe API contracts, and modular component hierarchies before writing code.",
    bullets: [
      "Database schema & relationship modeling",
      "API contract definition & validation",
      "Performance & scale considerations",
    ],
    icon: <IconLayersLinked className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    badgeColor: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/40",
  },
  {
    phase: "02 / FULL-STACK",
    title: "Modular Full-Stack Development",
    description:
      "Writing clean, maintainable TypeScript code with strict component isolation, responsive layouts, and robust client/server data flows.",
    bullets: [
      "Atomic, reusable component library",
      "Robust state management & caching",
      "Continuous linting & strict type checks",
    ],
    icon: <IconCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    badgeColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40",
  },
  {
    phase: "03 / TELEMETRY",
    title: "Edge Deployment & Observability",
    description:
      "Deploying to modern edge platforms with CI/CD automation, sub-second LCP audit, and proactive telemetry monitoring via Sentry.",
    bullets: [
      "Sub-second LCP & Web Vitals audit",
      "Automated CI/CD deployment pipelines",
      "Live error monitoring & telemetry",
    ],
    icon: <IconRocket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40",
  },
];

const Approach = () => {
  return (
    <section className="py-28 w-full scroll-mt-28 relative">
      {/* Laser Gradient Divider Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-indigo-500/20 to-transparent" />

      {/* Editorial Corner Stamp */}
      <div className="absolute top-28 right-6 text-zinc-400 dark:text-zinc-600 font-mono text-xs select-none pointer-events-none hidden md:block">
        + 04 / METHODOLOGY
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-cyan-700 dark:text-cyan-400 shadow-sm">
          <IconCpu className="w-3.5 h-3.5" />
          <span>Engineering Discipline</span>
        </div>
        <h2 className="heading">
          Lifecycle & <span className="text-gradient-cyan">Standards</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-sans font-light">
          A disciplined, production-tested methodology from initial architectural blueprint to live deployment.
        </p>
      </div>

      {/* 3-Column Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-black/[0.08] dark:border-white/10 bg-white/90 dark:bg-[#0d0e17]/90 relative overflow-hidden group shadow-sm"
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm">
                  {step.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-mono tracking-wider border ${step.badgeColor} font-medium`}>
                  {step.phase}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight pt-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                {step.description}
              </p>

              {/* Bullets */}
              <div className="pt-3 border-t border-zinc-100 dark:border-white/10 space-y-2">
                {step.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start space-x-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans font-light">
                    <IconCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[10.5px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Standard: Production</span>
              <span className="text-zinc-600 dark:text-zinc-400">Step 0{idx + 1} / 03</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;
