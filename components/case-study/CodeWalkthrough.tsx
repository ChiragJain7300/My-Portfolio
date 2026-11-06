"use client";

import React, { useState } from "react";
import { CodeSnippet } from "@/types/case-study";

interface CodeWalkthroughProps {
  summary: string;
  snippets: CodeSnippet[];
}

export function CodeWalkthrough({ summary, snippets }: CodeWalkthroughProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    if (currentSnippet?.code) {
      navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = currentSnippet ? currentSnippet.code.split("\n") : [];

  return (
    <div className="space-y-4">
      {/* Editorial Summary */}
      <p className="font-sans text-base text-[var(--color-subtext2)] leading-relaxed max-w-4xl">
        {summary}
      </p>

      {/* Code Editor Window */}
      <div className="border border-[var(--color-overlay0)]/50 bg-[var(--color-base)] rounded-md overflow-hidden shadow-lg">
        {/* Tab Bar */}
        <div className="bg-[var(--color-surface1)]/80 px-3 py-2 border-b border-[var(--color-overlay0)]/40 flex flex-wrap items-center justify-between gap-2">
          {/* File Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {snippets.map((snip, idx) => {
              const isActive = activeTab === idx;

              return (
                <button
                  key={snip.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setCopied(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-xs transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[var(--color-surface0)] text-[var(--color-green)] border border-[var(--color-green)] font-semibold shadow-xs"
                      : "text-[var(--color-subtext2)] border border-transparent hover:bg-[var(--color-surface2)]"
                  }`}
                >
                  <span className="text-[11px] text-[var(--color-purple)]">📄</span>
                  <span>{snip.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="ide-btn text-xs font-mono py-1 px-2.5"
            style={{ "--btn-color": "var(--color-subtext1)" } as React.CSSProperties}
            title="Copy code to clipboard"
          >
            <span>{copied ? "✓" : "📋"}</span>
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
        </div>

        {/* Snippet Context Bar */}
        {currentSnippet && (
          <div className="p-4 bg-[var(--color-surface0)]/60 border-b border-[var(--color-overlay0)]/30 space-y-1">
            <h4 className="font-sans text-sm font-bold text-[var(--color-text)]">
              {currentSnippet.description}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed">
              {currentSnippet.explanation}
            </p>
          </div>
        )}

        {/* Code Content Container */}
        <div className="p-4 overflow-x-auto max-h-[520px] overflow-y-auto bg-[var(--color-base)]">
          <div className="grid grid-cols-[3.25rem_1fr] gap-4 font-mono text-xs leading-relaxed select-text">
            {/* Line numbers gutter */}
            <div
              className="select-none text-right text-[var(--color-overlay0)]/60 pr-2 border-r border-[var(--color-overlay0)]/20"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div key={i + 1} className="tabular-nums leading-relaxed">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Lines with Syntax Coloring */}
            <pre className="text-[var(--color-subtext2)] overflow-visible">
              <code>
                {lines.map((line, i) => {
                  const trimmed = line.trim();
                  const isComment = trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*");
                  const isImport = trimmed.startsWith("import") || trimmed.startsWith("export");
                  const isConst = trimmed.startsWith("const") || trimmed.startsWith("let") || trimmed.startsWith("async") || trimmed.startsWith("return");

                  let lineStyle = "text-[var(--color-subtext2)]";
                  if (isComment) lineStyle = "text-[var(--color-overlay2)] italic";
                  else if (isImport) lineStyle = "text-[var(--color-purple)] font-medium";
                  else if (isConst) lineStyle = "text-[var(--color-blue)]";

                  return (
                    <div key={i} className={`leading-relaxed ${lineStyle}`}>
                      {line || "\u00A0"}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
