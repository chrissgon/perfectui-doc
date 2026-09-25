# Handoff: landing

- Owner: design-handoff
- Status: draft
- Date: 2026-09-24
- Screen: SCREEN-1 of the flows (the landing at `/`), with the shell of SCREEN-3
- Approved design: `docs/design/results/landing.md`, run R2 (Claude Design), approved by the user on 2026-09-24
- Export: `docs/design/screens/landing-page/perfect-ui-landing.html` and `.png`, unpacked to `docs/design/handoff/landing/export/`

## Summary

The landing is built as Nuxt components styled with the perfectui stylesheet and Tailwind utilities, following the exported design section by section; the export is a reference, not code to copy. Three things change on the way: content and numbers come from their sources (messaging, example blocks, the build-time measurement), the tool's invented tokens map back to the library's, and every animation the export switched off for its capture runs, with a real reduced-motion rule.

## Sources

- `docs/design/results/landing.md` (decision), `docs/design/briefs/landing.md` (constraints, criteria, copy)
- `docs/marketing/messaging.md` SECTION-1 to SECTION-9; `docs/product/specs/landing-and-site-shell.md` REQ-1 to REQ-10, NFR-1 to NFR-3, EDGE-1 to EDGE-9
- `docs/design/design-system.md`; `docs/design/flows.md` SCREEN-1, SCREEN-3
- The export's page source, 20 style blocks and its behaviour script (`export/scripts/01.js`), read on 2026-09-24
- perfectui repository at commit 169cec1 (`src/css/tokens.css`, `dist/perfectui.css` built locally) and the published `@chrissgon/perfectui` 1.0.0-beta.0; `DESIGN-SYSTEM.md` §1.6 (icons as CSS masks)

## Reference and shipping

- Reference only, never shipped: the tool's component runtime and React 18 from a CDN; the inlined copy of the perfectui stylesheet (blocks 01 to 17 of `export/styles/`), which also carries tokens the library does not have; the preview switch `this.reduced=true`, hard-coded in the script, which disables every animation in the export; fallbacks written by hand in `applyAttrs()` for `commandfor`, `closedby` and `interestfor`; the Lucide icon set bundled whole.
- Shipped: `@chrissgon/perfectui` from npm (stylesheet and the module loader, which brings the fallbacks), pinned per OPEN-1; Inter and Fira Code self-hosted; the 13 icons in `handoff/landing/assets/` through the icon recipe of `DESIGN-SYSTEM.md` §1.6 (`.icon` plus one class per icon, SVG as a CSS mask painted with `currentColor`); the wordmark and mark SVGs.

## Tokens

| Value | Where | Maps to | Action |
|-------|-------|---------|--------|
| `--pui-*-fill`, `--pui-*-fill-hover`, `--pui-*-on-fill`, `--pui-*-edge`, `--pui-*-ink` (per-role aliases) | colours of demos, links, code tokens | the library's colour classes and its contract `--pui-color`, `--pui-on-color`, `--pui-edge`, `--pui-ink`, set by `pui-<colour>` | fix in code: use the colour classes; for text in a role colour add the site tokens `--site-theme-ink`, `--site-success-ink`, `--site-warn-ink`, `--site-error-ink` with the design system's ink values |
| `--pui-space-*` (0-5 to 8) | spacing everywhere | `--pui-space` (4 px) and Tailwind spacing | fix in code: Tailwind spacing classes |
| `--pui-radius-*` (sm, lg, inner, full) | cards, code panels, pills | `--pui-radius` (6 px), the card radius (9 px), `pui-rounded-full`, site container radius 20 px | fix in code: Tailwind radius classes with the design-system values |
| `--pui-font-sans`, `--pui-font-mono`, `--pui-font-size-small`, `--pui-font-weight-strong`, `--pui-line-height` | all text | site font stacks and type roles of the design system | add site tokens: `--site-font-sans` (Inter), `--site-font-mono` (Fira Code) |
| `--pui-surface-*`, `--pui-text-body`, `--pui-text-secondary`, `--pui-backdrop` | page, cards, secondary text | `--pui-bg`, `--pui-bg-muted`, `--pui-text`, `--pui-text-muted` | fix in code: use the library tokens |
| `--pui-duration`, `--pui-easing` | transitions | the library's 150 ms transitions | fix in code: rely on the library; site animations use the timings under Motion |
| `--logo-filter` | wordmark colour in dark mode | none | fix in code: inline SVG with `fill="currentColor"` instead of a filter |
| #3c32aa | purple mixed into the hero glow (`color-mix` with `--pui-theme`) | `PerfectUI/doc/glow-purple` (#7340D9 at 12%) | fix in code: use the glow values of the design system |
| #7c3aed | preset of the theme picker and the section 5 demo | the example colour of messaging SECTION-5 and the library's theme docs | use token: keep as a picker preset value |
| #16a34a, #dc2626, #d97706 | theme picker presets | success, error and warn fills | use token: presets read the library's role colours |
| #676d7b | `--pui-text-muted` in light mode in the inlined library | the library from 1.0.0-beta.1 (commit 169cec1) | use token: comes with the pinned 1.0.0-beta.1 |
| #000, #fff, #0092cd, #07b6f0, #111827, #1f2937, #22c55e, #374151, #6b7280, #9ca3af, #d1d5db, #e5e7eb, #ef4444, #f3f4f6, #f59e0b | the inlined library's token values | the library's own tokens | use token: they come with the stylesheet |

