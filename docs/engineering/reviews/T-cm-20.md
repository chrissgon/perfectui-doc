# Code review: T-cm-20

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 418e160 (8 files: `tests/quality/{axe,lighthouse}.spec.ts`, `tests/helpers/accepted.ts`, `tests/helpers/static-server.mjs`, `nuxt.config.ts`, `public/favicon.svg`, `tests/e2e/mode.spec.ts`, backlog)
- Intent: T-cm-20 (`Does:` Lighthouse mobile and axe on the Button page's static file; `Check:` performance ≥ 90, accessibility ≥ 95, 0 WCAG 2.2 AA violations except the accepted library trade-off: `color-contrast` on the labels of `pui-solid` with `pui-theme`, `pui-success` or `pui-warn` in light mode)
- Checks run (2026-09-25): first Lighthouse run 74 (performance); after the changes below, three runs of `tests/quality` pass (performance 92, 92, 92 in the diagnostic runs; accessibility ≥ 95); axe 0 violations in light and dark once the accepted rule is set aside; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (67 unit, 103 browser)

## Summary

The Button page meets the quality bar. The first measurement (74) was mostly an artefact of the test server:
- **Compression:** it sent every file uncompressed, so Lighthouse's simulated slow 4G downloaded 54 KB of CSS, 196 KB of JavaScript and 64 KB of HTML raw. The server now gzips text as Netlify does (Netlify uses brotli, which is smaller), giving 90–91.
- **Inlined stylesheet:** `features.inlineStyles` puts the CSS into each prerendered page, removing the one render-blocking request (92).
- **Favicon:** the site had none, so every visit fetched `/favicon.ico` and got the 19 KB 404 page; the logo's mark is now an SVG favicon.

The trade-off filter drops only `color-contrast` nodes whose markup has `pui-solid` and one of the three colours, and only in light mode. Verdict: approve with changes (one medium finding, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | regression and performance | `tests/quality/lighthouse.spec.ts:8` | `expect(scores.performance).toBeGreaterThanOrEqual(90);` | The margin is small (92 locally): the remaining cost is simulated bandwidth shared by the fonts (Inter with the optical size axis, 73 KB; Fira Code 23 KB) and 71 KB of the Nuxt and Vue runtime. A heavier page could cross the line. | T-sh-16 measures the landing with the same harness; if either page drops below 90, switch Inter back to the `wght` file first (T-sh-9 finding 2), then look at the runtime chunk. The first Netlify deploy preview measures the real host. |
| 2 | low | scope and contracts | `nuxt.config.ts:10` | `features: { inlineStyles: true },` | Inlining makes each page carry its CSS (Button page HTML 119 KB raw, 34 KB gzip) instead of caching one stylesheet across pages. | Accepted: first visits dominate a documentation site's entry pages; revisit if the multi-page navigation cost matters. |

## Checked with no finding

- scope and contracts: the check is the task's (Button page, mobile Lighthouse, axe with WCAG 2.2 AA tags); the exception is exactly the one recorded in the state file and PRD M-4.
- quality and maintainability: the exception lives in one helper with a comment naming its source; the static server's compression mirrors the host's behaviour and is documented at the top of the file.
- edge cases: axe runs in light and dark; in dark mode no exception applies. The mode script still precedes every stylesheet, now inline `<style>` blocks (the test's pattern was widened to them, not weakened).
- regression and performance: all suites pass; the favicon link removes a 404 on every page.
- security and data: none.
- tests: three consecutive quality runs.

## Verdict

approve with changes
Next: commit T-cm-20 (milestone CM3 complete); then T-sh-11 (overlays showcase from the named examples)
