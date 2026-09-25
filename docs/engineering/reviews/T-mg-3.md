# Code review: T-mg-3

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 9d5b150 (5 files: `nuxt.config.ts`, `shared/code-theme.ts`, the fixture installation page, `tests/fixture-site/migration-diff.spec.ts`, backlog)
- Intent: T-mg-3 (`Does:` enable the `diff` grammar and colour removed and added lines with the error and success inks, markers kept; `Check:` removed and added lines carry distinct classes and their markers)
- Checks run (2026-09-25): the diff test failed twice before passing (no grammar: no classes; then both markers in the punctuation colour); `tests/fixture-site/code-colours.spec.ts` still passes; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (70 unit, 129 browser)

## Summary

Fenced `diff` blocks are highlighted at build time. A removed line, marker included, takes the error ink (`--site-code-deleted`); an added line takes the success ink (`--site-code-value`); unchanged lines keep the text colour. The theme already mapped `markup.deleted` and `markup.inserted`. Shiki gives the markers their own scopes (`punctuation.definition.deleted` and `inserted`), which the punctuation rule was catching, so those two scopes join the line rules. The design placed `langs` under `content.config.ts`; the highlight options live in `nuxt.config.ts`, next to the theme. Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: the inks are the design system's code tokens, with the contrast measured when OPEN-1 closed.
- quality and maintainability: the language list repeats the module's defaults plus `diff`, with a comment.
- edge cases: markers stay in the text (`-`, `+`), so the diff reads without colour too.
- regression and performance: the existing code colour tests pass.
- security and data: none.
- tests: computed colours against the tokens, distinct classes, markers kept.

## Verdict

approve
Next: commit T-mg-3; then T-mg-4 (the guide page)
