# ADR-0006: Code highlighting coloured through CSS variables bound to the role inks

- Status: proposed
- Date: 2026-09-24
- Serves: REQ-10, NFR-3

## Context

Code is highlighted at build time by Nuxt Content's Shiki (REQ-10). The design system decides the colours: tags in the theme ink, attribute names in the warn ink, values and strings in the success ink, punctuation in the muted text, plain text in the text colour, in both modes (design-system OPEN-1, resolved 2026-09-24, from the approved documentation page). The site switches modes with `data-pui-mode` and the reader may change `--pui-theme` at runtime (landing spec REQ-9), so a colour fixed in the generated HTML would not follow either. Shiki offers named themes, a dual-theme mode that emits two colour sets, and a CSS-variables theme whose tokens reference variables (shiki.style, themes; to verify for the Nuxt Content option).

## Options

### Option A: a CSS-variables theme; the site defines `--site-code-tag`, `--site-code-attr`, `--site-code-value`, `--site-code-punct` and `--site-code-text` with `light-dark()` from the role inks
- Consequences: one set of spans in the HTML; mode and theme changes recolour code with no rebuild; colours live next to the other site tokens; depends on Nuxt Content accepting a theme object (to verify; fallback: Option B).

### Option B: Shiki dual themes (a light and a dark named theme)
- Consequences: documented and simple; but the colours are the named themes', not the role inks the design chose, and they would not follow `--pui-theme`.

## Decision

Option A, with B as the fallback if the theme object is rejected.

## Consequences

- `app/assets/css/code.css` holds the five variables; the design-system contrast table gains the five code pairs on `page/bg-emphasis`.
- AC-3 checks that the static HTML carries the highlighted spans; AC-12 checks their contrast through axe.
