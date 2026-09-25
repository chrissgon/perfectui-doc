# Code review: T-cm-7

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 78ac794 (7 files, +136/-11)
- Intent: T-cm-7 "Documentation page route and version index" (`Does:` `[version]/[...slug].vue` with 404 for an unknown version or path and `useSeoMeta` at setup; `[version]/index.vue` with sections, pages and the `?missing=` notice; `Check:` both versions' button pages exist in the output, no unversioned documentation file, meta from frontmatter)
- Checks run (2026-09-24): `tests/build/routes.spec.ts` 4 passed (3 failed before the pages existed); `bun run generate` exit 0, 16 routes; `bun run test` exit 0 (11 unit, 7 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The routes follow the final URL scheme, prerendering starts from each version's index taken from the versions configuration, and the page sets its title and description at setup. The first build failed on section links because the navigation tree nests the collection prefix (`/docs` → `/docs/<version>` → sections → pages); the index now descends to the version node by path, and T-cm-9's task records the shape. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | app/app.vue:1–3, app/pages/index.vue:1–17, nuxt.config.ts:2 | `<NuxtPage />`; `import { versions } from "./app/versions";` | Three files outside `Touches:`; each is required by having routes (the app renders pages, the placeholder moves to the home page, prerendering must start from each version's index) | Record in the commit message |

## Checked with no finding

- scope and contracts: routes equal the design's contract; `nuxt.config.ts` reads the versions configuration instead of naming versions (the repository test of T-cm-3 still passes); `.navigation` rows are refused as pages.
- quality and maintainability: `findNode` is local to the index; T-cm-9 moves navigation into `useDocsNav`.
- edge cases and robustness: unknown version and unknown page answer 404 through the static host (test); a version with no pages yields an index with no sections (v0 shows only Components).
- regression and performance: 16 routes prerender in 0.7 s; the placeholder home keeps the layer-order proof.
- security and data: route params only select from the versions configuration and query the content database with `path`; no user input reaches HTML unescaped (`v-html` not used).
- tests: 4 new tests over the output, seen failing first.

## Outside the change

- The documentation page has no `og:*` tags yet: `usePageMeta` arrives with T-sh-5, which the backlog already covers.

## Verdict

approve with changes
Follow-ups: #1 (commit message)
Next: commit T-cm-7; then T-cm-5 (spike), now unblocked
