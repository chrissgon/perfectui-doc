# Code review: T-mg-1

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 4b1ba78 (10 files: `content.config.ts`, `shared/validate-docs.ts`, `server/utils/assertValidDocs.ts`, `DocHeader.vue`, the documentation page, the fixture installation page, `tests/unit/validate-docs.spec.ts`, `tests/fixture-site/range.spec.ts`, `tests/slow/build-content.spec.ts`, backlog)
- Intent: T-mg-1 (`Does:` optional `from` and `to` in the schema, the validator rule against the installed package, the range line in `DocHeader`; `Check:` a mismatched `to` fails naming the file and both versions; a matching one shows "applies to 0.23.0 → 1.0.0-beta.1")
- Checks run (2026-09-25): `tests/unit/validate-docs.spec.ts` 2 failed before, 10 passed after; `tests/fixture-site/range.spec.ts` passed; `bun run test:slow` 5 passed (a real build with `to: 1.0.0` fails naming the file and both versions); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 125 browser)

## Summary

A page can now declare the range it applies to. The build compares `to` with the installed `@chrissgon/perfectui` version and fails on a mismatch, naming the file and both versions. A `from` that is not a version also fails. The header shows "Applies to 0.23.0 → 1.0.0-beta.1" under the description. The files differ slightly from `Touches:`: the rule lives in `shared/validate-docs.ts`, where the validator is (the design named `server/utils/validateDocs.ts`), and the installed version is read by its server wrapper. Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: the schema fields are optional strings; the message format is the design's (file, `to`, installed version).
- quality and maintainability: the library version is passed in as an option, so the unit tests do not depend on `node_modules`.
- edge cases: a page without a range shows no line (asserted on the fixture button page).
- regression and performance: one extra file read per build.
- security and data: none.
- tests: unit (match, mismatch, bad `from`), fixture render and a full build.

## Verdict

approve
Next: commit T-mg-1; then T-mg-2 (the v0 inline link; the table wrapper exists since T-cm-17)
