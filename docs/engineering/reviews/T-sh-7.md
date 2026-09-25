# Code review: T-sh-7

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 9b4efd7 (11 files: `content/landing.yml`, `content.config.ts`, `shared/landing-copy.ts`, `tests/unit/landing-copy.spec.ts`, `SiteFooter`, `app/versions.ts` and three consumers of the collection type, backlog)
- Intent: T-sh-7 "Landing copy collection" (`Does:` `content/landing.yml` with the nine sections verbatim from messaging and the `landing` data collection; the page fails the build on a missing or extra section id; `Check:` `tests/unit/landing-copy.spec.ts`: every headline of messaging SECTION-1 to SECTION-9 is in the collection verbatim)
- Checks run (2026-09-25): `tests/unit/landing-copy.spec.ts` failed before (module missing), 6 passed after; `bun run generate` exit 0 (the `_content_landing` table holds 1 row); `bun run lint` exit 0; `bun run typecheck` exit 0 after the fix below; `bun run test` exit 0 (39 unit, 53 browser)

## Summary

The landing's copy is now data: nine sections and the tagline, checked word for word against messaging. The headlines, the bodies and the tagline are all compared. Three decisions go beyond a plain copy:
- **Size numbers:** the copy holds size placeholders (`{css.kB}`, `{css.bytes}`, `{js.bytes}`), so no byte count is typed (REQ-2).
- **Links:** calls to action hold unversioned `/docs/…` paths, which the page resolves to the latest version.
- **Footer tagline:** the footer reads its tagline from the collection, closing T-sh-4 finding 2.

Verdict: approve with changes (one medium finding fixed during the review, one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium (fixed) | regression | `app/pages/docs/[version]/[...slug].vue:36` | `const collection = version.collection as keyof Collections;` | Adding a data collection widened `keyof Collections`, so documentation queries typed as the union lost `title` and `description` (typecheck TS2339 in three files). | Fixed: `DocsCollection = Extract<keyof Collections, \`docs_${string}\`>` in `app/versions.ts`, used by the page, `useVersionSwitch` and `_redirects`. |
| 2 | low | scope and contracts | `shared/landing-copy.ts:36` | `export function assertSections(copy: LandingCopy, rendered: readonly string[]): void {` | The check exists and is tested, but the build only fails on a missing or extra section once the landing page calls it. | T-sh-9 calls `assertSections(copy, landingSectionIds)` at setup, so prerendering fails with the ids. |

## Checked with no finding

- scope and contracts: the schema is the design's (`sections` with `id`, `headline`, `body`, optional `cta`, and `tagline`), plus an optional `secondary` link for the hero's second call to action in messaging SECTION-1.
- quality and maintainability: placeholders and link resolution are two pure functions next to the section list.
- edge cases: the migration guide link uses the slug decided in the migration-guide design (`migrating-from-0-23`); the unversioned links match the redirect form of ADR-0005.
- regression and performance: the footer's query is one row from a prerendered collection.
- security and data: copy only.
- tests: headlines and bodies of all nine sections are compared with messaging after filling the measured sizes, and no typed number is allowed.

## Verdict

approve with changes
Next: commit T-sh-7; then T-sh-8 (motion composable and copy command)
