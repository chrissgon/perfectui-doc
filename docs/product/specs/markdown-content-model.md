# Feature specification: Markdown content model with versioned folders

- Owner: product-feature-spec
- Status: draft (amended 2026-09-23: REQ-2, REQ-4, AC-4, constraints; revised 2026-09-23 for the from-scratch rebuild: REQ-9 and AC-8 withdrawn, removal clauses dropped, NFR-3 and AC-12 added, EDGE-2 and EDGE-5 aligned with ADR-0004)
- Date: 2026-09-23
- Feature of: PRD `docs/product/prd.md` features F-1, F-2, F-10 and F-12, phase P-1; brief `docs/workbench/briefs/perfectui-doc-redesign.md`

## Summary

Documentation becomes Markdown files in versioned folders, rendered by Nuxt Content v3 with example blocks as components inside Markdown; navigation, the search document set and the assistant corpus derive from the same content. Adding or fixing a page means editing one Markdown file.

## Goal and users

- Problem: on the 0.23 site every documentation page is hand-written Vue with example code strings inside it, so any documentation fix means editing HTML; a separate hand-maintained `docs.json` duplicates the content and nothing reads it. The site is rebuilt from an empty tree, so the content model is designed, not migrated. Source: brief decision 1; `docs/engineering/architecture.md` (codebase map of the 0.23 site on branch `main`); state decision 2026-09-23 (restart from scratch).
- Users: the maintainer writing documentation (PRD U-3); readers evaluating the library (U-1) or migrating from 0.23 (U-2). Source: PRD Users; brief decision 2.
- Success: a new page is one Markdown file with no code change; the same file feeds the page, the navigation, the search document set and the assistant corpus; the folder structure holds 0.23 and 1.0 side by side.

## Scope

- In: content collections and folder layout per major version; frontmatter schema including `since` and `changed`; the example block component; navigation derived from content; version switch behaviour between existing folders (routing only); generation of the search document set and the assistant corpus from the collections; build-time code highlighting; quality targets of a generated documentation page. Source: PRD F-1, F-2, F-10, F-12.
- Out: writing the 1.0 pages and converting the 0.23 pages to v0 (PRD F-7, phase P-2, own spec); the landing page and the migration guide (PRD F-3, F-4, own spec); search over the document set (PRD F-5, own spec); the version switcher control (PRD F-6, phase P-2); the new visual design (design phase); the in-browser assistant (PRD F-11, phase P-3). Source: PRD Features and Release phases.

## Sources

- `docs/product/prd.md` (2026-09-23): users U-1 to U-3, features F-1, F-2, F-10, F-12, metric M-4, constraints, phase P-1
- `docs/workbench/state.md` decisions of 2026-09-23: restart from scratch on an orphan branch, lessons from the T-cm-1 review, quality targets
- `docs/workbench/briefs/perfectui-doc-redesign.md`, decisions 1, 3, 4, 5, 6, 7 (user, 2026-09-23)
- `docs/engineering/architecture.md` (codebase map of the 0.23 site on branch `main`, 2026-09-23, the baseline this model replaces): 32 hand-written pages under `pages/docs/`, `NAV_SECTIONS` constant in `shared/constants.ts`, `OrganismComponentExample` with preview and code tabs, `docs.json` unread, highlight worker loading highlight.js from a CDN, `Organism.AssistantChatGPT.vue` with `SEARCH_ENDPOINT`, landing badge in `pages/index.vue`
- Nuxt Content v3 documentation (content.nuxt.com, accessed 2026-09-23): collections configured in `content.config.ts`; "You can use any Vue component in your Markdown files."; Shiki highlighting; custom frontmatter fields must be declared in the schema to be queryable
- perfectui 1.0 inventory: `DESIGN-SYSTEM.md` §4 (17 components) and `ARCHITECTURE.md` §6 in the library repository; `package.json` exports (`./perfectui.css`, `./core.css`, `./components/*.css`, `./mode`, `./fallbacks/*`)
- Tailwind CSS documentation sites (v2, v3 subdomains, accessed 2026-09-23): older-version notice pattern

## Functional requirements

