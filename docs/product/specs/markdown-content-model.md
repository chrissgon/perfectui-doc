# Feature specification: Markdown content model with versioned folders

- Owner: product-feature-spec
- Status: draft (amended 2026-09-23: REQ-2, REQ-4, AC-4, constraints)
- Date: 2026-09-23
- Feature of: brief `docs/workbench/briefs/perfectui-doc-redesign.md`, phase 1 (content model, 1.0 documentation, new design)

## Summary

Documentation becomes Markdown files in versioned folders, rendered by Nuxt Content v3 with example blocks as components inside Markdown; navigation, the search document set and the assistant corpus derive from the same content. Adding or fixing a page means editing one Markdown file.

## Goal and users

- Problem: every documentation page is hand-written Vue with example code strings inside it, so any documentation fix means editing HTML; a separate hand-maintained `docs.json` duplicates the content and nothing reads it. Source: brief decision 1; `docs/engineering/architecture.md` (Observations).
- Users: maintainers writing documentation; readers evaluating the library or migrating from 0.23. Source: brief decision 2.
- Success: a new page is one Markdown file with no code change; the same file feeds the page, the navigation, the search document set and the assistant corpus; the folder structure holds 0.23 and 1.0 side by side.

## Scope

- In: content collections and folder layout per major version; frontmatter schema including `since` and `changed`; the example block component; navigation derived from content; version switch behaviour between existing folders; generation of the search document set and the assistant corpus from the collections; removal of the ChatGPT assistant integration and its badge; build-time code highlighting.
- Out: writing the 1.0 pages and migrating the 0.23 pages (feature "1.0 documentation content"); the new visual design (design phase); the version switcher control itself beyond routing (phase 2); the in-browser assistant (phase 3); search provider changes.

## Sources

- `docs/workbench/briefs/perfectui-doc-redesign.md`, decisions 1, 3, 4, 5, 6, 7, 8 (user, 2026-09-23)
- `docs/engineering/architecture.md` (codebase map, 2026-09-23): 32 hand-written pages under `pages/docs/`, `NAV_SECTIONS` constant in `shared/constants.ts`, `OrganismComponentExample` with preview and code tabs, `docs.json` unread, highlight worker loading highlight.js from a CDN, `Organism.AssistantChatGPT.vue` with `SEARCH_ENDPOINT`, landing badge in `pages/index.vue`
- Nuxt Content v3 documentation (content.nuxt.com, accessed 2026-09-23): collections configured in `content.config.ts`; "You can use any Vue component in your Markdown files."; Shiki highlighting; custom frontmatter fields must be declared in the schema to be queryable
- perfectui 1.0 inventory: `DESIGN-SYSTEM.md` §4 (17 components) and `ARCHITECTURE.md` §6 in the library repository; `package.json` exports (`./perfectui.css`, `./core.css`, `./components/*.css`, `./mode`, `./fallbacks/*`)
- Tailwind CSS documentation sites (v2, v3 subdomains, accessed 2026-09-23): older-version notice pattern

## Functional requirements

