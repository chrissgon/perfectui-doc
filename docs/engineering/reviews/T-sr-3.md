# Code review: T-sr-3

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 60fbe17 (11 files: `SearchButton`, `SearchDialog`, `SiteHeader`, `SiteIcon`, `ModeToggle`, `ThemePicker`, `app/features.ts`, `tests/e2e/search-open.spec.ts`, `tests/unit/site-config.spec.ts`, backlog)
- Intent: T-sr-3 (`Does:` `SearchButton` in the header slot, `/` outside text fields, ⌘K or Ctrl+K, `#search=`; turn `features.search` on; `Check:` each trigger opens the dialog with the input focused; `/` in a field types a slash)
- Checks run (2026-09-25): `tests/e2e/search-open.spec.ts` 8 failed before, 7 then 8 passed after; the 320 px test failed twice (the header 1 px too wide), then passed; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (78 unit, 143 browser; 3 skipped: the T-mg-5 fixme and the two "search is off" checks)

## Summary

Search is on. The header shows the export's search button: "Search" with the shortcut hint on wide screens, the icon alone below 1024 px. The button, `/` outside text fields, Ctrl+K or ⌘K, and `#search=<query>` on load all open the dialog with the input focused, on the landing and on documentation pages. The dialog is the shell for now (input and close) on `pui-modal`: centred, and full screen below 640 px. Results and states come in T-sr-4. The files differ slightly from `Touches:`:
- **Dialog shell:** created here because the check needs it.
- **Header spacing:** header buttons use 6 px of side padding and tighter gaps below 640 px, so the added button still fits at 320 px.
- **Features test:** the site configuration test that pinned `search: false` "until T-sr-3" now pins `true`.

Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | edge cases | `app/components/SearchButton.vue:43` | `onNuxtReady(() => {` | A dialog opened in `onMounted` (during hydration) was closed again with no error, so `#search=` waits for Nuxt to be ready; the dialog appears slightly later than the page on a slow device. | Acceptable: the hash is a deep link, not a typing path. |

## Checked with no finding

- scope and contracts: the shortcuts and the hash are the design's; the version searched is the page's, or the latest on the landing (REQ-4).
- quality and maintainability: one window listener, removed on unmount; the shortcut label follows the platform after mount.
- edge cases: `/` in inputs, textareas, selects and editable content types a slash (asserted on a live input example); Escape closes (native `<dialog>`), and `closedby="any"` closes on a backdrop click.
- regression and performance: the dialog adds no request until opened; 320 px, 360 px and the shell tests pass.
- security and data: the hash query only fills the input.
- tests: every trigger on two pages, the hash, and the slash in a field.

## Verdict

approve with changes
Next: commit T-sr-3; then T-sr-4 (the dialog's results, states and keyboard)
