"use client";

import React, { useState } from "react";
import { TokenRefreshVisualizer } from "@/components/lab/TokenRefreshVisualizer";

type LabMode = "single-flight" | "resumable" | "runtime";

export function LabSection() {
  const [activeMode, setActiveMode] = useState<LabMode>("single-flight");

  const modes: { id: LabMode; label: string; desc: string }[] = [
    {
      id: "single-flight",
      label: "01 / SINGLE-FLIGHT",
      desc: "Simulates mutex-locked token refresh queue collapsing concurrent 401s into 1 network flight.",
    },
    {
      id: "resumable",
      label: "02 / RESUMABLE",
      desc: "Cursor-checkpointed runner simulating process crashes and deterministic recovery.",
    },
    {
      id: "runtime",
      label: "03 / RUNTIME",
      desc: "Isomorphic execution switch toggling Edge, Server, and Browser contexts.",
    },
  ];

  return (
    <section id="lab" className="pt-1 pb-10 space-y-6">
      <div data-line-block className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-subtext2)]">
          ## lab
        </h2>
        <span className="text-xs sm:text-sm text-[var(--color-yellow)] font-mono">
          [Interactive Architecture Simulations]
        </span>
      </div>

      <p data-line-block className="text-sm sm:text-base text-[var(--color-subtext0)] leading-relaxed">
        Live interactive simulations of production concurrency patterns, deterministic recovery runners, and runtime environment resolution.
      </p>

      {/* Frame / Box */}
      <div data-line-block className="border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/20">
        {/* Tab Header */}
        <div className="bg-[var(--color-surface1)] px-2 py-2 border-b border-[var(--color-overlay0)] flex flex-wrap items-center gap-2">
          {modes.map((m) => {
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-mono transition-colors border ${
                  isActive
                    ? "bg-[var(--color-surface0)] text-[var(--color-green)] border-[var(--color-green)] font-semibold"
                    : "text-[var(--color-subtext2)] border-transparent hover:bg-[var(--color-surface2)]"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Mode subtitle */}
        <div className="px-4 py-2.5 border-b border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)]/40 text-xs sm:text-sm text-[var(--color-subtext1)] font-mono">
          &gt; {modes.find((m) => m.id === activeMode)?.desc}
        </div>

        {/* Embed Body */}
        <div className="p-3 sm:p-5 overflow-x-auto">
          <TokenRefreshVisualizer key={activeMode} activeMode={activeMode} />
        </div>
      </div>
    </section>
  );
}
