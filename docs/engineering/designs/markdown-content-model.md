# Design: Markdown content model with versioned folders

- Owner: eng-architecture
- Status: draft (revised 2026-09-24 for the from-scratch rebuild, the final URL scheme and the approved documentation page design)
- Date: 2026-09-24
- Specification: docs/product/specs/markdown-content-model.md
- Frameworks and versions relied on (registry checked 2026-09-24, all pinned exactly): nuxt 4.5.2, @nuxt/content 3.16.1, vue 3.5.43, vue-router 5.3.1, tailwindcss 4.3.3 with @tailwindcss/vite 4.3.3, @chrissgon/perfectui 1.0.0-beta.1 (dist-tag `beta`), better-sqlite3 13.0.3 (build-time need of Nuxt Content), typescript 6.0.3 (7.0.2 is outside typescript-eslint's peer range `>=4.8.4 <6.1.0`), vue-tsc 3.3.11, @nuxt/eslint 1.17.0 with eslint 10.11.0, vitest 5.0.1, @playwright/test 1.63.0, @axe-core/playwright 4.13.0, lighthouse 13.5.0. Documentation read: Nuxt Content (content.nuxt.com: collections/define, files/markdown, utils/query-collection-navigation, utils/query-collection-search-sections, accessed 2026-09-23); Nitro config (nitro.build/config) and Netlify provider (nitro.build/deploy/providers/netlify, accessed 2026-09-24); Netlify redirects (docs.netlify.com/manage/routing/redirects/rewrites-proxies, shadowing and splats, accessed 2026-09-24); Tailwind v4 Nuxt guide (tailwindcss.com, accessed 2026-09-23)

## Summary

Documentation is Markdown under `content/v1/` and `content/v0/`, two Nuxt Content collections whose paths carry the version (`/docs/v1/...`, `/docs/v0/...`). One page route validates the version segment against the versions configuration, loads the page from that version's collection and renders it inside the documentation layout of the approved design: sidebar from the folder tree, page header with badges from frontmatter, prose with example blocks and callouts, on-page headings, previous and next links. `nuxt generate` prerenders every page plus three generated files built from the same configuration and collections: the search document set, the assistant corpus and the Netlify `_redirects` that sends unversioned `/docs` paths to the current major. A content validator fails the build on the edge cases the engine does not enforce. Adding a page is one Markdown file.

## Sources

- `docs/product/specs/markdown-content-model.md` (REQ-1 to REQ-8, REQ-10, REQ-11; REQ-9 withdrawn; NFR-1 to NFR-3; EDGE-1 to EDGE-9; AC-1 to AC-7, AC-9 to AC-12)
- `docs/design/handoff/documentation-page.md` (components, layout per width, behaviour, motion, tokens, deviations DEV-1 to DEV-7) and `docs/design/design-system.md` (code highlighting from the role inks, OPEN-1 resolved 2026-09-24)
- `docs/workbench/state.md` decisions of 2026-09-23 and 2026-09-24: URL scheme (final), static generation on Netlify, restart from scratch, pinned versions, perfectui 1.0.0-beta.1, lessons from the T-cm-1 review
- `docs/engineering/reviews/T-cm-1.md` on branch `redesign-incremental` (TypeScript range, `data-pui-mode`, SEO meta at setup, client guards, no `--passWithNoTests`)
- The documentation pages listed in the header; ADR-0001 to ADR-0006

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | URL scheme | `/docs/<major>/<section>/<slug>` for every version; unversioned `/docs` paths redirect to the current major | decided | user answer 2026-09-23 |
| 2 | Hosting mode | fully static with `nuxt generate`, served by Netlify | decided | user answer 2026-09-23 |
| 3 | Content engine | Nuxt Content v3 with MDC | decided | brief decision 6 |
| 4 | Collections | one collection per major, prefix `/docs/<major>` | engineering | ADR-0001 (revised) |
| 5 | Example block | fenced snippet in the slot, preview derived from it | engineering | ADR-0002 |
| 6 | Generated artifacts | prerendered server routes with validation | engineering | ADR-0003 |
| 7 | Navigation and ordering | folders, numeric prefixes, `.navigation.yml` | engineering | ADR-0004 (accepted) |
| 8 | Unversioned redirects | a generated `_redirects` file with two non-forced rules | engineering | ADR-0005 |
| 9 | Code highlighting colours | Shiki with a CSS-variables theme bound to the role inks | engineering | ADR-0006 |
| 10 | Version switch | same path if it exists, else the version index with a notice | decided | brief decision 7 |
| 11 | Documentation layout | the approved export (direction A), content from Markdown, sidebar breakpoint 1024 px | decided | user, 2026-09-24; handoff |
| 12 | Tests | Vitest for pure functions, Playwright over the generated output, axe and Lighthouse in the build tests | engineering | library repository convention; no viable alternative worth an ADR |
| 13 | Source layout | Nuxt 4 default: `app/` for the application, `content/`, `server/`, `public/` at the root | engineering | Nuxt 4 default (learned in T-cm-1); no alternative worth an ADR |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Content collections | hold every page per major with a validated schema | `content/v1/**`, `content/v0/**`, `content.config.ts` | Markdown files | pages with `path`, `title`, `description`, `tags`, `since`, `changed`, `navigation`, `body` | REQ-1, REQ-2, REQ-11, NFR-1 |
| Versions configuration | the single list of versions | `app/versions.ts` | none | `versions[]`, `latestVersion` | REQ-5 |
| Documentation page | validate the version segment, load the page, set SEO meta at setup, render it | `app/pages/docs/[version]/[...slug].vue` | route params, versions configuration | rendered page, 404 for an unknown version or path | REQ-1, REQ-6 |
| Version index page | list a version's sections and pages; show the switch notice | `app/pages/docs/[version]/index.vue` | version, `missing` query | index markup | REQ-1, REQ-6, EDGE-1 |
| Documentation layout | three columns at 1280 px, sidebar panel below 1024 px, header and footer of the shell | `app/layouts/docs.vue` | page, navigation | page frame | REQ-4, NFR-3 |
| Navigation composable | the navigation tree of one version | `app/composables/useDocsNav.ts` | version | `ContentNavigationItem[]` | REQ-4, EDGE-5 |
| Sidebar | collapsible sections, current page marked | `app/components/DocSidebar.vue` | navigation tree, current path | sidebar markup | REQ-4 |
| Page header | section label, title, description, "Added in" and "Changed in" badges | `app/components/DocHeader.vue` | page fields, section title | header markup | REQ-7 |
| Example block | Preview and Code tabs, language label, copy control from one fenced snippet | `app/components/content/Example.vue` (MDC `::example`) | default slot with one fenced ```html block | preview, highlighted code, copy | REQ-3, REQ-10, EDGE-7 |
| Callouts | note and warning boxes in prose | `app/components/content/Note.vue`, `Warning.vue` (MDC `::note`, `::warning`) | default slot | callout markup | REQ-3 |
| On-page headings | h2 list with the current heading highlighted; a disclosure below 1024 px | `app/components/DocToc.vue` | page `body.toc` | headings markup | REQ-4 |
| Pager and edit link | previous and next page in navigation order; link to the source file | `app/components/DocPager.vue` | navigation tree, current path, file path | links | REQ-4 |
| Version switch composable | the target route when switching version | `app/composables/useVersionSwitch.ts` | current path, target version | route to the same path, or the index with `missing` | REQ-6, EDGE-1 |
| Code theme | Shiki colours bound to the site's code tokens in both modes | `content.config.ts` highlight option, `app/assets/css/code.css` | design-system code colours | highlighted markup with CSS variables | REQ-10 |
| Content validator | checks the collections for the edge cases the engine does not enforce | `server/utils/validateDocs.ts` | all collections, versions configuration | ok, or an error naming file and cause | EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9 |
| Search document generator | the search document set | `server/routes/api/search-index.json.get.ts` | collections, versions | `api/search-index.json` | REQ-8, EDGE-8 |
| Assistant corpus generator | the corpus split by heading | `server/routes/api/assistant-corpus.json.get.ts` | collections, versions | `api/assistant-corpus.json` | REQ-8, EDGE-8 |
| Redirects generator | the Netlify redirect rules for unversioned paths and for the 0.23 site's flat URLs | `server/routes/_redirects.get.ts` | versions configuration, latest collection | `_redirects` at the output root | REQ-1, REQ-5 |
| Build configuration | content module, prerender routes, fail on error, Tailwind, fonts | `nuxt.config.ts` | none | static output | NFR-2, EDGE-8 |

## Data or content model

Folder layout (ADR-0004; prefixes stripped from paths):

```
content/
├── v1/
│   ├── 01.getting-started/   .navigation.yml (title: Getting started); 01.installation.md … 05.license.md
│   ├── 02.customization/     dark-mode, theme-color
│   ├── 03.general/           layout-group, float
│   ├── 04.components/        accordion … tooltip (11 pages)
│   └── 05.forms/             field-group … switch (8 pages)
└── v0/                       the 0.23 pages, same relative paths where the topic exists (release R-2)
```

Collections (`content.config.ts`, API from content.nuxt.com/docs/collections/define):

```ts
const docsSchema = z.object({
  title: z.string(), description: z.string(), tags: z.array(z.string()).default([]),
  since: z.string().optional(), changed: z.string().optional(),
})
export default defineContentConfig({ collections: {
  docs_v1: defineCollection({ type: 'page', source: { include: 'v1/**', prefix: '/docs/v1' }, schema: docsSchema }),
  docs_v0: defineCollection({ type: 'page', source: { include: 'v0/**', prefix: '/docs/v0' }, schema: docsSchema }),
} })
```

Versions configuration (`app/versions.ts`), the only file that names versions:

```ts
export const versions = [
  { id: 'v1', label: '1.x', collection: 'docs_v1', latest: true },
  { id: 'v0', label: '0.23', collection: 'docs_v0', deprecated: true },
] as const   // prefix is always `/docs/${id}`; v0 is listed when its folder ships (R-2)
```

| Validation rule | Comes from | Enforced by |
|-----------------|------------|-------------|
| `title` and `description` present | EDGE-2 | schema; re-checked by the validator so the message names the file |
| unregistered MDC component | EDGE-3 | validator scans `::name` blocks against `app/components/content/`; prerender fails on render errors |
| duplicate slug in a version | EDGE-4 | validator: two documents with one `path` in a collection |
| `since` newer than the folder's major | EDGE-6 | validator |
| internal link to a missing page | EDGE-9 | validator: `/docs/<major>/...` targets must exist in that collection (warning) |
| empty artifact | EDGE-8 | generator throws; `failOnError` stops the build |

## Contracts

### Routes
| Route | Resolves to | Serves |
|-------|-------------|--------|
| `/docs/<major>` | version index page; notice when `?missing=<path>` | REQ-1, REQ-6, EDGE-1 |
| `/docs/<major>/<section>/<slug>` | the page with that `path` in the version's collection; 404 otherwise | REQ-1, REQ-11 |
| `/docs` and `/docs/<anything without a version>` | 301 to `/docs/<latest>` and `/docs/<latest>/<same path>` through `_redirects` | REQ-1 |
| `/api/search-index.json`, `/api/assistant-corpus.json`, `/_redirects` | prerendered static files | REQ-8, REQ-1 |

### Files and generated artifacts
| Path | Produced by | Shape (example) | Serves |
|------|-------------|-----------------|--------|
| `content/<major>/<nn>.<section>/<nn>.<slug>.md` | authors | frontmatter `title`, `description`, `tags`, `since?`, `changed?`; body with `::example`, `::note`, `::warning` | REQ-1, REQ-2, NFR-1 |
| `.output/public/_redirects` | redirects generator | one line per latest page for the 0.23 site's flat URL (`/docs/tooltip /docs/v1/components/tooltip 301`), then `/docs /docs/v1 301` and `/docs/* /docs/v1/:splat 301`; non-forced, so existing versioned files are served first (Netlify shadowing) | REQ-1, REQ-5 |
| `.output/public/api/search-index.json` | search generator | `[{ "id", "version": "v1", "url": "/docs/v1/components/button#styles", "title", "section": "Components", "titles": ["Button", "Styles"], "content": "…" }]` | REQ-8 |
| `.output/public/api/assistant-corpus.json` | corpus generator | `[{ "id", "version", "url", "titles": [...], "level": 2, "content": "…" }]` from `queryCollectionSearchSections` | REQ-8 |

### Component interfaces
| Component | Props / inputs | Slots / events | Serves |
|-----------|----------------|----------------|--------|
| `Example` (MDC `::example`) | `lang?` (label, default `html`) | default slot: one fenced ```html block; emits nothing | REQ-3, REQ-10 |
| `Note`, `Warning` | none | default slot: Markdown | REQ-3 |
| `DocHeader` | `section`, `title`, `description`, `since?`, `changed?` | none | REQ-7 |
| `DocSidebar` | `items`, `currentPath` | none | REQ-4 |
| `DocToc` | `links` (from `body.toc`) | none | REQ-4 |
| `DocPager` | `prev?`, `next?`, `editUrl` | none | REQ-4 |

## Flows

### Build
1. `nuxt generate`: Nuxt Content parses both folders into their collections with the schema.
2. Prerender crawls from `/` and `/docs/v1` and renders every page; MDC renders examples with Shiki-highlighted code (CSS-variables theme).
3. Prerender fetches the routes in `nitro.prerender.routes`: `/api/search-index.json`, `/api/assistant-corpus.json` and `/_redirects`; each JSON handler runs `validateDocs()` first; outputs land in `.output/public/`.
4. `nitro.prerender.failOnError: true`: any thrown validation error stops the build with its message.

### Render a documentation page
1. `[version]/[...slug].vue`: reject an unknown version (404); build the path `/docs/<version>/<slug>`; call `useSeoMeta` at setup with the page's title and description.
2. Query the version's collection for the path; 404 when absent.
3. `docs` layout: `DocSidebar` from `useDocsNav(version)`, `DocHeader`, the MDC body, `DocToc`, `DocPager`.

### Switch version (release R-2; the shell reserves the control)
1. `useVersionSwitch(currentPath, target)` strips `/docs/<current>`, queries the target collection for `/docs/<target>/<relative>`.
2. Found: navigate there; not found: `/docs/<target>?missing=<relative>`, whose index shows "<page> does not exist in <label>".

### Failure paths
| EDGE | Caught by | What happens | Message names |
|------|-----------|--------------|---------------|
| EDGE-1 | `useVersionSwitch`, version index | index of the target with the notice | page, version label |
| EDGE-2 | schema, `validateDocs` | build stops | file, field |
| EDGE-3 | `validateDocs`, prerender | build stops | file, component |
| EDGE-4 | `validateDocs` | build stops | both files, slug |
| EDGE-5 | navigation tree | an empty folder yields no node | none |
| EDGE-6 | `validateDocs` | build stops | file, `since`, folder major |
| EDGE-7 | `Example` styles | preview and code scroll inside their box | none |
| EDGE-8 | generators | throw; build stops | artifact, version |
| EDGE-9 | `validateDocs` | warning in the build log | file, target |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | fixtures `components/button.md` in both versions; assert `docs/v1/components/button/index.html` and `docs/v0/...` exist, no `docs/components/...` file, and `_redirects` holds one flat rule per v1 page (`/docs/button /docs/v1/components/button 301`) followed by the two rules for `v1` | build assertion | `tests/build/routes.spec.ts` |
| AC-2 | fixtures with `since` and `changed`; assert badge texts; query returns both fields | e2e + unit | `tests/e2e/badges.spec.ts`, `tests/unit/schema.spec.ts` |
| AC-3 | page with one `::example`; preview renders a `pui-btn`, the code tab holds Shiki markup in the static HTML; no example HTML string under `app/` | e2e + repository check | `tests/e2e/example.spec.ts`, `tests/repo/no-inline-examples.spec.ts` |
| AC-4 | fixtures with three prefixed sections; navigation in prefix order with `.navigation.yml` titles, URLs without prefixes; no file under `app/` lists sections | e2e + repository check | `tests/e2e/navigation.spec.ts` |
| AC-5 | literal version ids appear only in `app/versions.ts`; routing, navigation, generators import it | repository check + unit | `tests/repo/versions.spec.ts` |
| AC-6 | switch from a v1-only page to v0 lands on the index with the notice; a shared page maps to the same path and back | e2e | `tests/e2e/version-switch.spec.ts` (R-2) |
| AC-7 | both JSON artifacts exist, entries have `version` and `url`, corpus entries have `level` and `titles`; no hand-maintained index file | build assertion | `tests/build/artifacts.spec.ts` |
| AC-8 | withdrawn in the specification with REQ-9 (nothing to remove in a rebuild) | none | none |
| AC-9 | add a fixture page, rebuild, assert route, navigation entry and search entry; the diff is one `.md` | build assertion | `tests/build/add-page.spec.ts` |
| AC-10 | three invalid fixtures; `nuxt generate` exits non-zero naming each file | build assertion | `tests/build/validation.spec.ts` |
| AC-11 | every collection route exists as `index.html`, the three generated files are present, no server bundle is needed | build assertion | `tests/build/static.spec.ts` |
| AC-12 | Lighthouse mobile on the Button page's static file: performance ≥ 90, accessibility ≥ 95; axe reports 0 WCAG 2.2 AA violations | build test | `tests/quality/lighthouse.spec.ts`, `tests/quality/axe.spec.ts` |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1 | collections, documentation page, version index, routes, redirects generator, ADR-0001, ADR-0005 |
| REQ-2 | schema, validation rules, ADR-0004 |
| REQ-3 | Example block, callouts, ADR-0002 |
| REQ-4 | navigation composable, sidebar, on-page headings, pager, ADR-0004 |
| REQ-5 | versions configuration, redirects generator |
| REQ-6 | version switch composable, version index, switch flow |
| REQ-7 | page header |
| REQ-8 | generators, generated artifacts, ADR-0003 |
| REQ-9, AC-8 | withdrawn in the specification (nothing to remove in a rebuild) |
| REQ-10 | Example block, code theme, ADR-0006 |
| REQ-11 | folder layout, routes |
| NFR-1, NFR-2, NFR-3 | collections and AC-9; build configuration and AC-11; layout and AC-12 |
| EDGE-1 to EDGE-9 | failure paths, validation rules |
| AC-1 to AC-7, AC-9 to AC-12 | verification plan |

## Assumptions to verify before implementation

- Nitro writes a prerendered route whose handler returns `text/plain` without an extension (`/_redirects`) as a file named `_redirects`, not `_redirects/index.html`; fallback in ADR-0005.
- Recovering the raw snippet from the highlighted slot of `Example` during prerender (ADR-0002, option A): the first task is the spike; fallback option C.
- Nuxt Content 3.16 accepts a Shiki theme object in `build.markdown.highlight.theme`, so the CSS-variables theme of ADR-0006 can be passed; fallback in ADR-0006.
- `queryCollectionNavigation` reads `.navigation.yml` titles and orders by numeric prefix inside one collection (documented; confirm on the first fixture).
- Netlify serves `/docs/v1/` from `docs/v1/index.html` before evaluating the splat rule (shadowing, documented); confirm on the first deploy preview.

## Open questions

- Q1 (resolved 2026-09-24): the 0.23 site's flat URLs get one redirect each to the 1.0 page of the same topic (user).
- Other items: the specification's open items that touch this feature are resolved; OPEN-6 (browser matrix) and OPEN-7 (older-version banner) do not block it and are handled in release R-2.
