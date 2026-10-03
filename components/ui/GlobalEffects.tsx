"use client";

import { useEffect, useRef } from "react";

/** Film grain + cursor glow — mounted once in RootLayout body */
export function GlobalEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const el = glowRef.current;
    if (!el) return;

    let raf = 0;
    let tx = -1000, ty = -1000;
    let cx = -1000, cy = -1000;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      // Lag the glow slightly for a "soft" follow feel
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Animated film grain */}
      <div className="grain-overlay" aria-hidden="true" />
      {/* Cursor glow halo */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
