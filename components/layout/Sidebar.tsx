"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { developerProfile, socialMedia, projects } from "@/data";
import { ToggleIndicator } from "@/components/ui/ToggleIndicator";

interface SidebarProps {
  onToggleTableView?: () => void;
  isTableView?: boolean;
}

export function Sidebar({
  onToggleTableView,
  isTableView = false,
}: SidebarProps) {
  const pathname = usePathname();

  // Derive open states from pathname with optional manual user toggle overrides
  const [manualToggles, setManualToggles] = useState<{
    about?: boolean;
    projects?: boolean;
    experience?: boolean;
  }>({});

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAbout =
    manualToggles.about ?? (pathname === "/" || pathname.startsWith("/about"));
  const openProjects =
    manualToggles.projects ?? pathname.startsWith("/projects");
  const openExperience =
    manualToggles.experience ?? pathname.startsWith("/experience");

  const toggleFolder = (key: "about" | "projects" | "experience") => {
    setManualToggles((prev) => {
      const current =
        key === "about"
          ? openAbout
          : key === "projects"
          ? openProjects
          : openExperience;
      return { ...prev, [key]: !current };
    });
  };

  const isCurrent = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path;
  };

  const navItemClass = (path: string) => {
    const active = isCurrent(path);
    if (active) {
      return "bg-[var(--color-green)] !text-[#171c1f] [&_*]:!text-[#171c1f] font-semibold shadow-xs";
    }
    return "text-[var(--color-subtext2)] hover:bg-[var(--color-surface2)] hover:text-[var(--color-text)]";
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-12 bg-[var(--color-base)] border-b border-[var(--color-overlay0)] z-40 flex items-center justify-between px-3 sm:px-4 font-mono text-sm">
        <Link
          href="/"
          className="text-[var(--color-purple)] font-semibold flex items-center gap-1.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>~/chirag-jain</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] cursor-blink" />
        </Link>

        <div className="flex items-center gap-2">
          {onToggleTableView && (
            <button
              onClick={onToggleTableView}
              className="px-2 py-0.5 text-[10px] bg-[var(--color-surface1)] text-[var(--color-green)] border border-[var(--color-overlay0)]"
            >
              {isTableView ? "[CLOSE]" : "[TABLE]"}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-2 py-0.5 bg-[var(--color-surface1)] text-[var(--color-subtext2)] border border-[var(--color-overlay0)]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? "[✕]" : "[☰ NAV]"}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Persistent Sidebar (Desktop) + Slide-over Drawer (Mobile) */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 md:z-10 flex flex-col justify-between bg-[var(--color-base)] border-r border-[var(--color-overlay0)] select-none text-sm font-mono transition-transform duration-200 ease-in-out md:translate-x-0 w-72 max-w-[85vw] md:w-[var(--sidebar-width,17rem)] ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          lineHeight: "var(--line-height, 1.5rem)",
        }}
      >
        {/* Top Header / Working Directory */}
        <div className="p-3 border-b border-[var(--color-overlay0)]">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--color-purple)] font-bold tracking-tight hover:underline flex items-center gap-1.5"
            >
              <span>~/chirag-jain</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] cursor-blink" />
            </Link>
            <span className="text-xs text-[var(--color-overlay2)] uppercase tracking-wider">
              IDE v2.4
            </span>
          </div>
          <div className="mt-1 text-xs text-[var(--color-subtext0)] flex items-center gap-1.5 truncate">
            <span className="text-[var(--color-green)]">●</span>
            <span>{developerProfile.status}</span>
          </div>
        </div>

        {/* File Tree Navigation */}
        <div className="flex-1 overflow-y-auto py-2 px-1 space-y-0.5">
          {/* Section: about/ */}
          <div>
            <button
              onClick={() => toggleFolder("about")}
              className="w-full flex items-center justify-between px-2 py-0.5 text-left text-[var(--color-subtext1)] hover:bg-[var(--color-surface1)] rounded-xs group"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-overlay2)]">{openAbout ? "▾" : "▸"}</span>
                <span className="font-medium">about/</span>
              </span>
              <ToggleIndicator open={openAbout} />
            </button>

            {openAbout && (
              <div className="space-y-0.5 mt-0.5">
                <Link
                  href="/"
                  className={`w-full flex items-center gap-2 pl-6 pr-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                    "/"
                  )}`}
                >
                  <span className="opacity-60">📄</span>
                  <span>README.md</span>
                </Link>
              </div>
            )}
          </div>

          {/* Section: projects/ */}
          <div>
            <button
              onClick={() => toggleFolder("projects")}
              className="w-full flex items-center justify-between px-2 py-0.5 text-left text-[var(--color-subtext1)] hover:bg-[var(--color-surface1)] rounded-xs group"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-overlay2)]">{openProjects ? "▾" : "▸"}</span>
                <span className="font-medium">projects/</span>
              </span>
              <ToggleIndicator open={openProjects} />
            </button>

            {openProjects && (
              <div className="space-y-0.5 mt-0.5">
                <Link
                  href="/projects"
                  className={`w-full flex items-center gap-2 pl-6 pr-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                    "/projects"
                  )}`}
                >
                  <span className="text-[var(--color-subtext2)]">▤</span>
                  <span className="truncate">index.md</span>
                </Link>
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className={`w-full flex items-center gap-2 pl-6 pr-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                      `/projects/${p.slug}`
                    )}`}
                  >
                    <span className="text-[var(--color-blue)]">◇</span>
                    <span className="truncate">{p.slug}.md</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section: experience/ */}
          <div>
            <button
              onClick={() => toggleFolder("experience")}
              className="w-full flex items-center justify-between px-2 py-0.5 text-left text-[var(--color-subtext1)] hover:bg-[var(--color-surface1)] rounded-xs group"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-overlay2)]">{openExperience ? "▾" : "▸"}</span>
                <span className="font-medium">experience/</span>
              </span>
              <ToggleIndicator open={openExperience} />
            </button>

            {openExperience && (
              <div className="space-y-0.5 mt-0.5">
                <Link
                  href="/experience"
                  className={`w-full flex items-center gap-2 pl-6 pr-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                    "/experience"
                  )}`}
                >
                  <span className="text-[var(--color-green)]">▪</span>
                  <span className="truncate">timeline.md</span>
                </Link>
              </div>
            )}
          </div>

          {/* Section: lab */}
          <div className="pt-1">
            <Link
              href="/lab"
              className={`w-full flex items-center gap-2 px-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                "/lab"
              )}`}
            >
              <span className="text-[var(--color-yellow)]">⚡</span>
              <span>lab/architecture.tsx</span>
            </Link>
          </div>

          {/* Section: contact-me */}
          <div>
            <Link
              href="/contact"
              className={`w-full flex items-center gap-2 px-2 py-0.5 rounded-xs transition-colors text-left ${navItemClass(
                "/contact"
              )}`}
            >
              <span className="text-[var(--color-purple)]">✉</span>
              <span>contact-me.md</span>
            </Link>
          </div>
        </div>

        {/* Bottom Panel: Links & Table View Button */}
        <div className="p-3 border-t border-[var(--color-overlay0)] bg-[var(--color-surface0)]/50 space-y-2">
          {/* Quick social chips */}
          <div className="flex flex-col gap-1 text-[11px]">
            <a
              href={`mailto:${developerProfile.email}`}
              className="ide-btn text-[var(--color-subtext2)] hover:text-[var(--color-green)]"
              style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
            >
              <span>✉</span>
              <span className="truncate">email</span>
            </a>
            {socialMedia.map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="ide-btn"
                style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
              >
                <span>↗</span>
                <span>{s.name.toLowerCase()}</span>
              </a>
            ))}
          </div>

          {/* Recruiter / Table View Toggle */}
          {onToggleTableView && (
            <button
              onClick={onToggleTableView}
              className="w-full mt-2 py-1 px-2 text-center text-xs font-semibold bg-[var(--color-surface1)] text-[var(--color-green)] border border-[var(--color-overlay0)] hover:bg-[var(--color-surface2)] transition-all flex items-center justify-center gap-1.5"
            >
              <span>{isTableView ? "[CLOSE TABLE]" : "[TABLE VIEW]"}</span>
              <span className="text-[10px] text-[var(--color-overlay2)]">
                {isTableView ? "ESC" : "RECRUITER"}
              </span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
