# Design: Markdown content model with versioned folders

- Owner: eng-architecture
- Status: draft
- Date: 2026-09-23
- Specification: docs/product/specs/markdown-content-model.md
- Frameworks and versions relied on (latest stable on the registry, 2026-09-23): nuxt 4.5.2, @nuxt/content 3.16.1, vue 3.5.43, tailwindcss 4.3.3, @chrissgon/perfectui 0.23.0, vitest 5.0.1, @playwright/test 1.63.0, @nuxt/eslint 1.17.0, typescript 7.0.2; Tailwind 4.3.3 through the Vite plugin `@tailwindcss/vite` 4.3.3, as the library repository already does; the stable line of `@nuxtjs/tailwindcss` (6.14.0) targets Tailwind 3 and is not used. Tailwind 4 in Nuxt is registered as a Vite plugin (`vite: { plugins: [tailwindcss()] }`) with `@import "tailwindcss"` in `app/assets/css/main.css` listed under `css` (tailwindcss.com/docs/installation/framework-guides/nuxt, guide for v4.3, accessed 2026-09-23). Documentation read: Nuxt Content (content.nuxt.com, pages "collections/define", "collections/types", "files/markdown", "utils/query-collection-navigation", "utils/query-collection-search-sections", accessed 2026-09-23); Nitro prerender configuration (nitro.build/config, accessed 2026-09-23); Nuxt as installed in this repository (`nuxt.config.ts` already passes `nitro` options)

## Summary

Documentation becomes two Nuxt Content collections, one per major version, each mapping a folder under `content/` to its route prefix (`/docs` for v1, `/docs/v0` for v0). A single catch-all page resolves the version from the URL, queries the page, and renders it with MDC; the `::example` block renders a preview and a highlighted code tab from one fenced snippet. Navigation comes from the folder tree and numeric prefixes; badges come from `since` and `changed` frontmatter declared in the schema. `nuxt generate` prerenders every page and two server routes that produce the search document set and the assistant corpus from the same collections, validating the content and failing the build on violations. The old assistant, its badge, `docs.json`, the highlight worker and the CDN stylesheet are removed.

## Sources

