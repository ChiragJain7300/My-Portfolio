"use client";

import React, { useState } from "react";

export function SetDifferenceDiagram() {
  const [simulated, setSimulated] = useState(false);
  const [prunedCount, setPrunedCount] = useState(250);

  const handleSimulate = () => {
    setSimulated(true);
  };

  const handleReset = () => {
    setSimulated(false);
  };

  return (
    <div className="p-5 sm:p-6 bg-[var(--color-surface0)]/80 border border-[var(--color-overlay0)]/40 rounded-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30">
        <div>
          <span className="font-mono text-xs uppercase text-[var(--color-orange)] font-semibold block">
            Algorithmic Highlight
          </span>
          <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
            Set-Difference Catalogue Reconciliation: Stale = Stored \ Incoming
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {!simulated ? (
            <button
              onClick={handleSimulate}
              className="ide-btn text-xs font-mono py-1 px-3"
              style={{ "--btn-color": "var(--color-orange)" } as React.CSSProperties}
            >
              <span>⚡</span>
              <span>Simulate Delisting Check</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="ide-btn text-xs font-mono py-1 px-3"
              style={{ "--btn-color": "var(--color-subtext1)" } as React.CSSProperties}
            >
              <span>↺</span>
              <span>Reset State</span>
            </button>
          )}
        </div>
      </div>

      <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed">
        When an e-commerce seller removes or delists an item directly on Bol.com, that product simply disappears from the next daily CSV export. A naive database <code className="font-mono text-xs text-[var(--color-purple)]">upsert()</code> only touches incoming items—leaving deleted items in the database as orphaned &ldquo;ghost stock&rdquo;.
      </p>

      {/* Visual Set Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Set A: Stored MongoDB Offers */}
        <div className="p-4 bg-[var(--color-surface1)]/40 border border-[var(--color-blue)]/40 rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-blue)] font-bold">[Set A] Stored DB</span>
            <span className="font-mono text-xs text-[var(--color-text)] tabular-nums font-bold">
              10,450 EANs
            </span>
          </div>
          <p className="font-sans text-xs text-[var(--color-subtext2)]">
            Current active offers currently persisted in MongoDB collection.
          </p>
          <div className="text-[10px] text-[var(--color-overlay2)] font-mono">
            bolOffer.find(&#123;&#125;, &#123; ean: 1 &#125;)
          </div>
        </div>

        {/* Set B: Incoming Bol.com CSV */}
        <div className="p-4 bg-[var(--color-surface1)]/40 border border-[var(--color-green)]/40 rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-green)] font-bold">[Set B] Fresh CSV</span>
            <span className="font-mono text-xs text-[var(--color-text)] tabular-nums font-bold">
              10,200 EANs
            </span>
          </div>
          <p className="font-sans text-xs text-[var(--color-subtext2)]">
            Active products downloaded in the latest 04:00 AM CSV export.
          </p>
          <div className="text-[10px] text-[var(--color-overlay2)] font-mono">
            const incomingEanSet = new Set()
          </div>
        </div>

        {/* The Delta Difference (A \ B) */}
        <div
          className={`p-4 rounded-md space-y-2 border transition-all ${
            simulated
              ? "bg-[var(--color-red)]/10 border-[var(--color-red)] shadow-md"
              : "bg-[var(--color-surface1)]/20 border-[var(--color-overlay0)]/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-bold ${
                simulated ? "text-[var(--color-red)]" : "text-[var(--color-overlay2)]"
              }`}
            >
              [A \ B] Stale EANs
            </span>
            <span
              className={`font-mono text-xs font-bold tabular-nums ${
                simulated ? "text-[var(--color-red)] text-sm" : "text-[var(--color-subtext0)]"
              }`}
            >
              {simulated ? `${prunedCount} Pruned` : "250 Delta"}
            </span>
          </div>

          <p className="font-sans text-xs text-[var(--color-subtext2)]">
            {simulated
              ? "✓ Automatically identified and deleted via deleteMany({ ean: { $in: staleEans } })"
              : "Orphaned products delisted on marketplace requiring automatic database purge."}
          </p>

          <div
            className={`text-[10px] font-mono ${
              simulated ? "text-[var(--color-green)] font-semibold" : "text-[var(--color-overlay2)]"
            }`}
          >
            {simulated ? "● 100% BIDIRECTIONAL PARITY MAINTAINED" : "staleEans = storedEans \\ incomingEans"}
          </div>
        </div>
      </div>

      {/* Safety Threshold Alert */}
      <div className="p-3 bg-[var(--color-surface1)]/30 border-l-2 border-[var(--color-yellow)] text-xs font-sans text-[var(--color-subtext2)] flex items-start gap-2.5">
        <span className="text-[var(--color-yellow)] font-bold text-sm leading-none shrink-0">
          ⚠
        </span>
        <div>
          <strong className="text-[var(--color-text)]">50% Safety Guard Threshold:</strong>{" "}
          If Bol.com's export returns fewer than 50% of current stored inventory (indicating a truncated CSV download or upstream marketplace glitch), the reconciler automatically aborts deletion and generates an emergency incident alert in CronLog.
        </div>
      </div>
    </div>
  );
}
