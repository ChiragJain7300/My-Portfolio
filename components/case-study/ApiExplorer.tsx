"use client";

import React, { useState } from "react";
import { ApiEndpoint } from "@/types/case-study";

interface ApiExplorerProps {
  summary: string;
  endpoints: ApiEndpoint[];
}

export function ApiExplorer({ summary, endpoints }: ApiExplorerProps) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    [endpoints[0]?.path || ""]: true,
  });

  const toggle = (path: string) => {
    setOpenMap((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "var(--color-blue)";
      case "POST":
        return "var(--color-green)";
      case "PUT":
        return "var(--color-orange)";
      case "DELETE":
        return "var(--color-red)";
      default:
        return "var(--color-purple)";
    }
  };

  return (
    <div className="space-y-4">
      {/* Editorial Summary */}
      <p className="font-sans text-base text-[var(--color-subtext2)] leading-relaxed max-w-4xl">
        {summary}
      </p>

      {/* Endpoints List */}
      <div className="space-y-3">
        {endpoints.map((ep, idx) => {
          const isOpen = !!openMap[ep.path];
          const mColor = getMethodColor(ep.method);
          const btnId = `api-btn-${idx}`;
          const panelId = `api-panel-${idx}`;

          return (
            <div
              key={ep.path}
              className="border border-[var(--color-overlay0)]/40 bg-[var(--color-surface1)]/20 rounded-md overflow-hidden transition-all"
            >
              {/* Header Button with Accessible ARIA */}
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(ep.path)}
                className="w-full text-left p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-[var(--color-surface1)]/50 transition-colors cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-blue)] focus-visible:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-[var(--color-green)]" aria-hidden="true">
                    {isOpen ? "▾" : "▸"}
                  </span>

                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs border"
                    style={{
                      color: mColor,
                      borderColor: `color-mix(in srgb, ${mColor} 40%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${mColor} 12%, transparent)`,
                    }}
                  >
                    {ep.method}
                  </span>

                  <span className="font-mono text-sm font-semibold text-[var(--color-text)] truncate">
                    {ep.path}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {ep.rateLimit && (
                    <span className="text-[var(--color-overlay2)] border border-[var(--color-overlay0)]/40 px-2 py-0.5 rounded-xs">
                      {ep.rateLimit}
                    </span>
                  )}
                  <span className="text-[var(--color-green)] border border-[var(--color-green)]/40 px-2 py-0.5 rounded-xs">
                    HTTP {ep.statusCode}
                  </span>
                </div>
              </button>

              {/* Expanded Documentation */}
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="p-4 sm:p-5 pt-1 border-t border-[var(--color-overlay0)]/30 space-y-4"
                >
                  <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed">
                    {ep.description}
                  </p>

                  <div className="font-mono text-xs text-[var(--color-overlay2)] flex flex-wrap items-center gap-4">
                    <span>
                      Auth:{" "}
                      <strong className={ep.authRequired ? "text-[var(--color-orange)]" : "text-[var(--color-green)]"}>
                        {ep.authRequired ? "Bearer Token (OAuth2)" : "Public"}
                      </strong>
                    </span>
                  </div>

                  {/* Request Body Schema if present */}
                  {ep.requestBody && (
                    <div className="space-y-1.5">
                      <span className="font-mono text-xs uppercase font-bold text-[var(--color-overlay2)] block">
                        Payload Schema (JSON):
                      </span>
                      <pre className="p-3 bg-[var(--color-base)] border border-[var(--color-overlay0)]/30 rounded-xs font-mono text-xs text-[var(--color-blue)] overflow-x-auto">
                        <code>{ep.requestBody}</code>
                      </pre>
                    </div>
                  )}

                  {/* Sample JSON Response */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs uppercase font-bold text-[var(--color-overlay2)] block">
                      Sample JSON Response:
                    </span>
                    <pre className="p-3.5 bg-[var(--color-base)] border border-[var(--color-overlay0)]/40 rounded-xs font-mono text-xs text-[var(--color-green)] overflow-x-auto leading-relaxed">
                      <code>{ep.responseSample}</code>
                    </pre>
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
