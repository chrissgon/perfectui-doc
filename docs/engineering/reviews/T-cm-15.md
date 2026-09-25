# Code review: T-cm-15

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-24
- Change: working tree on branch `redesign` after commit 7554866 (6 files, +68/-1)
- Intent: T-cm-15 "Version switch behaviour" (`Does:` `useVersionSwitch` with the same path when it exists in the target, else the target index with `?missing=`, and the notice on the version index; the control ships in R-2; `Check:` chip (v1 only) lands on the v0 index with the notice naming chip and 0.23; button maps to the same path and back)
- Checks run (2026-09-24): `tests/unit/version-switch.spec.ts` 3 passed (failed before the module existed); `tests/e2e/version-switch.spec.ts` 2 passed (the notice was already rendered by T-cm-7); `bun run test` exit 0 (27 unit, 32 browser); `bun run lint` exit 0; `bun run typecheck` exit 0

## Summary

The switch rule is a pure function tested for the three cases (page exists, page missing, index), and the notice now names the page, not its path. The composable that queries the target collection has no caller until the switch control of release R-2, so its query path is not exercised in a browser yet. Verdict: approve with changes.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | tests | app/composables/useVersionSwitch.ts:10–13 | `await queryCollection(target.collection as keyof Collections).path(candidate).first()` | The existence query runs in the browser against the static site's content database; nothing calls it before R-2, so a failure there would first show with the control | The R-2 switch-control task's check clicks the control on a shared page and on a v1-only page (AC-6 end to end); record it in the roadmap's R-2 notes |

## Checked with no finding

- scope and contracts: the rule follows the design's switch flow; the query parameter is encoded, so a path with `/` survives.
- edge cases and robustness: switching from a version index maps to the other index; the notice appears only with the query (test).
- security and data: `missing` is rendered as text interpolation, never as HTML.
- tests: 3 unit and 2 browser tests.

## Verdict

approve with changes
Follow-ups: #1 (R-2 control task)
Next: commit T-cm-15; then T-cm-16 (build assertions), closing CM2
