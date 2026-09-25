# Code review: T-sh-11

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 7cc9541 (11 files: `ExampleRef`, `OverlaysShowcase`, `Example.vue`, `app/pages/index.vue`, `tests/fixtures/site/app/pages/index.vue`, `eslint.config.mjs`, `tests/e2e/showcase.spec.ts`, `tests/slow/build-content.spec.ts`, ADR-0008, backlog)
- Intent: T-sh-11 (`Does:` prove ADR-0008 (`ExampleRef` renders one named example of a docs page), else shared example files; `OverlaysShowcase` with the four named examples; `Check:` `tests/e2e/showcase.spec.ts`: four live components open and close natively; a missing name fails the build)
- Checks run (2026-09-25): `tests/e2e/showcase.spec.ts` 6 failed before, 10 passed after; `bun run test:slow` 4 passed (the new missing-name case included); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (67 unit, 109 browser); screenshot of the section at 1280 px

## Summary

ADR-0008 is proven and accepted. The landing's overlays section renders the documentation's own `modal`, `dropdown`, `tooltip` and `accordion` examples, named `basic`. The modal opens and closes with the keyboard, the dropdown and the tooltip open as popovers and close on Escape, and the accordion toggles, all with no script of the landing's. The landing's source holds no example markup (asserted), and removing a name fails the build (slow test). `Example` gained a stacked layout for this use: preview above code, no tabs, and code capped at 10rem in a focusable scroll box. Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/components/landing/OverlaysShowcase.vue:16` | `<ExampleRef :page="item.page" name="basic" class="flex-1" />` | The export showed a two-line excerpt of each example's code; the landing shows the full example, capped at 10rem with scrolling, because an excerpt would be HTML written in the landing (REQ-5). | Accepted; if the section reads too long, the documentation's examples can be made shorter at the source. |

## Checked with no finding

- scope and contracts: the ADR's option A with the fallback unused; the node's props gain only `layout`; page paths resolve under the latest version.
- quality and maintainability: `ExampleRef` is the one place that reads a page's body; the fixture site gets a stub home page instead of fixture copies of four component pages.
- edge cases: the stacked code box is focusable with a name ("Example code") so axe's scrollable-region rule holds; ids stay unique because each example is scoped (T-cm-18).
- regression and performance: four page queries at prerender; the full suite passes.
- security and data: the rendered markup is the documentation's own Markdown.
- tests: the four overlays open and close natively, the section's labels, no example HTML in the landing's source, and the missing-name build failure.

## Verdict

approve with changes
Next: commit T-sh-11; then T-sh-15 (landing robustness checks)
