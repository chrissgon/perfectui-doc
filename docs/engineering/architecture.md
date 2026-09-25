# Codebase map: perfectui-doc

- Owner: eng-codebase-map
- Status: draft
- Date: 2026-09-23
- Scope: repository root; 85 source files; measured with `scripts/map_codebase.py` of the workbench (static imports only; framework auto-imports, dynamic imports and runtime injection are not counted)

## Summary

perfectui-doc is the documentation site of the Perfect UI CSS/JS library, built with Nuxt ^3.11.1 and Vue ^3.4.21, styled with Tailwind through `@nuxtjs/tailwindcss` ^6.11.4 and with the library itself (`@chrissgon/perfectui` ^0.23.0, imported as CSS in `app.vue`). It is a file-routed single application: `pages/index.vue` is the landing page and `pages/docs.vue` is the documentation layout whose child routes are the 32 pages under `pages/docs/`. Every documentation page is hand-written Vue: sections, prose and the example code strings live inside the `.vue` file and are rendered through `OrganismComponentExample` (preview via `v-html`, code via a Web Worker that highlights with highlight.js loaded from a CDN). Navigation comes from a constant (`shared/constants.ts`, `NAV_SECTIONS`). The site talks to three external things: Algolia DocSearch (index `perfectui`) for search, a WebSocket endpoint configured by `SEARCH_ENDPOINT` for a ChatGPT-style assistant whose backend is not in this repository, and CDNs (jsDelivr, Google Fonts). There are no tests, no CI configuration and no deployment configuration in the repository; the published site is `https://perfectui.netlify.app` (README).

## Structure

```
perfectui-doc/
├── app.vue               # root: background layers, one MoleculeCodeWorker, <NuxtPage>; imports the library CSS; SEO meta
├── nuxt.config.ts        # modules (tailwind, algolia), head (dark class, lazy-icons script), runtimeConfig.public.SEARCH_ENDPOINT
├── pages/                # 34 files: index.vue (landing), docs.vue (docs layout), docs/*.vue (one page per topic)
├── components/           # 40 single-file components named Atom.*, Molecule.*, Organism.* (auto-imported by Nuxt)
├── shared/               # 5 TypeScript files: NAV_SECTIONS constant, interfaces, an Algolia DTO, one util; re-exported by index.ts
├── public/               # static assets and browser scripts: highlight-worker.js, lazy-icons.js, mousetrap.js (bundled library), sw.js (empty), images
├── assets/highlight.css  # highlight theme overrides
├── docs.json             # 110 KB content index (title, url, tags, description, examples per page); not read by any file in this repository
└── README.md, AGENTS.md, .eslintrc, tsconfig.json, package.json, bun.lockb
```

## Stack

| Layer | Technology | Evidence |
|-------|------------|----------|
| Framework | Nuxt ^3.11.1 (Vue ^3.4.21, Vue Router ^4.3.0) | `package.json` devDependencies; `nuxt.config.ts` |
| Styling | Tailwind via `@nuxtjs/tailwindcss` ^6.11.4; `@chrissgon/perfectui` ^0.23.0 CSS | `nuxt.config.ts` modules; `app.vue` import |
| Search | `@nuxtjs/algolia` ^1.10.2 | `nuxt.config.ts` modules; `components/Organism.AlgoliaSearch.vue:133` |
| Content rendering | `@ts-stack/markdown` ^1.5.0, `highlight.js` ^11.9.0 (also loaded from jsDelivr inside the worker) | `package.json`; `public/highlight-worker.js` |
| Utilities | `values.js` ^2.1.1, `js-md5` ^0.8.3, `hotkeys-js` ^3.13.7 (listed; no static import found), `mousetrap` (bundled file in `public/`) | `package.json`; `components/Organism.AlgoliaSearch.vue:126` |
| Lint | `@nuxt/eslint-config` with five Vue rules disabled | `.eslintrc` |
| Scripts | `nuxt dev --host`, `nuxt build`, `nuxt generate`, `nuxt preview`, `eslint . --fix` | `package.json` scripts |
| Tests, CI, deploy | none in the repository | script output: `ci: []`, `deploy: []`, no test directories |

## Entry points and routes

| Entry | Path | What it starts |
|-------|------|----------------|
| Root component | `app.vue` | background layers, `MoleculeCodeWorker` (highlight worker + BroadcastChannel), `<NuxtPage>`, SEO meta from `package.json`, clears `sessionStorage.themeColor` on init |
| Framework config | `nuxt.config.ts` | modules, `<html class="dark" lang="en">`, deferred `/lazy-icons.js`, `runtimeConfig.public.SEARCH_ENDPOINT` from `process.env` |
| Landing | `pages/index.vue` | hero, "Now with Chat GPT" badge linking to `/docs/installation?assistant=true`, reasons, widgets |
| Docs layout | `pages/docs.vue` | fixed headers, `OrganismDocsNav`, mobile nav toggles, child `<NuxtPage>` |
| Docs pages | `pages/docs/*.vue` (32) | installation, typescript, tailwind-css, license, dark-mode, theme-color, layout-group, styles, 20 component pages (accordion … typescript), examples, resources, templates, icons |

