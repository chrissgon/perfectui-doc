# Code review: T-sh-6

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit e790201 (7 files: `shared/library-size.ts`, `server/routes/api/library-size.json.get.ts`, `nuxt.config.ts`, `tests/unit/library-size.spec.ts`, `tests/build/library-size.spec.ts`, ADR-0007, backlog)
- Intent: T-sh-6 "Spike: library size at build" (`Does:` `server/routes/api/library-size.json.get.ts` running `gzip -9 -n` on the installed files; confirm `gzip` exists on the Netlify build image with a deploy preview; `Check:` `tests/build/library-size.spec.ts`: the JSON equals the test's own `gzip -9 -n` numbers (3,221 and 493 for 1.0.0-beta.1); a missing file fails the build naming it)
- Checks run (2026-09-25): `tests/unit/library-size.spec.ts` failed before (module missing), 2 passed after; `tests/build/library-size.spec.ts` 1 passed; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (33 unit, 53 browser). Not run: the Netlify deploy preview (an action outside the repository, awaiting the user's approval).

## Summary

The build now publishes the installed library's sizes: `/api/library-size.json` gives 3,221 and 493 B for 1.0.0-beta.1, measured with system `gzip -9 -n`. A missing file throws, naming its path. The spike's second half, confirming gzip on Netlify's image, is pending. Verdict: approve with changes (one high finding that only the deploy preview can close).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high | tests | `tests/build/library-size.spec.ts:15` | `if (version === "1.0.0-beta.1") expect([size.css, size.js]).toEqual([3221, 493]);` | The numbers come from Apple gzip; Netlify builds with GNU gzip, which was not run. The spike's environment assumption is unconfirmed. | Run the first deploy preview once the user approves it; if GNU gzip differs, keep the same-machine comparison and drop the pinned pair (recorded in ADR-0007). |
| 2 | low | edge cases | `server/routes/api/library-size.json.get.ts:5` | `join(process.cwd(), "node_modules/@chrissgon/perfectui")` | The package is found from the working directory, which is the project root under `nuxt generate`; another launch directory would throw (loudly, naming the path). | None now; the build always runs from the root. |

## Checked with no finding

- scope and contracts: the JSON shape is the design's `{ version, css, js, method, measuredAt }`; the route is in the prerender list next to the other generators, so `failOnError` stops the build on a throw.
- quality and maintainability: the measurement lives in `shared/` so the route and a unit test call the same function.
- regression and performance: the full suite passes; two short `gzip` runs per build.
- security and data: `execFileSync` with an argument list, no shell.
- tests: the build test measures independently of the code under test; the unit tests cover the missing file (EDGE-7) and a complete package.

## Verdict

approve with changes
Next: commit T-sh-6; then T-sh-7 (landing copy collection)