- `docs/product/specs/markdown-content-model.md` (REQ-1 to REQ-11, NFR-1, NFR-2, EDGE-1 to EDGE-9, AC-1 to AC-11)
- `docs/engineering/architecture.md` (codebase map: `pages/docs.vue`, `pages/docs/*.vue`, `shared/constants.ts`, `Organism.ComponentExample.vue`, `Molecule.CodeWorker.vue`, `public/highlight-worker.js`, `Organism.AssistantChatGPT.vue`, `nuxt.config.ts`, `docs.json`)
- `docs/workbench/state.md` decisions of 2026-09-23 (URL scheme, static generation, Algolia account deactivated)
- Nuxt Content v3 documentation pages listed above; Nitro configuration reference
- ADR-0001, ADR-0002, ADR-0003, ADR-0004

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | URL scheme | every version at `/docs/<major>/<section>/<slug>`, unversioned `/docs/...` redirects to the current major (revised 2026-09-23; this design predates the revision and is revised in the engineering phase) | decided | user answer 2026-09-23 |
| 2 | Hosting mode | fully static, `nuxt generate` | decided | user answer 2026-09-23 |
| 3 | Content engine | Nuxt Content v3 with MDC | decided | brief decision 6 |
| 4 | Collections | one collection per major version | engineering | ADR-0001 |
| 5 | Example block | fenced snippet in the slot, preview derived from it | engineering | ADR-0002 |
| 6 | Generated artifacts | prerendered server routes with validation | engineering | ADR-0003 |
| 7 | Navigation and ordering | folders, numeric prefixes, `.navigation.yml` | engineering; spec amended 2026-09-23 | ADR-0004 (accepted) |
| 8 | Version switch behaviour | same path if it exists, else version index with notice | decided | brief decision 7 |
| 9 | Removals | assistant integration, badge, `docs.json`, highlight worker and CDN stylesheet | decided | brief decisions 6, 8; REQ-9, REQ-10 |
| 10 | Test tooling | Vitest for composables, Playwright against the generated output | engineering | convention of the library repository (`perfectui` uses Playwright); no viable alternative worth an ADR |
| 11 | Library versions | latest stable of every dependency, pinned in `package.json`, verified on the registry on 2026-09-23 | decided | user answer 2026-09-23 |
| 12 | Branch | all work on branch `redesign` cut from `main` | decided | user answer 2026-09-23 |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Content collections | hold every documentation page per major version with a validated schema | `content/v1/**`, `content/v0/**`, `content.config.ts` | Markdown files | queryable pages with `path`, `title`, `description`, `tags`, `since`, `changed`, `navigation` | REQ-1, REQ-2, REQ-11, NFR-1 |
| Versions configuration | the single list of versions with id, label, collection, prefix, latest and deprecated flags | `app/versions.ts` | none | `versions[]` | REQ-5 |
| Docs page | resolve the version from the URL, load the page from its collection, render it | `pages/docs/[...slug].vue` | route params, versions configuration | rendered page, 404 when absent | REQ-1, REQ-6 |
| Navigation composable | the navigation tree for the selected version | `composables/useDocsNav.ts` | version | `ContentNavigationItem[]` | REQ-4, EDGE-5 |
| Version switch composable | the target route when switching version from the current page | `composables/useVersionSwitch.ts` | current path, target version | route to same path, or version index with notice payload | REQ-6, EDGE-1 |
| Page header | title, description and the `since` / `changed` badges | `components/DocsPageHeader.vue` | page fields | header markup | REQ-7 |
| Example block | preview and code tab from one fenced snippet | `components/content/Example.vue` | default slot (fenced ```html) | preview (`v-html`), code tab (slot) | REQ-3, REQ-10, EDGE-7 |
| Content validator | checks the collections for the edge cases the engine may not enforce | `server/utils/validateDocs.ts` | all collections | ok, or an error naming file and cause | EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9 |
| Search document generator | the search document set as a prerendered route | `server/api/search-index.json.get.ts` | collections, versions configuration | `api/search-index.json` in the output | REQ-8, EDGE-8 |
| Assistant corpus generator | the corpus split by heading as a prerendered route | `server/api/assistant-corpus.json.get.ts` | collections | `api/assistant-corpus.json` in the output | REQ-8, EDGE-8 |
| Build configuration | content module, prerender routes, fail on error | `nuxt.config.ts` | none | static output | NFR-2, EDGE-8 |
| Removal set | delete the old assistant, badge, worker, CDN stylesheet, `docs.json`, `NAV_SECTIONS` | see Removals | none | none | REQ-4, REQ-9, REQ-10 |

## Data or content model

Folder layout (ADR-0004; prefixes stripped from paths, zero-padded, `.` separator):

```
content/
├── v1/
│   ├── 01.getting-started/
│   │   ├── .navigation.yml          # title: Getting started
│   │   ├── 01.installation.md
│   │   ├── 02.typescript.md
│   │   ├── 03.tailwind-css.md
│   │   └── 04.license.md
│   ├── 02.customization/            # dark mode, theme color
│   ├── 03.general/                  # group, styles
│   ├── 04.components/               # button, chip, badge, card, list, table, timeline, accordion, modal, dropdown, tooltip, float
│   └── 05.forms/                    # field group, input, input group, checkbox, radio, switch
└── v0/                              # the 0.23 pages, same relative paths where the topic exists
```

Collections (`content.config.ts`; API from content.nuxt.com/docs/collections/define):

```ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const docsSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  since: z.string().optional(),     // version string, for example "1.2"
  changed: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    docs_v1: defineCollection({ type: 'page', source: { include: 'v1/**', prefix: '/docs' }, schema: docsSchema }),
    docs_v0: defineCollection({ type: 'page', source: { include: 'v0/**', prefix: '/docs/v0' }, schema: docsSchema }),
  },
})
```

Built-in fields used: `path` (generated from location, prefix applied), `title`, `description`, `navigation` (`false` hides a page), `body`. Validation rules and where they run:

| Rule | Comes from | Enforced by |
|------|------------|-------------|
| `title` and `description` present | EDGE-2 | collection schema; re-checked by the validator so the build message names the file |
| unknown MDC component | EDGE-3 | MDC rendering at prerender (unknown component fails the page) and the validator scanning `::name` blocks against the registered list |
| duplicate slug in a version | EDGE-4 | validator: two documents with the same `path` in one collection |
| `since` newer than the major | EDGE-6 | validator: `since` major must equal the folder's major |
| broken internal link | EDGE-9 | validator: every `/docs/...` link target exists in the same collection (warning) |
| empty artifact | EDGE-8 | generator throws; `failOnError` stops the build |

Versions configuration (`app/versions.ts`):

```ts
export const versions = [
  { id: 'v1', label: '1.x', collection: 'docs_v1', prefix: '/docs', latest: true },
  { id: 'v0', label: '0.23', collection: 'docs_v0', prefix: '/docs/v0', deprecated: true },
] as const
```

## Contracts

### Routes
| Route | Params | Resolves to | Serves |
|-------|--------|-------------|--------|
| `/docs` | none | index of the latest version | REQ-1 |
| `/docs/<path>` | path | page `path` in `docs_v1` | REQ-1, REQ-11 |
| `/docs/v0` | none | index of v0 (with the switch notice when arriving from a missing page) | REQ-6, EDGE-1 |
| `/docs/v0/<path>` | path | page `/docs/v0/<path>` in `docs_v0` | REQ-1, REQ-11 |
| `/docs/v1/<path>` | | not published (latest has no segment) | AC-1 |
| `/api/search-index.json` | none | prerendered static file | REQ-8 |
| `/api/assistant-corpus.json` | none | prerendered static file | REQ-8 |

Version resolution in `pages/docs/[...slug].vue`: if the first segment equals the `id` of a non-latest version, use that version and the remaining segments; otherwise use the latest version and all segments.

### Files and generated artifacts
| Path | Produced by | Shape (example) | Consumed by | Serves |
|------|-------------|-----------------|-------------|--------|
| `content/<major>/<nn>.<section>/<nn>.<slug>.md` | authors | frontmatter `title`, `description`, `tags`, `since?`, `changed?`; body with `::example` blocks | collections | REQ-1, REQ-2, NFR-1 |
| `content/<major>/<nn>.<section>/.navigation.yml` | authors | `title: Components` | navigation | REQ-4 |
| `.output/public/api/search-index.json` | search document generator | `[{ "id", "version": "v1", "url": "/docs/components/button", "title", "description", "tags": [], "section": "Components", "titles": ["Components", "Button"], "content": "<section text>" }]` | search feature (OPEN-3 decides the consumer) | REQ-8 |
| `.output/public/api/assistant-corpus.json` | assistant corpus generator | `[{ "id", "version", "url", "titles": [...], "level": 2, "content": "<section text>" }]` (one entry per heading section, from `queryCollectionSearchSections`) | assistant (phase 3) | REQ-8 |

### Component interfaces
| Component | Props / inputs | Slots / events | Serves |
|-----------|----------------|----------------|--------|
| `Example` (MDC `::example`) | none | default slot: one fenced ```html block | REQ-3, REQ-10 |
| `DocsPageHeader` | `title`, `description`, `since?`, `changed?` | none | REQ-7 |
| version switch control (phase 2) | `versions`, `current` | emits `switch(versionId)`; uses `useVersionSwitch` | REQ-6 |

