# Code review: T-mg-2

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 74d789d (5 files: `app/components/content/V0.vue`, the fixture installation page, `tests/fixture-site/migration-v0-links.spec.ts`, `tests/build/migration-v0-links.spec.ts`, backlog)
- Intent: T-mg-2 (`Does:` `ProseTable` (scroll box, `pui-table`) and the inline `V0` component; confirm an inline component renders inside a table cell; `Check:` with the v0 button fixture `btn` links to it; without it every name is text; a wide table scrolls in its box at 360 px)
- Checks run (2026-09-25): the fixture site failed to build before (`unknown component "v0"`), the two fixture tests passed after; the production test (no link to `/docs/v0` anywhere) passed; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 128 browser)

## Summary

`:v0{name="btn" to="components/button"}` renders the 0.23 name as code. It links to the v0 page only when that page is in the build, so the fixture site links `btn` and not `chip`, and the production site links nothing while v0 is absent. The design's assumption holds: an inline MDC component renders inside a Markdown table cell. `ProseTable` was already written in T-cm-17 and is covered here with a wide table at 360 px. Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/components/content/V0.vue:12` | `const previous = versions.find((v) => !v.latest);` | The component is named for v0 but targets "the version that is not latest", because the repository test forbids a version id outside `app/versions.ts`. With three versions (v2 latest, v1, v0) it would pick v1. | When a third version is configured, give `V0` an explicit target from the configuration (for example a `previous` field on the latest version). |

## Checked with no finding

- scope and contracts: the props are the design's (`name`, `to`); the rendered name is `<code>`, as class names are elsewhere.
- quality and maintainability: one query per name at prerender, keyed by its target path.
- edge cases: EDGE-1 (a name with no v0 page) and EDGE-2 (no v0 at all) render text with no dead link; EDGE-5 (wide table) scrolls in its box.
- regression and performance: the validator accepts `v0` because the component file registers it.
- security and data: none.
- tests: fixture build (link, text, click-through, scroll box) and production (no v0 link).

## Verdict

approve with changes
Next: commit T-mg-2; then T-mg-3 (diff highlighting)
