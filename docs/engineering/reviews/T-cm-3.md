# Code review: T-cm-3

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 9b04bf3 (3 files, +81/-0)
- Intent: T-cm-3 "Versions configuration" (`Does:` `app/versions.ts` with v1 latest and v0 deprecated, and a check that exactly one version is latest; `Delivers:` REQ-5, AC-5; `Check:` version ids only in `app/versions.ts`; a fixture without a latest version fails naming the file)
- Checks run (2026-09-24): `bun run test` exit 0 (6 unit tests, 3 browser tests); `bun run lint` exit 0; `bun run typecheck` exit 0; mutation: a planted `"v1"` in `app/probe.ts` failed the repository test naming the file, then the file was removed

## Summary

The configuration and its guard match the design's contract (`id`, `label`, `collection`, `latest`, `deprecated`; prefix derived as `/docs/<id>`), and the test was seen failing before the module existed and failing again on a planted literal. No findings. Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: only the two planned files plus the backlog status line; the shape equals the content-model design's versions configuration, with the prefix computed by `versionPrefix` instead of stored, so it cannot disagree with the id.
- quality and maintainability: `pickLatest` is pure and exported for the test; `latestVersion` is computed once at import, so a broken configuration fails the build at the first import (EDGE-8 of the landing spec).
- edge cases and robustness: zero and two latest versions both throw with `app/versions.ts` in the message (two tests).
- regression and performance: nothing consumes the module yet; T-cm-4, T-cm-7 and T-cm-8 will.
- security and data: none involved.
- tests: 4 new tests, none skipped; the repository scan covers `app/`, `server/`, `shared/` and `nuxt.config.ts`.

## Verdict

approve
Next: commit T-cm-3; then T-cm-4
