# Code review: T-sh-8

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit aa7e464 (6 files: `app/composables/useMotion.ts`, `app/components/CopyCommand.vue`, `app/pages/index.vue`, `tests/e2e/copy.spec.ts`, `tests/unit/motion.spec.ts`, backlog)
- Intent: T-sh-8 "Motion composable and copy command" (`Does:` `useMotion` (reduced motion, in-view trigger, timers only in `onMounted`) and `CopyCommand` (clipboard, "Copied" for 1800 ms, selection fallback, inert without JavaScript); `Check:` `tests/e2e/copy.spec.ts`: click and keyboard copy, feedback at least 1 s, fallback selection with the clipboard denied (also for the documentation example block, T-cm-12 review); a unit test shows no timer before mount)
- Checks run (2026-09-25): `tests/e2e/copy.spec.ts` 4 failed and 1 passed before (the example block's fallback already worked, now covered), 5 passed after; `tests/unit/motion.spec.ts` passes and fails with a timer planted at setup (planted, run, reverted); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (40 unit, 58 browser)

## Summary

The copy control matches the landing export: a `pui-input-group` with the command in a read-only input and a copy button that turns into a success check for 1800 ms. A polite status announces "Copied". Without clipboard access the command is selected, and without JavaScript the button is not rendered. `useMotion` creates no timer or observer before mount, which is proven by server rendering. Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/pages/index.vue:8` | `<CopyCommand class="mt-6" :text="installCommand('npm')" />` | The control sits on the placeholder home so the check has a host; the hero replaces the page. | T-sh-9 renders it in `LandingHero` and removes the placeholder. |

## Checked with no finding

- scope and contracts: props are the design's (`text`, `label?`); the command comes from `installCommand`, so the package name stays in `site.config.ts`; `useMotion` returns the design's `allowed` and `inView`, plus `after` and `cancel` for the section timings.
- quality and maintainability: the composable imports from `vue` explicitly so it can be server-rendered in a unit test.
- edge cases: an insecure context or a denied permission selects the command in the input (EDGE-9); reduced motion leaves `allowed` false, so `after` schedules nothing (EDGE-3); a long command scrolls inside the input (EDGE-2).
- regression and performance: observers disconnect and timers clear on unmount; the example block's copy is unchanged and now has its fallback test.
- security and data: the clipboard receives a constant.
- tests: pointer, keyboard, feedback of at least 1 s, the live status, the fallback for both copy controls and the no-JavaScript render are covered.

## Verdict

approve with changes
Next: commit T-sh-8; then T-sh-9 (hero)
