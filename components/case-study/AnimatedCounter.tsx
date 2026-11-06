"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** The target value string, e.g. "98%", "1.5h", "100%", "4" */
  value: string;
  className?: string;
  /** Duration of the count-up in milliseconds */
  duration?: number;
}

/**
 * Animates a numerical value from 0 to its target when scrolled into view.
 * Handles suffixes like %, h, s, ms, etc.
 */
export function AnimatedCounter({
  value,
  className = "",
  duration = 1200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  // Parse numeric part and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericTarget = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isDecimal = match ? match[1].includes(".") : false;
  const decimalPlaces = isDecimal
    ? (match![1].split(".")[1]?.length || 1)
    : 0;

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericTarget * eased;

      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(decimalPlaces));
      } else {
        setDisplayValue(Math.round(currentValue).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        setDisplayValue(match ? match[1] : value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericTarget, duration, isDecimal, decimalPlaces, match, value]);

  // If the value doesn't start with a number, just show it static
  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

