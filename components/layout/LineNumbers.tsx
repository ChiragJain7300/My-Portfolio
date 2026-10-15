"use client";

import React, { useEffect, useState } from "react";

interface LineNumbersProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function LineNumbers({ containerRef }: LineNumbersProps) {
  const [lineCount, setLineCount] = useState<number>(100);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateLines = () => {
      // Line height in pixels is approx 19.25px (1.375rem * 14px)
      const computed = window.getComputedStyle(el);
      const lineHeightStr = computed.lineHeight;
      const lineHeightPx = parseFloat(lineHeightStr) || 19.25;
      const totalHeight = el.scrollHeight || el.offsetHeight || 2000;
      const calculatedLines = Math.max(80, Math.ceil(totalHeight / lineHeightPx) + 5);
      setLineCount(calculatedLines);
    };

    updateLines();

    const resizeObserver = new ResizeObserver(() => {
      updateLines();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      className="hidden md:flex flex-col select-none text-right pr-4 font-mono text-[var(--color-overlay0)] opacity-75 shrink-0"
      style={{
        width: "var(--line-numbers-width, 5ch)",
        lineHeight: "var(--line-height, 1.375rem)",
      }}
      aria-hidden="true"
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <span key={i + 1} className="block text-xs leading-[var(--line-height)]">
          {i + 1}
        </span>
      ))}
    </div>
  );
}
