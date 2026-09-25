# Code review: T-ld-5

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree after b85bbe1 (new `app/components/VersionMenu.vue`, `app/utils/switch-version.ts`, `tests/e2e/version-menu.spec.ts`; `app/composables/useVersionSwitch.ts` removed; `app/versions.ts` and the fixture's `versions.ts` gain `archivedVersions`; `SiteHeader.vue`, `shared/library-docs.ts`, `app/assets/css/main.css`, `ClassCycleDemo.vue`, `tests/helpers/hydrated.ts`, `tests/e2e/components-content.spec.ts`, `tests/quality/axe.spec.ts`, `tests/fixture-site/version-switch.spec.ts`)
- Intent: T-ld-5 "Version menu on the header badge" (Delivers REQ-9, EDGE-8, AC-5)
- Checks run: lint exit 0; typecheck exit 0; `bun run test` 77 unit and 185 browser passed, 0 failed; screenshots at 1280 px dark and 360 px light with the menu open

## Summary
The version badge now opens a `pui-dropdown` menu. It lists 1.x, marked current and "latest", and 0.23, which opens `tree/v0.23.0/docs` on GitHub. In the fixture site, which has two majors, picking the other one keeps the page when it exists there, otherwise it opens that major's first page with the notice. The switch code loads only when a reader picks another major.
Three problems surfaced while proving the task, each fixed with evidence (below).
Verdict: approve.

## Findings
| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | blocking (fixed) | regression | app/composables/useVersionSwitch.ts:1 (removed) | `Could not resolve "../../../../../shared/version-switch.ts"` | The composable, never bundled before, imported `shared/` by a relative path that Nitro's server build cannot resolve. | The switch lives in `app/utils/switch-version.ts` with the `#shared` alias, and the menu imports it on demand inside the app's context. |
| 2 | medium (fixed) | tests | tests/e2e/components-content.spec.ts:44 | 1 passed, 1 failed with the menu removed from the header | The headings-column test scrolled before hydration ended; hydration re-renders the previews above the heading, so the scroll could miss its target whatever the header held. | `pageHydrated` waits for Nuxt's `isHydrating` to clear; 4 of 4 runs passed afterwards. |
| 3 | medium (fixed) | regression and performance | app/assets/css/main.css (fallback faces) | landing 89, 89, 89 against 90, 91, 89 at b85bbe1; CLS 0.066 | The landing sat at the local floor, and the menu's 2 KiB tipped it under. Most of the CLS came from the web fonts resizing the hero and from the class cycle emptying its line at mount. | Size-matched fallback faces for Inter and Fira Code, and a cycle that starts by erasing: CLS 0.021, scores 91, 90, 90. |
| 4 | low (open) | regression and performance | app/components/landing/ClassCycleDemo.vue | layout shift 0.0178 with no node | Erasing the typed line re-wraps it on a phone, so its closing text jumps lines. This existed before the task. | A later task, if the margin matters: keep the closing text in place while typing. |

## Perspectives without a finding
- Scope and contracts: `archivedVersions` gets its URL from `site.repository` (the site-config test requires one home for repository URLs), and so does the converter's link rule.
- Accessibility: the trigger is named "Version 1.x, choose another"; the current major has `aria-current`; axe reports 0 violations with the menu open, light and dark.
- Edge cases: EDGE-8 (one documented major) is the production case; from the landing, a major opens at its first page.
