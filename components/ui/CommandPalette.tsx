"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  IconSearch,
  IconFileText,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCode,
  IconUser,
  IconCopy,
  IconCheck,
  IconX,
  IconCommand,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Actions" | "Navigation" | "Social" | "Preferences";
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("chiragjain7300@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const navigateTo = useCallback(
    (id: string) => {
      onClose();
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [onClose]
  );

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: "resume",
        title: "Download Resume",
        subtitle: "View latest technical CV (PDF)",
        category: "Actions",
        icon: <IconFileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        shortcut: "↵",
        perform: () => {
          onClose();
          window.open("https://github.com/ChiragJain7300", "_blank");
        },
      },
      {
        id: "copy-email",
        title: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
        subtitle: "chiragjain7300@gmail.com",
        category: "Actions",
        icon: copied ? (
          <IconCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <IconCopy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        ),
        shortcut: "C",
        perform: copyEmail,
      },
      {
        id: "toggle-theme",
        title: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        subtitle: "Toggle visual interface appearance",
        category: "Preferences",
        icon:
          resolvedTheme === "dark" ? (
            <IconSun className="w-4 h-4 text-amber-400" />
          ) : (
            <IconMoon className="w-4 h-4 text-cyan-600" />
          ),
        shortcut: "T",
        perform: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          onClose();
        },
      },
      {
        id: "nav-about",
        title: "About & Engineering Matrix",
        subtitle: "Architecture, AI pipelines & skills",
        category: "Navigation",
        icon: <IconUser className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        perform: () => navigateTo("about"),
      },
      {
        id: "nav-projects",
        title: "Featured Projects",
        subtitle: "Full-stack apps, LLM engines & systems",
        category: "Navigation",
        icon: <IconCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        perform: () => navigateTo("projects"),
      },
      {
        id: "nav-experience",
        title: "Work Experience",
        subtitle: "Inventam Tech, Mastek & Freelance history",
        category: "Navigation",
        icon: <IconBriefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        perform: () => navigateTo("experience"),
      },
      {
        id: "nav-contact",
        title: "Get in Touch",
        subtitle: "Direct message & scheduling",
        category: "Navigation",
        icon: <IconMail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        perform: () => navigateTo("contact"),
      },
      {
        id: "social-github",
        title: "GitHub Profile",
        subtitle: "@ChiragJain7300",
        category: "Social",
        icon: <IconBrandGithub className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
        perform: () => {
          onClose();
          window.open("https://github.com/ChiragJain7300", "_blank");
        },
      },
      {
        id: "social-linkedin",
        title: "LinkedIn Profile",
        subtitle: "in/chirag-jain-7300",
        category: "Social",
        icon: <IconBrandLinkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        perform: () => {
          onClose();
          window.open("https://www.linkedin.com/in/chirag-jain-7300", "_blank");
        },
      },
    ],
    [copied, copyEmail, navigateTo, onClose, resolvedTheme, setTheme]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle?.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].perform();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white dark:bg-[#0d0e17] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 dark:border-white/10">
            <IconSearch className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              autoFocus
              className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1 mr-1 cursor-pointer"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* List of Results */}
          <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 font-sans">
                No matching actions found.
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => item.perform()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-white/10 text-zinc-950 dark:text-white"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-white dark:bg-white/10 shadow-sm" : "bg-zinc-100 dark:bg-white/5"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-medium text-zinc-950 dark:text-white truncate font-sans">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate font-sans">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.shortcut && (
                      <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-zinc-50 dark:bg-[#090a10] border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center space-x-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <div className="flex items-center space-x-1">
              <IconCommand className="w-3.5 h-3.5" />
              <span>+ K to toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
