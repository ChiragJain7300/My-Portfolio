"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      naiveDimensions: true,
      autoResize: true,
    });

    setLenisInstance(lenis);

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Live document and body observer ensures Lenis dynamically recalculates dimensions
    // as long-form case studies, diagrams, syntax highlighting, and expandable drawers render
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      if (document.documentElement) resizeObserver.observe(document.documentElement);
      if (document.body) resizeObserver.observe(document.body);
    }

    const handleWindowResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleWindowResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      lenis.destroy();
    };
  }, []);

  // Reset scroll to top and refresh dimensions upon pathname change
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not override anchor links on the current page
    if (!window.location.hash) {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
        lenisInstance.resize();
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Refresh Lenis boundaries as dynamic components, diagrams, and code snippets mount
    const timers = [50, 150, 300, 600, 1000].map((delay) =>
      setTimeout(() => {
        lenisInstance?.resize();
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [pathname, lenisInstance]);

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (typeof target === "string") {
      const el = document.querySelector(target) as HTMLElement | null;
      if (!el) return;
      if (lenisInstance) {
        lenisInstance.scrollTo(el, options);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (lenisInstance) {
      lenisInstance.scrollTo(target, options);
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