## Flows

### Build
1. `nuxt generate` — Nuxt Content parses `content/v1/**` and `content/v0/**` into `docs_v1` and `docs_v0` with the schema (schema errors fail here or in the validator)
2. Prerender crawls from `/` and `/docs` and renders every page route; MDC renders `::example` blocks with Shiki-highlighted fenced code
3. Prerender fetches `/api/search-index.json` and `/api/assistant-corpus.json` (listed in `nitro.prerender.routes`); each handler runs `validateDocs()` then queries `queryCollectionSearchSections` and `queryCollection` per version; results are written to `.output/public/api/` (Nitro: fetched during the build and copied to the output as static assets)
4. `failOnError: true` — any thrown validation error stops the build with the message

### Render a documentation page
1. `pages/docs/[...slug].vue` — resolve version and path
2. collection query for `path` — the page document, or 404
3. `DocsPageHeader` — title, description, badges from `since` / `changed`
4. MDC renderer — body with `Example` blocks (preview from the snippet, code tab from the highlighted slot)
5. `useDocsNav(version)` — navigation tree of the same version

### Switch version
1. version control emits `switch(target)`
2. `useVersionSwitch(currentPath, target)` — strip the current prefix, query the target collection for `prefix + relativePath`
3. found: navigate to it; not found: navigate to the target's index with `?missing=<relativePath>` and render the notice "This page does not exist in <label>"

