"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { LineNumbers } from "./LineNumbers";

export function ContentPane({ children }: { children: React.ReactNode }) {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === "/") return "README.md";
    const clean = pathname.replace(/^\//, "");
    if (clean.startsWith("projects/")) {
      const slug = clean.replace("projects/", "");
      return `projects / ${slug}.md`;
    }
    if (clean === "projects") return "projects / index.md";
    if (clean === "experience") return "experience / timeline.md";
    if (clean === "lab") return "lab / architecture.tsx";
    if (clean === "contact") return "contact / contact-me.md";
    return `${clean}.md`;
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-surface0)] text-[var(--color-subtext0)] font-mono w-full">
      {/* Line Numbers Gutter (Desktop only) */}
      <div className="hidden md:block pt-4 pl-2 shrink-0">
        <LineNumbers containerRef={contentContainerRef} />
      </div>

      {/* Main Document Content */}
      <div
        ref={contentContainerRef}
        className="flex-1 min-w-0 max-w-[100ch] pt-4 pb-24 px-4 sm:px-6 md:px-8"
        style={{ lineHeight: "var(--line-height, 1.375rem)" }}
      >
        {/* Editor File Tab Header */}
        <div className="mb-6 pb-2 border-b border-[var(--color-overlay0)]/40 flex items-center justify-between text-xs text-[var(--color-subtext1)] select-none">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-purple)]">~/chirag-jain</span>
            <span className="text-[var(--color-overlay2)]">/</span>
            <span className="text-[var(--color-green)] font-semibold truncate">
              {getBreadcrumb()}
            </span>
          </div>
          <div className="text-[10px] text-[var(--color-overlay2)] hidden sm:flex items-center gap-3">
            <span>UTF-8</span>
            <span>LF</span>
            <span>TypeScript / Markdown</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