## Components

| Region | Unit | Props and data | Content source | States |
|--------|------|----------------|----------------|--------|
| Shell header | `SiteHeader` (site) | version label, links | versions configuration (latest label), site configuration (GitHub and Figma URLs) | default, narrow with menu control, mode light and dark |
| Value proposition (hero) | `LandingHero` with `ClassCycleDemo` (site) and a live `pui-` element | the six class combinations of the cycle | messaging SECTION-1 (headline, body); the cycle list is site data | default, reduced motion (first combination complete, no caret), no JavaScript (same) |
| Install command with copy control | `CopyCommand` (site) on `pui-input-group` | command | package name from one configuration value (REQ-3) | default, copied (check icon and "Copied" for 1800 ms), clipboard unavailable (command selected, EDGE-9), no JavaScript (inert) |
| Primary call to action | `pui-btn pui-solid pui-theme` link to `/docs`, plus `pui-btn pui-outline pui-surface` to the migration guide | — | messaging SECTION-1 CTAs | default, hover, focus |
| Size block with version and method | `SizeChart` (site): one row per library, CSS and JS segments, counters | perfectui sizes, version, method, date; the other libraries' sizes and versions | perfectui row from the build-time gzip measurement of the installed package (REQ-2); others from messaging PROOF-2 | default, animating, final |
| Components showcase | `ClassPicker` (section 3), `OverlaysShowcase` (section 4), `ModeThemeDemo` (section 5) | picker state; four overlay examples | messaging SECTION-3 to SECTION-5; the overlay examples render the documentation's example blocks (REQ-5), not HTML written in the landing | default, chosen combination, overlay open, section in dark mode |
| Further sections | `TailwindDemo` (section 6), `StrikeList` (section 7) | the cascade layer list; the five items | messaging SECTION-6 and SECTION-7 | default, animating, final |
| Migration call to action | `MigrationCallout` (site) with a diff line and `pui-btn pui-soft pui-theme` | before and after classes | messaging SECTION-8 | default |
| Install and links | `InstallTabs` (site): tabs npm, yarn, pnpm, bun; CDN snippet; copy controls | commands, CDN snippet | package name and pinned version from configuration; messaging SECTION-9 | tab selected, copied |
| Footer | `SiteFooter` (site): tagline, links, wordmark at display size | links | messaging tagline; site configuration | default, dark |

## Layout

| Width | Columns and order | Sticky | Collapsed or hidden |
|-------|-------------------|--------|---------------------|
| 1280 and up | content max width 1200 px centred, side padding `clamp(20px, 5vw, 40px)`; hero in two columns (text, demo window) with the display number under the text; sections separated by `clamp(96px, 12vw, 160px)` vertical padding; section 2 and section 7 on inverse (black) bands; overlays in a 2 × 2 grid (`repeat(auto-fit, minmax(min(100%, 440px), 1fr))`) | header | nothing |
| 720 to 1279 | as above with fluid type: headline `clamp(44px, 7.5vw, 96px)`, section headings `clamp(36px, 5vw, 64px)`, display number `clamp(120px, 17vw, 216px)` | header | nothing |
| below 720 | one column; the display number moves inline under the headline; size chart rows put the bar on its own line under the name | header | header links behind a menu control (SCREEN-3): not designed; follow the flows' rule |
| 360 | the export's own responsive rules (render in `reference/360-light.png`): one column, display number inline, chart bars under the names; REQ-1 holds | header | as below 720 |

## Behaviour

