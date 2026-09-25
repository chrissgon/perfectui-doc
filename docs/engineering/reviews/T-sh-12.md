# Code review: T-sh-12

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit e52cc89 (8 files: `ClassPicker`, `ModeThemeDemo`, `LandingHero`, `shared/landing-copy.ts`, `app/pages/index.vue`, `tests/e2e/showcase.spec.ts`, `tests/e2e/theme.spec.ts`, backlog)
- Intent: T-sh-12 "Class picker and mode and theme demo" (`Does:` `ClassPicker` (chips with `aria-pressed`, live element, highlighted token) and `ModeThemeDemo` (section-scoped mode and theme); `Check:` `tests/e2e/showcase.spec.ts` (extended): every shape, style and colour combination renders the matching classes; the section demo changes only its section)
- Checks run (2026-09-25): `tests/e2e/showcase.spec.ts` (new, the file did not exist) 4 failed before, 4 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 72 browser); screenshots of both cards at 1280 px compared with the export

## Summary

Sections 3 and 5 of the approved export are live. The picker covers all 84 combinations, and a matrix cell picks its style and colour. The code line highlights the class that changed. The server renders `pui-btn pui-solid pui-theme`. The mode demo sets `data-pui-mode` and `--pui-theme` on its section only. The server renders it dark in #7c3aed, the pair messaging shows in code; this works because T-sh-10 kept `light-dark()` native. The rule for hiding a CTA whose page is not built moved to `ctaTarget` in `shared/landing-copy.ts`, used by the hero and both sections. Verdict: approve with changes (two low findings).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | quality and maintainability | `app/components/landing/ModeThemeDemo.vue:20` | `class="pui-radio size-[22px]"` | The five swatches are radios coloured only when checked (the export's design), so the four unchecked ones look empty; each has its hex as accessible name. | Kept as the approved export; a filled swatch would be a design change to raise with the user if wanted. |
| 2 | low | scope and contracts | `app/components/landing/ModeThemeDemo.vue:30` | `<NuxtLink v-if="cta" :to="cta"` | "Dark mode docs" targets `/docs/v1/customization/dark-mode`, written in T-cm-17, so the link is hidden until then (like the hero's migration CTA). | T-sh-15 asserts every CTA renders in the release build. |

## Checked with no finding

- scope and contracts: chips, matrix, live element and code line follow the export's markup and states (`pui-chip pui-solid pui-inverse` for a chosen chip, a dashed theme ring on the chosen cell, `pui-soft pui-theme pui-rounded` on the changed token); copy comes from `content/landing.yml`.
- quality and maintainability: one state object drives chips, matrix and live element.
- edge cases: without JavaScript the picker shows its default combination (tested); the matrix scrolls in its own box on narrow screens.
- regression and performance: the theme test's preset names became ambiguous once the matrix added buttons named like "solid success"; they now match exactly (selector tightened, assertions unchanged).
- security and data: no input leaves the page.
- tests: every combination, the matrix pick with the highlighted token, the no-JavaScript default and the section-only scope (html attribute, root theme, an outside button and the body unchanged) are asserted.

## Verdict

approve with changes
Next: commit T-sh-12; then T-sh-13 (Tailwind and nothing-to-undo sections)
