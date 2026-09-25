# Code review: T-sh-4

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 2a21246 (13 files: `SiteHeader`, `SiteFooter`, `SiteLogo`, `SiteIcon`, `app/layouts/default.vue`, `app/assets/logo/{mark,wordmark}.svg`, `app/app.vue`, `DocLayout`, `DocSidebar`, `tests/e2e/shell.spec.ts`, backlog)
- Intent: T-sh-4 "Header, footer and default layout" (`Does:` `SiteHeader` (logo, version label from the versions configuration, docs link, mode toggle, theme picker, GitHub, Figma, search slot behind `features.search`, menu control below 1024 px), `SiteFooter`, `app/layouts/default.vue` wrapping the docs layout; inline SVG icons from the handoff assets; `Check:` `tests/e2e/shell.spec.ts`: the landing and one docs page have the same header and footer contents; no search entry point while `features.search` is off)
- Checks run (2026-09-25): `tests/e2e/shell.spec.ts` 5 failed and 1 passed before the change (the no-search case already held), 6 passed after; `bun run generate` exit 0; `bun run lint` exit 0 with no warnings; `bun run typecheck` exit 0; `bun run test` exit 0 (31 unit, 49 browser); screenshots of a docs page at 1280 px light and dark and of the landing at 360 px compared with the approved exports

## Summary

Every page now sits in one layout with the approved header and footer. The logo is the handoff's SVG in `currentColor`, so it follows the mode without the export's filter. The floating controls of T-sh-2 and T-sh-3 are gone. Below 1024 px, a documentation page's header opens the sidebar panel, while other pages keep their links in a menu, as in the two exports. Verdict: approve with changes (three low findings, none blocking).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | low | scope and contracts | `app/components/SiteHeader.vue:46` | `v-if="onDocPage"` | Below 1024 px a documentation page's header offers the sidebar menu but not the GitHub and Figma links (the documentation export hides them at that width); REQ-7 lists them for every documentation page. They stay reachable in the footer. | Kept as the approved export for 1.0. If the user wants them in the narrow header too, the sidebar panel can carry the two links (question in the report). |
| 2 | low | quality and maintainability | `app/components/SiteFooter.vue:24` | `const tagline = "Components the browser already knows how to run.";` | The messaging tagline is typed in the component until the landing copy collection exists. | T-sh-7 reads it from `content/landing.yml`; the comment names that task. |
| 3 | low | regression and performance | `app/components/SiteLogo.vue:10` | `import wordmark from "~/assets/logo/wordmark.svg?raw";` | The wordmark (7.6 KB) is inlined twice per page, header and footer; gzip removes most of the repetition. | None now; T-sh-16 measures the landing against the performance target. |

## Checked with no finding

- scope and contracts: the header carries the docs link to `/docs/v1` (from `versionPrefix(latestVersion)`), the latest label `1.x`, GitHub and Figma from `site`, the theme picker and the mode toggle; the footer carries the tagline, the docs, GitHub, Figma and `MIT license` links (license from `site.license`). No literal URL outside `app/site.config.ts` (the T-sh-1 scan passes). The search slot renders only when `features.search` is on.
- quality and maintainability: icons are the handoff's Lucide paths in one component; the menu is the library's `pui-dropdown` on the popover API.
- edge cases: at 360 px neither the landing nor a docs page scrolls horizontally (asserted); the version index (`/docs/v1`) has no sidebar, so its header shows the links menu, not the sidebar control.
- regression and performance: the sticky columns of `DocLayout` moved from `top-8` to `top-24` so they clear the 64 px sticky header; the navigation test of T-cm-9 still opens the panel by the name "Documentation menu", now on the header's control, and passes unchanged.
- security and data: `v-html` renders only the repository's own SVG files, documented at the call site.
- tests: header and footer contents are compared link by link between the landing and a docs page; the narrow menus of both page kinds are exercised.

## Verdict

approve with changes
Next: commit T-sh-4; then T-sh-5 (page metadata and share image)
