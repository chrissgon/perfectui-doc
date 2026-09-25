# Code review: T-sh-14

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit ab25020 (6 files: `MigrationCallout`, `InstallTabs`, `app/pages/index.vue`, `tests/e2e/landing-migration.spec.ts`, `tests/e2e/copy.spec.ts`, backlog)
- Intent: T-sh-14 "Migration callout and install tabs" (`Does:` `MigrationCallout` (diff line, link to the guide) and `InstallTabs` (npm, yarn, pnpm, bun; CDN snippet pinned from configuration; copy controls); `Check:` `tests/e2e/landing-migration.spec.ts`: the guide link is visible before the end of the showcase and opens the guide; tabs by arrow keys)
- Checks run (2026-09-25): `tests/e2e/landing-migration.spec.ts` 4 failed and 1 passed before, 5 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 80 browser); no horizontal scroll at 360 px; screenshots of both sections at 1280 px

## Summary

Sections 8 and 9 are live, so every landing section except the overlays (T-sh-11) is now on the page:
- **Migration:** the diff shows the 0.23 classes rendering nothing next to their 1.0 replacement.
- **Install:** the tabs change the command and move with the arrow keys.
- **CDN snippet:** pinned to the installed version, with its own copy control.

The check's guide half cannot pass yet, because the guide is written in T-mg-1. Verdict: approve with changes (one high finding that waits on another task, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high (blocked by T-mg-1) | tests | `tests/e2e/landing-migration.spec.ts:21` | `if (!guideBuilt) {` | AC-4 ("following it opens the migration guide") cannot be proven until the guide exists; today the test proves only that no dead link is rendered, and both "Migrating from 0.x" and "Read the migration guide" are hidden. | The same test switches to the full assertion once `migrating-from-0-23` is in the build. T-sh-15 must fail the release while any landing CTA is missing, so the release cannot ship with the conditional branch taken. |
| 2 | low | scope and contracts | `app/components/landing/InstallTabs.vue:31` | `<span style="color: var(--pui-text-muted)">// or only what you use:</span>` | The export listed `perfectui.css`, `core.css` and `components/button.css` as if all three were imported together; the snippet now says the second pair is an alternative, matching the package's exports. | None: a correction of the export, recorded here. |

## Checked with no finding

- scope and contracts: the command comes from `installCommand`, the package name from `site`, the CDN version from the build's measurement of the installed package; the tabs follow the handoff (`aria-pressed`, `pui-solid pui-inverse` when chosen, arrow keys).
- quality and maintainability: the CDN copy repeats CopyCommand's small copy routine for a multi-line snippet; not worth an abstraction for two uses.
- edge cases: the CDN snippet scrolls inside its box; without clipboard access the snippet is selected; without JavaScript no copy control renders.
- regression and performance: the landing now has two install commands, so `tests/e2e/copy.spec.ts` targets the hero's (selector scoped, assertions unchanged).
- security and data: the `</script>` in the snippet is built from two strings so the SFC does not end its own script block; it renders as text.
- tests: the diff lines, the arrow keys in both directions with wrap, the pinned CDN URLs and the CDN copy are asserted.

## Verdict

approve with changes
Next: commit T-sh-14; then the CM3 content (T-cm-17 to T-cm-19), which unblocks T-sh-11 and makes every landing CTA resolve
