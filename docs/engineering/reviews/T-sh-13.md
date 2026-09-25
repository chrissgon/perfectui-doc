# Code review: T-sh-13

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 80fea9f (5 files: `TailwindDemo`, `StrikeList`, `app/pages/index.vue`, `tests/e2e/landing-motion.spec.ts`, backlog)
- Intent: T-sh-13 "Tailwind and nothing-to-undo sections" (`Does:` `TailwindDemo` (typed ` w-full`) and `StrikeList` with the handoff's timings; `Check:` with reduced motion both render their final states; with motion, the final states match after the timings)
- Checks run (2026-09-25): `tests/e2e/landing-motion.spec.ts` 3 failed before, 3 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 75 browser); screenshots of both sections at 1280 px

## Summary

Sections 6 and 7 are live:
- **Section 6 (Tailwind):** ` w-full` is typed onto a perfectui button, which stretches to the width of its box.
- **Section 7 (Nothing to undo):** five "no" items are struck one by one on an inverse band, followed by the closing line.

The timings are the handoff's. The server, readers without JavaScript and reduced motion get the final states. Section 7's items are split from the copy's body, so the text stays single-sourced. Verdict: approve with changes (one medium deviation from the export, recorded; one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium (deviation, resolved) | scope and contracts | `app/components/landing/TailwindDemo.vue:24` | `<!-- The cascade as the Tailwind guide measures it: one layer order, utilities on top.` | The export's side panel listed `.w-full` as "unlayered" above six `pui.*` layers: the claim disproved on 2026-09-24 and corrected in messaging SECTION-6. Built as exported, the page would contradict its own copy and the library's Tailwind guide. | The panel shows the measured order (`utilities` on top, then `components`, `pui`, `base` with Preflight, `theme`) and the two lines from the guide: the layer order and the dark variant on `data-pui-mode`. Record as a handoff deviation (DEV) in `docs/design/handoff/landing.md`. |
| 2 | low | scope and contracts | `app/components/landing/TailwindDemo.vue:43` | `<NuxtLink :to="cta"` | "Tailwind guide" targets `/docs/v1/getting-started/tailwind-css` (T-cm-17), hidden until that page exists. | T-sh-15 asserts every CTA renders in the release build. |

## Checked with no finding

- scope and contracts: timings follow the handoff's Motion table (Tailwind: 40% in view, 500 ms, 90 ms per character, 2600 ms hold, 40 ms erase, 1200 ms pause; strikes: fully in view with a 12% bottom margin, 250 ms after entering and 260 ms after the previous); section 7 uses the shared `site-inverse` band.
- quality and maintainability: timers go through `useMotion.after`, observers are created in `onMounted` and disconnected on unmount.
- edge cases: `w-full` is written as a literal class so Tailwind generates it; the typed class applies only once complete, as in the export.
- regression and performance: the full suite passes.
- security and data: static copy.
- tests: the reduced-motion final states, the animated end states, messaging's copy and the absence of "unlayered" are asserted.

## Verdict

approve with changes
Next: commit T-sh-13; then T-sh-14 (migration callout and install tabs)
