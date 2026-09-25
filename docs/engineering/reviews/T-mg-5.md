# Code review: T-mg-5

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 07ff484 (8 files: `tests/e2e/migration-guide.spec.ts`, `tests/quality/{axe,lighthouse}.spec.ts`, `tests/helpers/lighthouse.ts`, `app/components/content/ProsePre.vue`, `Example.vue`, backlog)
- Intent: T-mg-5 (`Does:` Lighthouse, axe and scroll checks at 360 px; the switch to v0 lands on the v0 index with the notice; `Check:` performance ≥ 90, accessibility ≥ 95, 0 violations except the accepted library trade-off, page scroll width equals the viewport)
- Checks run (2026-09-25): axe found `scrollable-region-focusable` on five diff blocks of the guide in both modes, 0 after the fix; `tests/e2e/migration-guide.spec.ts` 2 passed; Lighthouse performance on the guide: single runs 89, 91, 91, then medians of three 89 and 89 (accessibility ≥ 95 throughout); the Button page and the landing pass with medians; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 136 browser, 1 fixme)

## Summary

The guide meets the accessibility and layout bar but not the performance bar. The accessibility and layout checks pass:
- **Axe:** 0 violations in light and dark, after a site-wide fix. Code blocks that scroll sideways are now focusable and named; they were unreachable by keyboard on every documentation page, and only the guide's wide diffs made axe see it. The site's own `ProsePre` does this outside example blocks, and the example's code panel is always focusable.
- **Layout:** no sideways scroll at 360 px, and each of the three tables scrolls in its own box.

Performance fails. Lighthouse's median on the local CDN-like server is 89, against a target of 90. Other levers were tested and did not move it: the smaller Inter file (89–91), and inlined CSS, brotli and a reduced payload, all already in place. The Lighthouse helper now takes the median of three runs, as Lighthouse's documentation recommends for its variance; with the median, the Button page and the landing pass steadily and the guide fails steadily. The guide's test stays in the file, marked `fixme` with the reason, and the task is blocked. EDGE-4's switch to v0 cannot happen on the production site while it has no v0 (the switch control ships in R-2); the rule and its notice are covered on the fixture site. Verdict: request changes (one high finding that needs the user's decision).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high | regression and performance | `tests/quality/lighthouse.spec.ts:24` | `test.fixme("the migration guide scores` | The guide misses NFR-1 (Lighthouse mobile ≥ 90) on the local measurement: FCP 2.8 s under simulated slow 4G; the Nuxt runtime (63 KB brotli), the fonts (96 KB) and the long page's HTML and payload share the link. | Decision for the user: (a) measure on the Netlify deploy preview (needs approval) and accept if the host passes; or (b) a performance task: stop hydrating documentation prose (only example blocks need JavaScript), which would cut the scripts every documentation page loads. |
| 2 | low | edge cases | `tests/e2e/migration-guide.spec.ts:22` | `test("the guide offers no link into a version the build does not have"` | EDGE-4 is checked as "no dead link" on production; the switch itself waits for R-2. | Recheck on the guide when the switch control ships. |

## Checked with no finding

- scope and contracts: the axe exception is the recorded one; the three pages share one quality harness.
- quality and maintainability: `ProsePre` keeps MDC's props, so the example block still reads the snippet from the vnode (all example tests pass).
- edge cases: a code block inside an example is not a second tab stop (the example's panel is).
- regression and performance: quality tests take about a minute longer with medians.
- security and data: none.
- tests: the fixme is visible in every run's summary ("1 skipped").

## Verdict

request changes
Next: the user's decision on the guide's performance; then SR1 (search)
