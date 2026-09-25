# Code review: T-cm-1

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` (9 files, +2,720/-0; 2,5xx of the added lines are `bun.lock`), not yet committed
- Intent: T-cm-1 "Bootstrap the site skeleton" (`Does:` pinned toolchain, `nuxt.config.ts` with the content module and `failOnError`, library stylesheet and fonts, `app/app.vue`, `netlify.toml`, scripts; `Touches:` `package.json`, `nuxt.config.ts`, `app/app.vue`, `app/assets/css/main.css`, `netlify.toml`; `Check:` generate writes `.output/public/index.html`, typecheck and lint exit 0, versions pinned)
- Checks run (2026-09-24): `bun run generate` exit 0, "Prerendered 5 routes", `.output/public/index.html` 2,083 bytes; `bun run typecheck` exit 0; `bun run lint` exit 0; `bun run test` exit 1, 0 tests ("No test files found"); 18 of 18 manifest dependencies pinned exactly (scope script); layer order measured in Chromium over the static build: `pui-btn pui-solid pui-theme` keeps `rgb(0, 146, 205)` in light and `rgb(7, 182, 240)` in dark, and `rounded-none` gives 0 px with the declared order and 6 px without it

## Summary

The change creates the site skeleton on the empty orphan branch with every dependency at the design's pinned version, and it does what the task says: the build, typecheck and lint pass. It also establishes, with a measurement, the cascade layer order that keeps Tailwind's Preflight below perfectui and its utilities above it. Two items need attention: the test script fails until T-cm-2 adds tests, and the build environment's Node version was not pinned (fixed in the change after this review started). Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | regression and performance | netlify.toml:1–3 (before the fix) | `command = "bun run generate"` with no `[build.environment]` | Nuxt 4.5.2 declares `engines.node` `^22.19.0 || ^24.11.0 || >=26.0.0`; an unpinned Netlify image may build on an older minor; the local Node is 24.10.0, also outside the range (it builds today, unsupported) | Pin `NODE_VERSION = "24"` in `netlify.toml` (done in this change); update the local Node to 24.11 or later |
| 2 | medium | tests | package.json:14 | `"test": "vitest run"` | The project's fast checks fail (`bun run test` exit 1, 0 tests) until T-cm-2 lands; kept on purpose, since `--passWithNoTests` would hide an empty glob later (lesson of the incremental attempt) | None now; T-cm-2 must be next on the critical path after T-cm-3 |
| 3 | low | scope and contracts | eslint.config.mjs:1–5, tsconfig.json:1–4 | `export default withNuxt({ ignores: ["docs/**"] });` | Two files outside `Touches:`; both are required by the task's own `lint` and `typecheck` scripts, and `docs/**` must be ignored because it holds the design exports' scripts (21 lint errors otherwise) | Record them in the commit message and the backlog status line |

## Checked with no finding

- scope and contracts: every hunk maps to `Does:`; `outside_touches` is `bun.lock` (matches `dependencies`), the backlog status line, and finding 3; no recorded decision contradicted (versions of the design header, `data-pui-mode` only: `grep` finds no `dark` class; perfectui 1.0.0-beta.1).
- quality and maintainability: `main.css` documents why the layer order exists; `app.vue` states it is a placeholder replaced by T-cm-7 and T-sh-9; no markers from the scope script.
- edge cases and robustness: no browser-only handle at setup (no script in `app/`); the Content module warns "No content configuration found" until T-cm-4 creates `content.config.ts`, which is that task's scope.
- security and data: no secret, token or environment variable in the diff; `netlify.toml` holds only the build command, publish directory and Node version.
- tests: the project has no suite yet (T-cm-2); finding 2 covers the script.

## Scope

- Outside the task's Touches: `bun.lock` (lockfile), `docs/product/backlog.md` (status line), `eslint.config.mjs`, `tsconfig.json` (finding 3)
- Dependencies (scope script): added 18, all exact; none removed or changed
- Markers: none
- Consumers checked: `main.css` → `nuxt.config.ts` `css`; `#layer-check` → only `app/app.vue` (placeholder); `@custom-variant dark` → no consumer yet

## Outside the change

- The library's `docs/tailwindcss.md` says "Tailwind's utilities are unlayered, so a utility always beats the library". Tailwind v4 puts utilities in `@layer utilities` and Preflight in `@layer base`; measured here, `rounded-none` loses to `pui-btn` unless the page declares `@layer theme, base, pui, components, utilities;` before the imports. The same claim is in `skills/build-with-perfectui/SKILL.md` and messaging PROOF-7. Proposed: a library documentation fix that shows the layer declaration for Tailwind v4.

## Verdict

approve with changes
Conditions: #1 (fixed in this change)
Follow-ups: #2 (T-cm-2), #3 (commit message)
Next: commit T-cm-1; then T-cm-3 and T-cm-2
