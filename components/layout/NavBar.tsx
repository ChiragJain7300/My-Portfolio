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
      className={`text-[var(--color-subtext2)] hover:text-white transition-colors tracking-wider text-[11px] md:text-xs font-mono font-medium ${className}`}
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } bg-[#16191b]/80 backdrop-blur-md border-b border-[var(--color-overlay0)]/20`}
    >
      {/* ── Full Width Container ─────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="group flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[var(--color-subtext2)] hover:text-white transition-colors shrink-0"
        >
          <span className="text-[var(--color-green)] font-bold text-sm tracking-tight">[ CJ ]</span>
        </a>

        {/* Desktop centre: links */}
        <div className="hidden sm:flex items-center gap-4 md:gap-7 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 text-xs text-[var(--color-subtext2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-green)]" />
            </span>
            <span className="tracking-widest text-[10.5px] font-semibold text-[var(--color-green)]">OPEN TO ROLES</span>
          </div>

          <span className="hidden md:inline text-[var(--color-overlay0)]/40 select-none">/</span>

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
        <div className="flex items-center gap-3">
          {/* ATS Resume button */}
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--color-green)] text-[#16191b] font-mono text-[10.5px] md:text-xs font-bold hover:bg-[#d8eed0] hover:shadow-[0_0_20px_rgba(203,227,179,0.35)] transition-all active:scale-95 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#16191b] shrink-0" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#16191b] shrink-0" />
            </a>
          </div>

          {/* Hamburger — only on mobile */}
          <button
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer (full width) ────────────────────────────────────── */}
      {mobileOpen && (
        <div className="sm:hidden w-full bg-[#16191b]/95 backdrop-blur-xl border-b border-[var(--color-overlay0)]/30 overflow-hidden shadow-2xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="flex items-center justify-between px-3 py-3 rounded-lg font-mono text-sm text-[var(--color-subtext2)] hover:text-white hover:bg-white/5 transition-colors tracking-wider"
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
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[var(--color-green)] text-[#16191b] font-mono text-xs font-bold hover:bg-[#d8eed0] transition-all"
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
export default NavBar;
