# 🔬 REA Report: digitalmeadow.studio/info/about/

> **Mode**: Passive Observation & Static Analysis | **Date**: 2026-10-15  
> **Protocol**: GET-only, no auth, no form submission, no mutations

---

## Phase 1: REA Inspection Findings & Evidence Matrix

### 1.1 Runtime & Framework

| Signal | Evidence | Verdict |
|--------|----------|---------|
| Generator meta tag | `<meta name="generator" content="Astro v7.2.1">` | **Astro 7.2.1** |
| `data-astro-cid-*` attributes | Every component element carries scoped CID hashes (e.g. `data-astro-cid-xa52sxzc`, `data-astro-cid-efbjcz2x`) | Astro component scoping confirmed |
| `html[lang="en"]` root attribute | `data-astro-cid-xa52sxzc` on `<html>` | Astro layout scope |
| Script module imports | All scripts are `type="module"` from `/_astro/*.js` | Astro's Vite-based ESM output |
| No `__NEXT_DATA__` | Absent | **Not Next.js** |
| No `__nuxt` | Absent | **Not Nuxt** |
| No React/Vue hydration root | Absent | **Not React/Vue SPA** |
| No `data-reactroot` | Absent | Confirmed |
| Custom Elements | `<tree-folder>`, `<nav-tree>`, `<site-sidebar>`, `<popup-window>`, `<feature-block>`, `<trophy-drawer>`, `<marquee-text>` | Astro **Island Architecture** + Web Components |

**Rendering Model**: Astro's default **SSG (Static Site Generation)** with selective client-side hydration via Web Components. Each interactive island is a vanilla Custom Element — zero framework JS on the main thread by default. Pages are likely pre-rendered at build time and served as static HTML from a CDN (Cloudflare, confirmed by telemetry script).

---

### 1.2 Styling Architecture

| Signal | Evidence |
|--------|----------|
| Single CSS bundle | `/_astro/PageLayout.B_ywDV69.css` — content-hashed, served as one file |
| No Tailwind utility classes | Zero `flex-`, `gap-`, `text-sm`, `bg-` utility patterns found |
| No CSS Modules hashes | No `_className_abc123` patterns |
| No styled-components | No `sc-` prefixes |
| No BEM | No `block__element--modifier` patterns |
| **CSS Custom Properties** | Entire design token system via `--color-*`, `--font-*`, `--pad-*`, `--line-height`, etc. on `:root` |
| Astro scoped styles | Component-level `<style>` blocks compiled to `.content-wrapper[data-astro-cid-efbjcz2x]` selectors |
| Inline critical styles | Inlined within `<style>` tag in `<head>` for the page layout component |

**Architecture verdict**: **Custom CSS with a hand-crafted design token system**. No utility-first framework. The design system is entirely CSS Custom Property driven — extremely intentional and minimal.

**Stylesheet payload**: Single CSS file, minified — estimated ~17 KB raw (confirmed by file fetch).

---

### 1.3 Animation & Graphics Layer

| Library | Evidence | Verdict |
|---------|----------|---------|
| GSAP | No `gsap`, `ScrollTrigger`, `ScrollSmoother` globals | ❌ Absent |
| Framer Motion | No `motion`, `AnimatePresence` imports | ❌ Absent |
| Lenis | No smooth scroll library detected | ❌ Absent |
| Three.js / WebGL | No `THREE`, `WebGLRenderer`, no `<canvas>` on about page | ❌ On this page |
| CSS `@keyframes` | `fb-media-fade`, `marquee-scroll`, `trophy-toast-flash` — defined in stylesheet | ✅ CSS-only |
| CSS transitions | `.button:hover .button-inner { transform: translateY(-1px) }` | ✅ Pure CSS |
| `will-change` | `.moth { will-change: transform }` — animated moth easter egg character | ✅ |
| `wave-pending` class | Added to `<html>` on load; controls `opacity: 0` fade-in reveal for content | ✅ CSS class-gated animation |
| `intro-pending` class | Added for the root `/` page — controls sidebar and menu fade-in | ✅ |
| WebGPU/WebGL | Referenced in field-studies (webgpu-racing, webgpu-compute) | On other pages only |

**Animation verdict**: Deliberately **CSS-only** on content pages. No animation library runtime overhead. Micro-interactions are pure CSS transforms with `linear` timing. The "wave" effect is a class-swap pattern for page entrance. Custom Elements handle all interactive state.

