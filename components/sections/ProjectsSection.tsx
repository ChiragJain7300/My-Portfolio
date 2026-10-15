"use client";

import React, { useState } from "react";
import { projects, Project } from "@/data";
import { ToggleIndicator } from "@/components/ui/ToggleIndicator";

interface ProjectsSectionProps {
  onInspectProject?: (project: Project) => void;
}

export function ProjectsSection({ onInspectProject }: ProjectsSectionProps) {
  // Map project id to collapsed/expanded state
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleProject = (id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getAnchorId = (title: string) => {
    const slug = title.toLowerCase().trim();
    if (slug.includes("prompt")) return "project-promptpedia";
    if (slug.includes("seo")) return "project-seo-engine";
    if (slug.includes("wdm")) return "project-wdm-platform";
    if (slug.includes("just walk")) return "project-just-walk-india";
    return `project-${slug.replace(/[^a-z0-9]/g, "-")}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fullstack":
        return "var(--color-blue)";
      case "ai":
        return "var(--color-pink)";
      case "backend":
        return "var(--color-orange)";
      default:
        return "var(--color-green)";
    }
  };

  return (
    <section id="projects" className="pt-8 pb-10 border-b border-[var(--color-overlay0)]/60 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-subtext2)]">
          ## projects/
        </h2>
        <span className="text-xs text-[var(--color-overlay2)] font-mono">
          ({projects.length} systems documented)
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => {
          const isOpen = !!openMap[proj.id];
          const anchorId = getAnchorId(proj.title);
          const catColor = getCategoryColor(proj.category);

          return (
            <div
              key={proj.id}
              id={anchorId}
              className="border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/30 transition-all scroll-mt-14"
            >
              {/* Header / Click to Toggle */}
              <button
                onClick={() => toggleProject(proj.id)}
                className="w-full text-left p-3 flex items-start justify-between gap-3 hover:bg-[var(--color-surface1)]/70 transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="text-xs mt-0.5 text-[var(--color-green)]">
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[var(--color-text)] flex flex-wrap items-center gap-2">
                      <span>{proj.title}</span>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.2 border rounded-xs"
                        style={{
                          color: catColor,
                          borderColor: `color-mix(in srgb, ${catColor} 40%, transparent)`,
                        }}
                      >
                        [{proj.categoryLabel}]
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="text-xs text-[var(--color-subtext0)] truncate mt-1 max-w-[80ch]">
                        {proj.des}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <ToggleIndicator open={isOpen} />
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="p-4 pt-1 border-t border-[var(--color-overlay0)]/40 space-y-3.5 text-xs">
                  <p className="text-[var(--color-subtext2)] leading-relaxed">
                    {proj.des}
                  </p>

                  {/* Highlights */}
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-[var(--color-overlay2)] mb-1">
                      Key Capabilities & Architecture:
                    </div>
                    <ul className="space-y-1 list-none pl-0">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--color-subtext0)]">
                          <span className="text-[var(--color-green)] select-none">▪</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="ide-btn text-[11px]"
                        style={{ "--btn-color": "var(--color-subtext1)" } as React.CSSProperties}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[var(--color-overlay0)]/40 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {proj.link && proj.link !== "#contact" && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ide-btn"
                          style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
                        >
                          <span>↗</span>
                          <span>Live Demo</span>
                        </a>
                      )}

                      {proj.isPrivate ? (
                        <span className="text-[var(--color-overlay2)] text-[11px] px-1.5 py-0.5 border border-[var(--color-overlay0)] bg-[var(--color-surface1)]">
                          [🔒 Private NDA]
                        </span>
                      ) : (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="ide-btn"
                          style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
                        >
                          <span>↗</span>
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>

                    {onInspectProject && (
                      <button
                        onClick={() => onInspectProject(proj)}
                        className="ide-btn text-[var(--color-purple)]"
                        style={{ "--btn-color": "var(--color-purple)" } as React.CSSProperties}
                      >
                        <span>⠿</span>
                        <span>[inspect]</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
