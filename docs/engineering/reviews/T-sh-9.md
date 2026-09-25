# Code review: T-sh-9

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit b6db346 (12 files: `LandingHero`, `ClassCycleDemo`, `InlineCopy`, `app/data/competitors.ts`, `app/pages/index.vue`, `shared/landing-copy.ts`, `app/assets/css/main.css`, `tests/e2e/landing-viewport.spec.ts`, `tests/e2e/smoke.spec.ts`, `tests/e2e/theme.spec.ts`, backlog)
- Intent: T-sh-9 "Hero" (`Does:` `LandingHero` and `ClassCycleDemo` with the handoff's timings; the server renders the first combination complete; `Check:` `tests/e2e/landing-viewport.spec.ts`: headline, supporting line, install command and "Get started" inside 360×640 and 1280×800)
- Checks run (2026-09-25): `tests/e2e/landing-viewport.spec.ts` 6 failed before, 6 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 64 browser); screenshots at 1280×800 light and dark and at 360×640 compared with the approved export rendered at the same size

## Summary

The placeholder home is replaced by the hero of the approved export:
- **Content:** headline and paragraph from the landing copy; the display line "Three classes, no framework, 3.2 kB." sits under the text from 720 px and inline below it on phones.
- **Command and demo:** the copy command, and the class cycle demo with the handoff's timings.
- **Bars:** one bar per library, from the measurement and the competitors' list, scaled by the hero's visible ratio.

The server, readers without JavaScript and reduced motion all see the first combination complete. The page also:
- checks the copy's section ids at prerender;
- builds its meta from the copy, closing T-sh-5 finding 1.

Verdict: approve with changes (two medium decisions to confirm, two low findings).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | scope and contracts | `app/components/landing/LandingHero.vue:66` | `const exists = (to: string) => to === "/docs" \|\| props.pages.has(docsLink(to, props.version));` | A call to action whose page is not built yet is not rendered. Today that hides "Migrating from 0.x" until the guide exists (T-mg-1); prerendering a link to a missing page failed the build. The mechanism could hide a CTA silently at release. | T-sh-15 (landing robustness) asserts that every CTA of `content/landing.yml` renders in the release build. |
| 2 | medium | regression and performance | `app/assets/css/main.css:10` | `@import "@fontsource-variable/inter/opsz.css";` | The export's headline fits two lines at 1280 px only with Inter's optical size axis; without it the headline took three and pushed the display number down. The font file grows from 48 KB to 73 KB (latin). | Kept for fidelity; T-sh-16 measures Lighthouse performance with it. If the budget fails, go back to `wght` and accept the three-line headline. |
| 3 | low | scope and contracts | `app/data/competitors.ts:1` | `export const competitors: readonly Competitor[] = [` | The competitors' list belongs to T-sh-10 (size chart); the hero's bars needed it first. | T-sh-10 uses this file as its data source. |
| 4 | low | quality and maintainability | `app/pages/index.vue:3` | `<LandingHero :section="section('hero')" ...` | Only the hero is rendered, while `assertSections` passes because it compares the copy with the full id list. The page does not yet check that each id is rendered. | T-sh-15 derives the rendered ids from the section components on the page. |

## Checked with no finding

- scope and contracts: all text comes from `content/landing.yml` (SECTION-1) with the size placeholders filled from `api/library-size.json`; the primary CTA goes to `/docs/v1`, the latest version's index; the cycle list and timings are the export's (600 ms start, 45 to 100 ms per character, 700 ms after each class, 1500 ms hold, erase two characters per 18 ms, 500 ms before the next).
- quality and maintainability: the export's `#3c32aa` glow mix is replaced by the design system's glow-purple (#7340d9 at 12%), as the handoff's token table says. Components under `app/components/landing/` are auto-imported with the `Landing` prefix; the first build rendered `<ClassCycleDemo>` as an unknown element with no warning, which the no-JavaScript test caught.
- edge cases: 360 px has no horizontal scroll (asserted); reduced motion keeps the final state and no caret; imports of `shared/` from Vue files use the `#shared` alias, because a relative path from a nested component failed to resolve in the server bundle.
- regression and performance: the smoke and theme tests targeted the removed placeholder button; they now select the hero's "Get started" link (selector moved, assertions unchanged). Timers run through `useMotion.after`, so none exists before mount.
- security and data: no user input.
- tests: both viewports, the measured number, the no-JavaScript render and both motion preferences are covered.

## Verdict

approve with changes
Next: commit T-sh-9; then T-sh-10 (size chart)