---

### 1.4 Asset Pipeline & Delivery

| Asset | Delivery Strategy |
|-------|------------------|
| **Font** | `IosevkaTermNF-Regular.woff2` — single weight, preloaded via `<link rel="preload" as="font" crossorigin>`, `@font-face` with `font-display: swap` |
| **Images** | `.webp` format, content-hashed (`about--laird-kruger.DkSZLYih.webp`), `loading="lazy"` + `decoding="async"`, intrinsic `width`/`height` attributes set |
| **CSS** | Single content-hashed bundle (`PageLayout.B_ywDV69.css`) |
| **JS** | Multiple content-hashed ES modules (`/_astro/*.js`) — code-split per component/island |
| **Favicon** | Multi-format: `.ico`, `.png` (96×96), `.svg`, Apple Touch Icon (180×180), `site.webmanifest` |
| **OG Image** | `/og.jpg` — static raster |
| **CDN** | Cloudflare (confirmed by `static.cloudflareinsights.com` telemetry beacon) |
| **Lazy loading** | Native `loading="lazy"` on all images; no IntersectionObserver polyfill needed |

---

### 1.5 Network & Telemetry

| Third Party | Purpose | Load Strategy |
|------------|---------|---------------|
| `connect.facebook.net/en_US/fbevents.js` | Meta Pixel (ID: `2859771341047960`) | `requestIdleCallback` — deferred until idle; skipped on localhost |
| `static.cloudflareinsights.com/beacon.min.js` | Cloudflare Web Analytics | `type="module"` with SRI hash + `data-cf-beacon` config |
| Google Fonts | **None** | Font is self-hosted |
| Analytics SaaS (GA, Segment, etc.) | **None detected** | — |

**API round-trips**: Zero visible XHR/Fetch on page load. Content is fully server-rendered static HTML.

---

### 1.6 Protocol Limitations

> [!NOTE]
> The following could **NOT** be determined through passive client-side inspection alone:

- **CMS/Content source**: Whether content is stored in Markdown files, a headless CMS (Sanity, Contentful), or local `.astro` files. The blog post structure and schema.org data hints at likely Markdown-based content with Astro's content collections.
- **Build pipeline details**: Node.js version, CI/CD provider, deployment target (likely Cloudflare Pages based on telemetry).
- **Server-side rendering vs static**: Cannot confirm SSR vs SSG without inspecting `astro.config.mjs`. The absence of any server-sent headers or dynamic data suggests **full SSG**.
- **WebGPU/field-studies implementation**: The `webgpu-racing` and `webgpu-compute` pages use WebGPU APIs — cannot inspect without navigating to those pages.
- **Trophy system backend**: The `trophy-drawer` with 7 trophies appears fully client-side (localStorage), but this couldn't be confirmed without deeper JS inspection.

---

## Phase 2: Design Language Specification

### 2.1 Color Palette & Surface Elevation

**Catppuccin-Inspired Dark Palette** (custom variant — not standard Catppuccin):

```css
/* === BACKGROUNDS (Surface Elevation) === */
--color-crust:      #171c1f;   /* Deepest background */
--color-mantle:     #171c1f;   /* Same as crust */
--color-base:       #1c2225;   /* Page background (body bg) */
--color-surface0:   #232a2e;   /* Main content area bg */
--color-surface1:   #2b3337;   /* Buttons, cards, interactive bg */
--color-surface2:   #374145;   /* Hover states */

/* === OVERLAYS (Muted UI) === */
--color-overlay0:   #4a585c;   /* Line numbers, borders, subtle UI */
--color-overlay1:   #58686d;   /* Secondary borders */
--color-overlay2:   #6f8788;   /* Icons, secondary UI */

/* === TEXT HIERARCHY === */
--color-subtext0:   #839e9a;   /* Body text (main content) */
--color-subtext1:   #96b4aa;   /* Secondary body */
--color-subtext2:   #adc9bc;   /* Nav items, tertiary text */
--color-text:       #f8f9e8;   /* H1, primary emphasis */

/* === ACCENT PALETTE === */
--color-white:      #f6f2e5;
--color-black:      #3e3832;
--color-red:        #f57f82;   /* 3D links */
--color-orange:     #f7a182;   /* Trophy / orange accents */
--color-yellow:     #f5d098;   /* Yellow trophies */
--color-lime:       #dbe6af;   /* Code strings */
--color-green:      #cbe3b3;   /* Primary accent: active nav, CTA focus ring, selection */
--color-aqua:       #b3e3ca;   /* Moth easter egg */
--color-skye:       #b3e6db;   /* Code links */
--color-snow:       #afd9e6;
--color-blue:       #b2caed;   /* CMS links */
--color-purple:     #d2bdf3;   /* CWD path, e-commerce links */
--color-pink:       #f3c0e5;   /* Portfolio links, code constants */
--color-cherry:     #fae6ef;
```