- REQ-1: Each documentation page is one Markdown file under `content/<major>/` (`content/v1/` for 1.x, `content/v0/` for 0.23) and is rendered at `/docs/<path>` for the latest version and `/docs/<major>/<path>` for every other version. Source: brief decisions 5, 6, 7; user answer 2026-09-23 (URL scheme).
- REQ-2: Each page declares frontmatter `title`, `description`, `tags`, and optionally `since` and `changed` (version strings); the schema is declared in `content.config.ts` so every field is queryable. Sections and order are not frontmatter: they come from the folder structure with numeric prefixes and a `.navigation.yml` per section folder (amended 2026-09-23, ADR-0004, user approval). Source: brief decision 7; Nuxt Content (custom fields must be in the schema; ordering by numeric prefixes).
- REQ-3: An example block is written in Markdown as an MDC component that receives the HTML snippet once and renders a preview tab and a code tab from that single source; no example is stored as a string constant in code. Source: brief decision 6; codebase map (the 0.23 site's example tabs fed by `CODE_VIEW_*` constants are the baseline to avoid).
- REQ-4: Navigation sections and page order are computed from the selected version's folder tree (section folders with `.navigation.yml` titles, numeric prefixes for order, prefixes stripped from URLs); no file in code lists sections or pages (amended 2026-09-23, ADR-0004). Source: brief decision 7; codebase map (`NAV_SECTIONS` constant as the baseline to avoid); Nuxt Content navigation tree.
- REQ-5: The list of versions (id, label, latest flag, deprecated flag) lives in one configuration file read by routing, navigation and the generators. Source: brief decision 7.
- REQ-6: When the reader switches version on a page whose slug exists in the target version, the same slug opens in that version; otherwise the target version's index opens with a notice naming the page and the version in which it does not exist. Source: brief decision 7.
- REQ-7: A page with `since` shows an "Added in <since>" badge and a page with `changed` shows a "Changed in <changed>" badge in the page header. Source: brief decision 7.
- REQ-8: A build step generates, from the collections, one search document set (url, title, description, tags, version, section) and one assistant corpus (page text split by heading, with version and url); no hand-maintained content index exists. Source: brief decisions 4, 5 (one corpus with a version filter); codebase map (`docs.json` as the baseline to avoid).
- REQ-10: Code in Markdown is highlighted at build time by Nuxt Content's Shiki; no highlighting runs in the browser and no stylesheet or script is loaded from a CDN for it. Source: brief decision 6; Nuxt Content v3 (Shiki); codebase map (the 0.23 site's runtime worker and CDN stylesheet as the baseline to avoid).
- (REQ-9, removal of the previous assistant integration and badge, was withdrawn on 2026-09-23: the rebuild starts from an empty tree, so there is nothing to remove; brief decision 8 is satisfied by not building it.)
- REQ-11: Every page slug used for a topic that exists in more than one version is the same in every version folder (for example `components/button` in both `content/v0/` and `content/v1/`). Source: brief decision 7 (same-path mapping).

## Non-functional requirements

