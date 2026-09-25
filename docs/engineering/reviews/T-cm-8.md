# Code review: T-cm-8

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit fc32a56 (5 files, +51/-3)
- Intent: T-cm-8 "Redirects generator" (`Does:` `server/routes/_redirects.get.ts` with one rule per v1 page for the 0.23 flat URL, then the two general rules, from the versions configuration and the latest collection; listed in the prerender routes; verify the file lands as `_redirects`; `Check:` the file holds the flat rule for button and the two general rules, in that order)
- Checks run (2026-09-24): `tests/build/routes.spec.ts` 5 passed (the new test failed before the generator existed); `bun run generate` exit 0, 17 routes, `.output/public/_redirects` 4 lines; `bun run test` exit 0 (11 unit, 12 browser); `bun run lint` exit 0; `bun run typecheck` exit 0 (it failed once on the client signature of `queryCollection`, fixed by importing from `@nuxt/content/server`)

## Summary

The generator produces exactly the rules ADR-0005 describes from the configuration and the content, and Nitro writes them to `_redirects` at the output root, which removes the ADR's first assumption; the second (Netlify serving versioned files before the non-forced splat) waits for a deploy preview. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | edge cases and robustness | server/routes/_redirects.get.ts:21–24 | `if (slug && !flat.has(slug)) flat.set(slug, path);` | Two v1 pages with the same slug in different sections would get one flat redirect, to the first, silently; the 1.0 page list has no such pair today | Add a warning for duplicate slugs across sections to the validator of T-cm-13 |

## Checked with no finding

- scope and contracts: only the route, its prerender entry and the ADR changed besides the test and the backlog line; the rules come from `latestVersion` and the collection, so the repository test for version ids still passes.
- quality and maintainability: the header comment states the rule order and why the rules are not forced.
- edge cases and robustness: `.navigation` rows are skipped (test); `/docs/v1/<missing>` maps to `/docs/v1/v1/<missing>` and gets the 404, as ADR-0005 accepts.
- regression and performance: 17 routes prerender; the file is 131 bytes.
- security and data: the rules only point inside the site.
- tests: 1 new test with the exact order of the general rules.

## Verdict

approve with changes
Follow-ups: #1 (T-cm-13 warning)
Next: commit T-cm-8; milestone CM1 complete; then CM2 (T-cm-9, T-cm-10, T-cm-13, T-cm-15, T-cm-21) and SH1
