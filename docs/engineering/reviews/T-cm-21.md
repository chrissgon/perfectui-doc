# Code review: T-cm-21

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit a54768f (4 files +15/-1)
- Intent: T-cm-21 "Type-check the tests" (`Does:` `tests/tsconfig.json`, `@types/better-sqlite3` pinned, `typecheck` covering it; `Check:` a deliberate type error in a test makes `bun run typecheck` exit non-zero, and the current tests type-check)
- Checks run (2026-09-24): planted `const n: number = "not a number"` in `tests/unit/type-probe.ts`: `bun run typecheck` exit 0 before the change, exit 2 after (`TS2322`), file removed; clean `bun run typecheck` exit 0; `bun run lint` exit 0; `bun run test` exit 0 (11 unit, 12 browser)

## Summary

The tests are now type-checked by the same `typecheck` script, and the check was seen failing on a planted error. Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: only `tests/tsconfig.json`, `package.json` (script and one type package) and the lockfile.
- quality and maintainability: the tests config extends Nuxt's, so aliases and auto-import types stay the same.
- regression and performance: `typecheck` runs two passes; both exit 0.
- tests: the planted-error check is the test of this task.
- security and data, edge cases: not involved.

## Verdict

approve
Next: commit T-cm-21; then T-cm-13 (validator)
