"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLenis } from "@/components/providers/LenisProvider";

export interface TOCItem {
  id: string;
  label: string;
  num: string;
  group?: "briefing" | "appendix";
}

export const CASE_STUDY_SECTIONS: TOCItem[] = [
  // Part I: Executive Briefing (60-Second Scan)
  { id: "overview", label: "Project Overview", num: "01", group: "briefing" },
  { id: "problem", label: "Business Problem", num: "02", group: "briefing" },
  { id: "impact", label: "Quantitative Impact", num: "03", group: "briefing" },
  { id: "architecture", label: "System Architecture", num: "04", group: "briefing" },
  { id: "decisions", label: "Pivotal Decisions (ADR)", num: "05", group: "briefing" },
  { id: "challenges", label: "Incidents & Solutions", num: "06", group: "briefing" },

  // Part II: Technical Appendix (Deep Architectural Blueprints)
  { id: "pipeline-trace", label: "Pipeline & Execution Trace", num: "07", group: "appendix" },
  { id: "database", label: "Database Design & ERD", num: "08", group: "appendix" },
  { id: "api", label: "API & Integrations", num: "09", group: "appendix" },
  { id: "code", label: "Code Implementation", num: "10", group: "appendix" },
  { id: "resilience", label: "Subsystems & Resilience", num: "11", group: "appendix" },
  { id: "interview-defense", label: "Interview Defense & V2", num: "12", group: "appendix" },
];

interface CaseStudyTOCProps {
  sections?: TOCItem[];
}

