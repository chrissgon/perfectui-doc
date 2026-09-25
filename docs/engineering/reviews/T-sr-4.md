# Code review: T-sr-4

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit ec4b105 (10 files: `SearchDialog`, `SearchButton`, `shared/search-query.ts`, `tests/helpers/search.ts`, four `tests/e2e/search-*.spec.ts`, `tests/unit/search-ranking.spec.ts`, backlog)
- Intent: T-sr-4 (`Does:` `SearchDialog` on `pui-modal`: states (empty, loading, results, no results, unavailable with Retry), result items, keyboard, live region, full screen below 640 px, re-filter on version change; `Check:` `search-results`, `search-keyboard`, `search-states`, `search-version` pass; only the site's static files are requested)
- Checks run (2026-09-25): the four files failed before (7 of 9), passed after; a hover-then-Enter case was added after reading the diff; Lighthouse on the landing dropped to 89 with the dialog in every page's bundle and returned to passing once it loads lazily; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (79 unit, 153 browser, 3 skipped); screenshot of the dialog with results

## Summary

The dialog is the approved export's, working:
- **Results:** grouped by page, each with its section heading and an escaped snippet with the matches marked.
- **States:** an empty input shows the input only; then loading, "No results for 'xyz'", and "Search is unavailable" with a Retry that fetches again.
- **Keyboard:** the arrows move through the displayed order, Enter opens, Escape closes and returns focus to the button, and a polite live region announces "n of m: page, section".
- **Layout:** full screen below 640 px.
- **Requests:** only `api/search/v1.json` and the site's chunks.

Two defects were found and fixed during the task:
- **Hover then Enter.** The pointer and the keys used two different indexes, so a hover followed by Enter could open another result. There is now one index, with a test.
- **Landing performance.** The dialog was in every page's bundle, which cost the landing its Lighthouse margin (89). It now mounts on first open as its own chunk (`LazySearchDialog`), with MiniSearch already loaded dynamically.

Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | quality and maintainability | `app/components/SearchDialog.vue:38` | `<span class="search-snippet text-[13px] leading-normal" style="color: var(--pui-text-muted)" v-html="item.result.snippet" />` | Snippets often show code text from examples ("<dialog class=…"), because the index holds each section's full text, code included. It helps a reader looking for markup but is noisy for prose queries. | Keep for 1.0; if readers find it noisy, index code blocks separately with a lower weight. |

## Checked with no finding

- scope and contracts: the states, keyboard hints and full-screen layout are the handoff's; the version searched follows the page (REQ-4, asserted on the landing and a v1 page).
- quality and maintainability: one selection index for pointer, arrows and Enter; the snippet's `v-html` renders text escaped in `shared/search-query.ts`.
- edge cases: a punctuation-only query shows neither results nor "No results"; an aborted index load shows the unavailable state and Retry recovers (asserted with a routed failure).
- regression and performance: the dialog chunk loads on first open; all three quality pages pass Lighthouse again.
- security and data: snippet text is escaped before marks are added.
- tests: results, anchor navigation, keys, live region, focus return, all states, full screen, version.

## Verdict

approve with changes
Next: commit T-sr-4; then T-sr-5 (latency, first-open size, axe with the dialog open)
