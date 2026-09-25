# Code review: T-cm-11

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 33ae03a (8 files, +192/-6)
- Intent: T-cm-11 "Documentation layout, on-page headings and pager" (`Does:` `app/layouts/docs.vue` with three columns at 1280 px and headings as a disclosure below 1024 px, `DocToc` with the current heading highlighted, `DocPager` with previous, next and the edit link; `Check:` columns at 1280, disclosure at 1024, no horizontal scroll at 360, no headings list on a page without h2, pager in navigation order)
- Checks run (2026-09-24): `tests/e2e/doc-layout.spec.ts` 5 passed (three failed before the implementation); `bun run test` exit 0 (21 unit, 27 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The documentation page now has the approved structure: sidebar, reading column of 72 characters, and a sticky headings column from 1280 px, with the headings as a disclosure below it; previous and next follow the navigation order and the edit link points at the source file. Two deviations from the task's letter, both recorded: a `DocLayout` component with named slots instead of a Nuxt layout (a layout receives no page data), and a minimal `app/site.config.ts` created ahead of T-sh-1 for the repository URL. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | scope and contracts | app/site.config.ts:7–8 | `docsBranch: "main",` | The edit link targets `main`, where the rebuilt content does not exist until the `redesign` branch is merged; before the merge every edit link leads to a 404 on GitHub | Keep `main` (the published site is built from it after the merge); T-sh-5's review checks the link on the deploy preview |
| 2 | low | scope and contracts | app/components/DocLayout.vue, app/site.config.ts | `<slot name="toc" />` | Different files from `Touches:` (layout as a component; site configuration created early) | Record in the commit message; T-sh-1 extends `site.config.ts` |
| 3 | low | tests | app/components/DocToc.vue:43–56 | `new IntersectionObserver(` | The current-heading highlight is not covered by a test | Add a scroll assertion to the layout test when the pages have real length (T-cm-18) |

## Checked with no finding

- scope and contracts: breakpoints follow the approved export (sidebar panel below 1024 px, headings column from 1280 px); headings come from `body.toc`, not from a list in code.
- edge cases and robustness: a page without h2 renders neither the column nor the disclosure (test); the pager leaves an empty cell when there is no previous page.
- regression and performance: the observer is created in `onMounted` and disconnected on unmount (no handle at setup, a rule of the project).
- security and data: the edit URL is built from configuration and the file stem only.
- tests: 5 new browser tests.

## Verdict

approve with changes
Follow-ups: #1 (T-sh-5 review on the deploy preview), #3 (T-cm-18)
Next: commit T-cm-11; then T-cm-14 (generated sets)
