"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

/**
 * Scrambles and smoothly resolves text sequentially from left to right.
 * @param original The target string to scramble
 * @param speedMs Interval duration in milliseconds per frame (default: 45ms)
 * @param step Resolution speed increment per frame (default: 0.25 for a smooth, deliberate decipher effect)
 */
export function useScrambleText(original: string, speedMs = 45, step = 0.25) {
  const [text, setText] = useState(original);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef  = useRef(0);

  const scramble = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    iterRef.current = 0;

    frameRef.current = setInterval(() => {
      const iter = iterRef.current;
      setText(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterRef.current += step;
      if (iterRef.current >= original.length) {
        clearInterval(frameRef.current!);
        setText(original);
      }
    }, speedMs);
  }, [original, speedMs, step]);

  const reset = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    setText(original);
  }, [original]);

  return { text, scramble, reset };
}
