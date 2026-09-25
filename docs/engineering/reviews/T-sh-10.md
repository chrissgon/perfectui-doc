# Code review: T-sh-10

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 16af241 (7 files: `app/components/landing/SizeChart.vue`, `app/pages/index.vue`, `app/assets/css/main.css`, `nuxt.config.ts`, `tests/build/library-size.spec.ts`, `tests/e2e/size-chart.spec.ts`, backlog)
- Intent: T-sh-10 "Size chart" (`Does:` `SizeChart` from the library size JSON and the static competitors' list; bars and counters per the handoff; footnote with method and version; `Check:` `tests/build/library-size.spec.ts` (extended): the numbers in the HTML equal the JSON; "gzip" and the version in the same block)
- Checks run (2026-09-25): the extended build test failed before (no `#size` section), passed after; `tests/e2e/size-chart.spec.ts` 3 passed (its inverse-band case failed until the CSS target fix below); `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 68 browser); screenshots at 1280 light and 360 dark compared with the export

## Summary

Section 2 of the approved export is live:
- **Content:** headline and body from the copy, with the measured numbers filled in.
- **Rows:** perfectui's row comes from `api/library-size.json`, the five others from `app/data/competitors.ts`, with bars and counters on the handoff's timings.
- **Footnote:** "gzip -9 -n of the published builds; perfectui measured at build from version 1.0.0-beta.1, others on 2026-09-23", the ADR-0007 wording.

The inverse band exposed a site-wide defect that is now fixed. The CSS pipeline was rewriting `light-dark()` into values resolved once on `:root`. That made every mode scoped below `<html>` impossible. Verdict: approve with changes (one medium finding fixed in the change, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium (fixed) | regression | `nuxt.config.ts:27` | `build: { cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"] },` | Tailwind's optimizer and Vite 8's CSS minifier, both LightningCSS, lowered the library's `light-dark()` for their default targets into `--lightningcss-*` variables computed on `:root`. A `data-pui-mode` or `color-scheme` on any inner element then changed nothing: the inverse bands of sections 2 and 7, the section 5 demo, and any mode set on an element below `<html>`. | Fixed: Tailwind's optimizer is off, Vite minifies, and the CSS target is the first versions with native `light-dark()`, which the library already requires. The entry CSS has no `lightningcss` variable left and shrank from 50.7 KB to 48.8 KB (raw). |
| 2 | low | edge cases | `app/components/landing/SizeChart.vue:73` | `elapsed.value = 0;` | With motion allowed, the bars empty at mount and grow when the chart enters the view. A reader who scrolls there before hydration may see the full chart empty for a moment. | None: it is the handoff's "reset when it enters the viewport" for a section below the fold. |

## Checked with no finding

- scope and contracts: the component's props are the design's contract, less `others`: the competitors come from `app/data/competitors.ts`, the file the design names. perfectui's name uses the site's theme ink, as the handoff's token table says.
- quality and maintainability: the inverse band is one global class (`site-inverse`) that section 7 reuses; it follows a cookie mode and the system mode with CSS only.
- edge cases: below 720 px each bar moves to its own line under the name (handoff layout); reduced motion and the server show full bars and exact numbers.
- regression and performance: the full suite passes after the CSS target change, including the code colours and mode tests; the animation uses `requestAnimationFrame` only after mount and cancels on unmount.
- security and data: static data.
- tests: the static HTML is compared with the JSON (bytes, split, total, version, method); the animation's end state, reduced motion and the band's inversion under light, dark and a stored cookie run in the browser.

## Verdict

approve with changes
Next: commit T-sh-10 (milestone SH2 complete); then T-sh-11 (overlays showcase, which needs T-cm-18) or T-sh-12 (class picker)
