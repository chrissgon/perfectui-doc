# Code review: T-sr-2

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit d96de4a (5 files: `shared/search-query.ts`, `shared/search-options.ts`, `app/composables/useSearch.ts`, `tests/unit/search-ranking.spec.ts`, backlog)
- Intent: T-sr-2 (`Does:` `useSearch` (load once per version, query preparation, top 10, snippets with `<mark>`); `Check:` over the built index: "moda" finds Modal, "tooltpi" finds Tooltip, "mdl" does not fuzz, title outranks body; punctuation-only is empty; 250 characters are cut to 200)
- Checks run (2026-09-25): `tests/unit/search-ranking.spec.ts` failed first (module missing), then 2 of 8 (the transposition typo; "accordion" ranked the migration guide's "Accordion" section first), then 8 passed; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (78 unit, 137 browser, 1 fixme)

## Summary

Search logic is pure and tested over the real index, in `shared/search-query.ts`:
- **Query preparation:** trim, collapse spaces, cut to 200 characters, and treat punctuation only as empty.
- **Results:** the top 10.
- **Snippets:** about 120 characters starting 40 before the first match, HTML-escaped, with the matched terms in `<mark>`.

`useSearch` loads a version's index on first use, with MiniSearch imported dynamically so it stays out of the pages' bundle. It keeps the index for the page's lifetime, forgets a failed load so Retry fetches again, and re-runs the query when the version changes. Two ranking rules were added to meet the check:
- **Transpositions:** a swap of two neighbouring characters is one typo for a reader but two Levenshtein edits, so words of four characters or more also search their transposed variants, exact only.
- **Page before sections:** every section of a page carries the page title, which lowers the title's weight in BM25, so a page's opening section gets a 1.5 boost.

Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | regression and performance | `shared/search-query.ts:55` | `export function transpositions(query: string): string[] {` | A long query adds n−1 variants per word; at the 200-character cap that is about 200 extra exact lookups, cheap for this index but not measured yet. | T-sr-5's latency test (95th percentile under 100 ms at 4× throttling) covers it. |

## Checked with no finding

- scope and contracts: the options stay the design's (prefix, fuzzy from four characters, title 3, heading 2); the two additions are documented at their definitions.
- quality and maintainability: the composable holds only loading and state; everything testable is in `shared/`.
- edge cases: EDGE-3 and EDGE-4 are asserted; snippet text is escaped (a page's `<dialog>` appears as text, asserted).
- regression and performance: the index loads once per version and page; no request per keystroke.
- security and data: the snippet is built from escaped text, so it can be rendered with `v-html` safely.
- tests: prefix, typo, no fuzz on short words, title ranking, limit, marks, escaping, preparation.

## Verdict

approve with changes
Next: commit T-sr-2; then T-sr-3 (search button and shortcuts)
