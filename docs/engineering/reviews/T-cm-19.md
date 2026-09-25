# Code review: T-cm-19

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 3f038b0 (14 files: 8 pages under `content/v1/05.forms/` (the input fixture replaced), `app/plugins/perfectui.client.ts`, `Example.vue`, `tests/e2e/forms-content.spec.ts`, `tests/repo/content-sources.spec.ts`, the state file, backlog)
- Intent: T-cm-19 (`Does:` write `05.forms/` (field group, input, input group, textarea, select, checkbox, radio, switch); `Check:` every page builds; h2 counts equal the sources')
- Checks run (2026-09-25): `bun run generate` exit 0; `tests/repo/content-sources.spec.ts` 28 passed (all 27 pages mapped to a source); `tests/e2e/forms-content.spec.ts` 3 passed, three runs in a row; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (67 unit, 100 browser); `bun run test:slow` 3 passed

## Summary

The eight forms pages are written, and the 1.0 documentation is complete: 27 pages, plus the migration guide coming in MG1. The checkbox page exposed that the site never loaded the library's script. Without it, the `indeterminate` example is a plain checkbox in every browser, and the overlay examples fail in browsers without `commandfor` or `interestfor`. A client plugin now imports the loader. Hydration exposed a second problem: Vue re-assigns every `v-html` when it hydrates, so the previews' nodes are replaced after the loader ran. The four delegated fallbacks survive that, but the per-element `indeterminate` state does not, so the example block applies it to its own checkboxes after mount. Verdict: approve with changes (one medium finding, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | regression and performance | `app/components/content/Example.vue:37` | `v-html="preview"` | Hydration replaces every live preview's DOM once (Vue's `patchDOMProp` assigns `innerHTML` unconditionally). A reader who opens an accordion or types in an example before hydration loses that state, and tests must poll reads that race the swap. | Acceptable for 1.0; a later change can render previews through a directive that fills them only on a fresh client mount (not at hydration). Recorded here as a known behaviour. |
| 2 | low | scope and contracts | `app/components/content/Example.vue:91` | `box.indeterminate = true;` | The site repeats a library behaviour because the library's fallback misses markup rendered after load. | Library change recorded in `docs/workbench/state.md` (MutationObserver or an exported function). |

## Checked with no finding

- scope and contracts: file prefixes follow the library README's order; descriptions are plain text; every page maps to its library document in the heading test.
- quality and maintainability: the plugin has a comment naming what the loader downloads; the example block's addition is scoped to its own preview.
- edge cases: radio groups (`name="plan"` in three examples) stay per example through the scoping of T-cm-18 (asserted); no page scrolls sideways at 360 px.
- regression and performance: the loader is a few hundred bytes and downloads only the missing fallbacks (none but `checkbox-indeterminate` in current Chromium).
- security and data: the loader is the pinned package's own entry.
- tests: examples on all 8 pages, the indeterminate state, and independent radio groups.

## Verdict

approve with changes
Next: commit T-cm-19; then T-cm-20 (quality: Lighthouse and axe on the Button page) and T-sh-11 (overlays showcase from the named examples)
