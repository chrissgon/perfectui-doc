# Code review: T-mg-4

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 5656f57 (8 files: the guide page, `tests/build/migration-headings.spec.ts`, `tests/build/no-unshipped.spec.ts`, `tests/repo/content-sources.spec.ts`, the migration spec and design, backlog)
- Intent: T-mg-4 (`Does:` `content/v1/01.getting-started/04.migrating-from-0-23.md` from `MIGRATION.md`, tables with `:v0`, the diff blocks, `changed: "1.0"`; the heading sync test; `Check:` the page is in the getting-started navigation; its h2 sequence equals `MIGRATION.md` at the pinned tag; the diff blocks render)
- Checks run (2026-09-25): `bun run generate` exit 0 (the validator checked `to: 1.0.0-beta.1` against the installed library); `tests/build/migration-headings.spec.ts` 3 passed; `tests/build/no-unshipped.spec.ts` failed once, as designed, because the migration CTAs now render, and passed after removing the pending entry; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 132 browser)

## Summary

The guide is the library's `MIGRATION.md` at `v1.0.0-beta.1`, which is identical to the library's current file:
- **Frontmatter:** navigation title "Migrating from 0.x", the opening paragraph as description, range 0.23.0 → 1.0.0-beta.1, "Changed in 1.0".
- **Links:** GitHub document links rewritten to site paths.
- **v0 names:** each first 0.23 name in the components table links to its v0 page when that page exists (`:v0`), plain code today.

The heading test reads the source at the tag from the library checkout, or from GitHub, so the page cannot drift silently. The landing's two migration calls to action now render, and the landing test follows the link into the guide. Verdict: approve with changes (two low findings).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `tests/build/migration-headings.spec.ts:36` | `expect(blocks).toBe(11);` | The specification, the design and the backlog said nine diff blocks; the source has eleven (two in section 1, two in section 5). The documents were corrected; the test counts from the source and pins eleven to notice a change of the guide. | None further. |
| 2 | low | scope and contracts | `content/v1/01.getting-started/04.migrating-from-0-23.md:165` | `- No `loadFunctions()` after rendering. Components inserted at any time work,` | The guide says every component works when inserted later; the `indeterminate` fallback does not (library item recorded on 2026-09-25). The page must match the library's text, so the correction belongs to the library. | Fix the fallback or the sentence in the library; the heading test will not notice a prose edit, so recopy the section when the library changes (EDGE-6). |

## Checked with no finding

- scope and contracts: `from`, `to` and `changed` match the design's frontmatter; the page sits at the design's URL; sections 3 and 7 keep their tables as in the source (their first column has no v0 page to link).
- quality and maintainability: the conversion was mechanical from the tag; the heading test documents where the source comes from.
- edge cases: the tables scroll in their boxes (T-mg-2); the diff blocks use the inks of T-mg-3.
- regression and performance: the CTA ratchet of T-sh-15 behaved as intended.
- security and data: none.
- tests: the h2 sequence, the diff block count, the navigation order, the range and the badge.

## Verdict

approve with changes
Next: commit T-mg-4; then T-mg-5 (quality checks on the guide)
