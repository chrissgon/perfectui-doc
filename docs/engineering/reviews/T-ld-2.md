# Code review: T-ld-2

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: site working tree after ce869c5 (`tests/repo/library-roundtrip.spec.ts` new; `shared/library-docs.ts` and its tests extended; the one-time `scripts/port-pages-to-library.ts` written, run and deleted) and library commit 652748d on branch `v1` of `../perfectui` (28 files, +172/-142, not pushed)
- Intent: T-ld-2 "The library's documents written from the site's pages" (Delivers NFR-1, REQ-10, AC-2, AC-6 library side)
- Checks run: lint exit 0; typecheck exit 0; `bunx vitest run` 127 passed (19 converter, 29 round trip, the rest unchanged); round trip also run on a scratch copy before the real library was touched

## Summary
The library's `docs/*.md` and `MIGRATION.md` now carry the site's wording with the markers ADR-0010 names. Converting them back gives the site's 28 pages after Prettier has formatted them (`tests/repo/library-roundtrip.spec.ts`). The only intended differences are the guide's slug (`migrating-from-0-x`) and its 0.23 names, which now link to `blob/v0.23.0/docs/`.
Two converter gaps turned up during the port and were fixed test-first, with each new test seen failing before its fix: an empty quoted line after an alert marker, and emphasis in the description.
Verdict: approve with changes (one finding for the user, below).

## Findings
| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium (fixed) | edge cases | shared/library-docs.ts (callout branch) | `> [!WARNING] > \`aria-describedby\` …` after Prettier 3.5.3 | Prettier joins an alert marker with a next line that starts with inline code, which breaks the alert on GitHub and on the site. | The port writes an empty `>` line after every marker; the converter skips it; test "skips the empty quoted line after the alert marker". |
| 2 | low (fixed) | quality | scripts/port-pages-to-library.ts (deleted) | `-… this component is **pure CSS** …` | The site's descriptions are plain text, so porting them dropped the library's bold. | The port keeps the library's own paragraph when it differs only by emphasis; the converter drops emphasis from the description (test "keeps the description plain"). |
| 3 | low | scope and contracts | ../perfectui (652748d) | `# Get started with Perfect UI` → `# Installation`; `## 1. Update the imports` → `### 1. Update the imports` | The site's wording wins, as the task says, so a few library texts change beyond the markers (listed below for the user). | None needed; the user reviews the list before the library push. |

## What changes in the library's text beyond the markers
- Titles: `installation.md` "Get started with Perfect UI" → "Installation"; `license.md` "Learn more about the licensing terms for Perfect UI" → "License"; `MIGRATION.md` "Migrating to 1.0.0" → "Migrating from 0.x".
- `installation.md` gains the site's one-line description; `darkmode.md`, `license.md` and `tailwindcss.md` split their first paragraph where the site's description ends.
- The `> ⚠️ Attention needed:` quotes become GitHub `> [!WARNING]` alerts.
- Links to other documents become file names (`layout-group.md`) instead of `blob/main` URLs.
- `MIGRATION.md`: section headings move from level 2 to level 3 (the documents' convention), its paragraphs are unwrapped, and 10 names in the components table link to the 0.23 documents (`float` stays plain: it has no 0.23 document).
- `docs/README.md` gains "Writing these documents", the authoring conventions, after the summary.

## Perspectives without a finding
- Regression: the site still builds from its own `content/v1/`; nothing reads the library yet (T-ld-3).
- Security: no credentials, no push; the user's uncommitted `todo.txt` in the library was left out of the commit.
- Tests: the round trip compares every page after Prettier's table realignment only; no other normalisation hides a difference.
