# Code review: T-sr-5

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit b77770f (6 files: `tests/quality/search-latency.spec.ts`, `tests/quality/search-size.spec.ts`, `tests/quality/axe.spec.ts`, `SearchDialog.vue`, backlog)
- Intent: T-sr-5 (`Does:` latency under 4× CPU throttling, first-open size, axe with the dialog open; `Check:` 95th percentile under 100 ms over 20 queries; first-open files at most 300 KB with `gzip -9 -n`; 0 violations except the accepted library trade-off)
- Checks run (2026-09-25): latency p95 17.0 ms, max 17.2 ms (one animation frame; the search itself is below it); first open 45,409 B with `gzip -9 -n` (`api/search/v1.json` 36,233, the dialog chunk 5,694, MiniSearch 3,167, dialog CSS 315); axe with the dialog open failed in both modes before the fixes (snippet contrast on the selected item, an unfocusable scrolling list), 0 after; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (79 unit, 157 browser, 3 skipped); `bun run test:slow` 5 passed

## Summary

Search meets its three measurable targets with wide margins:
- **Latency:** results render within one frame of input under 4× CPU throttling.
- **Size:** a first open downloads about 45 KB compressed, against the 300 KB budget.
- **Accessibility:** axe finds nothing with the dialog open and results showing, in either mode.

Axe first found two real problems, now fixed:
- **Selected snippet contrast.** The selected result's snippet was muted text on the theme tint. Snippets now use the design system's AA muted ink, and the text colour on the selected item.
- **Unfocusable list.** The results list scrolls but could not take focus, so it is now focusable. The keys still work from the input through `aria-activedescendant`.

Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: the three checks are the design's AC-8, AC-9 and AC-10, with the budgets unchanged.
- quality and maintainability: the latency test measures from the input event to the DOM change plus a frame, in the page, with throttling through the DevTools protocol.
- edge cases: the size test counts only files requested after load, so the page's own chunks do not inflate it.
- regression and performance: the quality project runs these after the other tests, one at a time.
- security and data: none.
- tests: the three measurements print their numbers in the run log.

## Verdict

approve
Next: commit T-sr-5 (milestone SR1 complete; release R-1 complete but for T-mg-5, which waits for the deploy preview)