- NFR-1: Adding a documentation page requires 0 changes to `.vue`, `.ts` or `.json` files: one Markdown file in the version folder is sufficient. Source: brief decision 1 (the user's stated goal); REQ-4 and REQ-8.
- NFR-2: The site is fully prerendered: 100% of documentation routes are static files produced by `nuxt generate`, 0 routes rendered on a server, and the generators of REQ-8 run inside that build. Source: user answer 2026-09-23 (static generation).
- NFR-3: A generated documentation page scores at least 90 for performance and at least 95 for accessibility in Lighthouse on mobile, and 0 violations against WCAG 2.2 AA in the accessibility check of the build tests. Source: PRD M-4 (user answer 2026-09-23).

## Constraints

- Technical: Nuxt with Nuxt Content, Tailwind for utilities, perfectui 1.0 for the site's own components, all at their latest stable versions at implementation time, verified on the registry on 2026-09-23: nuxt 4.5.2, @nuxt/content 3.16.1, vue 3.5.43, tailwindcss 4.3.3, @chrissgon/perfectui 1.0.0-beta.0 (dist-tag `beta`; `latest` is still 0.23.0), vitest 5.0.1, @playwright/test 1.63.0, @nuxt/eslint 1.17.0, typescript 6.0.3 (7.0.2 is rejected by typescript-eslint, whose peer range is `<6.1.0`; verified 2026-09-23); Tailwind 4.3.3 through the Vite plugin `@tailwindcss/vite` 4.3.3, as the library repository already does; the stable line of `@nuxtjs/tailwindcss` (6.14.0) targets Tailwind 3 and is not used; `@chrissgon/perfectui` 1.0.0-beta.0 is installed from the `beta` dist-tag; `better-sqlite3` 13.0.3 is required by Nuxt Content at build time. Source: brief decision 3; user answer 2026-09-23 (latest versions); registry.npmjs.org.
- Technical: MDC components are the only way to put interactive examples in Markdown; example HTML must be valid perfectui 1.0 markup (`pui-` classes). Source: brief decision 6; `ARCHITECTURE.md` §6.
- Operational: hosting on Netlify as a static site, deployment configured outside the repository. Source: `README.md`; codebase map; user answer 2026-09-23.
- Technical: `data-pui-mode` on `<html>` from the first line, never a hard-coded `dark` class; SEO meta set at component setup so prerendered pages carry it; no browser-only handle created at component setup without a client guard. Source: PRD constraints; state decision 2026-09-23 (lessons from the T-cm-1 review).
- Business: decisions 1 to 8 in the brief are fixed unless the user changes them. Source: brief.

## Edge cases

- EDGE-1: reader switches to v0 on a page that exists only in v1 → the v0 index opens with the notice "This page does not exist in 0.23" (REQ-6).
- EDGE-2: a Markdown file lacks a required frontmatter field (`title`, `description`) → the build fails and the error names the file and the missing field.
- EDGE-3: a Markdown file uses an MDC component that is not registered → the build fails and the error names the file and the component.
- EDGE-4: two files in the same version folder resolve to the same slug → the build fails naming both files.
- EDGE-5: a section folder exists in the selected version but contains no page (only `.navigation.yml`) → the section is absent from that version's navigation.
- EDGE-6: `since` names a version newer than the selected major (for example `since: 2.0` inside `content/v1/`) → the build fails naming the file.
- EDGE-7: an example block contains HTML longer than the preview area → the preview scrolls inside its box; the page layout does not widen.
- EDGE-8: the generated search document set or assistant corpus is empty for a version → the build fails; an empty index is never published.
- EDGE-9: a page contains a link to a slug that does not exist in its own version → the build reports the broken link naming file and target (warning, not failure).
- Categories skipped: timing (no concurrent writers; content is built, not served dynamically), volume (tens of pages per version), device and environment (covered by the design and hosting features, not by the content model).

## Acceptance criteria

- AC-1:
  Given the folders `content/v0/` and `content/v1/` each contain a `components/button.md` with valid frontmatter
  When the site is built
  Then `/docs/components/button` renders the v1 file and `/docs/v0/components/button` renders the v0 file, and `/docs/v1/components/button` is not a published route
  Covers: REQ-1, REQ-11
- AC-2:
  Given `content/v1/components/chip.md` has frontmatter `since: "1.0"` and `content/v1/components/modal.md` has `changed: "1.0"`
  When the two pages are rendered
  Then the chip page header shows "Added in 1.0" and the modal page header shows "Changed in 1.0", and both fields are queryable through the collection
  Covers: REQ-2, REQ-7
- AC-3:
  Given a page contains an example block with a `pui-btn` snippet
  When the page is rendered
  Then a preview tab renders the snippet as HTML and a code tab shows the same snippet highlighted at build time, the highlighted markup is present in the generated HTML file, and no string constant holding example HTML exists under the source directory
  Covers: REQ-3, REQ-10
- AC-4:
  Given the v1 folder has `01.getting-started/`, `04.components/` and `05.forms/` with `.navigation.yml` titles and numerically prefixed pages
  When the navigation is rendered for v1
  Then sections and pages appear in prefix order with the titles from `.navigation.yml`, URLs carry no numeric prefixes, and no file under the source directory lists sections or pages
  Covers: REQ-4
- AC-5:
  Given the versions configuration lists `v1` (latest) and `v0` (deprecated)
  When routing, navigation and the generators run
  Then each reads the same configuration file and no other file lists versions
  Covers: REQ-5
- AC-6:
  Given the reader is on `/docs/components/chip` and `content/v0/` has no `components/chip.md`
  When the reader switches to v0
  Then `/docs/v0/` opens with a notice naming "chip" and "0.23"; and given `components/button` exists in both, switching from `/docs/components/button` opens `/docs/v0/components/button`, and switching back opens `/docs/components/button`
  Covers: REQ-6
- AC-7:
  Given the site is built
  When the build finishes
  Then a search document set and an assistant corpus exist in the build output, each entry carries `version` and `url`, the corpus entries are split by heading, and no hand-maintained content index exists in the repository
  Covers: REQ-8
- AC-11:
  Given the site is built with `nuxt generate`
  When the output directory is inspected
  Then every documentation route exists as a static HTML file, no server bundle is required to serve them, and the search document set and corpus files are present in the output
  Covers: NFR-2, REQ-8
- AC-12:
  Given the site is generated with at least one documentation page that contains an example block and code
  When Lighthouse (mobile) and the accessibility check of the build tests run against that page's static file
  Then performance is at least 90, accessibility is at least 95, and the accessibility check reports 0 WCAG 2.2 AA violations
  Covers: NFR-3
- AC-9:
  Given a maintainer adds `content/v1/components/float.md` with valid frontmatter and an example block
  When the site is rebuilt
  Then the page renders, appears in the navigation and in the generated search document set, and `git diff --stat` shows only the new Markdown file (0 changes to `.vue`, `.ts` or `.json` files)
  Covers: NFR-1, REQ-1, REQ-4, REQ-8
- AC-10:
  Given a Markdown file with a missing `title`, another with an unregistered MDC component, and two files resolving to the same slug
  When the site is built
  Then the build exits with a non-zero status and the messages name each file and the cause
  Covers: REQ-2, REQ-3, REQ-11

## Assumptions

- ASSUMPTION-1: Phase P-1 splits into this spec (F-1, F-2, F-10, F-12), a landing and migration guide spec (F-3, F-4), a search spec (F-5) and the design phase; the 1.0 pages are written against this model once it renders fixtures. Safe because: the split follows the PRD's feature list and readiness section and can be re-cut before the backlog.
- ASSUMPTION-2: Build-time Shiki is the only highlighter; no runtime highlighting is needed for Markdown content. Safe because: decision 6 adopts Nuxt Content, whose highlighting is built in, and every code sample lives in Markdown.

## Open questions

- OPEN-1 (resolved 2026-09-23): latest version at `/docs/<path>`, older versions at `/docs/<major>/<path>` (user).
- OPEN-2 (resolved 2026-09-23): fully static generation (user).
- OPEN-3 (reframed): the Algolia account that held the index was deactivated, so the site has no live search provider. Blocks: nothing in this spec (REQ-8 produces the document set either way); blocks the search feature. Recommended: client-side search over the generated document set (a small in-browser index built at generate time), because it needs no account, no keys and no external request, works on static hosting, and the assistant corpus comes from the same build; recreate Algolia only if hosted search analytics are wanted.
- OPEN-4 (resolved 2026-09-23): WCAG 2.2 AA and Lighthouse accessibility at or above 95 on mobile (user, PRD M-4); now NFR-3.
- OPEN-5 (resolved 2026-09-23): Lighthouse performance at or above 90 on mobile (user, PRD M-4); now NFR-3. A transfer budget per page was not set.
- OPEN-6: Browser support matrix for the site. Blocks: nothing in this spec. Recommended: the same browsers perfectui 1.0 targets (`ARCHITECTURE.md` §9).
- OPEN-7: Do pages of a non-latest version show a persistent banner ("You are reading the 0.23 documentation", link to latest), as Tailwind's older sites do? Blocks: nothing in this spec (phase 2 switcher). Recommended: yes.

## Readiness

- Ready for architecture: yes. OPEN-1, OPEN-2, OPEN-4 and OPEN-5 are resolved; OPEN-3 (search provider) blocks the search feature, not this one; OPEN-6 and OPEN-7 do not block any requirement here. The design `docs/engineering/designs/markdown-content-model.md` and its ADRs must be revised against this version in the engineering phase (drop the Removals section and the transitional findings).
