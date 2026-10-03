"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { useRecruiterMode } from "@/components/providers/RecruiterModeContext";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useScrambleText } from "@/hooks/useScrambleText";
import { FileText, ArrowUpRight, Menu, X } from "lucide-react";

// ─── Scramble nav link ────────────────────────────────────────────────────
function ScrambleLink({
  href,
  label,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  const { text, scramble, reset } = useScrambleText(label);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={`text-zinc-400 hover:text-white transition-colors tracking-wide text-[11px] md:text-xs font-mono ${className}`}
    >
      {text}
    </a>
  );
}

export function NavBar() {
  const { scrollTo } = useLenis();
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const resumeMagnetic = useMagneticHover({ strength: 0.2, radius: 60 });

  // Hide nav on scroll-down, show on scroll-up
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cur = window.scrollY;
          if (cur > 100) {
            if (cur > lastScrollY && cur - lastScrollY > 8) {
              setIsVisible(false);
              setMobileOpen(false);
            } else if (lastScrollY - cur > 8) setIsVisible(true);
          } else {
            setIsVisible(true);
          }
          setLastScrollY(cur);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (recruiterMode) toggleRecruiterMode();
    setMobileOpen(false);
    setTimeout(() => scrollTo(targetId), 100);
  };

  const navLinks = [
    { label: "WORK",    href: "#projects" },
    { label: "LAB",     href: "#lab" },
    { label: "EXP",     href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
      } w-[94%] max-w-4xl`}
    >
      {/* ── Desktop pill nav ─────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-3.5 py-2 md:px-5 md:py-2.5 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="group flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-zinc-300 hover:text-white transition-colors shrink-0"
        >
          <span className="text-white/40 group-hover:text-white/70 transition-colors">[</span>
          <span className="text-white">CJ</span>
          <span className="text-white/40 group-hover:text-white/70 transition-colors">]</span>
        </a>

        {/* Desktop centre: links (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-3 md:gap-6 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide text-[11px]">OPEN TO ROLES</span>
          </div>
          <span className="hidden md:inline text-white/15">|</span>
          {navLinks.map((l) => (
            <ScrambleLink
              key={l.href}
              href={l.href}
              label={l.label}
              onClick={(e) => handleNavClick(e, l.href)}
            />
          ))}
        </div>

        {/* Right: CTA (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {/* ATS Resume button — hidden on very small screens, shown sm+ */}
          <div
            className="hidden sm:block"
            ref={resumeMagnetic.ref as React.RefObject<HTMLDivElement>}
            onMouseMove={resumeMagnetic.handleMouseMove}
            onMouseLeave={resumeMagnetic.handleMouseLeave}
            style={resumeMagnetic.style}
          >
            <a
              href="mailto:chiragjain7300@gmail.com?subject=Resume%20Request%20%E2%80%94%20Chirag%20Jain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8e4dc] text-zinc-950 font-mono text-[10px] md:text-[11px] font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(232,228,220,0.3)] transition-all active:scale-95 whitespace-nowrap"
            >
              <FileText className="w-3 h-3 text-zinc-900 shrink-0" />
              <span>ATS RESUME</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-900 shrink-0" />
            </a>
          </div>

          {/* Hamburger — only on mobile */}
          <button
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="sm:hidden mt-2 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="p-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="flex items-center justify-between px-3 py-3 rounded-xl font-mono text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors tracking-wider"
              >
                <span>{l.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            ))}
          </div>
          <div className="px-4 pb-4">
            <a
              href="mailto:chiragjain7300@gmail.com?subject=Resume%20Request%20%E2%80%94%20Chirag%20Jain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>REQUEST ATS RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