## Components

Module-level coupling from static imports (Nuxt auto-imports components and composables, so `pages → components` and `components → components` usage is not visible here; the numbers below undercount real coupling).

| Component | Files | Location | Imported by (afferent) | Imports (efferent) | Responsibility |
|-----------|-------|----------|------------------------|--------------------|----------------|
| Pages | 34 | `pages/` | 0 | 2 → components, shared | landing page, docs layout, one hand-written page per topic with example code constants |
| UI components | 40 | `components/` | 1 ← pages | 2 → public, shared | atoms (icons, links, tokens, theme/dark toggles), molecules (docs section/header/content, code preview/view/worker, widgets), organisms (nav, search, assistant, tabs, component example, footer) |
| Shared | 5 | `shared/` | 2 ← components, pages | 0 | `NAV_SECTIONS`, interfaces (`ISections`, `IAlgoliaItem`…), `AlgoliaListDTO`, `scrollToBottom`; `shared/index.ts` is the most imported file (imported by 6) |
| Browser scripts | 4 | `public/*.js` | 1 ← components | 0 | highlight worker (loads highlight.js from jsDelivr), lazy Bootstrap Icons loader, bundled Mousetrap (imported by `Organism.AlgoliaSearch.vue`), empty `sw.js` |
| Root | 2 | `app.vue`, `nuxt.config.ts` | 0 | 0 (both import `package.json`) | bootstrap and configuration |

## Main paths

### Reading a component page (for example `/docs/button`)
1. `nuxt.config.ts` — head: `class="dark"`, `/lazy-icons.js` deferred (Bootstrap Icons CSS appended at runtime)
2. `app.vue` — imports `@chrissgon/perfectui/dist/perfectui.css`, mounts `MoleculeCodeWorker`, renders `<NuxtPage>`
3. `pages/docs.vue` — layout: header with `AtomLogoVersion`, `AtomThemeColorPicker`, `AtomDarkMode`, `AtomGithubLink`, `AtomFigmaLink`; `OrganismDocsNav` (sections from `shared/constants.ts` `NAV_SECTIONS`); child `<NuxtPage>`
4. `pages/docs/button.vue` — `MoleculeDocsSection` → `MoleculeDocsHeader` → several `MoleculeDocsContent id="…"` each with `OrganismComponentExample :code="CODE_VIEW_*"`
5. `components/Organism.ComponentExample.vue` — `OrganismTabs` with `MoleculeCodePreview` (renders the code string with `v-html`) and `MoleculeCodeView`
6. `components/Molecule.CodeView.vue` — not read; by the worker design it posts to the `highlight` BroadcastChannel
7. `components/Molecule.CodeWorker.vue` — receives on the channel, serves from `sessionStorage` or posts to `new Worker("/highlight-worker.js")`
8. `public/highlight-worker.js` — imports highlight.js core and five languages from `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/…`, highlights, posts back

### Searching the documentation
1. `components/Organism.DocsNav.vue` — read-only input with `data-modal="modalAlgolia"`; `/` shortcut bound with Mousetrap in `components/Organism.AlgoliaSearch.vue:142`
2. `components/Organism.AlgoliaSearch.vue:133` — `useAlgoliaSearch("perfectui")` (auto-imported from `@nuxtjs/algolia`), `algolia(Ellipsis)` on keyup at line 171
3. `shared/dto.ts` — `AlgoliaListDTO` maps hits to `IAlgoliaItem` (url, title, description, tags, requireJavascript)
4. Algolia — credentials for the module are not present in this repository's code or config (not visible statically; the module reads its own configuration)

### Asking the assistant
1. `pages/index.vue` — badge "Now with Chat GPT" links to `/docs/installation?assistant=true`; `components/Organism.DocsNav.vue` lists "Assistant" with `disabled` and a "Soon" badge, opening `modalAssistant`
2. `components/Organism.AssistantChatGPT.vue:138-175` — `useRuntimeConfig()`; returns early when `SEARCH_ENDPOINT` is empty; keeps a thread id in `localStorage["assistant:thread"]`; opens `new WebSocket(SEARCH_ENDPOINT + "?" + params)`
3. Backend — not in this repository; `SEARCH_ENDPOINT` is a public runtime value from `process.env` (`nuxt.config.ts:49`)

## Integration points