**Selection**: `background: #cbe3b3` (green), `color: #1c2225` (base)  
**Focus ring**: `1px solid #cbe3b3`, `outline-offset: -1px`  
**Active nav item**: `background: #cbe3b3`, `color: #1c2225`  
**theme-color meta**: `#1c2225`

**Light mode** is also fully implemented (opt-in only, via `localStorage.getItem("dm-theme") === "Light"`):
- Backgrounds flip to warm paper: `--color-base: #f5efe6`
- Accents desaturate significantly (e.g., `--color-green: #4a6e3a`)

---

### 2.2 Typography Matrix

| Property | Value |
|----------|-------|
| **Font family** | `"Iosevka Term NF", monospace` — a Nerd Font variant of Iosevka (terminal monospace), self-hosted |
| **Single weight** | `400` (Regular only) — no bold, no italic weights loaded |
| **Font size** | `14px` on `<html>` (fixed base) |
| **Body text size** | `1rem` = 14px |
| **Line height** | `round(1.357rem, 1px)` = **~19px** (pixel-rounded for crisp grid alignment) |
| **H1 color** | `var(--color-text)` = `#f8f9e8` |
| **H2 color** | `var(--color-subtext2)` = `#adc9bc` |
| **H3-H6 color** | `var(--color-subtext1)` = `#96b4aa` |
| **Body text color** | `var(--color-subtext0)` = `#839e9a` |
| **Letter spacing** | Not explicitly set (monospace native) |
| **Font smoothing** | `-webkit-font-smoothing: antialiased` |
| **Font display** | `swap` |
| **No fluid type** | Fixed `14px` base — no `clamp()` fluid scaling |
| **Content max-width** | `100ch` (characters — fits the monospace grid) |

> [!IMPORTANT]
> The entire UI is rendered in a **single monospace typeface**. This is the central design decision — every pixel aligns to a character grid, making the page literally look like a code editor. No sans-serif, no display font.

---

### 2.3 Spatial Grid & Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR (36ch)  │  MAIN CONTENT (sticky, position: sticky)     │
│  sticky, top: 0  │  background: --color-surface0                │
│  overflow: auto  │                                               │
│                  │  ┌──────────────────────────────────────────┐│
│                  │  │ CONTENT WRAPPER (padded)                  ││
│                  │  │   pad-right: pad-sm + controls-width(40ch)││
│                  │  │                                           ││
│                  │  │ ┌─────────────────┬───────────────────┐  ││
│                  │  │ │LINE NUMS (5ch)  │ CONTENT (100ch max)│  ││
│                  │  │ └─────────────────┴───────────────────┘  ││
│                  │  └──────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

| Token | Value | Notes |
|-------|-------|-------|
| `--sidebar-width` | `36ch` | Character-based, collapses on `≤50rem` |
| `--line-numbers-width` | `5ch` | Hidden on mobile |
| `--controls-width` | `40ch` | Right panel (SiteControls, Trophy Drawer) |
| `--margin` | `3ch` | — |
| `--pad-xs` | `round(0.167rem, 1px)` ≈ 2px | Micro padding |
| `--pad-sm` | `round(0.333rem, 1px)` ≈ 5px | Base padding |
| `--pad-md` | `round(0.667rem, 1px)` ≈ 9px | Medium padding |
| Content max-width | `100ch` | All text content capped at 100 characters |
| Grid columns | `grid-template-columns: var(--sidebar-width) 1fr` | Simple 2-column layout |
| Mobile breakpoint | `@media (width <= 50rem)` | Single column, no sidebar |
| `--line-height` | `round(1.357rem, 1px)` ≈ 19px | All heights expressed in `line-height` multiples |
| `overscroll-behavior` | `none` | Prevents scroll chaining |

