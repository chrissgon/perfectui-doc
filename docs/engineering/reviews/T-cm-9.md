# Code review: T-cm-9

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 07b1860 (9 files, +178/-23)
- Intent: T-cm-9 "Navigation and sidebar" (`Does:` `useDocsNav(version)` descending to the `/docs/<version>` node; `DocSidebar` with collapsible sections, current page marked, panel behind a menu control below 1024 px; `Check:` prefix order with `.navigation.yml` titles, URLs without prefixes, empty section absent, panel at 768 px, no file under `app/` lists sections)
- Checks run (2026-09-24): `tests/e2e/navigation.spec.ts` 3 passed (all three failed before the sidebar existed); `tests/repo/navigation-source.spec.ts` 1 passed; `bun run test` exit 0 (19 unit, 15 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

Navigation comes from the folders through one composable, which the version index now uses too, and the sidebar needs no script to open or collapse: sections are `<details>`, the narrow panel is a `popover`. Reading the diff found one real bug, fixed in the change: after a client-side navigation from the narrow panel, the panel stayed open over the new page. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | edge cases and robustness | app/components/DocSidebar.vue (before the fix) | `<NuxtLink :to="item.path" …>` inside `<nav … popover>` | On a narrow screen, choosing a page navigated on the client and left the panel open on top of the new page | Fixed: a watcher on the current path calls `hidePopover()`; the navigation test now clicks a page in the panel and expects the panel hidden (added with the fix, not seen failing first) |
| 2 | low | scope and contracts | content/v1/01.getting-started/01.installation.md, content/v1/05.forms/02.input.md, app/pages/docs/[version]/*.vue | `title: Installation` | Outside `Touches:`: two fixtures give the order test three sections; both pages use the composable | Record in the commit message; the content tasks replace the fixtures' bodies |

## Checked with no finding

- scope and contracts: section titles come only from `.navigation.yml` (repository test); links carry no numeric prefix.
- quality and maintainability: `findNode` moved from the index into `useDocsNav`, as T-cm-7 planned.
- edge cases and robustness: empty sections are dropped; Escape and a click outside close the panel (native popover light dismiss).
- regression and performance: the version index renders the same list through the composable; 19 routes prerender.
- security and data: none involved.
- tests: 4 new tests; three seen failing first.

## Verdict

approve with changes
Follow-ups: #2 (commit message)
Next: commit T-cm-9; then T-cm-10
