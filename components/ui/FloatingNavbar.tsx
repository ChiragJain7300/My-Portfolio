"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 180;

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection("#contact");
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-4 rounded-full border border-white/[0.12] bg-slate-950/80 backdrop-blur-md shadow-[0px_10px_30px_rgba(0,0,0,0.5),0px_0px_20px_rgba(203,172,249,0.08)] items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = activeSection === navItem.link;
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-purple dark:text-purple"
                  : "text-neutral-400 dark:text-neutral-400 hover:text-neutral-200 dark:hover:text-neutral-200"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="cursor-pointer">{navItem.name}</span>
              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-x-0 -bottom-1.5 h-[2px] bg-gradient-to-r from-purple to-cyanAccent rounded-full mx-auto"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