**Vertical rhythm**: Everything is measured in `line-height` units. Nav items have `height: var(--line-height)`. Empty lines in content are literal `<p aria-hidden="true">&nbsp;</p>` nodes — simulating blank editor lines.

**Depth indentation (nav)**:
- `.depth-0`: `padding-left: var(--pad-sm)`
- `.depth-1`: `padding-left: calc(var(--pad-sm) + 2ch)`
- `.depth-2`: `padding-left: calc(var(--pad-sm) + 4ch)`

---

### 2.4 Motion & Micro-interactions

#### Button Hover
```css
.button:hover .button-inner {
  background-color: var(--color-surface2);
  transform: translateY(-1px);        /* Subtle lift */
}
.button:active .button-inner {
  transform: translateY(0);           /* Press-down confirmation */
}
```
- No easing defined → defaults to `ease` (browser default)
- No `transition-duration` explicitly set → browser default ~200ms

#### Page Entrance (Wave)
```css
/* JS adds .wave-pending to <html> on load (if no prefers-reduced-motion) */
html.wave-pending .content-lines { opacity: 0; }
/* Removed by /_astro/page.Ba1BM0c6.js after content renders */
```
Controlled by JS class-swap. The "wave" name implies a text-reveal animation on the main page (`/`).

#### Feature Block Media Fade
```css
@keyframes fb-media-fade {
  0% { opacity: 0; }
}
/* Applied via .fb-media-fade class with --fb-media-fade-ms: 0.25s */
animation: fb-media-fade 0.25s linear both;
```

#### Marquee (Trophy Card Labels)
```css
@keyframes marquee-scroll {
  0%, 10%  { transform: translate(0); }
  45%, 55% { transform: translateX(calc(-1 * var(--marquee-distance))); }
  90%, to  { transform: translate(0); }
}
```
Uses `ResizeObserver` to calculate overflow distance, then sets `--marquee-distance` and `--marquee-duration` as CSS variables. Pauses at both ends.

#### Trophy Toast Flash
```css
@keyframes trophy-toast-flash {
  50% { outline-color: transparent; }
}
animation: 0.4s step-end infinite trophy-toast-flash;
```

#### `prefers-reduced-motion` compliance
```css
@media (prefers-reduced-motion: reduce) {
  /* marquee-text animation: none */
  /* trophy-toast animation: none */
}
/* Also checked in JS: if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) */
```
✅ Fully respected — animations are gated in both CSS and JS.

#### Cursor / Magnetic effects
❌ Not detected on this page. No `mousemove` cursor tracking or magnetic button effects observed.

#### Scroll dynamics
❌ No parallax, no ScrollTrigger, no section pinning. Pure browser-native scroll.

---

### 2.5 Tailwind Config & Base Blueprint

```js
// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      // ── Font ────────────────────────────────────────────────
      fontFamily: {
        ui: ['"Iosevka Term NF"', "monospace"],
        mono: ['"Iosevka Term NF"', ...fontFamily.mono],
      },

      // ── Font Size ────────────────────────────────────────────
      fontSize: {
        base: ["14px", { lineHeight: "19px" }], // round(1.357rem, 1px)
      },

      // ── Colors ──────────────────────────────────────────────
      colors: {
        // Backgrounds
        crust:    "#171c1f",
        mantle:   "#171c1f",
        base:     "#1c2225",
        surface0: "#232a2e",
        surface1: "#2b3337",
        surface2: "#374145",
        // Overlays
        overlay0: "#4a585c",
        overlay1: "#58686d",
        overlay2: "#6f8788",
        // Text
        subtext0: "#839e9a",
        subtext1: "#96b4aa",
        subtext2: "#adc9bc",
        text:     "#f8f9e8",
        // Accents
        red:      "#f57f82",
        orange:   "#f7a182",
        yellow:   "#f5d098",
        lime:     "#dbe6af",
        green:    "#cbe3b3",
        aqua:     "#b3e3ca",
        skye:     "#b3e6db",
        snow:     "#afd9e6",
        blue:     "#b2caed",
        purple:   "#d2bdf3",
        pink:     "#f3c0e5",
        cherry:   "#fae6ef",
        white:    "#f6f2e5",
        black:    "#3e3832",
      },

      // ── Spacing (ch-based, converted to rem approx) ─────────
      spacing: {
        "pad-xs": "0.167rem", // ~2px
        "pad-sm": "0.333rem", // ~5px
        "pad-md": "0.667rem", // ~9px
        "sidebar": "36ch",
        "controls": "40ch",
        "line-numbers": "5ch",
      },

      // ── Keyframes ───────────────────────────────────────────
      keyframes: {
        "fb-media-fade": {
          "0%": { opacity: "0" },
        },
        "marquee-scroll": {
          "0%, 10%":  { transform: "translateX(0)" },
          "45%, 55%": { transform: "translateX(calc(-1 * var(--marquee-distance)))" },
          "90%, 100%":{ transform: "translateX(0)" },
        },
        "trophy-flash": {
          "50%": { outlineColor: "transparent" },
        },
      },

      animation: {
        "media-fade":     "fb-media-fade 0.25s linear both",
        "marquee":        "marquee-scroll var(--marquee-duration) linear infinite",
        "trophy-flash":   "trophy-flash 0.4s step-end infinite",
      },
    },
  },
  plugins: [],
};
```

