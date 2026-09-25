# Code review: T-cm-6

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit ddb6859 (9 files, +90/-2)
- Intent: T-cm-6 "Spike: code colours through CSS variables" (`Does:` prove ADR-0006 with `code.css` defining the `--site-code-*` variables from the role inks in both modes, fall back to dual themes if rejected, record it; `Check:` the button page's code spans use `var(--site-code-…)` and their computed colour changes with `data-pui-mode`)
- Checks run (2026-09-24): `tests/e2e/code-colours.spec.ts` 2 passed (failed before the theme existed; failed again after a typing change emptied the rules, then passed); `bun run generate` exit 0; `bun run test` exit 0 (11 unit, 11 browser); `bun run lint` exit 0; `bun run typecheck` exit 0 (it failed once on the untyped theme object, fixed with `ThemeRegistrationRaw`)

## Summary

ADR-0006 option A works: a theme object whose colours are CSS variables reaches the prerendered HTML and follows the mode in the browser; ADR-0006 is accepted. The contrast check against the code background moved punctuation from the muted text (4.19:1) to the muted ink (7.07:1), and the six code pairs are now in the design system's contrast table. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | package.json (devDependencies), shared/code-theme.ts:1–8 | `"shiki": "4.4.3"`; `import type { ThemeRegistrationRaw } from "shiki";` | Outside `Touches:`: the theme lives in `shared/` so `nuxt.config.ts` can import it, and `shiki` is declared (same version already installed through Nuxt Content) for a type-only import that typecheck required | Record in the commit message |

## Checked with no finding

- scope and contracts: `nuxt.config.ts` sets `content.build.markdown.highlight.theme.default`; the variables' values equal the design system's inks; `docs/design/design-system.md` gains six contrast rows, as ADR-0006's consequences require.
- quality and maintainability: the theme is ten scope rules with comments tying it to the ADR; no new runtime dependency.
- edge cases and robustness: `--site-code-deleted` and `markup.inserted` are ready for the migration guide's diff blocks (T-mg-3).
- regression and performance: the example block of T-cm-5 still passes; the generated class styles are a few rules per page.
- security and data: none involved.
- tests: 2 new tests; the mode test caught a real regression during the task.

## Verdict

approve with changes
Follow-ups: #1 (commit message)
Next: commit T-cm-6; then T-cm-8 (redirects), closing milestone CM1
