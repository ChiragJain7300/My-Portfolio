"use client";

import React, { useState } from "react";
import { ArchitecturalDecision } from "@/types/case-study";

interface DecisionMatrixProps {
  decisions: ArchitecturalDecision[];
}

export function DecisionMatrix({ decisions }: DecisionMatrixProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    [decisions[0]?.id || "ADR-01"]: true,
  });

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {decisions.map((adr) => {
        const isOpen = !!openMap[adr.id];
        const btnId = `adr-btn-${adr.id}`;
        const panelId = `adr-panel-${adr.id}`;

        return (
          <div
            key={adr.id}
            className={`border rounded-md overflow-hidden transition-all ${
              isOpen
                ? "border-[var(--color-overlay0)]/70 bg-[var(--color-surface1)]/30 shadow-md"
                : "border-[var(--color-overlay0)]/40 bg-[var(--color-surface1)]/15 hover:border-[var(--color-overlay0)]"
            }`}
          >
            {/* Header Button with Accessible ARIA */}
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(adr.id)}
              className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-[var(--color-surface1)]/50 transition-colors cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs text-[var(--color-green)] shrink-0" aria-hidden="true">
                  {isOpen ? "▾" : "▸"}
                </span>
                <span className="font-mono text-xs font-bold text-[var(--color-purple)] shrink-0">
                  [{adr.id}]
                </span>
                <h3 className="font-sans text-sm sm:text-base font-bold text-[var(--color-text)] truncate">
                  {adr.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[11px] text-[var(--color-overlay2)] hidden sm:inline">
                  {adr.alternativesConsidered.length} alternatives evaluated
                </span>
                <span className="font-mono text-[10px] text-[var(--color-green)] bg-[var(--color-green)]/10 border border-[var(--color-green)]/40 px-2 py-0.5 rounded-xs font-semibold">
                  {adr.status}
                </span>
              </div>
            </button>

            {/* Accordion Body with ARIA region */}
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="p-4 sm:p-5 pt-2 border-t border-[var(--color-overlay0)]/30 space-y-4"
              >
                {/* Problem Statement */}
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-[var(--color-overlay2)] block mb-1">
                    Problem &amp; Context:
                  </span>
                  <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed">
                    {adr.problem}
                  </p>
                </div>

                {/* Chosen vs Alternatives Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Selected Approach */}
                  <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-green)]/40 rounded-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--color-green)] flex items-center gap-1.5">
                        <span>✓</span>
                        <span>Selected Architectural Approach</span>
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" aria-hidden="true" />
                    </div>
                    <p className="font-sans text-sm font-semibold text-[var(--color-text)]">
                      {adr.chosenApproach}
                    </p>
                    <div className="pt-2 border-t border-[var(--color-overlay0)]/20 font-mono text-[10px] text-[var(--color-green)]">
                      ● PROVEN IN PRODUCTION DEPLOYMENT
                    </div>
                  </div>

                  {/* Discarded Alternatives */}
                  <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-overlay0)]/40 rounded-xs space-y-2">
                    <span className="font-mono text-xs font-bold text-[var(--color-overlay2)] flex items-center gap-1.5">
                      <span>✕</span>
                      <span>Discarded Alternatives &amp; Why</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {adr.alternativesConsidered.map((alt) => (
                        <span
                          key={alt}
                          className="font-mono text-xs px-2.5 py-1 bg-[var(--color-surface1)] text-[var(--color-subtext1)] border border-[var(--color-overlay0)]/40 rounded-xs"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 font-sans text-xs text-[var(--color-overlay2)]">
                      Evaluated against latency, memory footprint, and system isolation.
                    </div>
                  </div>
                </div>

                {/* Rationale & Tradeoffs with High-Visibility Accents */}
                <div className="space-y-3 pt-1">
                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-[var(--color-purple)] block mb-1">
                      Architectural Rationale:
                    </span>
                    <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed p-3 border border-[var(--color-purple)]/25 bg-[var(--color-purple)]/[0.04] rounded-lg">
                      {adr.rationale}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-[var(--color-orange)] block mb-1">
                      Trade-offs &amp; Constraints:
                    </span>
                    <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed p-3 border border-[var(--color-orange)]/25 bg-[var(--color-orange)]/[0.04] rounded-lg">
                      {adr.tradeoffsAndLimitations}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
