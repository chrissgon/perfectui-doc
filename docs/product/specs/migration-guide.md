# Feature specification: migration guide 0.23 to 1.0

- Owner: product-feature-spec
- Status: draft
- Date: 2026-09-23
- Feature of: PRD `docs/product/prd.md` feature F-4, phase P-1

## Summary

A documentation page that carries the library's migration guide (`MIGRATION.md` in the perfectui repository) inside the site: the eight numbered sections, the known trade-offs, the mapping tables and the code diffs, with links from the landing and the navigation, so a 0.23 user migrates without opening the library repository.

## Goal and users

- Problem: 1.0 renames every class, removes the JavaScript initialisers, `setMode`'s import path and `setThemeColor`, and the only account of it is a Markdown file in the library repository. Source: library `MIGRATION.md` (233 lines, sections 1 to 8 and "Known trade-offs"); PRD U-2.
- Users: users of 0.23 migrating to 1.0 (PRD U-2). Source: PRD Users; brief decision 2.
- Success: the guide is reachable in one click from the landing and from the navigation, contains every section of the library's guide, and its version matches the documented library version. Source: PRD F-4; landing spec REQ-4.

## Scope

- In: one Markdown page in the 1.0 content folder rendered by the content model; its placement in navigation; the rendering of diffs and tables; links from old component names to their v0 pages when those exist; a version stamp and a check that it matches the installed library. Source: PRD F-4.
- Out: the content model itself (content-model spec); the v0 pages (PRD F-7, phase P-2); changes to the library's `MIGRATION.md` (PRD scope Out: no changes to the library). Source: PRD scope.

## Sources

