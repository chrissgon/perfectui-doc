# Code review: T-cm-13

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 4fdeb40 (7 files, +230/-1)
- Intent: T-cm-13 "Content validator" (`Does:` `server/utils/validateDocs.ts` for EDGE-2, EDGE-3, EDGE-4, EDGE-6 as failures and EDGE-9 as a warning, messages naming file and cause; skip `/.navigation` rows; one fenced block per `::example`; warn on a slug repeated across sections; `Check:` `tests/build/validation.spec.ts`: invalid fixtures make `nuxt generate` exit non-zero naming each file and cause; a broken link only warns)
- Checks run (2026-09-24): `tests/unit/validate-docs.spec.ts` 7 passed (failed before the module existed); manual build proof: a file without `title` and with `::tabs` made `bun run generate` exit 1 printing both causes with the file, then the file was removed and the build passed; `bun run test` exit 0 (18 unit, 12 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The validator reads the Markdown sources, because Nuxt Content derives a title from the first heading and the schema can never see a missing `title`; it is a pure function in `shared/`, unit-tested rule by rule, wrapped by a server utility that the first prerendered artifact calls, so bad content stops `nuxt generate`. Two deviations from the task's letter: the logic lives in `shared/validate-docs.ts` with a thin wrapper in `server/utils/assertValidDocs.ts`, and the build-level check was run by hand instead of as `tests/build/validation.spec.ts`. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | tests | tests/unit/validate-docs.spec.ts:1 | the task's Check names `tests/build/validation.spec.ts` running `nuxt generate` | AC-10 asks for the build to exit non-zero; that was proven by hand once, not by a repeatable test, so a later change to the wiring (for example removing the call from `_redirects`) would not be caught | Add the build-level test to T-cm-16: generate a copy of the project with the invalid fixtures and assert the exit code and the messages |
| 2 | low | scope and contracts | shared/validate-docs.ts, server/utils/assertValidDocs.ts, package.json | `"yaml": "2.9.1"` | Files and one dependency differ from `Touches:`: the rules are pure and testable in `shared/`; `yaml` (already installed transitively, latest version) parses the frontmatter | Record in the commit message |

## Checked with no finding

- scope and contracts: every rule of the design's validation table is implemented, plus the two rules the T-cm-5 and T-cm-8 reviews added; messages start with the file relative to `content/`.
- edge cases and robustness: fenced code is skipped when scanning for components (test); inline components (`:name{`) are checked; a file without frontmatter reports both missing fields.
- regression and performance: validation runs once per build (module flag) and adds no measurable time to 17 routes.
- security and data: reads only `content/` and `app/components/content/` under the project root.
- tests: 7 unit tests, one per rule, each seen passing after failing on the missing module.

## Verdict

approve with changes
Follow-ups: #1 (T-cm-16), #2 (commit message)
Next: commit T-cm-13; then T-cm-9, T-cm-10, T-cm-14, T-cm-15
