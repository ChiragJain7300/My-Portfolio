import React from "react";

interface ToggleIndicatorProps {
  open: boolean;
  className?: string;
}

export function ToggleIndicator({ open, className = "" }: ToggleIndicatorProps) {
  return (
    <span
      className={`font-mono text-[var(--color-overlay2)] select-none text-xs inline-block transition-transform ${className}`}
      aria-hidden="true"
    >
      {open ? "[-]" : "[+]"}
    </span>
  );
}
