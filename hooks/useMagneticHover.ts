"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticHover({ strength = 0.25, radius = 80 }: MagneticOptions = {}) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      // If user prefers reduced motion, disable magnetic drift
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        setPosition({
          x: deltaX * strength,
          y: deltaY * strength,
        });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    position,
    handleMouseMove,
    handleMouseLeave,
    style: {
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.2, 0, 0, 1)" : "transform 0.1s ease-out",
    },
  };
}
