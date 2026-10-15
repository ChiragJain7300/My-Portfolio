"use client";

import React, { useState, useEffect, useRef } from "react";
import { ToggleIndicator } from "./ToggleIndicator";

export function ControlPanel() {
  const [open, setOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [memoryMB, setMemoryMB] = useState<number | null>(null);

  const frameCount = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    lastTime.current = performance.now();
    const loop = (now: number) => {
      frameCount.current++;
      const elapsed = now - (lastTime.current || now);

      if (elapsed >= 1000) {
        const calculatedFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(calculatedFps);
        frameCount.current = 0;
        lastTime.current = now;

        // Check performance memory if available in browser
        // @ts-expect-error performance.memory is Chrome/Blink specific
        if (typeof window !== "undefined" && window.performance && window.performance.memory) {
          // @ts-expect-error performance.memory
          const used = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
          setMemoryMB(used);
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="hidden md:block fixed top-2 right-4 z-40 font-mono text-xs select-none">
      <div className="bg-[var(--color-surface1)]/90 backdrop-blur-xs border border-[var(--color-overlay0)] shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2.5 py-1 text-[var(--color-subtext2)] hover:text-[var(--color-green)] transition-colors w-full"
        >
          <span className="text-[10px] uppercase font-semibold text-[var(--color-subtext1)]">
            Control Panel
          </span>
          <ToggleIndicator open={open} />
        </button>

        {open && (
          <div className="px-2.5 pb-2 pt-1 border-t border-[var(--color-overlay0)]/60 text-[11px] text-[var(--color-subtext0)] space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span>Performance:</span>
              <span className="font-semibold text-[var(--color-green)]">{fps} FPS</span>
            </div>
            {memoryMB !== null && (
              <div className="flex items-center justify-between gap-4">
                <span>JS Heap:</span>
                <span className="text-[var(--color-purple)]">{memoryMB} MB</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <span>Stack:</span>
              <span className="text-[var(--color-subtext2)]">Next.js 15 App</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Theme:</span>
              <span className="text-[var(--color-aqua)]">Catppuccin IDE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