export function CaseStudyTOC({ sections = CASE_STUDY_SECTIONS }: CaseStudyTOCProps) {
  const { lenis } = useLenis();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNavigatingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  // Smooth scroll using Lenis when available, or fallback to native smooth scroll
  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      isNavigatingRef.current = true;
      setActiveId(id);
      setMobileOpen(false);

      if (lenis) {
        lenis.scrollTo(el, {
          offset: -70,
          immediate: false,
          onComplete: () => {
            isNavigatingRef.current = false;
          },
        });
      } else {
        const topOffset = 70;
        const elRect = el.getBoundingClientRect();
        const targetScrollTop = window.scrollY + elRect.top - topOffset;
        window.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 850);
    },
    [lenis]
  );

  // Set up active section tracking relative to the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      // Check if user has reached bottom of page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      // 120px threshold beneath sticky header
      const targetLine = 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetLine) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [sections]);

  // Keep the active item visible inside the scrollable sidebar
  useEffect(() => {
    if (!sidebarRef.current) return;
    const activeEl = sidebarRef.current.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
    if (activeEl) {
      const sidebar = sidebarRef.current;
      const elTop = activeEl.offsetTop;
      const elBottom = elTop + activeEl.offsetHeight;
      const sidebarTop = sidebar.scrollTop;
      const sidebarBottom = sidebarTop + sidebar.clientHeight;

      if (elTop < sidebarTop) {
        sidebar.scrollTo({ top: elTop - 16, behavior: "smooth" });
      } else if (elBottom > sidebarBottom) {
        sidebar.scrollTo({ top: elBottom - sidebar.clientHeight + 16, behavior: "smooth" });
      }
    }
  }, [activeId]);

  const activeSection = sections.find((s) => s.id === activeId) || sections[0];

  const briefingSections = sections.filter((s) => s.group === "briefing" || !s.group);
  const appendixSections = sections.filter((s) => s.group === "appendix");

  return (
    <>
      {/* Mobile Floating Sticky Header Bar */}
      <div className="xl:hidden sticky top-12 z-30 mb-8 bg-[var(--color-surface0)]/95 backdrop-blur-md border border-[var(--color-overlay0)]/60 rounded-md p-2.5 font-sans shadow-lg">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between text-left text-sm text-[var(--color-text)] cursor-pointer min-h-[44px]"
          aria-expanded={mobileOpen}
          aria-label="Toggle Table of Contents"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs text-[var(--color-green)] font-semibold">
              {activeSection?.num}
            </span>
            <span className="text-[var(--color-overlay2)]">/</span>
            <span className="font-medium text-[var(--color-text)] truncate text-sm">
              {activeSection?.label}
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--color-green)] shrink-0 ml-2 px-2.5 py-1 border border-[var(--color-overlay0)] rounded-xs">
            {mobileOpen ? "close ▲" : "jump ▼"}
          </span>
        </button>

        {mobileOpen && (
          <nav
            aria-label="Mobile Table of Contents"
            data-lenis-prevent
            className="mt-2.5 pt-2.5 border-t border-[var(--color-overlay0)]/40 space-y-3 max-h-[60vh] overflow-y-auto [scrollbar-width:thin]"
          >
            {/* Briefing Group */}
            <div>
              <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-green)] font-bold">
                Executive Briefing (60s)
              </div>
              <div className="space-y-0.5 mt-1">
                {briefingSections.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      data-toc-id={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xs flex items-center gap-3 transition-colors cursor-pointer min-h-[40px] ${
                        isActive
                          ? "bg-[var(--color-surface2)] text-[var(--color-green)] font-semibold"
                          : "text-[var(--color-subtext2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface1)]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--color-overlay2)] w-5">
                        {sec.num}
                      </span>
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Appendix Group */}
            {appendixSections.length > 0 && (
              <div className="pt-2 border-t border-[var(--color-overlay0)]/30">
                <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-purple)] font-bold">
                  Technical Appendix
                </div>
                <div className="space-y-0.5 mt-1">
                  {appendixSections.map((sec) => {
                    const isActive = activeId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        data-toc-id={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-xs flex items-center gap-3 transition-colors cursor-pointer min-h-[40px] ${
                          isActive
                            ? "bg-[var(--color-surface2)] text-[var(--color-green)] font-semibold"
                            : "text-[var(--color-subtext2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface1)]"
                        }`}
                      >
                        <span className="font-mono text-xs text-[var(--color-overlay2)] w-5">
                          {sec.num}
                        </span>
                        <span>{sec.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC: STRICTLY LOCKED TO 240px WITH NATIVE SMOOTH SCROLL */}
      <aside
        ref={sidebarRef}
        aria-label="Table of Contents"
        data-lenis-prevent
        className="hidden xl:flex flex-col sticky top-8 w-[240px] min-w-[240px] max-w-[240px] shrink-0 font-sans text-sm select-none max-h-[calc(100vh-4rem)] overflow-y-auto pr-1 pb-4 [scrollbar-width:thin] [scrollbar-color:rgba(203,227,179,0.25)_transparent]"
      >
        <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-overlay2)] font-semibold pb-2.5 mb-3 border-b border-[var(--color-overlay0)]/40 flex items-center justify-between shrink-0">
          <span>Table of Contents</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
        </div>

        {/* Group 1: Executive Briefing */}
        <div className="mb-4 shrink-0">
          <div className="px-3 py-1 mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-green)] font-semibold flex items-center justify-between">
            <span>Executive Briefing</span>
            <span className="text-[9px] px-1 py-0.2 bg-[var(--color-green)]/15 border border-[var(--color-green)]/30 rounded-2xs">
              60s
            </span>
          </div>

          <ul className="space-y-1 list-none pl-0 w-[230px]">
            {briefingSections.map((sec) => {
              const isActive = activeId === sec.id;

              return (
                <li key={sec.id} className="w-[230px]">
                  <button
                    data-toc-id={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-[230px] text-left py-2 px-3 rounded-md transition-all flex items-baseline gap-2.5 group cursor-pointer border ${
                      isActive
                        ? "bg-[var(--color-surface1)] text-[var(--color-text)] font-semibold border-[var(--color-green)]/35 shadow-xs"
                        : "text-[var(--color-subtext1)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface1)]/40 border-transparent"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 ${
                        isActive
                          ? "text-[var(--color-green)] font-bold"
                          : "text-[var(--color-overlay2)] group-hover:text-[var(--color-subtext2)]"
                      }`}
                    >
                      {sec.num}
                    </span>
                    <span className="text-[13px] leading-tight truncate">
                      {sec.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Group 2: Technical Appendix */}
        {appendixSections.length > 0 && (
          <div className="pt-3 border-t border-[var(--color-overlay0)]/30 shrink-0">
            <div className="px-3 py-1 mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-purple)] font-semibold flex items-center justify-between">
              <span>Technical Appendix</span>
              <span className="text-[9px] px-1 py-0.2 bg-[var(--color-purple)]/15 border border-[var(--color-purple)]/30 rounded-2xs">
                Deep Dive
              </span>
            </div>

            <ul className="space-y-1 list-none pl-0 w-[230px]">
              {appendixSections.map((sec) => {
                const isActive = activeId === sec.id;

                return (
                  <li key={sec.id} className="w-[230px]">
                    <button
                      data-toc-id={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-[230px] text-left py-2 px-3 rounded-md transition-all flex items-baseline gap-2.5 group cursor-pointer border ${
                        isActive
                          ? "bg-[var(--color-surface1)] text-[var(--color-text)] font-semibold border-[var(--color-green)]/35 shadow-xs"
                          : "text-[var(--color-subtext1)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface1)]/40 border-transparent"
                      }`}
                    >
                      <span
                        className={`font-mono text-xs tabular-nums shrink-0 ${
                          isActive
                            ? "text-[var(--color-green)] font-bold"
                            : "text-[var(--color-overlay2)] group-hover:text-[var(--color-subtext2)]"
                        }`}
                      >
                        {sec.num}
                      </span>
                      <span className="text-[13px] leading-tight truncate">
                        {sec.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </aside>
    </>
  );
}
