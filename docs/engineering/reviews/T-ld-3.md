# Code review: T-ld-3

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree after ee26aca (new `scripts/sync-docs.ts`, `tests/unit/sync-docs.spec.ts`, `tests/build/library-pages.spec.ts`, `.ignore`; `content/v1/` untracked and ignored; `V0.vue`, `tests/repo/content-sources.spec.ts` and the round-trip test removed; `app/versions.ts`, `shared/first-page.ts`, `package.json`, `content/landing.yml` and the tests naming the guide's slug changed)
- Intent: T-ld-3 "Pages generated before every build" (Delivers REQ-1, REQ-2, NFR-2, EDGE-1, EDGE-3, EDGE-4, AC-1, AC-6 site side, AC-8)
- Checks run: lint exit 0; typecheck exit 0; `bun run test` 77 unit and 166 browser passed after the fixes below; `PERFECTUI_SOURCE=../perfectui bun run generate` exit 0

## Summary
`bun run generate` and `bun run dev` now start with `docs:sync`. The sync writes `content/v1/` from the library: from `PERFECTUI_SOURCE`, from the cache, or with one archive download of `libraryRef`. For now v1's `libraryRef` is pinned to library commit 652748d, until a release carries the markers.
The generated pages match the ones the repository held, except the guide's slug and its 0.23 links, both intended (`diff -r` against HEAD's copies).
Verdict: approve with changes (finding 3 blocks the host build until the library is pushed).

## Findings
| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high (fixed) | regression | app/assets/css/main.css:10 | `@source "../../../content";` with `/content/v1/` in `.gitignore` | Tailwind 4.3.3 skips git-ignored files even under an explicit `@source`, so utilities written in examples (`rounded-none w-full`) were no longer generated; `tests/e2e/prose.spec.ts` caught it. | `.ignore` re-includes `/content/v1/` for Tailwind's scanner (it takes precedence over `.gitignore` for the `ignore` crate Tailwind uses); proven by building with and without it. |
| 2 | low (fixed) | tests | tests/build/migration-v0-links.spec.ts:11 | `toHaveLength(10)` | Ten names, but `float` has no 0.23 document and stays text: nine links is right. | Expect 9, with the reason in a comment. |
| 3 | high (open, outside this repository) | operations | app/versions.ts:27 | `libraryRef: "652748d75d42f25a6396173c8e4f8a59487c6299"` | A Netlify build downloads this commit from GitHub; until the library's branch `v1` is pushed, the host build fails with `library ref "652748d…": download failed with HTTP 404` (EDGE-4 working as designed). | The user approves pushing the library's branch `v1` (a6a86c6 and 652748d) before the site is pushed. |

## Measurements (NFR-2, AC-8)
- Local checkout: 28 pages in 6 ms.
- Download of `v1.0.0-beta.1`: 1 archive request, 1,150 ms; the second run from the cache: 1 ms, 0 requests.

## Perspectives without a finding
- Edge cases: EDGE-1 (a listed document missing, named with its summary line and the ref), EDGE-3 (warning) and EDGE-4 (failure names the ref, and no partial cache remains) have unit tests using a replaceable download.
- Scope: the fixture site keeps its own content and builds without the sync; its `:v0` rows became ordinary links, and its test was rewritten for REQ-10.
- Removals: `grep` finds no remaining `V0`, `content-sources` or `library-roundtrip` reference in code or tests. The migration-guide design notes that it is superseded in part.
