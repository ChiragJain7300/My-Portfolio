"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconCommand, IconSearch } from "@tabler/icons-react";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global keydown listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Ordered exactly as they appear in the DOM flow
      const sections = ["contact", "experience", "projects", "about"];
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 90;

      if (isAtBottom) {
        setActiveSection("#contact");
        return;
      }

      if (window.scrollY < 180) {
        setActiveSection("");
        return;
      }

      // Check sections from bottom to top using absolute page coordinates
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= top - 240) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide nav on scroll down, show on scroll up
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const prev = scrollYProgress.getPrevious() ?? 0;
      const direction = current - prev;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const targetId = link.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const top = targetEl.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(link);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          initial={{ opacity: 1, y: -80 }}
          animate={{
            y: visible ? 0 : -80,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed z-[4000] top-6 inset-x-0 mx-auto w-[92%] max-w-3xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/80 dark:bg-[#0c0d14]/85 backdrop-blur-2xl shadow-xl shadow-black/[0.04] dark:shadow-black/60 transition-colors duration-200",
            className
          )}
        >
          {/* Brand & Availability Status */}
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors group shrink-0"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white font-medium hidden sm:inline-block">
              Chirag Jain
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5">
            {navItems.map((navItem, idx) => {
              const isActive = activeSection === navItem.link;
              return (
                <Link
                  key={`nav-${idx}`}
                  href={navItem.link}
                  onClick={(e) => handleNavClick(e, navItem.link)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 rounded-full",
                    isActive
                      ? "text-white dark:text-zinc-950 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                  )}
                >
                  <span className="relative z-10">{navItem.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions: Theme Toggle + Cmd+K Search Pill */}
          <div className="flex items-center space-x-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsCommandOpen(true)}
              aria-label="Open Command Palette"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-200 dark:border-white/15 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-all duration-150 text-[11px] font-mono cursor-pointer shadow-sm"
            >
              <IconSearch className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden md:inline-flex items-center space-x-0.5 text-[10.5px] text-zinc-500 dark:text-zinc-400">
                <IconCommand className="w-3 h-3" />
                <span>K</span>
              </span>
            </button>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Recruiter Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
};
