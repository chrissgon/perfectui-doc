# Code review: T-cm-12

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 6d474a6 (8 files, +201/-19)
- Intent: T-cm-12 "Example block and callouts, final" (`Does:` Preview and Code tabs with arrow keys, language label, copy control with "Copied" for 1500 ms and selection without clipboard, dot-grid canvas, content scrolling in its box; `Note` and `Warning` callouts; `Check:` tabs by keyboard, copy, a long snippet scrolls without widening the page; no example HTML string under `app/`)
- Checks run (2026-09-24): `tests/e2e/example.spec.ts` 6 passed (five failed before the implementation); `tests/repo/no-inline-examples.spec.ts` 2 passed; `bun run test` exit 0 (21 unit, 22 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The block now matches the approved design's example: tabs with the WAI-ARIA tab pattern, copy with feedback and a selection fallback, a dot-grid canvas, code in the emphasis background. The 360 px test caught a real layout bug outside the component, fixed in the page grid; the repository check was first written too broadly (it flagged template markup) and now scans script code only, with a planted positive case. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | tests | app/components/content/Example.vue (copy fallback) | `if (pre) window.getSelection()?.selectAllChildren(pre);` | The fallback without clipboard access is not covered by a test | Add a test with the clipboard API stubbed to reject when the landing's copy control (T-sh-8) adds the same pattern |
| 2 | low | edge cases and robustness | app/components/content/Example.vue:2–20 | `:hidden="active !== 'code'"` | Without JavaScript the Code tab cannot be opened; the preview and the code are both in the static HTML, and no requirement covers documentation pages without JavaScript | Keep; recorded here |
| 3 | low | scope and contracts | app/pages/docs/[version]/[...slug].vue, content/v1/04.components/03.button.md | `grid-cols-[minmax(0,1fr)]` | Outside `Touches:`: the page grid fix and the fixture's long example and callouts, both needed by the task's checks | Record in the commit message |

## Checked with no finding

- scope and contracts: `Example` keeps the single-slot contract of ADR-0002 and the `data-example*` hooks of the spike; `lang` prop as in the design's interface; callouts register as `::note` and `::warning` (the validator now accepts them).
- quality and maintainability: the timer is cleared on unmount; ids from `useId()`.
- edge cases and robustness: a long line scrolls inside its panel at 360 px (test).
- security and data: `v-html` renders repository Markdown only, as in T-cm-5.
- tests: 6 browser and 2 repository tests.

## Verdict

approve with changes
Follow-ups: #1 (T-sh-8)
Next: commit T-cm-12; then T-cm-11 (layout, headings, pager)
