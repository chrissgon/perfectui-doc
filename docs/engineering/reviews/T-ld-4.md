# Code review: T-ld-4

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree after e89919c (`server/routes/_redirects.get.ts`, `shared/validate-docs.ts`, `tests/fixture-site/routes.spec.ts`, `tests/unit/validate-docs.spec.ts`, ADR-0005 amendment)
- Intent: T-ld-4 "Redirects without the 0.23 flat URLs" (Delivers REQ-11, AC-7)
- Checks run: lint exit 0; typecheck exit 0; `bun run test` 77 unit passed and 178 of 179 browser passed; the failure was the landing's local Lighthouse case at 89, which passed on the rerun (the known 89/90 boundary, recorded in the user-review follow-ups); the generated `_redirects` has 3 lines

## Summary
`_redirects` now has one forced rule per documented major's index, `/docs` to the latest major's first page, and the unversioned splat. The one rule per page for the 0.23 site's flat URLs is gone, and so is the validation warning about repeated slugs, which existed only because of those rules.
Verdict: approve.

## Findings
None.

## Perspectives without a finding
- Scope and contracts: the three kept rules are the ones the spec keeps (REQ-11); ADR-0005 carries an amendment line rather than a rewrite.
- Regression: `tests/e2e/trailing-slash.spec.ts` and the route rules still send `/docs/v1` to the first page; the fixture site's `v0` index rule is still written.
- Tests: the route test asserts that no flat rule remains and counts the rules; the validation test now asserts that a repeated slug gives no warning.
- Quality: the handler no longer queries the collection, so the route does less work.
