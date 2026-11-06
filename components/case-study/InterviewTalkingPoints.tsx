"use client";

import React, { useState } from "react";
import { InterviewTalkingPoint } from "@/types/case-study";

interface InterviewTalkingPointsProps {
  points: InterviewTalkingPoint[];
}

export function InterviewTalkingPoints({ points }: InterviewTalkingPointsProps) {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (idx: number) => {
    setOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[var(--color-purple)]/10 border border-[var(--color-purple)]/30 rounded-md space-y-1.5">
        <div className="flex items-center gap-2 text-[var(--color-purple)] font-bold font-sans text-sm">
          <span>🎯</span>
          <span>Technical Interview Defense &amp; Number Proof</span>
        </div>
        <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed">
          How to explain, defend, and walk through the quantitative engineering claims made on this project during a technical screening or system design interview.
        </p>
      </div>

      <div className="space-y-3">
        {points.map((pt, idx) => {
          const isOpen = !!openMap[idx];
          const btnId = `interview-btn-${idx}`;
          const panelId = `interview-panel-${idx}`;

          return (
            <div
              key={idx}
              className="border border-[var(--color-overlay0)]/40 bg-[var(--color-surface1)]/20 rounded-md overflow-hidden transition-all"
            >
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-[var(--color-surface1)]/50 transition-colors cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-purple)] focus-visible:outline-none"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-mono text-xs text-[var(--color-green)] mt-0.5" aria-hidden="true">
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <div>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-[var(--color-text)]">
                      {pt.topic}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext1)] mt-0.5 italic">
                      Resume Claim: &ldquo;{pt.claim}&rdquo;
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-[var(--color-purple)] border border-[var(--color-purple)]/40 px-2 py-0.5 rounded-xs shrink-0 mt-0.5">
                  {isOpen ? "collapse" : "explain"}
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="p-4 sm:p-5 pt-1 border-t border-[var(--color-overlay0)]/30 space-y-2"
                >
                  <span className="font-mono text-xs uppercase font-bold text-[var(--color-green)] block">
                    How to Defend in an Interview:
                  </span>
                  <div className="p-4 bg-[var(--color-surface0)]/80 border border-[var(--color-green)]/30 text-sm font-sans text-[var(--color-text)] leading-relaxed select-text rounded-lg shadow-xs">
                    &ldquo;{pt.defense}&rdquo;
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
