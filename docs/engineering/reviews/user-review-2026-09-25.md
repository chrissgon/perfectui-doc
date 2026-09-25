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
