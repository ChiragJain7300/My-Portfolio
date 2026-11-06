"use client";

import React, { useState } from "react";
import { DatabaseTable } from "@/types/case-study";

interface DatabaseExplorerProps {
  engine: string;
  designPhilosophy: string;
  tables: DatabaseTable[];
}

export function DatabaseExplorer({
  engine,
  designPhilosophy,
  tables,
}: DatabaseExplorerProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showSampleQuery, setShowSampleQuery] = useState<boolean>(true);

  const currentTable = tables[activeTab] || tables[0];

  return (
    <div className="space-y-6">
      {/* Design Philosophy Card */}
      <div className="p-4 sm:p-5 bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/40 rounded-md space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase text-[var(--color-overlay2)] font-semibold">
            Database Architecture &amp; Engine
          </span>
          <span className="font-mono text-xs text-[var(--color-green)] font-semibold">
            {engine}
          </span>
        </div>
        <p className="font-sans text-sm sm:text-base text-[var(--color-subtext2)] leading-relaxed">
          {designPhilosophy}
        </p>
      </div>

      {/* Collection Selection Tabs with ARIA Tablist */}
      <div className="space-y-4">
        <div
          role="tablist"
          aria-label="Database Collections"
          className="flex flex-wrap items-center gap-2 pb-2 border-b border-[var(--color-overlay0)]/30"
        >
          {tables.map((table, idx) => {
            const isActive = activeTab === idx;
            const tabId = `db-tab-${idx}`;
            const panelId = `db-tabpanel-${idx}`;

            return (
              <button
                key={table.name}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-2 text-sm font-sans rounded-md transition-all cursor-pointer flex items-center gap-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:outline-none ${
                  isActive
                    ? "bg-[var(--color-surface1)] text-[var(--color-green)] font-bold border border-[var(--color-green)] shadow-xs"
                    : "text-[var(--color-subtext2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface1)]/50 border border-transparent"
                }`}
              >
                <span className="font-mono text-xs opacity-70" aria-hidden="true">
                  {table.type === "collection" ? "📁" : "📊"}
                </span>
                <span>{table.name}</span>
                <span className="font-mono text-[10px] text-[var(--color-overlay2)]">
                  ({table.columns.length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Collection Panel with Tabpanel semantics */}
        {currentTable && (
          <div
            id={`db-tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`db-tab-${activeTab}`}
            className="p-5 sm:p-6 bg-[var(--color-surface0)]/80 border border-[var(--color-overlay0)]/40 rounded-md space-y-5"
          >
            {/* Header with Title and Description */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30">
              <div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-[var(--color-text)]">
                  {currentTable.name}
                </h3>
                <p className="font-sans text-sm text-[var(--color-subtext2)] mt-1">
                  {currentTable.description}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--color-overlay2)] shrink-0">
                [{currentTable.columns.length} Schema Attributes]
              </span>
            </div>

            {/* Schema Table with Generous Padding */}
            <div className="overflow-x-auto border border-[var(--color-overlay0)]/40 rounded-md">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface1)]/60 border-b border-[var(--color-overlay0)]/40 font-mono text-xs text-[var(--color-overlay2)] uppercase">
                    <th className="py-2.5 px-3.5 font-semibold">Field Name</th>
                    <th className="py-2.5 px-3.5 font-semibold">Data Type</th>
                    <th className="py-2.5 px-3.5 font-semibold">Key / Index</th>
                    <th className="py-2.5 px-3.5 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-overlay0)]/20 font-sans">
                  {currentTable.columns.map((col) => (
                    <tr
                      key={col.name}
                      className="hover:bg-[var(--color-surface1)]/20 transition-colors"
                    >
                      <td className="py-2.5 px-3.5 font-mono text-xs font-semibold text-[var(--color-text)]">
                        {col.name}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-xs text-[var(--color-blue)]">
                        {col.type}
                      </td>
                      <td className="py-2.5 px-3.5">
                        {col.key ? (
                          <span
                            className={`font-mono text-[10px] px-1.5 py-0.5 rounded-xs font-bold border ${
                              col.key === "PK"
                                ? "bg-[var(--color-purple)]/15 text-[var(--color-purple)] border-[var(--color-purple)]/40"
                                : col.key === "FK"
                                ? "bg-[var(--color-orange)]/15 text-[var(--color-orange)] border-[var(--color-orange)]/40"
                                : "bg-[var(--color-green)]/15 text-[var(--color-green)] border-[var(--color-green)]/40"
                            }`}
                          >
                            {col.key}
                          </span>
                        ) : (
                          <span className="font-mono text-[var(--color-overlay1)] text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3.5 text-xs text-[var(--color-subtext2)] leading-relaxed">
                        {col.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Indexes Strip */}
            {currentTable.indexes && currentTable.indexes.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="font-mono text-xs font-bold uppercase text-[var(--color-overlay2)]">
                  Database Indexes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentTable.indexes.map((idx, i) => (
                    <code
                      key={i}
                      className="font-mono text-xs px-2.5 py-1 bg-[var(--color-base)] border border-[var(--color-overlay0)]/40 text-[var(--color-subtext1)] rounded-xs"
                    >
                      {idx}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {/* Sample Query Accordion with Accessible ARIA */}
            {currentTable.sampleQuery && (
              <div className="pt-3 border-t border-[var(--color-overlay0)]/30">
                <button
                  type="button"
                  aria-expanded={showSampleQuery}
                  aria-controls="db-sample-query-panel"
                  onClick={() => setShowSampleQuery(!showSampleQuery)}
                  className="font-mono text-xs text-[var(--color-green)] hover:underline flex items-center justify-between w-full cursor-pointer py-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:outline-none"
                >
                  <span className="font-bold">
                    Sample Query: {currentTable.sampleQuery.title}
                  </span>
                  <span>{showSampleQuery ? "[collapse ▲]" : "[inspect code ▼]"}</span>
                </button>

                {showSampleQuery && (
                  <div id="db-sample-query-panel" role="region" className="mt-3 space-y-2">
                    <pre className="p-3.5 bg-[var(--color-base)] border border-[var(--color-overlay0)]/40 rounded-md overflow-x-auto font-mono text-xs text-[var(--color-subtext2)] leading-relaxed">
                      <code>{currentTable.sampleQuery.code}</code>
                    </pre>
                    <p className="font-sans text-xs text-[var(--color-subtext1)] leading-relaxed">
                      <strong>Rationale:</strong> {currentTable.sampleQuery.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