| Interaction | Requirement | Rule |
|-------------|-------------|------|
| Copy install command | landing REQ-3, EDGE-9 | clipboard write; "Copied" with a check icon in the success ink for 1800 ms; without clipboard access the command is selected; without JavaScript the control is not rendered |
| Mode toggle | landing REQ-8, EDGE-4, EDGE-5 | call `setMode` from `@chrissgon/perfectui/mode` (sets `data-pui-mode` and the `pui-mode` cookie); the export only set the attribute; the prerendered HTML is patched from the cookie before first paint |
| Theme picker | landing REQ-9 | presets (default, #7c3aed, success, error, warn); the colour input was removed in the user review of 2026-09-25; sets `--pui-theme` on `<html>` and keeps it in session storage; the export did not persist it |
| Class picker | brief SECTION-3 | chips as toggle buttons with `aria-pressed`; the element and the class line update, the changed token highlighted with `pui-soft pui-theme` |
| Overlays | brief SECTION-4 | real `<dialog>` with `commandfor`, `popover`, `interestfor`, `<details name>`; fallbacks come from the library's loader |
| Section 5 demo | brief SECTION-5 | switch and swatches scope `data-pui-mode` and `--pui-theme` to the section only |
| Package tabs | brief SECTION-9 | tab buttons with `aria-pressed`; arrow keys move between tabs |

## Motion

| Animation | Trigger | Timing | Final state | Reduced motion |
|-----------|---------|--------|-------------|----------------|
| Hero class cycle | page load, after 600 ms | types 45 to 100 ms per character, 700 ms pause after each class, holds 1500 ms, erases two characters every 18 ms, 500 ms before the next of six combinations; caret blinks at 1 s steps | `pui-btn pui-solid pui-theme` complete, element fully styled | final state, no caret, no loop |
| Hero bars behind the display number | scroll, scaled by the hero's visibility | scale 0.35 to 1 and opacity 0.25 to 1 following the intersection ratio | full scale and opacity | final state |
| Size chart bars and counters | 30% of the chart in view, once | each bar 1300 ms ease-out cubic, starting 250 ms + 110 ms × row index; counters follow the bar | full bars, exact numbers | final state |
| Tailwind `w-full` | 40% of section 6 in view | after 500 ms types ` w-full` at 90 ms per character, holds 2600 ms, erases at 40 ms per character, 1200 ms pause, loops | ` w-full` applied, button at full width | final state, no loop |
| Strike-through list | each item fully in view | 250 ms after entering, at least 260 ms after the previous item; line grows to full width while the text turns muted | every item struck and muted | final state |
| Mode and theme changes | interaction | the library's 150 ms colour transitions | new colours | the library's transitions remain |

## Assets

- `handoff/landing/assets/wordmark.svg` (2967 × 500, footer at display size and header), `mark.svg` (500 × 703): convert fills to `currentColor` and inline them.
- Icons (Lucide, via the §1.6 recipe): check, chevron-down, copy, ellipsis, figma, github, moon, pencil, search, share-2, sun, trash-2; Lucide marks its brand icons (github, figma) as deprecated, so pin the version or replace them with the brands' own marks.
- Fonts: Inter 400, 500, 600 and Fira Code 400, 500, self-hosted as woff2 with `font-display: swap`.

## Deviations

- DEV-1: The export disables every animation with `this.reduced=true`; the preview shows only final states. Action: fix in code (read `prefers-reduced-motion` with `matchMedia` and follow Motion).
- DEV-2: The overlay and showcase examples are HTML written inside the landing, against REQ-5 (examples from the documentation's example blocks). Action: fix in code.
- DEV-3: perfectui's sizes are typed in the script (3155 and 502), against REQ-2 and NFR-2 (computed at build from the installed package). Action: fix in code.
- DEV-4: The mode toggle sets the attribute without `setMode` and the theme picker does not persist, against REQ-8 and REQ-9. Action: fix in code.
- DEV-5: The page depends on tokens the tool invented (Tokens table) and on an inlined copy of the library. Action: fix in code.
- DEV-6: Fallbacks for `commandfor`, `closedby` and `interestfor` are written by hand. Action: fix in code (import the library's loader).
- DEV-7: The hero glow mixes the theme with #3c32aa instead of the design system's purple glow. Action: fix in code.
- DEV-8: No 360 px or dark-mode capture was delivered. Action: accepted (user, 2026-09-24): no separate design for 360 px, the layout adapts in code; dark mode is the export's own toggle, captured by the user in `perfect-ui-landing-dark.png`. Renders of the export on 2026-09-24 confirm the narrow layout: at 360 px one column, no horizontal scroll, and headline, supporting line, install command and "Get started" inside the first 640 px (REQ-1); dark mode Kept in `handoff/landing/reference/`.
- DEV-9: Section 6's side panel lists `.w-full` as "unlayered" above six `pui.*` layers, the claim disproved on 2026-09-24 (messaging SECTION-6 was corrected). Action: fix in code (T-sh-13): the panel shows the measured layer order, utilities on top, and the guide's two lines (layer order, dark variant).

## Acceptance

- Reference: `docs/design/screens/landing-page/perfect-ui-landing.png` (1280 light) and `perfect-ui-landing-dark.png` (1280 dark), both from the user; renders of the export in `handoff/landing/reference/` (360 light and dark); `docs/design/results/landing/round-1/claude-design/hero-1280.webp`.
- Compare at: 1280 px light and dark, 360 px light and dark, against the references above; states: default final, reduced motion, no JavaScript, copied.
- Tolerances: layout within 4 px at 1280; colours exact library or site tokens; type sizes as the clamps above; every animation's final state equal to the reference.

## Open questions

- OPEN-1 (resolved 2026-09-24): the site pins `@chrissgon/perfectui` 1.0.0-beta.1, released for it with the muted-text fix (user). Blocks: nothing. Recommended: as decided; the size block reads the new measurement at build (3,235 B for `perfectui.css`).

## Readiness

- Ready for eng-architecture: yes.
