"use client";

import React, { useCallback } from "react";
import { usePathname } from "next/navigation";

interface ContentPaneProps {
  children: React.ReactNode;
}

export function ContentPane({ children }: ContentPaneProps) {
  const pathname = usePathname();

  const getBreadcrumb = useCallback(() => {
    if (pathname === "/") return "README.md";

    const clean = pathname.replace(/^\/+|\/+$/g, "");

    if (clean === "projects") return "projects / index.md";

    if (clean.startsWith("projects/")) {
      const slug = clean.slice("projects/".length);
      return `projects / ${slug}.md`;
    }

    const routeMap: Record<string, string> = {
      experience: "experience / timeline.md",
      lab: "lab / architecture.tsx",
      contact: "contact / contact-me.md",
    };

    return routeMap[clean] ?? `${clean}.md`;
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-surface0)] font-mono text-[var(--color-subtext0)]">
      {/* Editor file tab header */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)] pb-2 pt-3 text-xs text-[var(--color-subtext1)] select-none px-4 sm:px-6 md:px-10">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-[var(--color-purple)]">
            ~/chirag-jain
          </span>

          <span className="text-[var(--color-overlay2)]">/</span>

          <span className="truncate font-semibold text-[var(--color-green)]">
            {getBreadcrumb()}
          </span>
        </div>

        <div className="hidden shrink-0 items-center gap-3 text-[10px] text-[var(--color-overlay2)] sm:flex">
          <span>UTF-8</span>
          <span>LF</span>
          <span>TypeScript / Markdown</span>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="relative flex w-full flex-1 pb-24 pt-4">
        <div
          className="min-w-0 w-full max-w-[95ch] px-4 sm:px-6 md:px-10"
          style={{
            lineHeight: "var(--line-height, 1.375rem)",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
