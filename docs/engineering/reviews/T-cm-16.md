# Code review: T-cm-16

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 1cf0191 (6 files, +111/-4)
- Intent: T-cm-16 "Build assertions for the authoring promise" (`Does:` tests for AC-9 (a page added as one Markdown file appears in routes, navigation and search), AC-11 (every collection route is a static file, generated files present, no server bundle) and AC-10 at build level (invalid fixtures, and a version with no page, make `nuxt generate` exit non-zero naming each file and cause); `Check:` the test files pass after `bun run generate`)
- Checks run (2026-09-25): `bun run test:slow` 3 passed (full builds of a project copy; the first run failed on a helper bug, see below); `tests/build/static.spec.ts` 2 passed; `bun run test` exit 0 (27 unit, 34 browser); `bun run lint` exit 0; `bun run typecheck` exit 0; temporary copies: 0 left after the run

## Summary

The authoring promise and the build's refusal of bad content are now proven by real builds of a copy of the project, so the tests never touch the working tree; they live in a separate Playwright project (`bun run test:slow`) to keep the default suite at about ten seconds. Writing them found two defects in the test helper itself (a copy filter that dropped `app/pages/docs`, and copies left in the temp folder), both fixed. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | tests | package.json (scripts) | `"test": "vitest run && playwright test --project=chromium"` | The slow build tests are not part of `bun run test`, so a change that breaks validation or the authoring promise passes the everyday suite; nothing runs `test:slow` automatically yet | The CI task (ops-ci-pipeline, not in R-1's backlog) runs `test:slow`; until then run it before each milestone review, which the backlog's milestone checks now say |
| 2 | low | scope and contracts | tests/slow/build-content.spec.ts, tests/helpers/project-copy.ts, playwright.config.ts | `{ name: "slow", testMatch: ["slow/**/*.spec.ts"] }` | File names differ from the design's verification plan (`tests/build/add-page.spec.ts`, `tests/build/validation.spec.ts`) because the full builds need their own project | Record in the commit message |

## Checked with no finding

- scope and contracts: AC-9, AC-10 and AC-11 each have a test; the empty-version case asserts the generator's own message ("search document set is empty for v0"), not a side error.
- quality and maintainability: the copy helper symlinks `node_modules`, skips only top-level build folders, and deletes its copies in `afterAll`.
- regression and performance: default suite unchanged in time; each slow build takes 3 to 5 seconds with the shared cache.
- security and data: copies are made under the OS temp folder and removed.
- tests: 5 new tests.

## Verdict

approve with changes
Follow-ups: #1 (milestone checks; CI later)
Next: commit T-cm-16; milestone CM2 complete; then SH1 and CM3
