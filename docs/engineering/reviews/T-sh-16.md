# Code review: T-sh-16

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 41277ce (14 files: quality tests, `playwright.config.ts`, `package.json`, `tests/helpers/static-server.mjs`, `ExampleRef`, `ProseH2`, `ProseH3`, three landing sections, `tests/e2e/hydration.spec.ts`, `tests/e2e/showcase.spec.ts`, backlog)
- Intent: T-sh-16 (`Does:` Lighthouse mobile and axe on `index.html`; `Check:` performance ≥ 90, accessibility ≥ 95, 0 WCAG 2.2 AA violations except the accepted library trade-off)
- Checks run (2026-09-25): axe on the landing found 3 then 4 violations before the fixes, 0 after, in light and dark; Lighthouse on the landing 89–91 before, 90–92 after on the CDN-like server; the new hydration test fails on three pages without the heading fix (removed, run, restored) and passes with it; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 twice (67 unit, 124 browser, quality project included); `bun run test:slow` 4 passed

## Summary

The landing meets the accessibility bar. Performance is at the bar with little margin. Measuring well exposed one real defect, fixed here.
1. **Hydration mismatch (fixed).** On every documentation page, the h2 headings were rebuilt as h3 after hydration: "Hydration completed but contains mismatches", 8 h2 → h3 on the Button page. The fonts, the table of contents styles and every heading assertion were then wrong for a reader with JavaScript. The server and the payload hold `h2`; the client's MDC renderer resolved the prose heading components to another level. The site now ships its own `ProseH2` and `ProseH3`, which render the tag they name, and a hydration test covers five pages.
2. **Accessibility (fixed).** Two scrolling code blocks, the Tailwind layer order and the CDN snippet, were not reachable by keyboard; they are focusable with a name. The mode demo opened dark with `#7c3aed`, where the library labels solid fills in black: 3.2:1, a real failure, not the accepted trade-off. It now opens light with the same colour (white label, 5.7:1), and the reader can still switch.
3. **Measurement made honest.** The test server now serves brotli as Netlify does, compressed once and kept in memory like a CDN. Compressing on each request had given a misleading 99, because Lighthouse's simulation reads observed server timings. Quality tests run in their own project after the others, one at a time. `ExampleRef` now stores only its example in the landing's payload, not four full pages.

Verdict: approve with changes (one high finding: the margin, which only the host can settle).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high | regression and performance | `tests/quality/lighthouse.spec.ts:16` | `expect(scores.performance).toBeGreaterThanOrEqual(90);` | Locally both pages score 90–92: the Nuxt and Vue runtime (63 KB brotli) and the fonts (120 KB, Inter with the optical axis included) share the simulated 4G link. Switching Inter back to `wght` did not change the score, so the fonts are not the lever. A run can fall to 89 under load. | Run the first Netlify deploy preview and measure it with PageSpeed Insights (needs the user's approval). If the host confirms about 90, the next levers are fewer modulepreloaded chunks and lighter fonts (drop Fira Code 500). |
| 2 | medium | quality and maintainability | `app/components/content/ProseH2.vue:2` | `<!-- The site's own heading: MDC's ProseH2 rendered as another level after hydration (T-sh-16). -->` | The root cause inside the content module's renderer is not identified; the site works around it for h2 and h3 (the only levels the documentation uses). An h4 would need the same component. | Keep the hydration test; report the behaviour upstream with a reproduction when time allows. |
| 3 | low | scope and contracts | `app/components/landing/ModeThemeDemo.vue:67` | `const dark = ref(false);` | The export opened section 5 in the inverse of the page's mode; the section now opens light, for contrast. | Recorded here; the design deviation is the accessibility requirement's. |

## Checked with no finding

- scope and contracts: the axe exception is the recorded one; both pages, both modes.
- quality and maintainability: the test server's behaviour is documented at the top of the file; the payload reduction keeps `ExampleRef`'s build failure on a missing name.
- edge cases: the showcase test follows the demo's new default (light, then switched to dark).
- regression and performance: quality tests depend on the other projects, so they run last and alone.
- security and data: none.
- tests: the hydration test would have caught the heading defect; it was proven by removing the fix.

## Verdict

approve with changes
Next: commit T-sh-16 (milestone SH3 complete but for the migration CTAs, which wait for T-mg-1); then MG1 (T-mg-1 to T-mg-5)
