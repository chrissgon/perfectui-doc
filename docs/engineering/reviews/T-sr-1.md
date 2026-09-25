# Code review: T-sr-1

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 654bb75 (8 files: `shared/search-options.ts`, `server/routes/api/search/[version].json.get.ts`, `nuxt.config.ts`, `package.json`, `bun.lock`, `tests/build/search-index.spec.ts`, ADR-0009, backlog)
- Intent: T-sr-1 (`Does:` `shared/search-options.ts` and `server/routes/api/search/[version].json.get.ts` serializing a MiniSearch index per configured version from the document set; listed in the prerender routes; `Check:` `.output/public/api/search/v1.json` exists and loads with `MiniSearch.loadJSON`; an empty version fails the build)
- Checks run (2026-09-25): the index test failed before (no file), passed after; the empty-version slow test passes (the route throws through `toSearchDocuments`); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 137 browser, 1 fixme from T-mg-5); `bun run test:slow` 5 passed

## Summary

The build now writes one MiniSearch index per configured version, `api/search/v1.json`. It weighs 150 KB raw and 36 KB with `gzip -9 -n`, well inside the 300 KB budget for a first open. The index is built from the content model's document set with options shared with the browser, and ADR-0009 is accepted. Two environment problems came up:
- **Broken esbuild after the install.** After `bun add minisearch@7.2.0`, macOS killed esbuild's native binary at start (exit 137, a hard link invalidated by the install), and every build failed with "The service was stopped". A clean `bun install --frozen-lockfile` fixed it, with the lockfile unchanged but for MiniSearch.
- **Router parameter.** With a `.json` suffix in the file name, the router does not name the parameter `version`, so the route reads the version from the path.

Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | regression and performance | `shared/search-options.ts:11` | `storeFields: ["title", "heading", "url", "section", "content"],` | The index stores each section's text for snippets, which is most of its weight; a much larger documentation set would approach the budget. | T-sr-5 measures the first-open size; if it grows, store a shortened text for snippets. |

## Checked with no finding

- scope and contracts: fields, boosts, prefix and the fuzzy rule are the design's; the dependency is pinned exactly (7.2.0), as the design and the state decision on pinning require.
- quality and maintainability: the same options object serves the build and the browser.
- edge cases: an unknown version answers 404; an empty version throws during prerender.
- regression and performance: prerender adds one route per version.
- security and data: public content only.
- tests: the built file is loaded with the browser's API and searched.

## Verdict

approve with changes
Next: commit T-sr-1; then T-sr-2 (`useSearch` and the ranking tests)
