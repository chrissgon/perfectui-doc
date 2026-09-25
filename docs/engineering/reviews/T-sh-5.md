# Code review: T-sh-5

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 6d66186 (9 files: `app/composables/usePageMeta.ts`, `public/og.jpg`, `app/site.config.ts`, the three pages, `tests/build/meta.spec.ts`, `tests/build/routes.spec.ts`, backlog)
- Intent: T-sh-5 "Page metadata and share image" (`Does:` `usePageMeta` (title, description, Open Graph, Twitter card, absolute `og:image` from the site URL) used by the landing and the docs page; `public/og.jpg` copied from `docs/design/results/og-image/final/og-1200x630.jpg`; `Check:` `tests/build/meta.spec.ts`: the seven tags in `index.html` and in the button page, the latter with its frontmatter values)
- Checks run (2026-09-25): `tests/build/meta.spec.ts` 3 failed before the change, 3 passed after; `bun run generate` exit 0; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (31 unit, 52 browser); `bun run test:slow` 3 passed (milestone SH1 closes with this task)

## Summary

Every prerendered page now carries the seven tags, with the share image and the page URL absolute from `site.url`. Documentation pages use their frontmatter title and description, and the landing uses the site's. The image is the user's thumbnail, byte for byte. Verdict: approve with changes (one low finding).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/pages/index.vue:18` | `title: "Perfect UI · The bare minimum for elegant interfaces",` | The landing's title and description are typed in the placeholder page, before the landing copy collection exists. | T-sh-7 and T-sh-9 read them from `content/landing.yml`; the comment says T-sh-9 keeps the call. |

## Checked with no finding

- scope and contracts: `og:image` is `https://perfectui.netlify.app/og.jpg`, `og:url` is the site URL plus the route path, `twitter:card` is `summary_large_image`, as the design's head contract says. `site.name` was added to the site configuration for the title suffix. The version index uses the same composable.
- quality and maintainability: one composable replaces the three `useSeoMeta` calls; it runs at setup, as the lessons in the state file require.
- edge cases: a description with inline code (`<button>`) is written as plain text; the unescaped `>` inside the attribute is valid HTML, and the test parses attributes with quotes for that reason.
- regression and performance: `tests/build/routes.spec.ts` asserted the raw backticks of the meta description; meta content is now plain text, so the assertion was updated to the new behaviour (a deliberate change, not a weakened test). The image adds 198 KB to the output, loaded only by link previews.
- security and data: no user input reaches the head.
- tests: both pages, all seven tags, the frontmatter values and the image bytes are asserted.

## Verdict

approve with changes
Next: commit T-sh-5 (milestone SH1 complete); then T-sh-6 (spike: library size at build)
