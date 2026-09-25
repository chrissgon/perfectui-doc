# Code review: T-sh-1

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit dec7dfc (4 files +77/-3)
- Intent: T-sh-1 "Site and features configuration" (`Does:` `app/site.config.ts` with site URL, package name, repository, Figma, license, and `app/features.ts` with `search` off until T-sr-3 and `assistant` false; `Check:` `tests/unit/site-config.spec.ts`: the install command is built from `packageName`; no other file under `app/` holds the package name or the repository URL)
- Checks run (2026-09-25): `npx vitest run tests/unit/site-config.spec.ts` failed before the change (`app/features` missing), 4 passed after; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (31 unit, 34 browser)

## Summary

The package name, the site URL and every outside link now live in one file, and the install command for the four package managers is built from the package name. Verdict: approve.

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|

## Checked with no finding

- scope and contracts: `site` matches the design's shape (`url`, `packageName`, `repository`, `figma`, `license`) plus the two edit-link keys added by T-cm-11; its one consumer, `app/pages/docs/[version]/[...slug].vue:57`, reads unchanged keys. `installCommand` covers the four managers of the handoff's `InstallTabs`.
- quality and maintainability: `installCommand` is the single place T-sh-9 and T-sh-14 build commands from; no other abstraction added.
- edge cases: module specifiers (`@import "@chrissgon/perfectui/perfectui.css"`, `import … from "@chrissgon/perfectui/mode"`) are exempt because they name the installed package; the exemption has its own test, and a planted command literal is still caught.
- regression and performance: the full default suite passes; constants only.
- security and data: public URLs only.
- tests: the scan runs over `.ts`, `.vue` and `.css` under `app/`, with positive and negative planted cases.

## Verdict

approve
Next: commit T-sh-1; then T-sh-2 (mode before first paint and the toggle)
