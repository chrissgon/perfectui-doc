# Code review: user-review-2026-09-25

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on `redesign` after 620b527 (40 files before this review and the state entry, +463/-234, 0 pure renames, 1 deleted: `app/pages/docs/[version]/index.vue`)
- Intent: the user's twelve adjustments after reviewing the branch deploy, quoted: (1, 6) "ajustar o código para não ter scroll vertical, ter quebra de linha" wherever there is code; (2) "remover o input de seleção de cores e manter apenas as 5 de exemplo"; (3) a visible three-dots icon and a 36×36 search button; (4) the typing animation must not move the content below when it wraps on mobile; (5) the strike on "no initialiser to call after rendering" must follow the wrapped phrase; (7) "ao clicar em docs … redirecione a pessoa por padrão para /installation e pode remover essa tela"; (8) sidebar and "On this page" accordions following the Perfect UI model; (9) content at full width on intermediate breakpoints; (10) the sidebar as in the approved design; (11) remove "html" beside Copy; (12) Copy must copy and show "Copied" in green.
- Checks run: lint exit 0; typecheck exit 0; tests 79 unit passed, 169 Playwright passed, 3 skipped (the existing `test.fixme` Lighthouse case and two slow-project cases), 0 failed; `bun run generate` exit 0

## Summary
Each adjustment is implemented and covered by `tests/e2e/review-fixes.spec.ts` or an updated spec: code wraps and never scrolls, the picker keeps five presets, the header's icon buttons are 36 px, both landing demos reserve the wrapped height, the strike is the text's background, the version index is a redirect rule to the first page, the sidebar and headings disclosure are `pui-accordion` items drawn as the export, content fills its column below 1280 px, the language label is gone and copy falls back to the legacy copy command before selecting.
The change does what the user asked; the specs, designs and handoff that described the colour input and the index page were updated.
Verdict: approve with changes (one low finding recorded, no fix needed now).

## Findings
| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | app/composables/useVersionSwitch.ts:15 | `.order("stem", "ASC")` | The switch (unused until R-2) finds the first page from the database, while the build uses `shared/first-page.ts` on the content folder; both sort the numeric prefixes as strings, so they agree today, but two sources can drift. | When the switch ships in R-2, expose the homes from `app/versions.ts` generated at build time, or assert in `tests/fixture-site` that both give the same page. |

## Perspectives without a finding
- Regression and performance: the first index redirect as a page added three module preloads to the landing (Lighthouse 89 against a 90 floor); moving it to `routeRules` restored 10 preloads and 90 to 91 locally at 275 KiB (previous build: 90, 278 KiB).
- Edge cases: the `missing` notice is read after hydration (`[...slug].vue`), so the prerendered HTML has no mismatch (`tests/e2e/hydration.spec.ts` passes); a query is kept by the forced 301 on the host and passed to the first page by `switchTarget`.
- Quality: `useCopy` replaces three copies of the clipboard code; the legacy path restores focus, so the keyboard test still finds "Copied" focused.
- Security and data: no input crosses a trust boundary; the copy fallback writes only the page's own text.
- Tests: new behaviour has tests; theme, copy, example, route, version and hydration tests were updated to the new behaviour, none weakened. The removed "#ffffff applies" test covered the colour input, which no longer exists. The new tests were written with the implementation, so they were not seen failing first.
- Verify deleted: `grep -rn "\[version\]/index"` finds only the design's history line, updated to the redirect.

## Outside the change
- None.

## Follow-up: theme-coloured text follows the theme (2026-09-25)

- Intent, quoted: "Eu mudei a cor do tema, e todos os textos deveriam mudar, mas muitos ainda ficaram azuis."
- Cause: `--site-theme-ink` in `app/assets/css/main.css` was a fixed `light-dark(#00628b, #6bc9f5)`, chosen while the picker accepted any colour (EDGE-6); the section label, the current sidebar and headings links, links in prose and highlighted code tags read it.
- Change: `--site-theme-ink: color-mix(in oklab, var(--pui-theme), var(--pui-text) 30%)`, the library's ink recipe with more text colour. Measured in Chromium for the five presets in both modes, on the page, a soft theme fill and the code background: minimum 4.78:1 (violet in dark mode on the code background); 25% would give 4.34:1.
- Tests: `tests/e2e/theme.spec.ts` checks that the section label and the current sidebar and headings links change colour with a preset; `tests/fixture-site/code-colours.spec.ts` no longer pins the two fixed values and checks the tag colour follows mode and theme (a deliberate behaviour change, not a weakened test).
- Checks: lint exit 0; typecheck exit 0; 79 unit passed; 170 Playwright passed including axe and Lighthouse.
- Verdict: approve.

## Follow-up: the overlays showcase caps its code (2026-09-25)