#### Example React Layout Component (Core Shell)

```tsx
// components/EditorLayout.tsx
import { ReactNode } from "react";
import "./editor-layout.css"; // or use @layer base in globals.css

interface EditorLayoutProps {
  sidebar: ReactNode;
  lineNumbers?: number[];
  children: ReactNode;
}

export function EditorLayout({ sidebar, lineNumbers = [], children }: EditorLayoutProps) {
  return (
    <div className="grid grid-cols-[36ch_1fr] min-h-svh bg-base font-ui text-[14px] leading-[19px]">
      {/* Sidebar */}
      <aside className="sticky top-0 h-svh overflow-y-auto bg-base text-subtext2 select-none">
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="bg-surface0 min-h-svh sticky top-0 overflow-hidden">
        <div
          className="relative p-[var(--pad-sm)] pr-[calc(var(--pad-sm)+40ch)]"
          style={{ "--pad-sm": "0.333rem" } as React.CSSProperties}
        >
          <div className="flex items-start min-h-svh text-subtext0">
            {/* Line Numbers */}
            <div
              aria-hidden="true"
              className="flex-none flex flex-col w-[5ch] text-overlay0 select-none text-right pr-[var(--pad-md)]"
            >
              {lineNumbers.map((n) => (
                <div key={n} className="leading-[19px] h-[19px]">{n}</div>
              ))}
            </div>

            {/* Content */}
            <div className="min-w-0 max-w-[100ch] text-subtext0">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

#### CSS Base Layer (globals.css)

```css
@import url("/fonts/IosevkaTermNF-Regular.woff2") /* self-hosted */;