### Failure paths
| EDGE | Where it is caught | What happens | Message names |
|------|--------------------|--------------|---------------|
| EDGE-1 | `useVersionSwitch` | index of the target version with the notice | page slug, version label |
| EDGE-2 | schema or `validateDocs` | build stops | file, missing field |
| EDGE-3 | MDC render or `validateDocs` | build stops | file, component name |
| EDGE-4 | `validateDocs` | build stops | both files, the slug |
| EDGE-5 | navigation tree | folder without pages produces no node | none |
| EDGE-6 | `validateDocs` | build stops | file, `since` value, folder major |
| EDGE-7 | `Example` styles | preview box scrolls; page width unchanged | none |
| EDGE-8 | generator handlers | throw; `failOnError` stops the build | artifact name, version |
| EDGE-9 | `validateDocs` | warning in the build log | file, link target |

## Removals

| Removed | Replaced by | Must keep working | Checked by |
|---------|-------------|-------------------|------------|
| `components/Organism.AssistantChatGPT.vue`, `runtimeConfig.public.SEARCH_ENDPOINT`, `localStorage["assistant:thread"]`, "Now with Chat GPT" badge in `pages/index.vue` | nothing until phase 3 | landing page renders without the badge | AC-8 |
| `public/highlight-worker.js`, `components/Molecule.CodeWorker.vue`, `assets/highlight.css`, the jsDelivr highlight stylesheet in `app.vue` | Shiki at build time | code tabs highlighted | AC-3, AC-8 |
| `docs.json` | generated artifacts | search document set and corpus exist after build | AC-7 |
| `shared/constants.ts` `NAV_SECTIONS` | navigation tree from folders | navigation renders per version | AC-4 |
| `pages/docs/*.vue` hand-written pages, `components/Organism.ComponentExample.vue` and `CODE_VIEW_*` constants | Markdown pages and `Example` | pages render from Markdown | AC-1, AC-3 |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | build a fixture with `components/button.md` in both versions; assert both routes exist in `.output/public` and `/docs/v1/...` does not | build assertion | `tests/build/routes.spec.ts` (Playwright over the generated output) |
| AC-2 | page fixtures with `since` and `changed`; assert badge text; assert the fields are returned by a collection query | e2e + unit | `tests/e2e/badges.spec.ts`, `tests/unit/schema.spec.ts` |
| AC-3 | page with one `::example`; assert preview renders `pui-btn` element and the code tab contains highlighted tokens; grep repository for `CODE_VIEW_` | e2e + repository check | `tests/e2e/example.spec.ts`, `tests/repo/removals.spec.ts` |
| AC-4 | fixtures with three sections; assert navigation order; grep for `NAV_SECTIONS` | e2e + repository check | `tests/e2e/navigation.spec.ts`, `tests/repo/removals.spec.ts` |
| AC-5 | grep for the literal version ids outside `app/versions.ts`; unit test that routing, navigation and generators import `versions` | repository check + unit | `tests/repo/versions.spec.ts` |
| AC-6 | e2e: switch from a v1-only page → v0 index with notice; switch from a shared page → same path; switch back | e2e | `tests/e2e/version-switch.spec.ts` |
| AC-7 | after build, assert both JSON files exist, every entry has `version` and `url`, corpus entries have `level` and `titles`; assert `docs.json` absent | build assertion | `tests/build/artifacts.spec.ts` |
| AC-8 | grep the repository for `SEARCH_ENDPOINT`, `assistant:thread`, `AssistantChatGPT`, "Now with Chat GPT"; assert the three files do not exist | repository check | `tests/repo/removals.spec.ts` |
| AC-9 | add a fixture page, rebuild, assert route, navigation entry and search entry; `git diff --stat` limited to the new `.md` | build assertion | `tests/build/add-page.spec.ts` |
| AC-10 | three invalid fixtures; run `nuxt generate`; assert non-zero exit and messages naming each file | build assertion | `tests/build/validation.spec.ts` |
| AC-11 | after `nuxt generate`, assert every route from the collections exists as `index.html` under `.output/public` and the two artifacts are present; no server bundle required | build assertion | `tests/build/static.spec.ts` |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1 | Components (collections, docs page), Routes, ADR-0001 |
| REQ-2 | Data model (schema), Validation rules, ADR-0004 (amendment) |
| REQ-3 | Example block, ADR-0002 |
| REQ-4 | Navigation composable, Removals, ADR-0004 |
| REQ-5 | Versions configuration |
| REQ-6 | Version switch composable, Switch version flow |
| REQ-7 | Page header |
| REQ-8 | Generators, Files and generated artifacts, ADR-0003 |
| REQ-9 | Removals |
| REQ-10 | Example block, Removals |
| REQ-11 | Folder layout, Routes, ADR-0001 |
| NFR-1 | Content collections, AC-9 |
| NFR-2 | Build configuration, Build flow, AC-11 |
| EDGE-1 to EDGE-9 | Failure paths, Validation rules |
| AC-1 to AC-11 | Verification plan |

