# Code review: T-sh-15

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 6622a60 (7 files: `tests/e2e/no-js.spec.ts`, `tests/build/no-unshipped.spec.ts`, `tests/helpers/hydrated.ts`, `tests/e2e/showcase.spec.ts`, `tests/e2e/landing-migration.spec.ts`, `app/components/SiteHeader.vue`, backlog)
- Intent: T-sh-15 (`Does:` tests for JavaScript disabled, 320 px width and unshipped features; `Check:` with JavaScript off every text, link and the command are visible and calls to action navigate; no horizontal scroll at 320 px; no "assistant", "ChatGPT" or "soon" in the output)
- Checks run (2026-09-25): the 320 px case failed before the fix (landing 321 px wide); `tests/e2e/no-js.spec.ts` 3 passed; `tests/build/no-unshipped.spec.ts` 4 passed; the two landing interaction files passed five runs in a row after the hydration wait; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 twice (67 unit, 116 browser)

## Summary

The landing is checked for robustness:
- **Without JavaScript:** every section's heading, every link and the install command are visible, there is no copy control, and "Get started" and "See the components" navigate.
- **At 320 px:** neither the landing nor two documentation pages scroll sideways. The header had been 1 px too wide, and its group spacing is now tighter below 640 px.
- **Unshipped features:** the landing text and the documentation header and footer never name an assistant, ChatGPT or "soon"; there is no search entry point while search is off.

The change also closes two promises from earlier reviews:
- **Section ids:** the copy's section ids and the page's rendered sections are the same list, in order (T-sh-9, finding 4).
- **Calls to action:** every CTA of the copy renders, except the migration guide's two, listed as pending until T-mg-1. The list is a ratchet: the test fails when a pending page appears, so the entry must be removed.

The full suite exposed two flaky landing tests that interacted before hydration; they now wait for it. Verdict: approve with changes (one medium finding, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | tests | `tests/build/no-unshipped.spec.ts:57` | `const pending: Record<string, string> = { "/docs/getting-started/migrating-from-0-23": "T-mg-1" };` | The release is not ready while this list is non-empty: the landing's "Migrating from 0.x" and "Read the migration guide" are hidden. | T-mg-1 writes the guide and removes the entry; the test fails until it does. |
| 2 | low | tests | `tests/helpers/hydrated.ts:8` | `export async function landingHydrated(page: Page) {` | The wait uses a landing element, so it does not apply to documentation pages; interaction tests there have been stable, but the same race exists (T-cm-19, finding 1). | Reuse the pattern on documentation pages if a test starts to flake. |

## Checked with no finding

- scope and contracts: AC-6 is checked on the landing and on the shell of a documentation page, not on documentation prose (the checkbox page's "as soon as" is legitimate); AC-12 without JavaScript, EDGE-2 at 320 px.
- quality and maintainability: the pending list names the task that resolves each entry.
- edge cases: the header's controls still fit at 320 px with the narrow spacing; the shell tests pass.
- regression and performance: none; one class changed in the header.
- security and data: none.
- tests: the hydration wait removed the only flakes seen (tooltip focus, tab arrow keys).

## Verdict

approve with changes
Next: commit T-sh-15; then T-sh-16 (landing quality)
