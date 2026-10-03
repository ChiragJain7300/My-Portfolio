"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "top",        label: "HERO" },
  { id: "projects",   label: "WORK" },
  { id: "lab",        label: "LAB" },
  { id: "experience", label: "EXP" },
  { id: "contact",    label: "CONTACT" },
];

export function ScrollProgress() {
  const barRef        = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("top");
  const [showDots, setShowDots] = useState(false);

  // Thin progress bar at top
  useEffect(() => {
    const onScroll = () => {
      // Progress bar
      const bar = barRef.current;
      if (bar) {
        const total  = document.documentElement.scrollHeight - window.innerHeight;
        const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = `${pct}%`;
      }

      // Active section detection
      const scrollMid = window.scrollY + window.innerHeight / 2;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollMid) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show dots after first scroll
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowDots(true); };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Top progress bar ── */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[9999] pointer-events-none">
        <div
          ref={barRef}
          className="h-full bg-[#e8e4dc] transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* ── Right-side section dot nav ── */}
      <nav
        aria-label="Section navigation"
        className={`fixed right-4 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3.5 transition-all duration-500 ${
          showDots ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              title={s.label}
              aria-label={`Go to ${s.label}`}
              className="group relative flex items-center justify-end gap-2"
            >
              {/* Label — appears on hover to the left of the dot */}
              <span
                className={`absolute right-5 font-mono text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "opacity-70 text-[#e8e4dc]"
                    : "opacity-0 group-hover:opacity-50 text-zinc-400"
                }`}
              >
                {s.label}
              </span>
              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2 h-2 bg-[#e8e4dc] shadow-[0_0_6px_rgba(232,228,220,0.6)]"
                    : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
