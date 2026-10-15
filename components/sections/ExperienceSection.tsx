"use client";

import React, { useState } from "react";
import { workExperience } from "@/data";
import { ToggleIndicator } from "@/components/ui/ToggleIndicator";

export function ExperienceSection() {
  // Most recent role open by default
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({
    4: true,
    3: false,
    2: false,
    1: false,
  });

  const toggleExp = (id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getAnchorId = (company: string, id: number) => {
    const c = company.toLowerCase();
    if (c.includes("inventam")) return "exp-inventam";
    if (c.includes("freelance")) return "exp-freelance";
    if (c.includes("mastek")) return "exp-mastek";
    if (c.includes("intern")) return "exp-intern";
    return `exp-${id}`;
  };

  return (
    <section id="experience" className="pt-8 pb-10 border-b border-[var(--color-overlay0)]/60 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-subtext2)]">
          ## experience/
        </h2>
        <span className="text-xs text-[var(--color-overlay2)] font-mono">
          ({workExperience.length} career chapters)
        </span>
      </div>

      <div className="space-y-4">
        {/* Render in reverse order so latest role is on top */}
        {[...workExperience].reverse().map((exp) => {
          const isOpen = !!openMap[exp.id];
          const anchorId = getAnchorId(exp.company, exp.id);
          const isCurrent = exp.duration.toLowerCase().includes("present");

          return (
            <div
              key={exp.id}
              id={anchorId}
              className="border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/30 transition-all scroll-mt-14"
            >
              {/* Header */}
              <button
                onClick={() => toggleExp(exp.id)}
                className="w-full text-left p-3 flex items-start justify-between gap-3 hover:bg-[var(--color-surface1)]/70 transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="text-xs mt-0.5 text-[var(--color-green)]">
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[var(--color-text)] flex flex-wrap items-center gap-2">
                      <span>{exp.title}</span>
                      <span className="text-[var(--color-purple)] font-normal text-xs">
                        @{exp.company}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--color-green)] text-[var(--color-green)] bg-[var(--color-green)]/10 rounded-xs">
                          [Current]
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--color-subtext1)] mt-0.5">
                      {exp.duration}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <ToggleIndicator open={isOpen} />
                </div>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="p-4 pt-1 border-t border-[var(--color-overlay0)]/40 space-y-3.5 text-xs">
                  <p className="text-[var(--color-subtext2)] leading-relaxed italic">
                    {exp.desc}
                  </p>

                  {/* Bullet points */}
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-[var(--color-overlay2)] mb-1">
                      Deliverables & Engineering Achievements:
                    </div>
                    <ul className="space-y-1.5 list-none pl-0">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--color-subtext0)]">
                          <span className="text-[var(--color-green)] select-none">▪</span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="ide-btn text-[11px]"
                        style={{ "--btn-color": "var(--color-subtext1)" } as React.CSSProperties}
                      >
                        {t}
                      </span>
                    ))}
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
