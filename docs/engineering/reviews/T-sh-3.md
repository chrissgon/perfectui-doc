# Code review: T-sh-3

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 90ce1f8 (4 files: `app/components/ThemePicker.vue`, `app/app.vue`, `tests/e2e/theme.spec.ts`, backlog)
- Intent: T-sh-3 "Theme picker" (`Does:` `ThemePicker` with the presets and a colour input; sets `--pui-theme` on `<html>` and in session storage; `Check:` `tests/e2e/theme.spec.ts`: the colour applies to a component and an example block without reload and survives a reload in the session; `#ffffff` applies with no error)
- Checks run (2026-09-25): `tests/e2e/theme.spec.ts` 3 failed before the change (no picker), 3 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (31 unit, 43 browser)

## Summary

The picker opens a library dropdown with the handoff's five presets and a colour input. A choice sets `--pui-theme` on `<html>` and in session storage under the key the head script of T-sh-2 reads, so it survives reloads and full navigations. Verdict: approve with changes (two low findings).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | quality and maintainability | `app/components/ThemePicker.vue:61` | `const defaultTheme = "light-dark(#0092cd, #07b6f0)";` | The Default swatch repeats the library's theme value; a library palette change leaves the swatch stale. It cannot read `var(--pui-theme)`, which holds the picked colour once one is set. | Keep it for 1.0; revisit with the future palette item recorded in the state file. |
| 2 | low | scope and contracts | `app/app.vue:5` | `<div class="fixed top-3 right-3 z-10 flex">` | Same as T-sh-2 finding 1: the controls float until the header exists. | T-sh-4 moves both into `SiteHeader`. |

## Checked with no finding

- scope and contracts: presets are the landing handoff's (default, #7c3aed, success, error, warn), the role colours through the library's variables as the handoff's token table says; session storage key `pui-theme` matches the head script in `app/app.vue`.
- quality and maintainability: the panel is the library's `pui-dropdown` on the popover API, with no script for opening or closing; `presets` is the design's only prop.
- edge cases: `#ffffff` applies with no error and no alert (EDGE-6); Default removes both the property and the stored value, so the head script applies nothing after a reload.
- regression and performance: the full suite passes; the test polls computed colours because the library fades colour changes over 150 ms (a first run read the colour mid-transition).
- security and data: the value reaches the page only through `style.setProperty`.
- tests: a component on the landing and an example block on a docs page, a reload, the presets and the white edge case are each covered.

## Verdict

approve with changes
Next: commit T-sh-3; then T-sh-4 (header, footer and default layout)
