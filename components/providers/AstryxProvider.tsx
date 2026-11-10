"use client";

import React, { useMemo } from "react";
import { Theme, defineTheme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "../../astryx-themes";

const baseTheme = themes[defaultThemeSlug];

const customTheme = defineTheme({
  name: "portfolio-theme",
  extends: baseTheme,
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: {
      family: "var(--font-geist-sans)",
      fallbacks: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    heading: {
      family: "var(--font-geist-sans)",
      fallbacks: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      weights: { 1: "bold", 2: "bold", 3: "semibold", 4: "semibold" },
    },
    code: {
      family: "var(--font-geist-mono)",
      fallbacks: "ui-monospace, 'SF Mono', monospace",
    },
  },
  tokens: {
    "--font-family-heading":
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "--font-family-body":
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "--font-family-code":
      "var(--font-geist-mono), ui-monospace, 'SF Mono', monospace",
  },
});

export function AstryxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={customTheme}>
      {children}
    </Theme>
  );
}
