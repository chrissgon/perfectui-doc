# Code review: T-cm-17

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 9056cd5 (16 files: six pages under `content/v1/01.getting-started/` and `02.customization/`, `app/assets/css/prose.css`, `app/components/content/ProseTable.vue`, `app/assets/css/main.css`, `nuxt.config.ts`, the documentation page, `tests/repo/content-sources.spec.ts`, `tests/e2e/prose.spec.ts`, the T-sh-10 review, backlog)
- Intent: T-cm-17 (`Does:` write `content/v1/01.getting-started/` (installation, TypeScript, Tailwind CSS, license) and `02.customization/` (dark mode, theme color) from the library's documentation, examples as `::example`, checked explanatory sentences added; `Check:` every page builds, the validator passes, each page's h2 count equals its library source's `###` count)
- Checks run (2026-09-25): `bun run generate` exit 0 (validator included); `tests/repo/content-sources.spec.ts` 7 passed; `tests/e2e/prose.spec.ts` 3 passed (its anchor case failed until the specificity fix); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (42 unit, 91 browser); screenshots of the Tailwind CSS page before and after the prose styles

## Summary

The six pages are converted from the library's documents, with the local branch `v1` including the rewritten Tailwind guide (a6a86c6, not pushed):
- **Headings:** `###` became `##`.
- **Examples:** an `html` block with `pui-` classes became an `::example`, unless it holds `<html>`, `<head>`, `<body>` or `<script>`; those stay as code, since a live preview of a document or a script is wrong.
- **Callouts:** "⚠️ Attention needed" quotes became `::warning`.
- **Links:** links to the library's GitHub documents became site paths.
- **Descriptions:** plain sentences from the source's opening paragraph; what was cut from them stays as the page's first paragraph.

No explanatory sentence was added: the sources already explain their examples. Writing real prose exposed two gaps nobody had seen with the fixtures, both fixed here.
- **Prose styling:** Tailwind's Preflight left the rendered Markdown unstyled: no heading sizes, list markers or spacing. `prose.css` gives it the approved export's typography, and every Markdown table goes through `ProseTable` (the migration design's scroll box with `pui-table`).
- **Utility generation:** Tailwind did not scan `content/`, so a utility used in a documentation example (`rounded-none` on the Tailwind page) was not generated. `@source "../../../content"` fixes it.

Verdict: approve with changes (one medium finding, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | scope and contracts | `content/v1/01.getting-started/03.tailwind-css.md:8` | `## How the cascade decides` | The page follows the library's rewritten guide, which exists only on the local library commit a6a86c6 (not pushed). Until it is pushed, the public library documentation says the opposite of this page. | Push a6a86c6 to the library's `v1` branch (awaits the user's approval, as every push does). |
| 2 | low | tests | `tests/repo/content-sources.spec.ts:30` | `describe.skipIf(!existsSync(LIBRARY_DOCS))` | The heading comparison needs the library checkout next to this repository; without it, the comparison is skipped rather than failed. | Acceptable while there is no CI; when CI exists, check out the library at the pinned tag there. |

## Checked with no finding

- scope and contracts: file prefixes follow the library README's order, leaving `04` free for the migration guide; slugs match the landing's calls to action (`getting-started/tailwind-css`, `customization/dark-mode`), which now render.
- quality and maintainability: prose rules are scoped to `.doc-prose` on the `ContentRenderer`; heading anchors keep the heading look (a specificity bug caught by the new test).
- edge cases: descriptions are quoted in frontmatter; an unquoted one containing ": " broke the YAML and failed the build loudly (caught before commit); no page scrolls horizontally at 360 px.
- regression and performance: the fixture site's tests are unaffected (they read tests/fixtures/site); `prose.css` adds under 1 KB.
- security and data: examples render only the page author's Markdown (ADR-0002); `<script>` blocks are never live.
- tests: heading counts per source, prose styling, generated utilities and no overflow at 360 px on the six pages.

## Verdict

approve with changes
Next: commit T-cm-17; then T-cm-18 (general and components pages)
