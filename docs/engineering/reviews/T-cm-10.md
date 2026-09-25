# Code review: T-cm-10

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 1db94d2 (6 files, +83/-8)
- Intent: T-cm-10 "Page header with badges" (`Does:` `DocHeader` with section label, title, description, "Added in" and "Changed in" badges; `Check:` the chip fixture shows "Added in 1.0", a `changed` fixture shows "Changed in 1.0")
- Checks run (2026-09-24): `tests/e2e/badges.spec.ts` 3 passed (the two badge tests failed before the component existed); `bun run test` exit 0 (19 unit, 18 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The header renders the frontmatter as the approved design shows it: section label in the theme ink, 42 px title, badges with the library's `pui-badge pui-soft pui-theme`, and the description with inline code. The change also introduces the site's ink tokens from the handoff's token table, which the code colours now derive from, so each ink is written once. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | app/assets/css/main.css, app/assets/css/code.css | `--site-theme-ink: light-dark(#00628b, #6bc9f5);` | Outside `Touches:`: the header's label needed the theme ink, which only existed under a code-specific name; the five `--site-*-ink` tokens are the ones the handoffs proposed | Record in the commit message |
| 2 | low | security and data | app/components/DocHeader.vue:13–14 | `v-html="descriptionHtml"` | The description is escaped before backticks become `<code>`, and it comes from the repository's frontmatter; the suppression comment states it | Keep; recorded here |

## Checked with no finding

- scope and contracts: props equal the design's interface (`section`, `title`, `description`, `since`, `changed`); the section title comes from the navigation, not from a list in code.
- edge cases and robustness: no badge when neither field is set (test); a description with `<` or `&` is escaped.
- regression and performance: the code-colours test still passes with the derived variables.
- tests: 3 new tests.

## Verdict

approve with changes
Follow-ups: none beyond the commit message
Next: commit T-cm-10; then T-cm-12 (example block, final)
