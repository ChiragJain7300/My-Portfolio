"use client";

import React, { useState } from "react";
import { TokenRefreshVisualizer } from "@/components/lab/TokenRefreshVisualizer";

export function EngineeringLab() {
  const [activeTab, setActiveTab] = useState<"single-flight" | "resumable" | "runtime">("single-flight");

  return (
    <section
      id="lab"
      className="relative h-[100svh] min-h-[650px] md:min-h-[700px] flex flex-col justify-between px-4 md:px-8 lg:px-12 py-5 md:py-6 bg-[#1c2225] border-t border-[var(--color-overlay0)]/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-between">
        {/* Header */}
        <header className="shrink-0 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-green)] font-bold">[02]</span>
              <span className="tracking-wide text-[var(--color-subtext2)] uppercase font-semibold">
                ENGINEERING LAB
              </span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-green)] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
              <span>LIVE SYSTEM SIMULATION</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-black tracking-tight text-[var(--color-text)] uppercase">
            Interactive Architecture
          </h2>

          <p className="text-xs sm:text-sm text-[var(--color-subtext2)] max-w-[65ch] leading-relaxed">
            Explore concurrency, token refresh coordination, and failure recovery in a production-style request pipeline.
          </p>
        </header>

        {/* Main Interactive Visualizer Application */}
        <main className="flex-1 min-h-0 py-3 sm:py-4 flex flex-col overflow-hidden">
          <TokenRefreshVisualizer activeMode={activeTab} />
        </main>

        {/* Interactive Architecture Footer Tabs */}
        <footer className="shrink-0 pt-3 border-t border-[var(--color-overlay0)]/30">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("single-flight")}
              className={`p-2.5 sm:p-3 text-left rounded-xl border transition-all ${
                activeTab === "single-flight"
                  ? "bg-[var(--color-surface1)]/60 border-[var(--color-green)]/40 text-white"
                  : "bg-[var(--color-surface0)]/50 border-[var(--color-overlay0)]/30 text-[var(--color-subtext2)] hover:border-[var(--color-green)]/30 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs font-semibold mb-1">
                <span>01 / SINGLE-FLIGHT</span>
                {activeTab === "single-flight" && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />}
              </div>
              <div className="font-mono text-[9px] sm:text-[11px] text-[var(--color-overlay2)] truncate">
                50 concurrent 401s → 1 refresh
              </div>
            </button>

            <button
              onClick={() => setActiveTab("resumable")}
              className={`p-2.5 sm:p-3 text-left rounded-xl border transition-all ${
                activeTab === "resumable"
                  ? "bg-[var(--color-surface1)]/60 border-[var(--color-green)]/40 text-white"
                  : "bg-[var(--color-surface0)]/50 border-[var(--color-overlay0)]/30 text-[var(--color-subtext2)] hover:border-[var(--color-green)]/30 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs font-semibold mb-1">
                <span>02 / RESUMABLE JOBS</span>
                {activeTab === "resumable" && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />}
              </div>
              <div className="font-mono text-[9px] sm:text-[11px] text-[var(--color-overlay2)] truncate">
                Persist cursor → resume without dupes
              </div>
            </button>

            <button
              onClick={() => setActiveTab("runtime")}
              className={`p-2.5 sm:p-3 text-left rounded-xl border transition-all ${
                activeTab === "runtime"
                  ? "bg-[var(--color-surface1)]/60 border-[var(--color-green)]/40 text-white"
                  : "bg-[var(--color-surface0)]/50 border-[var(--color-overlay0)]/30 text-[var(--color-subtext2)] hover:border-[var(--color-green)]/30 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs font-semibold mb-1">
                <span>03 / RUNTIME-AWARE</span>
                {activeTab === "runtime" && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />}
              </div>
              <div className="font-mono text-[9px] sm:text-[11px] text-[var(--color-overlay2)] truncate">
                Resolve client / SSR execution context
              </div>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