- Intent, quoted: "Nessa parte pode definir um max-height para as partes de código. Tudo bem ter scroll vertical nesse caso."
- Change: the stacked example layout (`app/components/content/Example.vue`, used only by the landing's overlays showcase) caps its code panel at 224 px (`max-h-56`) with vertical scroll; as a scroll region it is focusable and named "Example code" again. Lines still wrap; documentation pages are unchanged.
- Tests: `tests/e2e/review-fixes.spec.ts` excludes the showcase from the no-scroll check and asserts its four panels are at most 224 px high, never wider than their box, focusable, and that the modal's panel scrolls.
- Checks: lint exit 0; typecheck exit 0; 79 unit passed; 171 Playwright passed including axe and Lighthouse.
- Verdict: approve.

## Follow-up: one code height in both showcase rows (2026-09-25)

- Intent, quoted: "Faça o mesmo para a seção abaixo também" (the Tooltip and Accordion row).
- Cause: the cap was a maximum; the Tooltip snippet is shorter than 224 px, so its panel was shorter and its preview taller than the Accordion's.
- Change: the stacked code panel has a fixed height (`h-56`, 224 px) instead of a maximum, so both rows line up; longer snippets scroll vertically.
- Tests: `tests/e2e/review-fixes.spec.ts` asserts each panel is 224 px high and that the previews of each row have the same height.
- Checks: lint exit 0; typecheck exit 0; 79 unit passed; 171 Playwright passed.
- Verdict: approve.

## Follow-up: showcase divider and a copy icon inside code (2026-09-25)

- Intent, quoted: "Tem uma linha branca estranha dividindo os códigos. Adicione também um ícone de copy dentro do código para a pessoa poder copiar, parecido com o que tínhamos na doc antiga."
- Cause of the line: the showcase's code panel used `border-t` with no colour; Tailwind 4 draws an uncoloured border in `currentColor`, the text colour. It was the only uncoloured border on the site (`grep` of `border-[tblr]` in `app/`).
- Change: the divider takes `--pui-border`; `app/components/CodeCopyButton.vue` (copy icon, green check for 1500 ms through `useCopy`, selection when no copy works) sits in the top-right corner of every documentation code block (`ProsePre` outside an example) and of each showcase cell, outside the scrolling area; code blocks keep 48 px on the right for it. Example blocks with tabs keep their Copy button and get no icon (`provide("in-example")` restored). The landing's install snippet is unchanged.
- Tests: `tests/e2e/review-fixes.spec.ts` copies from a documentation block and from a showcase cell, checks the tabbed example has no second control, and checks the divider's colour is `--pui-border`.
- Checks: lint exit 0 (no warnings); typecheck exit 0; 79 unit passed; 175 Playwright passed before the lint-only edit to `ProsePre.vue`, then the 22 copy, prose and review tests again.
- Verdict: approve.

## Follow-up: glass header (2026-09-25)

- Intent, quoted: "Coloque um efeito de glass no fundo do header, não apenas uma cor sólida."
- Change: `app/components/SiteHeader.vue` paints `color-mix(in oklab, var(--pui-bg) 72%, transparent)` over `backdrop-filter: blur(14px) saturate(160%)`, and falls back to the opaque page colour where backdrop filters are unsupported. The header's menus and the search dialog open in the top layer, so the filter does not become their containing block.
- Tests: `tests/e2e/review-fixes.spec.ts` checks the blur and a translucent background; screenshots over the inverse band in both modes show the text readable.
- Checks: lint exit 0; typecheck exit 0; 79 unit passed; 176 Playwright passed including axe and Lighthouse.
- Verdict: approve.

## Follow-up: tighter, darker glass (2026-09-25)

- Intent, quoted: "Deixe menos espaçado o efeito de glass e o fundo um pouco mais escuro."
- Change: blur 14 px → 8 px; page colour 72% → 85% opacity (darker in dark mode, more solid in light mode). The test reads the new blur.
- Checks: lint exit 0; typecheck exit 0; 79 unit passed; 175 of 176 Playwright passed. The landing's local Lighthouse case read 89 against its 90 floor, then 89 and 90 on two reruns.
- Finding (outside the change, medium): the landing sits at the local floor. Three Lighthouse runs on this build and on f210ea1 (before the glass) give the same 89, 89, 90 with FCP 2.6-2.7 s and CLS 0.066, so the glass costs nothing measurable. The CLS comes from the hero: the class-cycle card moves when the web fonts load (0.035, cause "Web font loaded" on the size figure above it), and the typed line pushes its closing text (0.018 at start, then about 0.0002 per character). The host measured 94 on the landing. Recommended follow-up: size-adjusted fallback fonts for Inter and Fira Code, and a typed line whose closing text does not move.