## Assumptions to verify before implementation

- `@chrissgon/perfectui` 1.0.0-beta.0 is published under the `beta` dist-tag (`latest` is 0.23.0, registry checked 2026-09-23); install it as `@chrissgon/perfectui@beta` and pin the exact version; confirm the package exports listed in the library's `package.json` resolve from the published build.
- (verified 2026-09-23, T-cm-1) TypeScript 7.0.2 is rejected by typescript-eslint ("does not support TS 7.0", peer range `<6.1.0`); TypeScript 6.0.3 is pinned (review of T-cm-1). Nuxt Content requires `better-sqlite3` (13.0.3) at build time. `@nuxtjs/algolia` supports Nuxt 3 only and is replaced by a local `useAlgoliaSearch` stub until the search feature; Nuxt 4's `noUncheckedIndexedAccess` is disabled transitionally (T-cm-16 re-enables it).
- Recovering the raw snippet text from the highlighted slot of `Example` during server rendering (ADR-0002, option A): proven by the spike task; fallback is option C.
- Whether Nuxt Content fails `nuxt generate` on a schema violation or only warns: the validator re-checks, so the build fails either way; verify which message appears first.
- `queryCollectionNavigation` reads `.navigation.yml` titles per folder and orders by numeric prefix inside one collection: documented; confirm on the first fixture.
- Nuxt passes `nitro.prerender.routes` and `failOnError` from `nuxt.config.ts` to Nitro: the repository already passes `nitro.compressPublicAssets`; confirm the two keys on the first build (`failOnError` accepted in T-cm-1).

## Findings from implementation

- Layout: the repository adopts Nuxt 4's default source directory. Component paths in this design read as `app/pages/docs/[...slug].vue`, `app/components/content/Example.vue`, `app/components/DocsPageHeader.vue`, `app/composables/*.ts`, `app/versions.ts`; `server/`, `content/` and `public/` stay at the root (T-cm-1, 2026-09-23).
- Rule for new code: never create browser-only handles (`BroadcastChannel`, `Worker`, `WebSocket`, timers) at component setup without an `import.meta.client` guard. Two unguarded channels in 0.23-era components kept the `nuxt generate` process alive after a successful build; guarded in T-cm-1. This belongs in the project's `AGENTS.md` conventions.
- `<html class="dark">` is kept for the old templates (`[.dark_&]` selectors); perfectui 1.0 expects `data-pui-mode` (MIGRATION.md §5). The switch happens with the new design, not before.

## Open questions

- Q1 (resolved 2026-09-23): REQ-2 and REQ-4 amended; sections and order come from folders and numeric prefixes (ADR-0004 accepted by the user).
