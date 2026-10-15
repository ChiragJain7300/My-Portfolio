import React from "react";
import Link from "next/link";
import { projects } from "@/data";

export const metadata = {
  title: "Projects ~ Chirag Jain",
  description: "Production systems and architectural shipments by Chirag Jain.",
};

export default function ProjectsPage() {
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
    <article className="space-y-6 pt-2 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
          ## projects/
        </h1>
        <span className="text-xs text-[var(--color-overlay2)] font-mono">
          ({projects.length} files)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[var(--color-subtext0)] leading-relaxed">
        Production-grade full stack applications, high-throughput backend integration engines, and autonomous LLM/agentic automation pipelines.
      </p>

      {/* Projects List */}
      <div className="space-y-4 pt-2">
        {projects.map((proj) => {
          const catColor = getCategoryColor(proj.category);

          return (
            <div
              key={proj.slug}
              className="border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/30 p-4 space-y-3 transition-colors hover:border-[var(--color-overlay2)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="font-semibold text-base text-[var(--color-text)] hover:text-[var(--color-green)] hover:underline flex items-center gap-2"
                >
                  <span className="text-[var(--color-blue)]">◇</span>
                  <span>{proj.title}</span>
                </Link>

                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 border rounded-xs"
                  style={{
                    color: catColor,
                    borderColor: `color-mix(in srgb, ${catColor} 40%, transparent)`,
                  }}
                >
                  [{proj.categoryLabel}]
                </span>
              </div>

              <p className="text-xs text-[var(--color-subtext2)] leading-relaxed">
                {proj.des}
              </p>

              {/* Highlights */}
              <ul className="space-y-1 list-none pl-0 text-xs">
                {proj.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-[var(--color-subtext0)]">
                    <span className="text-[var(--color-green)] select-none">▪</span>
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>

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
              <div className="pt-2 border-t border-[var(--color-overlay0)]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="ide-btn"
                  style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
                >
                  <span>▤</span>
                  <span>read file ({proj.slug}.md)</span>
                </Link>

                <div className="flex items-center gap-2">
                  {proj.link && proj.link !== "#contact" && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ide-btn"
                      style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
                    >
                      <span>↗</span>
                      <span>Demo</span>
                    </a>
                  )}
                  {proj.isPrivate ? (
                    <span className="text-[10px] text-[var(--color-overlay2)] px-1.5 py-0.5 bg-[var(--color-surface1)] border border-[var(--color-overlay0)]">
                      [Private NDA]
                    </span>
                  ) : (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="ide-btn"
                      style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
                    >
                      <span>↗</span>
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
