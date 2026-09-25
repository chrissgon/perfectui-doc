# Code review: T-cm-22

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 0835535 (27 files: fixture site under `tests/fixtures/site/`, builder `tests/helpers/fixture-site.mjs`, `playwright.config.ts`, 10 test files moved to `tests/fixture-site/`, `tests/build/static.spec.ts`, `tests/repo/versions.spec.ts`, `tests/slow/build-content.spec.ts`, `app/versions.ts`, `package.json`, `.gitignore`, `eslint.config.mjs`, backlog)
- Intent: T-cm-22 (`Does:` move the v0 button fixture to test-only content read by the build tests, so no one-page 0.23 archive is published; `Check:` a production build has no `docs/v0/` folder unless the v0 pages exist; the build tests still cover both versions)
- Checks run (2026-09-25): production `bun run generate` exit 0 with `.output/public/docs` holding `v1` only; `bun run test` exit 0 (35 unit; 88 browser across the `chromium` and `fixtures` projects); `bun run test:slow` 3 passed; `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The task's scope widened on purpose: the v1 fixture pages had the same problem as the v0 one. Before the real content of T-cm-17 to T-cm-19 could replace them, the tests had to stop depending on them. The tests leaned on badges invented for 1.0, a page without headings, a deliberately long snippet and chip-only paths.
- **Fixture site:** `tests/fixtures/site/` holds the fixture pages for v1 and v0 and a versions configuration that lists v0.
- **Second server:** Playwright builds that site in about 4 s through a second web server and serves it on port 4174.
- **Test split:** the content-model feature tests run there as the `fixtures` project; the shell, landing, meta and copy tests keep running on the production build.
- **Production versions:** `app/versions.ts` lists only v1 until the converted v0 pages ship in R-2; a listed version with no page fails the build (EDGE-8), and the slow test now proves that with the fixture configuration.

Verdict: approve with changes (one medium, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | scope and contracts | `app/versions.ts:21` | `// v0 (0.23) is listed again when its converted pages ship in release R-2;` | Removing v0 from the configuration means the production site has no version switch target and no `/docs/v0` until R-2. That matches the roadmap (v0 content in R-2) and the backlog note that the switch control ships in R-2, but it is a visible change from the earlier plan to list v0 now. | Confirm with the user in the milestone report; record in the state file. |
| 2 | low | regression and performance | `playwright.config.ts:37` | `command: \`node tests/helpers/fixture-site.mjs ${FIXTURE_PORT}\`,` | Every Playwright run, including `--project=chromium` alone or `test:slow`, builds the fixture site first (about 4 s), and the fixture build shares `node_modules/.cache/nuxt` with the production build. | Acceptable for now; builds must not run in parallel with `bun run generate`. |

## Checked with no finding

- scope and contracts: the production check is `tests/build/static.spec.ts` ("only configured versions are published"); the fixture site's `routes`, `collections` and `version-switch` tests still cover both versions.
- quality and maintainability: moved tests read the fixture output and configuration through `tests/fixture-site/paths.ts`; their assertions are unchanged. `schema.spec.ts` became `collections.spec.ts` under Playwright because it reads the fixture site's database, which exists only after its server builds it.
- edge cases: the builder copies the project entry by entry, because `cpSync` refuses to copy a folder into its own subfolder; `.fixture-site` is ignored by git and ESLint.
- regression and performance: `tests/repo/versions.spec.ts` built "two latest versions" from the real list, which now has one entry; it uses an explicit list.
- security and data: test-only files.
- tests: all suites run; the production output test fails if a `docs/v0` folder appears without a configured v0.

## Verdict

approve with changes
Next: commit T-cm-22; then T-cm-17 (getting-started and customization pages)
