# Code review: T-cm-5

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit bcdaa8a (5 files, +65/-1)
- Intent: T-cm-5 "Spike: example block from one fenced snippet" (`Does:` prove ADR-0002 option A on the button fixture, else option C, and record the outcome; `Check:` the static HTML holds a rendered `pui-btn` and Shiki markup for the same snippet; ADR-0002 status updated)
- Checks run (2026-09-24): `tests/e2e/example.spec.ts` 2 passed (both failed before the component existed); `bun run generate` exit 0; `bun run test` exit 0 (11 unit, 9 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

Option A works: Nuxt Content keeps the raw snippet in the `code` prop of the rendered `<pre>`, so the component reads it from the slot's vnode props and renders it as the live preview, while the slot itself is the Shiki-highlighted code. ADR-0002 is accepted with the evidence. The spike leaves the final block (tabs, copy, canvas) to T-cm-12, as planned. Verdict: approve with changes (low only).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | edge cases and robustness | app/components/content/Example.vue:22–31 | `if (typeof code === "string") return code;` | An example with two fenced blocks previews only the first, silently; the contract is one block per example, but nothing enforces it | Add "one fenced block per `::example`" to the validator rules of T-cm-13 |
| 2 | low | security and data | app/components/content/Example.vue:5–6 | `<!-- eslint-disable-next-line vue/no-v-html -->` | `v-html` renders the snippet unescaped; the source is Markdown committed to this repository and rendered at build, so no reader input reaches it; the suppression is justified by the comment above it | Keep; recorded here |

## Checked with no finding

- scope and contracts: `content/v1/04.components/03.button.md` now uses `::example`, which the task's Check needs; the component contract is a single default slot, as ADR-0002 states.
- quality and maintainability: the lookup is a small recursive function over vnode props; no highlighting runs in the browser (REQ-10).
- regression and performance: the preview is server-rendered and survives hydration (browser test); 16 routes still prerender.
- tests: 2 new tests, seen failing first; they check both the static HTML and the hydrated page.

## Outside the change

- An unregistered MDC component in Markdown does not fail `nuxt generate` (observed before the component existed), so EDGE-3 depends entirely on the validator of T-cm-13, as the design says.

## Verdict

approve with changes
Follow-ups: #1 (T-cm-13 rule)
Next: commit T-cm-5; then T-cm-6 (code colours) and T-cm-8 (redirects)
