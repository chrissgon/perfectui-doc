# Workbench state

- Project: perfectui-doc
- Current flow: none (phases run skill by skill: product, then design, then engineering, then AI)
- Current phase: engineering, release R-2 implemented locally (T-ld-1 to T-ld-5 done and reviewed; milestones LD1 and LD2 met on branch `redesign` and on the library's branch `v1`); next: the user approves pushing the library's branch `v1` (a6a86c6, 652748d), then the site's branch, then the release on `main`
- Updated: 2026-09-25

## Autonomy

- Checkpoints: every-phase

## Artifacts

| Artifact | Owner skill | Status | Updated |
|----------|-------------|--------|---------|
| docs/engineering/architecture.md (codebase map of the 0.23 site, which now lives on branch main) | eng-codebase-map | approved | 2026-09-23 |
| docs/workbench/briefs/perfectui-doc-redesign.md | core-clarify | approved | 2026-09-23 |
| docs/product/specs/markdown-content-model.md (revised 2026-09-23 for the rebuild) | product-feature-spec | draft | 2026-09-23 |
| docs/product/specs/landing-and-site-shell.md | product-feature-spec | draft | 2026-09-23 |
| docs/product/specs/migration-guide.md | product-feature-spec | draft | 2026-09-23 |
| docs/product/specs/search.md | product-feature-spec | draft | 2026-09-23 |
| docs/product/roadmap.md (R-2 redefined 2026-09-25: F-13, F-6; F-7 not planned) | product-roadmap | draft | 2026-09-25 |
| docs/design/flows.md | design-ux-flows | draft | 2026-09-23 |
| docs/design/design-system.md | design-system | draft | 2026-09-23 |
| docs/marketing/messaging.md | mkt-messaging | draft | 2026-09-24 |
| docs/design/screens/landing.md (written by the retired design-ui; kept as the structural record of the composed Figma frame) | design-ui (retired) | draft | 2026-09-23 |
| docs/design/briefs/landing.md | design-brief | draft | 2026-09-24 |
| docs/design/briefs/documentation-page.md | design-brief | draft | 2026-09-24 |
| docs/design/briefs/og-image.md | design-brief | draft | 2026-09-24 |
| docs/design/results/landing.md | design-execute | approved | 2026-09-24 |
| docs/design/results/documentation-page.md | design-execute | approved | 2026-09-24 |
| docs/design/results/og-image.md | design-execute | draft | 2026-09-24 |
| docs/design/screens/landing-page/ and docs/design/screens/docs-button/ (approved exports from Claude Design, HTML and full-page PNG) | design-execute | approved | 2026-09-24 |
| docs/design/handoff/landing.md | design-handoff | draft | 2026-09-24 |
| docs/design/handoff/documentation-page.md | design-handoff | draft | 2026-09-24 |
| docs/engineering/designs/markdown-content-model.md (revised 2026-09-24: versioned URLs, generated redirects, documentation layout from the handoff) | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0001-one-collection-per-major-version.md (revised 2026-09-24) | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0002-example-block-single-source.md | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0003-generated-artifacts-as-prerendered-routes.md | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0004-navigation-from-folders-and-numeric-prefixes.md | eng-architecture | approved | 2026-09-23 |
| docs/engineering/adr/0005-unversioned-redirects-as-generated-netlify-rules.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0006-code-highlighting-with-css-variables.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/designs/landing-and-site-shell.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/designs/migration-guide.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/designs/search.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0007-library-size-measured-at-build-with-gzip-n.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0008-showcase-renders-named-example-blocks-from-the-docs.md | eng-architecture | draft | 2026-09-24 |
| docs/engineering/adr/0009-client-side-search-with-minisearch.md | eng-architecture | draft | 2026-09-24 |
| docs/product/specs/library-docs-and-versions.md | product-feature-spec | draft | 2026-09-25 |
| docs/engineering/designs/library-docs-and-versions.md | eng-architecture | draft | 2026-09-25 |
| docs/engineering/adr/0010-pages-generated-from-the-library-before-the-build.md | eng-architecture | draft | 2026-09-25 |
| docs/engineering/plans/prune-old-library-versions.md (40 git tags, 5 GitHub releases, 57 npm versions up to 0.20.0) | none (ordinary work) | approved | 2026-09-25 |
| docs/product/backlog.md (R-1: 48 tasks done; R-2: 5 tasks T-ld-1 to T-ld-5, milestones LD1 and LD2) | product-backlog | draft | 2026-09-25 |
| docs/product/prd.md (F-13 added, F-6 revised, F-7 retired, P-2 redefined on 2026-09-25) | product-prd | draft | 2026-09-25 |

## Decisions

- 2026-09-25: The 0.23 site is removed entirely; its documentation is read in the library repository at tag `v0.23.0` (`docs/`); PRD F-7 retired (user)
- 2026-09-25: One source for the documentation: the library's `docs/` and `MIGRATION.md` are the pages, converted by the site before each build from the installed version's tag (option A, ADR-0010) (user)
- 2026-09-25: Production: branch `main` is replaced by the new site through a merge commit whose tree is `redesign`'s (option b), at the end of R-2, with its own approval (user)
- 2026-09-25: The 0.23 flat-URL redirects are removed ("quase nada utiliza perfectui hoje") (user)
- 2026-09-25: Versions are supported from now on: the header's version badge is the trigger of a version menu (user)

- 2026-09-25: The site's theme-coloured text (`--site-theme-ink`) derives from `--pui-theme` (30% of the text colour mixed in, at least 4.78:1 for every preset), so the theme picker recolours the whole site; the success, warn, error and muted inks stay fixed (user)

- 2026-09-25: User review of the branch deploy, twelve adjustments (eng-implement, reviewed in docs/engineering/reviews/user-review-2026-09-25.md): code wraps and never scrolls; the theme picker keeps its five presets and loses the colour input; `/docs/<major>` redirects to the version's first page and the index page is removed; the sidebar and the "On this page" disclosure are `pui-accordion` items drawn as the documentation-page export; content fills its column below 1280 px (72ch only beside the headings column); the example block drops its language label and copy falls back to the legacy copy command before selecting (user)

- 2026-09-25: Lighthouse mobile on the Netlify branch deploy after the trailing-slash fix, median of 3: landing 94, Button page 100, migration guide 99; accessibility 98-100; T-mg-5 closed on the host measurement (user's option 1)

- 2026-09-25: Verified on the Netlify branch deploy https://redesign--perfectui.netlify.app: library size 3,221 and 493 B (ADR-0007 accepted); the 0.23 redirects answer 301 to the versioned pages and unknown paths 404 (ADR-0005's shadowing assumption holds); documentation pages lost their content after hydration behind Netlify's trailing-slash redirect, fixed in 1e1ba8c (eng-root-cause)

- 2026-09-25: The header shows only the "Perfect UI" wordmark, without the "P" mark; the mark stays as the favicon (user)

- 2026-09-25: The production site lists only v1 in `app/versions.ts` until the converted 0.23 pages ship in R-2 (a listed version with no page fails the build, EDGE-8); content-model tests run on a fixture site built from `tests/fixtures/site`, which lists v0 (eng-implement T-cm-22; to confirm with the user)

- 2026-09-25: Below 1024 px a documentation page's header shows only the sidebar menu (approved export); GitHub and Figma links live inside that sidebar panel and in the footer, satisfying REQ-7 at narrow widths (user, T-sh-4 review finding 1)

- 2026-09-23: Project initialized for the workbench; autonomy every-phase. (core-project-init, confirmed by user)
- 2026-09-23: perfectui-doc will be radically changed, not only migrated to perfectui v1 and updated; the scope of that change is the user's to define and must be clarified before any engineering work (user)
- 2026-09-23: Redesign scope (core-clarify round 1): an entirely new design implementing perfectui 1.0; documentation authored in Markdown and rendered from it instead of hand-written Vue pages; a version switcher so older versions stay documented while new ones are added; an AI assistant for conversation, running in the visitor's browser to avoid hosting costs, possibly replacing Algolia search if fast enough (user)
- 2026-09-23: Audience for the 1.0 site: both evaluators comparing libraries and existing users migrating from 0.23 (user)
- 2026-09-23: Stack stays Nuxt (SSR, SEO) and Tailwind (utility classes); perfectui is used for the site's own components. The workbench's dogfooding recommendation to drop Tailwind was withdrawn: perfectui's bare-minimum positioning is against component libraries, not against utility layers or frameworks (user)
- 2026-09-23: Assistant at launch: experiment behind a flag with WebGPU detection, opt-in download and retrieval over the docs; search stays for everyone (core-clarify round 2) (user)
- 2026-09-23: Versioning: versions as content folders in one site, one build, one search index and one assistant corpus with a version filter; the Tailwind one-site-per-major model was considered and rejected (core-clarify round 2) (user)
- 2026-09-23: Markdown pipeline: Nuxt Content v3 with MDC components inside Markdown; verified that any Vue component can be used in Markdown (core-clarify round 2) (user)
- 2026-09-23: Versioning mechanics confirmed: one content folder per major (content/v1, content/v0), since/changed frontmatter badges for additions in minors, navigation derived per version, same-path mapping on version switch with fallback to the version index and a notice; a future v2 is a new folder and v1 freezes (user)
- 2026-09-23: Decommission the current assistant: it was an old implementation on the ChatGPT Assistants API over a WebSocket; remove the integration and the 'Now with Chat GPT' badge until the new in-browser assistant ships (user)
- 2026-09-23: Phase order approved: 1 content model + 1.0 documentation + new design; 2 version switcher + 0.23 archive; 3 assistant experiment behind a flag (user)
- 2026-09-23: URL scheme (first decision, superseded the same day): the latest version at /docs/<path>; every other version at /docs/<major>/<path> (spec OPEN-1) (user)
- 2026-09-23: URL scheme (final): every version, including the latest, is served at /docs/<major>/<section>/<slug> (for example /docs/v1/components/button) and /docs/<major> is that version's index; /docs and /docs/<section>/<slug> redirect to the same path under the current major; the section segment stays in the URL because navigation derives from folders (user, replacing the first decision; consequence accepted: links to the current documentation change at the next major)
- 2026-09-23: Hosting: fully static generation with nuxt generate on Netlify; generators for the search document set and the assistant corpus run inside the build (spec OPEN-2) (user)
- 2026-09-23: The Algolia account that held the perfectui index was deactivated; the site currently has no live search provider. The search provider is an open decision for the search feature (spec OPEN-3) (user)
- 2026-09-23: Spec amended: sections and order come from folder structure with numeric prefixes and .navigation.yml, not from frontmatter (ADR-0004 accepted) (user)
- 2026-09-23: All work on the redesign happens on branch redesign, cut from main (user)
- 2026-09-23: Dependencies at their latest stable versions, verified on the npm registry at implementation time and pinned in package.json (versions recorded in the spec and the design) (user)

- 2026-09-23: The site is rebuilt from scratch instead of migrated: branch redesign restarted as an orphan branch holding only AGENTS.md, docs/, LICENSE and .gitignore; main keeps the 0.23 site; the incremental attempt (T-cm-1 done, reviewed) is kept as branch redesign-incremental for reference. The 0.23 pages are deleted with everything else and re-implemented under the new design (user)
- 2026-09-23: The 0.23 documentation stays in scope as version v0: its 32 Vue pages on main are converted to Markdown under content/v0 as a content task (user)
- 2026-09-23: Area order for the rebuild, one phase at a time with review between phases: product (PRD, revised specs, roadmap, backlog), then design, then engineering, then AI (user)
- 2026-09-23: The new design is produced in the design tool through the available design-tool integration, generated by AI from the product and design artifacts and reviewed by the user, not drawn by hand (user)
- 2026-09-23: Lessons carried from the reviewed incremental attempt (redesign-incremental, docs/engineering/reviews/T-cm-1.md): pin TypeScript 6.0.3 (7.x is outside typescript-eslint's peer range); use data-pui-mode from the start, never a hard-coded dark class; call useSeoMeta at setup so prerendered pages carry Open Graph meta; no pass-with-no-tests flag once a test exists; never create browser-only handles at component setup without a client guard (eng-code-review)

- 2026-09-23: Search ships in phase 1; quality targets: Lighthouse performance at or above 90 and accessibility at or above 95 on mobile for the landing and one documentation page, WCAG 2.2 AA (PRD M-4); no adoption target at launch, the npm weekly downloads baseline of 213 is recorded and revisited three months after launch (user, PRD OPEN-1 to OPEN-3)
- 2026-09-23: The landing page's sections and texts are defined later, with AI assistance in a marketing messaging step, before the landing is designed; the landing spec states what the page must let the evaluator do, not its copy (user, PRD OPEN-5)

- 2026-09-23: The library package will not ship MIGRATION.md; the site keeps its own copy of the guide, updated by hand at each release, because few projects use perfectui and a migrating user can read the new classes directly (user, migration-guide spec OPEN-1)
- 2026-09-23: The header keeps the Figma link, since the file exists today (user, landing spec OPEN-2)
- 2026-09-23: Search provider: a client-side index generated at build time over the document set, on the condition that the reader's experience matches what Algolia DocSearch gave (results as you type, ranking, highlighting, typo tolerance); what is not replicated is Algolia's hosted analytics dashboard (user, state OPEN-3)

- 2026-09-23: The 1.0 documentation content starts from the library repository's docs/*.md (27 files, sections per its docs/README.md), copied into content/v1 with the html blocks turned into example blocks and kept in sync by hand per release; the site adds sections and examples of its own (for example a page recommending Tailwind) and is not limited to the library's files (user)
- 2026-09-23: The library's DESIGN-SYSTEM.md is the input for building the perfectui components in the design tool only; it does not define the site's design or the landing (user)
- 2026-09-23: The design is produced in the existing design-tool draft "PerfectUI-Doc" (file key 0aZSp3JcotPUKeduf8BCzi), not in a new file (user) — superseded the same day
- 2026-09-23: Corrected: the design lives in the existing perfectui project file (key szD991W25tQxPuqhfRektk), which has a "Site" page with the 0.23 site's design (desktop and mobile frames in Poppins) and, on each component page, the UI kit's v1 documentation frames in the new design (Inter, pui variables, glow header band); the site's design follows that v1 language (colours, spacing, type, framed containers); the scope in the design tool is the website's screens only, the library itself is not documented there (user). The variables, text styles and foundations page built earlier in the draft 0aZSp3JcotPUKeduf8BCzi are left in that draft and not reused
- 2026-09-23: No brand phase: the site keeps the current logo and the library's default theme colour (#0092CD light, #07B6F0 dark); typography is decided in design-system with a question to the user (user)
- 2026-09-23: The landing's messaging (sections and texts) is produced with AI assistance right before the landing screen is designed, inside the design phase (user)

- 2026-09-23: Site typography: Inter for text and interface, Fira Code for code, both self-hosted with font-display swap; Poppins, forced by 0.23, is not used (user)

- 2026-09-23: The site's type scale is the UI kit documentation's (42, 24, 16/24, 12) plus a 56 px display for the landing hero; the `site/*` text styles are written into the design file; the website screens are built on a new page "Site v1", leaving the "Site" page with the 0.23 design untouched (user)
- 2026-09-23: The landing page comes first and gets the most care: a creative design with animations, faithful to perfectui, with tailwindcss.com's landing as inspiration; the documentation page follows the same pattern afterwards; the messaging step (sections and texts) precedes the landing design as decided earlier (user)

- 2026-09-23: The WEB code syntax of the 66 `pui` variables in the design file is filled with the custom properties of perfectui.css so the design tool's developer mode shows `var(--pui-…)` (user)
- 2026-09-23: The landing's visual direction is explored in an external AI design tool from a self-contained brief written by design-ui (Figma Make for the first round; Claude Design and Gamma are the alternatives the user has), because the frame composed through the integration (`Landing / 1280 / light`) was reviewed as structurally right but too basic next to tailwindcss.com and laravel.com. The workbench keeps the guidelines, the brief and the review (core-critique against the brief's criteria); the final page is implemented in code and validated against the brief and the screen document; the composed frame stays the structural reference, and its dark and narrow variants wait for the chosen direction (user)
- 2026-09-24: The perfectui design system was built in Claude Design from the library repository with an onboarding prompt, and the landing produced there (Claude Design result, direction "editor and canvas" with the display number) is approved; round 2 completes 360 px, dark mode and the remaining sections, with the theme blue as default accent and the supporting line kept as one sentence (user)
- 2026-09-24: Design skills produce the inputs and a specialized AI design tool or a code prototype produces the design: design-brief writes the brief, design-execute runs it and records the results; design-ui is retired (user)
- 2026-09-24: The documentation page design is direction A, "Canvas first", exported from Claude Design and placed in docs/design/screens/docs-button; directions B and C were not run (user)
- 2026-09-24: The site pins `@chrissgon/perfectui` 1.0.0-beta.1, a new release of the library carrying the muted-text contrast fix the design uses; `perfectui.css` measures 3,235 B gzip, and the landing's size block reads it at build (user)
- 2026-09-24: Highlighted code uses the role inks (tags theme ink, attributes warn ink, values success ink, punctuation muted); design-system OPEN-1 closed (user)
- 2026-09-24: The explanatory sentences the design tool wrote for the documentation page are adopted into the v1 content, each checked against the library's documentation (user)
- 2026-09-24: No separate designs for 360 px: narrow layouts are built in code from the flows' rules; dark mode is the exports' own toggle, rendered as references in docs/design/handoff/<screen>/reference/, to be replaced by the user's dark PNGs when added (user)
- 2026-09-24: The share image (`og:image`) is the user's own perfectui thumbnail, used on every page; the three generated directions are not used; a 1200 × 630 PNG or JPG version is requested (user)
- 2026-09-24: The user updated the documentation page export to be responsive; its 1024 px breakpoint for the sidebar replaces the flows' 768 px, and both exports now serve as the narrow and dark references (user)
- 2026-09-24: Architecture decisions confirmed: 0.23 flat URLs redirect to the 1.0 page of the same topic; the mode toggle cycles light → dark → system; every size on the landing is measured with `gzip -9 -n`, the competitors' method (user)
- 2026-09-24: The library's Tailwind guide was wrong for Tailwind v4 (layered utilities) and for Preflight in both versions; rewritten in the library repository with measured cases, and the site declares `@layer theme, base, pui, components, utilities;` (user asked for the fix)
- 2026-09-24: The library's light-mode solid labels (theme, success, warn) stay below WCAG AA as an accepted trade-off for 1.0, because the darker fills that pass read too dark; accessibility checks exclude only that rule on those elements; revisiting it is a later library change (user)

## Open questions
- [x] What does the radical change of perfectui-doc include and exclude? Run core-clarify with the user before flow-improve-code or flow-build-feature
- [x] Versioning model: versions as content folders in one site, or one deployment per version with a switcher across them? (core-clarify round 2)
- [x] Markdown pipeline: a content module with components inside Markdown, or custom Markdown-to-HTML rendering? (core-clarify round 2)
- [x] AI assistant at launch: experiment behind a flag with search kept, or replacement of search? What happens to the current WebSocket assistant backend? (core-clarify round 2)
- [x] Confirm versioning mechanics: one folder per major, since/changed frontmatter badges for minor additions, navigation derived per version, same-path mapping on switch with fallback to the version index (brief decision 7)
- [x] Confirm decommissioning the current WebSocket assistant and removing the landing badge until the new assistant ships (brief decision 8)
- [x] Confirm phase order: 1 content model + 1.0 docs + design; 2 version switcher + 0.23 archive; 3 assistant experiment (brief)
- [x] Search provider for launch: client-side search over the generated document set (user, 2026-09-23)
- [x] Which parts of the content-model spec, design and backlog survive the restart? Spec revised 2026-09-23 (REQ-9 withdrawn); design and backlog follow in their phases (PRD OPEN-6)
- [x] Should the library package ship MIGRATION.md so the site can verify its copy at build time? No (user, 2026-09-23)
- [x] Does the header keep a Figma link? Yes (user, 2026-09-23)
- [x] Search in phase 1 or phase 2? Quality targets (performance, accessibility)? Adoption target? (PRD OPEN-1 to OPEN-3, answered 2026-09-23)
- [x] Amend REQ-2 and REQ-4 of the content-model spec to folder-based sections and numeric-prefix ordering, as ADR-0004 proposes? (design open question 1)

- [x] Search latency (100 ms under 4x CPU throttling) and first-open size budget (300 KB compressed) as recommended? Yes (user, 2026-09-23)
- [x] Keep the migration guide as a must for launch? Yes; only the npm package does not ship it (user, 2026-09-23)

- [x] Mode toggle cycles light → dark → system (user, 2026-09-24)
- [x] Messaging PROOF-1 corrected to `gzip -9 -n`: 3,221 B and 493 B (user, 2026-09-24)
- [x] One redirect per 0.23 flat URL to the 1.0 page of the same topic (user, 2026-09-24)
- [x] Landing SECTION-6 body corrected to the measured behaviour, kept short: "One `@layer` line keeps Tailwind's reset below perfectui and every utility above it." (user, 2026-09-24)
- [x] Solid labels below AA in light mode (theme 3.50, success 3.30, warn 3.19): trade-off accepted for 1.0; PRD M-4 amended with the exception (user, 2026-09-24)
- [ ] Later (library): revisit the light-mode solid fills or labels of theme, success and warn to reach AA without a palette that reads too dark (user, 2026-09-24: not now)
- [ ] Later (library): `pui-modal` sets no `margin` and relies on the browser's `margin: auto` to centre the dialog; Tailwind v4's Preflight sets `margin: 0` on every element, so under Tailwind a modal opens in the top-left corner even with the layer order the Tailwind guide recommends. Found on the documentation site (T-cm-18), which restores the margin itself; the library should set it, and its Tailwind guide should mention it (eng-code-review, 2026-09-25)
- [ ] Later (library): the checkbox `indeterminate` fallback applies the attribute once at load and again only on the next pointerdown or focusin, so markup rendered later (client-side navigation, a framework re-render) shows a plain checkbox until the reader interacts; a MutationObserver or an exported `applyIndeterminate()` would cover it. The documentation site applies the property itself in its example block (T-cm-19) (eng-code-review, 2026-09-25)
- [ ] Start converting the 32 v0 pages during release 1, in parallel, once the content model renders? (roadmap OPEN-1)

- [x] `/docs` is its own index page and every version is served under its own segment, `/docs/<major>/<section>/<slug>`, with `/docs/...` redirecting to the current major (user, 2026-09-23; flows OPEN-1 and the URL scheme decision)
- [x] Search entry point on narrow screens: header icon (user, 2026-09-23)

- [x] Open Graph image: the user's own thumbnail (2026-09-24)
- [x] 1200 × 630 version of the thumbnail provided (user, 2026-09-24)
- [x] Which perfectui version does the site pin? 1.0.0-beta.1 (user, 2026-09-24)
- [x] Close design-system OPEN-1 with the export's syntax colours? Yes (user, 2026-09-24)
- [x] Adopt the design tool's explanatory sentences into the v1 content? Yes, after checking each (user, 2026-09-24)
- [x] Round 2 in Claude Design for 360 px and dark mode? Not needed: narrow in code, dark from the exports' toggle (user, 2026-09-24)
- [ ] Show the v0 version switch before the v0 archive exists? Recommended: design it now, hide it in the build until v0 ships (documentation-page brief OPEN-1)
- [x] Site type scale: the kit documentation's scale (user, 2026-09-23); layout values (72ch, 1280 frame, header 56, sidebar 272, headings column 208, gutters 16/32) still as proposed, to confirm with the docs page (design-system OPEN-2)

- [x] Landing messaging: compared libraries named with versions and date; headline "The bare minimum for elegant interfaces" with "Three classes, no framework, 3.2 kB" beneath; no "used by" section (user, 2026-09-23)

## Approvals

- 2026-09-25: `git push origin v1` in `chrissgon/perfectui` with a743a3d (HANDOFF.md, annotated release tag), a6a86c6 (Tailwind guide) and 652748d (documents marked for the site); `todo.txt` stays uncommitted (user: "Sim")

- 2026-09-25: Delete the 40 git tags of `chrissgon/perfectui` other than `v0.20.1`, `v0.21.1`, `v0.23.0`, `v1.0.0-beta.0`, `v1.0.0-beta.1` (list and command in `docs/engineering/plans/prune-old-library-versions.md`), after the user has deleted the 5 GitHub releases in the web UI; the npm unpublish of the 57 versions up to 0.20.0 is run by the user (user: "Unpublish", "Sim, remova")

- 2026-09-25: `git push origin redesign` with 1e1ba8c (trailing-slash fix, pages as `<route>.html`) and 5325535 (host confirmations) (user)

- 2026-09-25: `git push origin redesign` with commit 664cea3 (publish `dist/` on Netlify) to retry the branch deploy (user)

- 2026-09-25: `git push origin redesign` with commit a86fde7 (Node's built-in SQLite, better-sqlite3 removed) to retry the Netlify branch deploy (user)

- 2026-09-25: `git push origin redesign` with the SR1 commits (T-sr-1 to T-sr-5), the state update and the header wordmark change; it triggers the Netlify branch deploy of `redesign` for T-mg-5's measurement (user)

- 2026-09-25: Deploy preview for R-1 (user, option 1 of the T-mg-5 decision): `git push -u origin redesign` to github.com/chrissgon/perfectui-doc, then a draft pull request redesign → main only to trigger the Netlify Deploy Preview; no merge. Purpose: measure Lighthouse on the host, confirm `gzip` on the build image (T-sh-6) and the generated redirects (ADR-0005).

| Scope | What | Approved | Expires | Status |
|-------|------|----------|---------|--------|
| standing | commit approved artifacts and reviewed code on branch `redesign` without asking again (pushes and pull requests excluded) | 2026-09-23 | until revoked | active |