- `docs/product/prd.md` (2026-09-23): U-2, F-4, F-7, P-1, constraints
- Library `MIGRATION.md` in the perfectui repository (233 lines): "Why", sections 1 Update the imports, 2 Add the prefix, 3 Split style from color (7-row table), 4 Components (11-row table; Modal, Dropdown, Tooltip, Accordion, Field group sub-sections with ```diff blocks), 5 Dark mode, 6 Theming, 7 Things that were removed with no replacement (9-row table), 8 What you no longer have to do, Known trade-offs
- `@chrissgon/perfectui` 1.0.0-beta.0 as installed: the package ships `dist/`, `LICENSE`, `package.json` and `README.md`; it does not ship `MIGRATION.md`
- Content-model spec `docs/product/specs/markdown-content-model.md`: REQ-1 (page location and URL), REQ-2 (frontmatter, `since`, `changed`), REQ-4 (navigation from folders), REQ-10 (Shiki at build time), REQ-11 (same slug across versions)
- Landing spec `docs/product/specs/landing-and-site-shell.md`: REQ-4 (call to action to this page)
- Nuxt Content v3 documentation (content.nuxt.com, accessed 2026-09-23): Shiki highlighting with language grammars declared in the content configuration

## Functional requirements

- REQ-1: The guide is one Markdown page in the 1.0 content folder, inside the getting-started section, rendered at `/docs/<section>/<slug>` by the content model and listed in the 1.0 navigation. Source: PRD F-4; content-model spec REQ-1, REQ-4.
- REQ-2: The page contains the "Why" section, the eight numbered sections and "Known trade-offs" of the library's `MIGRATION.md`, with the same headings in the same order, each heading with an anchor. Source: library `MIGRATION.md`.
- REQ-3: The three mapping tables (style split, components, removed items) are rendered as tables with the 0.23 name in the first column and the 1.0 replacement in the second; a 0.23 component name links to that component's v0 page when the v0 content exists in the build, and is plain text otherwise. Source: `MIGRATION.md` sections 3, 4, 7; PRD F-7 (v0 in phase P-2); content-model spec REQ-11.
- REQ-4: Every ```diff block of the guide is highlighted at build time with removed lines and added lines visually distinct (colour and a `-` or `+` marker), using the content model's highlighter. Source: `MIGRATION.md` (nine ```diff blocks); content-model spec REQ-10.
- REQ-5: The page frontmatter states the library version range it applies to (`from: 0.23.0`, `to: <installed 1.0 version>`), rendered in the page header; a build check fails when `to` differs from the installed package version. Source: PRD constraint (pinned library version); PRD R-1 (beta may change before launch).
- REQ-6: The guide page is reachable in one click from the landing (landing spec REQ-4) and from the 1.0 navigation. Source: PRD F-4; landing spec REQ-4.

## Non-functional requirements

- NFR-1: The generated guide page scores at least 90 for performance and at least 95 for accessibility in Lighthouse on mobile, with 0 WCAG 2.2 AA violations; each mapping table is readable at 360 px width by scrolling inside its own box with 0 horizontal scroll of the page. Source: PRD M-4; content-model spec NFR-3.

## Constraints

- Technical: the page follows the content model (frontmatter schema, example blocks, Shiki); the `diff` grammar must be enabled in the content configuration. Source: content-model spec REQ-2, REQ-10; Nuxt Content documentation.
- Business: the library's `MIGRATION.md` is the source of the content; the site does not change what it says (PRD scope Out). Source: PRD scope.

## Edge cases

- EDGE-1: a 0.23 name in a table has no v0 page (for example a removed utility class) → plain text, no dead link.
- EDGE-2: the v0 content is absent in the build (phase P-1) → every 0.23 name is plain text; when v0 lands (P-2) the links appear without editing the guide.
- EDGE-3: the installed library version is bumped and `to` is not updated → the build fails naming the guide file and both versions.
- EDGE-4: a reader on the guide switches to v0 → the page has no v0 counterpart, so the v0 index opens with the notice (content-model spec REQ-6).
- EDGE-5: a mapping table wider than 360 px → the table scrolls inside its box; the page keeps 0 horizontal scroll (NFR-1).
- EDGE-6: the library's guide gains a section in a later release → the site's page is updated by hand and carries `changed:` in its frontmatter (content-model spec REQ-2).
- Categories skipped: timing, volume, integration (a static page with no external calls).

## Acceptance criteria

- AC-1:
  Given the 1.0 content folder contains the guide page with valid frontmatter
  When the site is generated
  Then the page renders at its `/docs/<section>/<slug>` URL and appears in the 1.0 navigation inside the getting-started section
  Covers: REQ-1, REQ-6
- AC-2:
  Given the generated guide page and the library's `MIGRATION.md`
  When their headings are compared
  Then the page has "Why", the eight numbered sections and "Known trade-offs" in the same order, each with an anchor id
  Covers: REQ-2
- AC-3:
  Given the generated guide page in a build with v0 content and in a build without it
  When the three mapping tables are inspected
  Then each renders as a table with 0.23 names first; with v0 present, `btn` links to the v0 button page; without v0, every 0.23 name is plain text and no link is dead
  Covers: REQ-3
- AC-4:
  Given the generated guide page
  When the nine diff blocks are inspected
  Then removed and added lines carry distinct classes or colours and their `-` and `+` markers, produced at build time (no highlighting script runs in the browser)
  Covers: REQ-4
- AC-5:
  Given the guide frontmatter says `to: 1.0.0-beta.0` and the installed package is 1.0.0-beta.0, then the package is bumped to a newer version
  When the site is generated in each state
  Then the first build succeeds and shows "applies to 0.23.0 → 1.0.0-beta.0" in the page header, and the second fails naming the guide file, `to` and the installed version
  Covers: REQ-5
- AC-6:
  Given the generated guide page
  When Lighthouse (mobile) and the accessibility check run against it at 360 px
  Then performance is at least 90, accessibility at least 95, 0 WCAG 2.2 AA violations, and the page has 0 horizontal scroll while tables scroll inside their boxes
  Covers: NFR-1

## Assumptions

- ASSUMPTION-1: The section is "getting started", next to installation, because a migrating user starts there. Safe because: the 0.23 site placed installation first and the content-model spec's navigation example has `01.getting-started/`; the slug is decided with the page list.

## Open questions

- OPEN-1 (resolved 2026-09-23): the library package will not ship `MIGRATION.md`; the site keeps its own copy, updated by hand at each library release (user). Blocks: nothing. Recommended: as decided.
- OPEN-2: Slug of the page. Blocks: nothing (REQ-1 fixes the section, not the slug). Recommended: `migrating-from-0-23` under the getting-started section, because it names the source version and stays valid when 2.0 gets its own guide.

## Readiness

- Ready for architecture: yes. OPEN-1 and OPEN-2 block no requirement.