| System | Where | Purpose | Configured by |
|--------|-------|---------|---------------|
| Algolia DocSearch, index `perfectui` | `components/Organism.AlgoliaSearch.vue:133,171`; module in `nuxt.config.ts:4` | documentation search | module configuration; no keys in the repository (not established) |
| Assistant WebSocket service | `components/Organism.AssistantChatGPT.vue:174-175` | ChatGPT-style Q&A over the docs | `SEARCH_ENDPOINT` env → `runtimeConfig.public` |
| jsDelivr CDN | `public/highlight-worker.js` (highlight.js 11.9.0 modules), `public/lazy-icons.js` (`bootstrap-icons@latest`), `app.vue` style (`github.min.css`) | code highlighting, icon font, highlight theme | hard-coded URLs |
| Google Fonts | `app.vue` style (`Fira+Code`) | monospace font | hard-coded URL |
| External images | `components/Molecule.WidgetResponsive.vue`, `pages/docs/card.vue`, `pages/docs/layout-group.vue` (unsplash), `pages/docs.vue` (preline.co) | illustration imagery | hard-coded URLs |
| GitHub, Figma | `components/Atom.GithubLink.vue`, `components/Atom.FigmaLink.vue` (not read; linked from both headers) | outbound links | hard-coded URLs (`https://github.com/chrissgon/perfectui`) |
| Netlify | not in the repository | hosting of `https://perfectui.netlify.app` (README) | outside the repository |

## Security boundaries

- Untrusted input enters at: the search box (`components/Organism.AlgoliaSearch.vue`, sent to Algolia) and the assistant question (`components/Organism.AssistantChatGPT.vue`, sent over the WebSocket). Query strings: `?assistant=true` on `/docs/installation`.
- HTML is rendered from strings with `v-html` in `components/Molecule.CodePreview.vue`; the strings are constants defined in the repository's pages. The rule `vue/no-v-html` is disabled in `.eslintrc`.
- Secrets are read at: none found in code. `SEARCH_ENDPOINT` is a public URL exposed to the browser through `runtimeConfig.public`.
- Runs in the browser: everything under `process.client` guards (`app.vue`, `components/Molecule.CodeWorker.vue`), the worker, storage. Runs at build time: Nuxt generate/build. No server routes exist (`server/` absent).
- Public surface: the 34 routes; static files under `public/`.
- Persistence in the browser: `sessionStorage.themeColor` (`components/Atom.ThemeColorPicker.vue`), `sessionStorage` highlight cache (`components/Molecule.CodeWorker.vue`), `localStorage["assistant:thread"]`.

## Observations

- `docs.json` (110,177 bytes) describes every documentation page with url, title, tags, description and examples, and no file in this repository reads it; the same content exists hand-written in `pages/docs/*.vue`.
- `hotkeys-js` is a dependency in `package.json` and has no static import; keyboard shortcuts use `public/mousetrap.js`, a bundled library imported from a component as `../public/mousetrap.js` (`components/Organism.AlgoliaSearch.vue:126`).
- `pages/index.vue` advertises "Now with Chat GPT" and links to `?assistant=true`, while `components/Organism.DocsNav.vue` renders the Assistant entry `disabled` with a "Soon" badge.
- `app.vue` calls `sessionStorage.removeItem("themeColor")` on every init, so the theme colour chosen in `components/Atom.ThemeColorPicker.vue` does not survive a reload.
- `public/sw.js` is an empty file.
- `@chrissgon/perfectui` is pinned to `^0.23.0`; the library's current published version is `1.0.0-beta.0` with a different class model (see `MIGRATION.md` in the library repository). Last commit in this repository: 2025-04-12.
- Highlight.js is both a dependency (`highlight.js` ^11.9.0) and loaded from jsDelivr inside the worker; the worker version (11.9.0) is pinned in the URL, and `bootstrap-icons@latest` is unpinned in `public/lazy-icons.js`.
- `.eslintrc` uses the legacy configuration format and disables `vue/multi-word-component-names`, `vue/no-mutating-props`, `vue/no-v-html`, `vue/html-self-closing`, `no-useless-escape`.
- There are no tests, no CI workflows and no deployment configuration in the repository.
- Measured `pages → components` coupling is 1 because components are auto-imported; every page uses many components.

## Files read

- `package.json`, `nuxt.config.ts`, `app.vue`, `.eslintrc`, `tsconfig.json` — configuration and entry points
- `pages/index.vue`, `pages/docs.vue`, `pages/docs/button.vue` — landing, docs layout, one representative docs page (first 45 lines each; button.vue fully for structure)
- `components/Organism.DocsNav.vue`, `Molecule.DocsContent.vue`, `Molecule.DocsSection.vue`, `Organism.ComponentExample.vue`, `Molecule.CodeWorker.vue`, `Molecule.CodePreview.vue`, `Organism.AlgoliaSearch.vue`, `Organism.AssistantChatGPT.vue` — rendering, search and assistant paths (heads plus targeted greps for endpoints and storage)
- `shared/index.ts`, `shared/interfaces.ts`, `shared/dto.ts`, `shared/utils.ts`, `shared/constants.ts` (head)
- `public/highlight-worker.js`, `public/lazy-icons.js`, `public/mousetrap.js` (head), `public/sw.js`
- `docs.json` (head) and a repository-wide search for its readers
- Script output: `scripts/map_codebase.py --root .` (modules, coupling, external packages, environment variables, URLs, clients)
