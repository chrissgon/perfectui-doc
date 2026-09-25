# Code review: T-cm-14

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 4dfb1c6 (8 files, +179/-1)
- Intent: T-cm-14 "Search document set and assistant corpus" (`Does:` the two prerendered routes of ADR-0003, validator first, one entry per heading section with `version` and `url`, skipping `/.navigation` rows; empty sets throw; `Check:` both files exist, entries carry `version` and `url`, corpus entries `level` and `titles`; an empty version fails the build)
- Checks run (2026-09-24): `tests/unit/search-set.spec.ts` 3 passed (failed before the module existed); `tests/build/artifacts.spec.ts` 3 passed; 10 entries in each file; `bun run test` exit 0 (24 unit, 30 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The two sets come from one query per version, shaped by pure functions that are unit-tested, including the empty case. Probing the real query output before writing the code found that the rendered body's highlighting CSS was indexed as text; the routes pass `ignoredTags: ["style"]` and the build test asserts no CSS reaches the corpus. `.navigation` rows do not appear in the query's output, so no filter was needed. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | quality and maintainability | server/utils/docSections.ts:22–30 | `const isSection = item.path.split("/").length === 4;` | The section of a page is found by path depth, which assumes the `/docs/<version>/<section>/<slug>` shape; a nested subsection folder would get the wrong section title | Keep (the URL scheme is fixed by decision); revisit if the content ever nests deeper |
| 2 | low | tests | shared/search-set.ts (empty case) | `throw new Error(\`[docs] search document set is empty for ${version.id}\`)` | The build-level failure for an empty version is covered by the unit test of the throw, not by a build run; T-cm-16 adds the build-level validation test and can include this case | Add to T-cm-16 |

## Checked with no finding

- scope and contracts: entry shapes follow the design's contract, with `heading` added for the search dialog's result item (search design); both routes are in `nitro.prerender.routes` and call `assertValidDocs()` first (ADR-0003).
- edge cases and robustness: v0 with one page produces its entries; section titles come from the navigation, not from code.
- regression and performance: 20 routes prerender; each file is a few kilobytes with the fixtures.
- security and data: the files hold only the documentation's own text.
- tests: 3 unit and 3 build tests.

## Verdict

approve with changes
Follow-ups: #2 (T-cm-16)
Next: commit T-cm-14; then T-cm-15 (version switch) and T-cm-16 (build assertions)
