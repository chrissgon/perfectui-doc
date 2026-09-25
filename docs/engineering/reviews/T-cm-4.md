# Code review: T-cm-4

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 2bff67c (12 files, +123/-0)
- Intent: T-cm-4 "Collections, schema and fixtures" (`Does:` `content.config.ts` with `docs_v1` and `docs_v0`, prefixes `/docs/v1` and `/docs/v0`, a shared schema; section folders with `.navigation.yml`; button in both versions, chip with `since` in v1 only, an empty section; `Check:` `tests/unit/schema.spec.ts` asserts paths without numeric prefixes and `since` queryable)
- Checks run (2026-09-24): `bun run generate` exit 0 (6 routes); `tests/unit/schema.spec.ts` 5 passed over `.data/content/contents.sqlite`; mutation `since: "2.0"` on the chip failed the test, then restored; `bun run test` exit 0 (11 unit, 3 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The collections match ADR-0001 and the content-model design: paths carry the version, numeric prefixes are stripped, `since`, `changed` and `tags` are columns. The test reads the database the build produces, so it checks what the site will actually query. Two follow-ups for the backlog; no change needed in this diff. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | tests | tests/unit/schema.spec.ts:2 | `import Database from "better-sqlite3";` | Files under `tests/` are outside the tsconfig Nuxt generates (it includes only `tests/nuxt/**`), and `better-sqlite3` has no type package installed, so a test that misuses an API is never type-checked; `bun run typecheck` passes without looking at tests | New backlog task T-cm-21: a `tests/tsconfig.json`, `@types/better-sqlite3` pinned, and `typecheck` covering tests |
| 2 | medium | scope and contracts | content/v0/04.components/03.button.md:1 | `description: Buttons of Perfect UI 0.23.` | The v0 fixture is published at `/docs/v0/components/button` by every build, while the v0 content belongs to release R-2; launching R-1 with it would publish a one-page 0.23 archive | New backlog task T-cm-22 before the R-1 exit: move the v0 fixture into test-only content, or ship the converted v0 pages (roadmap OPEN-1) |

## Checked with no finding

- scope and contracts: `content.config.ts` equals the design's schema and collections; collection names match `app/versions.ts`; folders and titles follow the library's documentation sections.
- quality and maintainability: comments cite ADR-0001 and ADR-0004; fixtures carry valid frontmatter with the design's fields.
- edge cases and robustness: `.navigation.yml` files are indexed as rows of the collection (`/docs/v1/components/.navigation`); the test excludes them; the validator (T-cm-13) and the generators (T-cm-14) must do the same (noted in those tasks).
- regression and performance: 6 routes prerendered; nothing else changes.
- security and data: none involved.
- tests: 5 new tests, seen failing on a mutation.

## Verdict

approve with changes
Follow-ups: #1 (T-cm-21), #2 (T-cm-22)
Next: commit T-cm-4; then T-cm-5 (spike) and T-cm-6, T-cm-7, T-cm-13 in parallel tracks