- REQ-1: Each documentation page is one Markdown file under `content/<major>/` (`content/v1/` for 1.x, `content/v0/` for 0.23) and is rendered at `/docs/<path>` for the latest version and `/docs/<major>/<path>` for every other version. Source: brief decisions 5, 6, 7; user answer 2026-09-23 (URL scheme).
- REQ-2: Each page declares frontmatter `title`, `description`, `tags`, and optionally `since` and `changed` (version strings); the schema is declared in `content.config.ts` so every field is queryable. Sections and order are not frontmatter: they come from the folder structure with numeric prefixes and a `.navigation.yml` per section folder (amended 2026-09-23, ADR-0004, user approval). Source: brief decision 7; Nuxt Content (custom fields must be in the schema; ordering by numeric prefixes).
- REQ-3: An example block is written in Markdown as an MDC component that receives the HTML snippet and renders a preview tab and a code tab, replacing `OrganismComponentExample` fed by hand-written `CODE_VIEW_*` constants. Source: brief decision 6; codebase map (component example tabs).
- REQ-4: Navigation sections and page order are computed from the selected version's folder tree (section folders with `.navigation.yml` titles, numeric prefixes for order, prefixes stripped from URLs), and `NAV_SECTIONS` in `shared/constants.ts` is removed (amended 2026-09-23, ADR-0004). Source: brief decision 7; codebase map (`NAV_SECTIONS`); Nuxt Content navigation tree.
- REQ-5: The list of versions (id, label, latest flag, deprecated flag) lives in one configuration file read by routing, navigation and the generators. Source: brief decision 7.
- REQ-6: When the reader switches version on a page whose slug exists in the target version, the same slug opens in that version; otherwise the target version's index opens with a notice naming the page and the version in which it does not exist. Source: brief decision 7.
- REQ-7: A page with `since` shows an "Added in <since>" badge and a page with `changed` shows a "Changed in <changed>" badge in the page header. Source: brief decision 7.
- REQ-8: A build step generates, from the collections, one search document set (url, title, description, tags, version, section) and one assistant corpus (page text split by heading, with version and url), replacing the hand-maintained `docs.json`, which is deleted. Source: brief decisions 4, 5 (one corpus with a version filter); codebase map (`docs.json` unread).
- REQ-9: The `Organism.AssistantChatGPT.vue` component, the `SEARCH_ENDPOINT` runtime configuration, the `assistant:thread` storage use and the "Now with Chat GPT" badge on the landing page are removed. Source: brief decision 8.
- REQ-10: Code in Markdown is highlighted at build time by Nuxt Content's Shiki; the runtime highlight worker (`public/highlight-worker.js`, `Molecule.CodeWorker.vue`, `assets/highlight.css`, the CDN stylesheet in `app.vue`) is removed. Source: brief decision 6; Nuxt Content v3 (Shiki); codebase map (worker and CDN).
- REQ-11: Every page slug used for a topic that exists in more than one version is the same in every version folder (for example `components/button` in both `content/v0/` and `content/v1/`). Source: brief decision 7 (same-path mapping).

## Non-functional requirements

