# Code review: T-sh-2

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 7106cb0 (5 files: `app/app.vue`, `app/components/ModeToggle.vue`, `tests/e2e/mode.spec.ts`, `tests/e2e/smoke.spec.ts`, backlog)
- Intent: T-sh-2 "Mode before first paint and the mode toggle" (`Does:` inline head script (cookie `pui-mode`, session colour) placed before the stylesheet; `ModeToggle` cycling light → dark → system with sun, moon and monitor icons, calling `setMode`; `Check:` `tests/e2e/mode.spec.ts`: no cookie leaves the attribute absent and follows `prefers-color-scheme`; a stored cookie renders that mode on first paint; the toggle cycles three states; no `dark` class anywhere)
- Checks run (2026-09-25): `tests/e2e/mode.spec.ts` 6 failed before the change, 6 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (31 unit, 40 browser)

## Summary

The prerendered pages now carry the library's no-flash script as the first thing in `<head>`, ahead of every stylesheet, and the toggle cycles the three modes through `setMode`. Verdict: approve with changes (one low finding, taken by T-sh-4).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/app.vue:4` | `<ModeToggle class="fixed top-3 right-3 z-10" />` | The toggle floats over the page until the header exists; on a docs page it sits over the top-right corner of the layout. | T-sh-4 moves it into `SiteHeader` and removes this line; the comment in the template says so. |

## Checked with no finding

- scope and contracts: the head script is the library's recipe (`docs/darkmode.md`, "Avoiding the flash") plus the design's session colour; its session storage key `pui-theme` is the contract T-sh-3 must write. The toggle uses the approved export's button classes (`pui-btn pui-link pui-surface`), not invented ones.
- quality and maintainability: the cycle is one lookup table; the label names the next mode, as the design says.
- edge cases: with a cookie, the prerendered toggle shows the monitor icon until hydration reads `getMode()`, which EDGE-5 allows ("within the first frame after hydration"); session storage access is wrapped in `try`, so a browser that blocks storage still gets the mode.
- regression and performance: one inline script of about 250 bytes per page. `tests/e2e/smoke.spec.ts` took the first `.pui-btn` on the home page, which is now the toggle; it now selects the "Get started" button by role, which is what it meant to measure (test was wrong, not weakened).
- security and data: the script reads only its own cookie and session key; the colour is set through `style.setProperty`, not written as markup.
- tests: order of script and stylesheet checked on the landing and a docs page; the system preference, the cookie, the session colour and the three-step cycle (with cookie and attribute) each have a test; the dark class is checked in every state.

## Verdict

approve with changes
Next: commit T-sh-2; then T-sh-3 (theme picker)
