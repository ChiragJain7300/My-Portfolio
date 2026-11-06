"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaseStudy } from "@/types/case-study";
import { Server, Shield, CheckCircle2, ArrowRight } from "lucide-react";

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <header className="space-y-6 pb-8 border-b border-[var(--color-overlay0)]/30 relative overflow-hidden">
      {/* Subtle animated gradient accent line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-green)] via-[var(--color-purple)] to-[var(--color-blue)] animate-gradient-x" />

      {/* Top Breadcrumb & Action Row */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-3 border-b border-[var(--color-overlay0)]/30 pt-2"
      >
        <Link
          href="/#projects"
          className="ide-btn text-xs min-h-[36px] sm:min-h-[32px] px-3.5 py-1.5 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:outline-none"
          style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
          aria-label="Back to projects showcase"
        >
          <span>←</span>
          <span>back to portfolio / projects</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="ide-btn text-xs font-mono min-h-[36px] sm:min-h-[32px] px-3 py-1.5 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--color-purple)] focus-visible:outline-none cursor-pointer"
            style={{ "--btn-color": "var(--color-purple)" } as React.CSSProperties}
            title="Copy URL for your resume or direct recruiter sharing"
            aria-label={copiedLink ? "Resume Link Copied to clipboard" : "Copy resume link to clipboard"}
          >
            <span>{copiedLink ? "✓" : "📋"}</span>
            <span>{copiedLink ? "Resume Link Copied" : "Copy Direct Link"}</span>
          </button>

          <span className="font-mono text-xs px-2.5 py-1 rounded-xs border border-[var(--color-green)]/40 text-[var(--color-green)] bg-[var(--color-green)]/10 font-semibold">
            {caseStudy.categoryLabel}
          </span>
        </div>
      </motion.div>

      {/* Title & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-green)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-ping" aria-hidden="true" />
          <span className="tracking-wide">PRODUCTION CASE STUDY · {caseStudy.slug}.md</span>
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.12]">
          {caseStudy.title}
        </h1>

        <p className="font-sans text-base sm:text-lg text-[var(--color-subtext2)] leading-relaxed font-normal max-w-4xl pt-0.5">
          {caseStudy.tagline}
        </p>
      </motion.div>

      {/* Project Meta Strip + Live Pipeline Heartbeat Preview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[var(--color-surface1)]/25 rounded-xl border border-[var(--color-overlay0)]/30 text-xs font-mono"
      >
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)] block font-semibold">
            ENGINEERING ROLE
          </span>
          <span className="text-sm font-sans font-semibold text-[var(--color-text)] mt-0.5 block truncate">
            {caseStudy.role}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)] block font-semibold">
            PRODUCTION TIMELINE
          </span>
          <span className="text-sm font-sans font-semibold text-[var(--color-text)] mt-0.5 block truncate">
            {caseStudy.timeline}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)] block font-semibold">
            OWNERSHIP SCOPE
          </span>
          <span className="text-sm font-sans font-semibold text-[var(--color-text)] mt-0.5 block truncate">
            {caseStudy.teamSize || "Backend Architecture Lead"}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)] block font-semibold">
            DEPLOYMENT
          </span>
          <span className="text-sm font-sans font-semibold text-[var(--color-green)] mt-0.5 block truncate flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
            {caseStudy.status === "PRODUCTION_ACTIVE"
              ? "Production Live"
              : caseStudy.status === "PROPRIETARY_NDA"
              ? "Proprietary / NDA"
              : "Completed"}
          </span>
        </div>
      </motion.div>

      {/* "What You'll Learn in 60 Seconds" Executive Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="p-5 sm:p-6 bg-gradient-to-br from-[var(--color-surface1)]/30 to-[var(--color-surface0)]/50 border border-[var(--color-green)]/30 rounded-xl shadow-lg relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-overlay0)]/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-green)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-green)] font-bold">
              Executive Briefing: 3 Core Engineering Proofs
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--color-overlay2)] hidden sm:inline">
            // 60-Second Scan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudy.impactMetrics.slice(0, 3).map((metric, idx) => {
            const colorClass =
              idx === 0
                ? "text-[var(--color-green)]"
                : idx === 1
                ? "text-[var(--color-purple)]"
                : "text-[var(--color-blue)]";

            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[var(--color-surface0)]/80 border border-[var(--color-overlay0)]/20 space-y-1"
              >
                <div className={`flex items-center gap-1.5 ${colorClass} font-mono text-xs font-semibold`}>
                  <span>0{idx + 1} /</span>
                  <span>{metric.label}</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed">
                  <strong className={`${colorClass} font-semibold font-mono mr-1.5`}>
                    [{metric.value}]
                  </strong>
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Primary Tech Stack Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs"
      >
        <span className="text-[var(--color-overlay2)] mr-1">
          Production Stack:
        </span>
        {caseStudy.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 bg-[var(--color-surface1)]/60 text-[var(--color-subtext2)] border border-[var(--color-overlay0)]/40 rounded-md hover:border-[var(--color-green)]/40 transition-colors"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </header>
  );
}
export default CaseStudyHero;
