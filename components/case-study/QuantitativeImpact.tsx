"use client";

import React, { useState } from "react";
import { ImpactMetric } from "@/types/case-study";
import { AnimatedCounter } from "./AnimatedCounter";
import { ShieldCheck, Sparkles, Zap, ChevronDown, ChevronUp } from "lucide-react";

interface QuantitativeImpactProps {
  metrics: ImpactMetric[];
}

export function QuantitativeImpact({ metrics }: QuantitativeImpactProps) {
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(0);

  if (!metrics || metrics.length === 0) return null;

  const heroMetric = metrics[0];
  const supportingMetrics = metrics.slice(1);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── HERO KPI: The 98% Elimination Metric ── */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[var(--color-surface1)]/40 via-[var(--color-surface0)]/60 to-[var(--color-base)] border border-[var(--color-green)]/40 rounded-xl shadow-xl overflow-hidden group">
        {/* Ambient glow mesh */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(203,227,179,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--color-green)]" aria-hidden="true" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[var(--color-green)]/15 text-[var(--color-green)] border border-[var(--color-green)]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-ping" />
                PRIMARY SYSTEM KPI
              </span>
              <span className="font-mono text-xs text-[var(--color-overlay2)]">
                PRODUCTION VERIFIED
              </span>
            </div>

            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[var(--color-text)] tracking-tight">
              {heroMetric.label}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[var(--color-subtext2)] leading-relaxed max-w-2xl">
              {heroMetric.detail}
            </p>
          </div>

          {/* Giant Number Display */}
          <div className="lg:text-right shrink-0">
            <AnimatedCounter
              value={heroMetric.value}
              className="font-mono text-6xl sm:text-7xl lg:text-8xl font-black text-[var(--color-green)] tracking-tighter tabular-nums drop-shadow-[0_0_35px_rgba(203,227,179,0.25)] leading-none block"
              duration={1600}
            />
            <span className="font-mono text-xs text-[var(--color-overlay2)] uppercase tracking-wider block mt-1">
              Network Round-Trips Cut
            </span>
          </div>
        </div>

        {/* Hero Interview Proof Dropdown */}
        {heroMetric.defenseInInterview && (
          <div className="mt-6 pt-4 border-t border-[var(--color-overlay0)]/30">
            <button
              type="button"
              aria-expanded={expandedInterviewIdx === 0}
              onClick={() => setExpandedInterviewIdx(expandedInterviewIdx === 0 ? null : 0)}
              className="flex items-center justify-between w-full font-mono text-xs text-[var(--color-green)] hover:text-white transition-colors cursor-pointer py-1"
            >
              <span className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-green)]" />
                <span>Senior Engineer Interview Defense &amp; Number Proof:</span>
              </span>
              <span className="text-[11px] flex items-center gap-1 text-[var(--color-overlay2)]">
                {expandedInterviewIdx === 0 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expandedInterviewIdx === 0 ? "collapse proof" : "expand proof"}
              </span>
            </button>

            {expandedInterviewIdx === 0 && (
              <div className="mt-3 p-4 rounded-lg bg-[var(--color-surface0)]/90 border border-[var(--color-green)]/30 font-sans text-xs sm:text-sm text-[var(--color-text)] leading-relaxed italic">
                &ldquo;{heroMetric.defenseInInterview}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── SUPPORTING METRICS (3-Column Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {supportingMetrics.map((metric, idx) => {
          const actualIdx = idx + 1;
          const isInterviewOpen = expandedInterviewIdx === actualIdx;
          const colorStyles = [
            { text: "text-[var(--color-blue)]", border: "border-[var(--color-blue)]", bg: "bg-[var(--color-blue)]" },
            { text: "text-[var(--color-purple)]", border: "border-[var(--color-purple)]", bg: "bg-[var(--color-purple)]" },
            { text: "text-[var(--color-orange)]", border: "border-[var(--color-orange)]", bg: "bg-[var(--color-orange)]" },
          ][idx % 3];

          return (
            <div
              key={actualIdx}
              className="p-5 bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/40 rounded-xl transition-all hover:border-[var(--color-overlay0)] flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <AnimatedCounter
                  value={metric.value}
                  className={`font-mono text-3xl sm:text-4xl font-extrabold ${colorStyles.text} tracking-tight tabular-nums block`}
                  duration={1400}
                />

                <h4 className="font-sans text-sm sm:text-base font-bold text-[var(--color-text)] mt-2">
                  {metric.label}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed mt-1.5">
                  {metric.detail}
                </p>
              </div>

              {metric.defenseInInterview && (
                <div className="mt-4 pt-3 border-t border-[var(--color-overlay0)]/30">
                  <button
                    type="button"
                    aria-expanded={isInterviewOpen}
                    onClick={() =>
                      setExpandedInterviewIdx(isInterviewOpen ? null : actualIdx)
                    }
                    className="font-mono text-[11px] text-[var(--color-subtext1)] hover:text-white flex items-center justify-between w-full cursor-pointer py-1"
                  >
                    <span>Interview Defense:</span>
                    <span>{isInterviewOpen ? "▲" : "▼"}</span>
                  </button>

                  {isInterviewOpen && (
                    <div className="mt-2 p-3 rounded-lg bg-[var(--color-surface0)]/90 border border-[var(--color-overlay0)]/40 font-sans text-xs text-[var(--color-text)] leading-relaxed italic">
                      &ldquo;{metric.defenseInInterview}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default QuantitativeImpact;
