"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance in pixels the element rises from */
  y?: number;
}

/**
 * Wraps a section in a subtle viewport-triggered fade-in-up animation.
 * Fast (300ms), editorial-grade — not flashy.
 */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