- NFR-1: Adding a documentation page requires 0 changes to `.vue`, `.ts` or `.json` files: one Markdown file in the version folder is sufficient. Source: brief decision 1 (the user's stated goal); REQ-4 and REQ-8.
- NFR-2: The site is fully prerendered: 100% of documentation routes are static files produced by `nuxt generate`, 0 routes rendered on a server, and the generators of REQ-8 run inside that build. Source: user answer 2026-09-23 (static generation).

## Constraints

- Technical: Nuxt with Nuxt Content, Tailwind for utilities, perfectui 1.0 for the site's own components, all at their latest stable versions at implementation time, verified on the registry on 2026-09-23: nuxt 4.5.2, @nuxt/content 3.16.1, vue 3.5.43, tailwindcss 4.3.3, @chrissgon/perfectui 0.23.0, vitest 5.0.1, @playwright/test 1.63.0, @nuxt/eslint 1.17.0, typescript 6.0.3 (7.0.2 is rejected by typescript-eslint, whose peer range is `<6.1.0`; verified 2026-09-23); Tailwind 4.3.3 through the Vite plugin `@tailwindcss/vite` 4.3.3, as the library repository already does; the stable line of `@nuxtjs/tailwindcss` (6.14.0) targets Tailwind 3 and is not used; `@chrissgon/perfectui` 1.0.0-beta.0 is installed from the `beta` dist-tag; `better-sqlite3` 13.0.3 is required by Nuxt Content at build time. Source: brief decision 3; user answer 2026-09-23 (latest versions); registry.npmjs.org.
- Technical: MDC components are the only way to put interactive examples in Markdown; example HTML must be valid perfectui 1.0 markup (`pui-` classes). Source: brief decision 6; `ARCHITECTURE.md` §6.
- Operational: hosting on Netlify as a static site, deployment configured outside the repository. Source: `README.md`; codebase map; user answer 2026-09-23.
- Business: decisions 1 to 8 in the brief are fixed unless the user changes them. Source: brief.

## Edge cases

- EDGE-1: reader switches to v0 on a page that exists only in v1 → the v0 index opens with the notice "This page does not exist in 0.23" (REQ-6).
- EDGE-2: a Markdown file lacks a required frontmatter field (`title`, `section`, `order`) → the build fails and the error names the file and the missing field.
- EDGE-3: a Markdown file uses an MDC component that is not registered → the build fails and the error names the file and the component.
- EDGE-4: two files in the same version folder resolve to the same slug → the build fails naming both files.
- EDGE-5: a section declared in frontmatter has no pages in the selected version → the section is absent from that version's navigation.
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
  Then a preview tab renders the snippet as HTML and a code tab shows the same snippet highlighted, and no `CODE_VIEW_*` constant exists in the repository
  Covers: REQ-3, REQ-10
- AC-4:
  Given the v1 folder has `01.getting-started/`, `04.components/` and `05.forms/` with `.navigation.yml` titles and numerically prefixed pages
  When the navigation is rendered for v1
  Then sections and pages appear in prefix order with the titles from `.navigation.yml`, URLs carry no numeric prefixes, and `shared/constants.ts` no longer defines `NAV_SECTIONS`
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
  Then a search document set and an assistant corpus exist in the build output, each entry carries `version` and `url`, the corpus entries are split by heading, and `docs.json` is not in the repository
  Covers: REQ-8
- AC-11:
  Given the site is built with `nuxt generate`
  When the output directory is inspected
  Then every documentation route exists as a static HTML file, no server bundle is required to serve them, and the search document set and corpus files are present in the output
  Covers: NFR-2, REQ-8
- AC-8:
  Given the repository after this feature
  When searched
  Then no file references `SEARCH_ENDPOINT`, `assistant:thread`, `Organism.AssistantChatGPT` or the text "Now with Chat GPT", and `public/highlight-worker.js`, `Molecule.CodeWorker.vue` and `assets/highlight.css` do not exist
  Covers: REQ-9, REQ-10
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

- ASSUMPTION-1: Phase 1 splits into three features, "Markdown content model" (this spec), "1.0 documentation content" and "New design"; the others depend on this one. Safe because: the split follows the brief's phase 1 list and can be re-cut before the backlog.
- ASSUMPTION-2: Build-time Shiki replaces the runtime worker rather than coexisting with it. Safe because: decision 6 adopts Nuxt Content, whose highlighting is built in; two highlighters would duplicate styling and cost.
- ASSUMPTION-3: `docs.json` can be deleted because nothing reads it. Safe because: the codebase map searched the repository for readers and found none; the generators in REQ-8 replace it.

## Open questions

- OPEN-1 (resolved 2026-09-23): latest version at `/docs/<path>`, older versions at `/docs/<major>/<path>` (user).
- OPEN-2 (resolved 2026-09-23): fully static generation (user).
- OPEN-3 (reframed): the Algolia account that held the index was deactivated, so the site has no live search provider. Blocks: nothing in this spec (REQ-8 produces the document set either way); blocks the search feature. Recommended: client-side search over the generated document set (a small in-browser index built at generate time), because it needs no account, no keys and no external request, works on static hosting, and the assistant corpus comes from the same build; recreate Algolia only if hosted search analytics are wanted.
- OPEN-4: Accessibility target for the site. Blocks: nothing in this spec (design and pages features). Recommended: WCAG 2.1 AA, because perfectui's own components claim accessibility and the site is the showcase.
- OPEN-5: Performance budget per documentation page. Blocks: nothing in this spec. Recommended: Lighthouse performance 90 or higher on mobile and 200 KB or less transferred per page excluding fonts, measured on the build.
- OPEN-6: Browser support matrix for the site. Blocks: nothing in this spec. Recommended: the same browsers perfectui 1.0 targets (`ARCHITECTURE.md` §9).
- OPEN-7: Do pages of a non-latest version show a persistent banner ("You are reading the 0.23 documentation", link to latest), as Tailwind's older sites do? Blocks: nothing in this spec (phase 2 switcher). Recommended: yes.

## Readiness

- Ready for architecture: yes. OPEN-1 and OPEN-2 are resolved; OPEN-3 (search provider) blocks the search feature, not this one; OPEN-4 to OPEN-7 do not block any requirement here.
