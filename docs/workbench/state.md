# Workbench state

- Project: perfectui-doc
- Current flow: none (phases run skill by skill: product, then design, then engineering, then AI)
- Current phase: product
- Updated: 2026-09-23

## Autonomy

- Checkpoints: every-phase

## Artifacts

| Artifact | Owner skill | Status | Updated |
|----------|-------------|--------|---------|
| docs/engineering/architecture.md (codebase map of the 0.23 site, which now lives on branch main) | eng-codebase-map | approved | 2026-09-23 |
| docs/workbench/briefs/perfectui-doc-redesign.md | core-clarify | approved | 2026-09-23 |
| docs/product/specs/markdown-content-model.md (to revise for the restart: drop REQ-9 and the migration constraints) | product-feature-spec | draft | 2026-09-23 |
| docs/engineering/designs/markdown-content-model.md (to revise for the restart: drop Removals and the transitional findings) | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0001-one-collection-per-major-version.md | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0002-example-block-single-source.md | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0003-generated-artifacts-as-prerendered-routes.md | eng-architecture | draft | 2026-09-23 |
| docs/engineering/adr/0004-navigation-from-folders-and-numeric-prefixes.md | eng-architecture | approved | 2026-09-23 |
| docs/product/backlog.md (superseded by the restart; to re-cut after the PRD) | product-backlog | draft | 2026-09-23 |

## Decisions

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
- 2026-09-23: URL scheme: the latest version is served at /docs/<path>; every other version at /docs/<major>/<path> (spec OPEN-1) (user)
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

## Open questions
- [x] What does the radical change of perfectui-doc include and exclude? Run core-clarify with the user before flow-improve-code or flow-build-feature
- [x] Versioning model: versions as content folders in one site, or one deployment per version with a switcher across them? (core-clarify round 2)
- [x] Markdown pipeline: a content module with components inside Markdown, or custom Markdown-to-HTML rendering? (core-clarify round 2)
- [x] AI assistant at launch: experiment behind a flag with search kept, or replacement of search? What happens to the current WebSocket assistant backend? (core-clarify round 2)
- [x] Confirm versioning mechanics: one folder per major, since/changed frontmatter badges for minor additions, navigation derived per version, same-path mapping on switch with fallback to the version index (brief decision 7)
- [x] Confirm decommissioning the current WebSocket assistant and removing the landing badge until the new assistant ships (brief decision 8)
- [x] Confirm phase order: 1 content model + 1.0 docs + design; 2 version switcher + 0.23 archive; 3 assistant experiment (brief)
- [ ] Search provider for launch: client-side search over the generated document set (recommended) or a recreated Algolia index? (spec OPEN-3)
- [ ] Which parts of the content-model spec, design and backlog survive the restart? To be answered by the product phase after the PRD (restart decision)
- [x] Amend REQ-2 and REQ-4 of the content-model spec to folder-based sections and numeric-prefix ordering, as ADR-0004 proposes? (design open question 1)

## Approvals

| Scope | What | Approved | Expires | Status |
|-------|------|----------|---------|--------|