@font-face {
  font-family: "Iosevka Term NF";
  src: url("/fonts/IosevkaTermNF-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@layer base {
  :root {
    --line-height: round(1.357rem, 1px);
    --pad-xs: round(0.167rem, 1px);
    --pad-sm: round(0.333rem, 1px);
    --pad-md: round(0.667rem, 1px);
    --sidebar-width: 36ch;
    --controls-width: 40ch;
    --line-numbers-width: 5ch;
  }

  html {
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overscroll-behavior: none;
    overflow-x: hidden;
  }

  body {
    font-family: "Iosevka Term NF", monospace;
    background-color: #1c2225;
    color: #839e9a;
    font-weight: 400;
    line-height: var(--line-height);
  }

  ::selection {
    background: #cbe3b3;
    color: #1c2225;
  }

  :focus-visible {
    outline: 1px solid #cbe3b3;
    outline-offset: -1px;
  }
}
```

---

## Phase 3: Engineering Deep Dive & Interview Defense

### 3.1 Architectural Tradeoffs

#### Why Astro over Next.js / Remix / Nuxt?

| Concern | Astro Choice | Alternative (e.g., Next.js) |
|---------|-------------|------------------------------|
| **Zero JS by default** | Astro ships 0 KB JS for static pages — content renders with no hydration cost | Next.js ships React runtime (~40 KB gzipped) even for fully static pages |
| **Content-first** | Pages are MDX/Markdown with Astro's content collections — perfect for blog + docs sites | Next.js RSC achieves similar but with more configuration overhead |
| **Island Architecture** | Interactive widgets (sidebar, popup, trophy) are Web Components, not React components — no framework reconciler on the main thread | React Server Components still require a React runtime client bundle |
| **Multi-framework** | Could mix React, Vue, Svelte components if needed in future | Next.js locks you to React |
| **Simplicity** | Custom Elements API for interactive UI — no state management library needed | React devs typically reach for Zustand, Context, etc. |

**The core tradeoff**: Astro prioritizes **Time-to-Interactive (TTI)** and **First Contentful Paint (FCP)** over developer ergonomics of a full React ecosystem. For a portfolio/studio site where content is the product, this is the correct engineering call.

#### Why Web Components (Custom Elements) over React Components?

- Custom Elements are **natively understood by the browser** — no hydration diff needed
- State is managed via **HTML attributes** (`[open]`, `[collapsed]`) — perfectly inspectable in DevTools
- **No client bundle** for non-interactive content — the sidebar JS ships only what's needed for the sidebar
- Tradeoff: Harder to share state between distant components; no ecosystem of pre-built accessible components

#### Why SSG over SSR?

- Portfolio content is essentially **immutable between deployments** — no need for runtime server rendering
- SSG enables **edge CDN caching** at Cloudflare with zero compute cost per request
- Tradeoff: Any content change requires a rebuild + redeploy. Acceptable for a solo studio.

#### Why a fixed `14px` base vs fluid type?

- The **code editor metaphor** demands pixel-perfect character grid alignment
- A `ch` unit measures the character width of the current font — all spacing is character-relative, making `clamp()` fluid type meaningless in this context
- The `round(..., 1px)` CSS function on `--line-height` is intentional: keeps everything on the pixel grid

---

### 3.2 Performance & Core Web Vitals Audit

#### Positive Signals ✅

| Metric | Implementation |
|--------|---------------|
| **FCP** | Single CSS file, no render-blocking fonts (preloaded + `font-display: swap`), minimal HTML |
| **LCP** | Portrait image has `loading="lazy"` but is likely below the fold — above-fold LCP is probably text |
| **CLS** | Font uses `font-display: swap` BUT Iosevka is monospace — fallback monospace has same character width, so **layout shift is minimal** |
| **INP** | No heavy JS event handlers — Custom Elements use event delegation |
| **Bundle size** | No React runtime; each island is a small ES module. Total JS is tiny |
| **Images** | `.webp` with intrinsic dimensions set → no CLS from images |
| **Preload** | Font file preloaded in `<head>` → zero FOUT risk |

#### Risk Areas ⚠️

| Risk | Detail |
|------|--------|
| **Meta Pixel** | `fbevents.js` from `connect.facebook.net` — even with `requestIdleCallback` delay, it eventually loads a ~100 KB third-party script that can block the main thread |
| **No `<link rel="preconnect">` for FB** | If/when fbevents.js loads, there's no preconnect to warm the connection |
| **`font-display: swap`** | Brief FOIT possible on first load before Iosevka is cached |
| **No responsive images** | Images use `loading="lazy"` but no `srcset` for different viewport sizes — a 1818px-wide image is served even to mobile |
| **Scrollbar hidden** | `::-webkit-scrollbar { width: 0 }` — no visual scrollbar on desktop Chrome/Safari. Intentional but removes a usability affordance |

---

### 3.3 Production Edge Cases & Flaws

#### UX Quirks

1. **No visible scrollbar**: Content overflows are tracked purely by scroll position. On long pages, there's no affordance. Power-user choice, but fails discoverability.
2. **Trophy drawer z-index**: `z-index: 95` — could clip behind popup windows (`z-index: 100`) in some states.
3. **Popup window drag**: `cursor: grab` popups are draggable (CSS `position: fixed`), but there's no `inset` constraint — they can be dragged off-screen with no recovery mechanism.
4. **`are.na` nav item opens an iframe popup** — not a standard link. Keyboard users pressing Enter will get an iframe popup rather than navigation, which is non-obvious.

#### Responsiveness
- Below `50rem`: Sidebar collapses completely (no line numbers, no sidebar), hamburger menu appears
- The `100ch` content max-width is appropriate for mobile when the sidebar is gone
- **Gap**: At exactly `~50rem` (800px) the sidebar disappears abruptly — no intermediate state

#### Accessibility Gaps (WCAG)

| Gap | Detail |
|-----|--------|
| **Color contrast** | `--color-subtext0` (`#839e9a`) on `--color-surface0` (`#232a2e`) = contrast ratio ~4.2:1 — passes AA for normal text, fails AAA |
| **Nav item contrast** | `--color-subtext2` (`#adc9bc`) on `--color-base` (`#1c2225`) ≈ 5.8:1 — passes AA |
| **Hidden scrollbar** | Cognitive accessibility issue — users can't tell page is scrollable |
| **`aria-hidden` on blank lines** | `<p aria-hidden="true">&nbsp;</p>` — correct, blank decorator lines are hidden from AT |
| **Trophy system ARIA** | `role="status" aria-live="polite"` on trophy toasts — ✅ correctly announced |
| **Skip link** | `<a href="#main-content" class="skip-link">` present ✅ — visible on focus |
| **`prefers-reduced-motion`** | ✅ Both CSS and JS gate animations |
| **Keyboard nav for nav tree** | Full ARIA tree pattern with `role="tree"`, `role="treeitem"`, Arrow key navigation — ✅ exemplary |

---

### 3.4 Modernization & Improvements

#### 1. CSS-Only Scroll-Driven Animations (Replace JS wave effect)

Currently the "wave" text reveal uses a JS class-swap pattern (`html.wave-pending`). In Next.js 15+ (or any modern browser), this can be replaced with a native CSS scroll-driven animation:

```css
/* Replaces the .wave-pending JS class pattern */
@keyframes content-reveal {
  from { opacity: 0; translate: 0 8px; }
  to   { opacity: 1; translate: 0 0; }
}

.content-lines {
  animation: content-reveal 0.4s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@media (prefers-reduced-motion: reduce) {
  .content-lines { animation: none; }
}
```

This eliminates the JS dependency entirely, has zero CLS risk, and works with `@starting-style` for initial render.

#### 2. React Server Components + `next/font` for Iosevka

On Next.js 15+, use `next/font/local` to eliminate any FOUT and apply the font at build time:

```tsx
// app/layout.tsx
import localFont from "next/font/local";

const iosevka = localFont({
  src: "./fonts/IosevkaTermNF-Regular.woff2",
  variable: "--font-ui",
  display: "swap",
  weight: "400",
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={iosevka.variable}>
      <body>{children}</body>
    </html>
  );
}
```

The font is **inlined as a preload hint** automatically and served from Next.js's edge cache — no separate font server round-trip.

#### 3. `srcset` + `<picture>` for Responsive Images

The portrait image is served as a single 1818px-wide `.webp` to all viewports. On a Next.js replatform, use `next/image`:

```tsx
import Image from "next/image";
import lairdPortrait from "@/public/about--laird-kruger.webp";

<Image
  src={lairdPortrait}
  alt="Portrait photo of Laird Kruger, founder of Digital Meadow"
  width={480}
  sizes="(max-width: 50rem) 100vw, 480px"
  loading="lazy"
  placeholder="blur"
/>
```

This auto-generates `srcset` in WebP/AVIF, serves appropriately sized images per viewport, and adds a `blurDataURL` placeholder eliminating any layout shift during lazy load.

---

## Summary Reference Card

| Dimension | Value |
|-----------|-------|
| Framework | **Astro v7.2.1** (SSG + Island Architecture) |
| Styling | **Custom CSS + CSS Custom Properties** (no Tailwind, no CSS-in-JS) |
| Font | **Iosevka Term NF** — self-hosted WOFF2, 400 weight only |
| Colors | Catppuccin-inspired dark palette, 24 tokens, full light-mode |
| Base font-size | **14px** (fixed) |
| Line height | **~19px** (`round(1.357rem, 1px)`) |
| Content max-width | **100ch** |
| Animations | **CSS-only** keyframes + class-gated JS reveals |
| JS islands | **Vanilla Custom Elements** (Web Components) |
| CDN | **Cloudflare** |
| Analytics | **Cloudflare Web Analytics** + Meta Pixel (deferred) |
| Third-party fonts | **None** (self-hosted) |
| Responsive breakpoint | `@media (width <= 50rem)` |
| Accessibility | Strong (ARIA tree nav, skip link, reduced-motion) with minor contrast gaps |
