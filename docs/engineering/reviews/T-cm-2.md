# Code review: T-cm-2

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 71ad565 (10 files, +160/-1)
- Intent: T-cm-2 "Test harness over the generated output" (`Does:` Vitest for unit and repository checks; Playwright over `.output/public`; axe and Lighthouse helpers; one passing smoke test per runner; `Check:` `bun run test` runs both runners and each smoke test passes, with no pass-with-no-tests flag)
- Checks run (2026-09-24): `bun run test` exit 0 (Vitest 2 passed; Playwright 3 passed); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The change adds the two runners, a dependency-free static server that behaves like a static host, and the axe and Lighthouse helpers the quality tasks will use, with smoke tests that prove each piece runs. The helpers already earned their place: axe found two real WCAG violations on the placeholder page (below). One dependency was imported without being declared; fixed in the change. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | quality and maintainability | tests/helpers/lighthouse.ts:2 | `import * as chromeLauncher from "chrome-launcher";` | `chrome-launcher` came only as a transitive dependency of `lighthouse`; an update of Lighthouse could remove or change it silently, against the pinned-versions rule | Declared `chrome-launcher` 1.2.1 (the installed version) in `devDependencies` (done in this change) |
| 2 | low | quality and maintainability | tests/helpers/static-server.mjs:46 | `console.log(\`static server on http://localhost:${portArg}\`)` | Flagged as debug output by the scope script; it is the server's startup line, which Playwright's `webServer` shows when the server fails to start | Keep; recorded here |

## Checked with no finding

- scope and contracts: every file maps to `Does:`; `package.json` gains `test`, `test:unit`, `test:e2e` and one dependency (finding 1); `.gitignore` gains `test-results` and `playwright-report`, the runner's output folders.
- edge cases and robustness: the static server rejects paths outside the output folder (`startsWith(root)` after normalising), serves `404.html` with status 404, and exits with a message when the site was not generated.
- regression and performance: `bun run generate` is not part of `bun run test`, so the browser tests run against the last build; the server's start message says to generate first when `index.html` is missing.
- security and data: no secret or network access beyond localhost.
- tests: 5 tests, none skipped or focused; the axe smoke test asserts the helper runs the requested WCAG levels, not that the page is clean, because zero violations is the quality tasks' check (T-cm-20, T-sh-16).

## Outside the change

- axe on the placeholder page: `color-contrast` on `pui-btn pui-solid pui-theme` (white on #0092CD, 3.5:1, AA needs 4.5:1 at 14 px) and `document-title` (no `<title>`, WCAG 2.4.2). The title comes with T-sh-5. The contrast is the library's documented trade-off and conflicts with PRD M-4 (0 WCAG 2.2 AA violations on every page): a user decision (state open questions).

## Verdict

approve with changes
Conditions: #1 (fixed in this change)
Follow-ups: #2 (none)
Next: commit T-cm-2; then T-cm-3
