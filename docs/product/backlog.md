# Backlog: perfectui-doc

- Owner: product-backlog
- Status: draft
- Updated: 2026-09-23

## Feature: Markdown content model with versioned folders (`T-cm`)

- Specification: docs/product/specs/markdown-content-model.md
- Design: docs/engineering/designs/markdown-content-model.md (ADR-0001 to ADR-0004)
- Sources: design verification plan and assumptions to verify; decisions of 2026-09-23 (branch `redesign`, latest stable versions, static generation, URL scheme); registry versions recorded in the spec
- Branch: `redesign`
- Layout: Nuxt 4 default (`app/` is the source directory: `app/pages`, `app/components`, `app/composables`, `app/assets`, `app/shared`; `server/`, `content/` and `public/` stay at the root). Paths in tasks are relative to that layout.

### Tasks

- T-cm-1: Bootstrap the site skeleton at the latest stable versions
  Does: On branch `redesign`, replace the toolchain with Nuxt 4.5.2, @nuxt/content 3.16.1, Tailwind 4.3.3 through `@tailwindcss/vite` 4.3.3 (`vite.plugins`, `app/assets/css/main.css` with `@import "tailwindcss"`), `@chrissgon/perfectui@beta` pinned to 1.0.0-beta.0, Vitest 5.0.1, @playwright/test 1.63.0, @nuxt/eslint 1.17.0; TypeScript at 7.0.2 if `nuxt typecheck` accepts it, otherwise the newest version it accepts (record which); `nuxt.config.ts` with the content module, `nitro.prerender.failOnError: true`, scripts `dev`, `generate`, `typecheck`, `lint`, `test`. Keep the existing pages compiling until T-cm-14.
  Delivers: NFR-2
  Touches: `nuxt.config.ts`, `package.json`, `app/assets/css/main.css`
  Depends on: none
  Check: `bun run generate` produces `.output/public/index.html`; `bun run typecheck` and `bun run lint` exit 0; `package.json` pins the versions listed in the spec
  Size: L, because a new major of every tool and a TypeScript compatibility check
  Milestone: M1
  Status: done (2026-09-23) generate exit 0 (70 routes); typecheck exit 0; lint exit 0; versions pinned; TypeScript 6.0.3 (7.0.2 rejected by typescript-eslint, whose peer range is <6.1.0); review docs/engineering/reviews/T-cm-1.md: findings 1 and 3 fixed, 2 and 4 pending
- T-cm-2: Versions configuration as the single source of versions
  Does: Create `app/versions.ts` exporting the list `{ id, label, collection, prefix, latest, deprecated }` for `v1` and `v0`, and a unit test asserting that version ids appear in no other source file.
  Delivers: REQ-5, AC-5
  Touches: `app/versions.ts`, `tests/repo/versions.spec.ts`
  Depends on: T-cm-1
  Check: `bun run test` runs `tests/repo/versions.spec.ts` and it passes; grep for `'v0'`/`'v1'` outside `app/versions.ts` returns nothing
  Size: S, because one file with a fixed shape
  Milestone: M1
- T-cm-3: Collections, schema and content skeleton with fixture pages
  Does: `content.config.ts` with `docs_v1` (include `v1/**`, prefix `/docs`) and `docs_v0` (include `v0/**`, prefix `/docs/v0`) sharing the schema (`title`, `description`, `tags`, `since?`, `changed?`); folders `content/v1/01.getting-started` … `05.forms` each with `.navigation.yml`; `content/v0/` with the same section folders; fixture pages `components/button.md` in both versions and `components/chip.md` (`since: "1.0"`) only in v1.
  Delivers: REQ-1, REQ-2, REQ-11, EDGE-5
  Touches: `content.config.ts`, `content/v1/**`, `content/v0/**`
  Depends on: T-cm-1
  Check: `tests/unit/schema.spec.ts` queries both collections and asserts the fixture pages, their `path` values (no numeric prefixes) and the `since` field
  Size: M, because two collections, a shared schema and a folder convention to fix
  Milestone: M1
- T-cm-4: Spike the single-source example block (ADR-0002)
  Does: Implement `components/content/Example.vue` with one default slot holding a fenced ```html block; render the slot as the code tab and derive the preview HTML from the slot's text during server rendering. If the raw text cannot be recovered reliably, implement ADR-0002 option C (parse hook injecting the snippet) and record the outcome in the ADR.
  Delivers: REQ-3, REQ-10, AC-3
  Touches: `components/content/Example.vue`, ADR-0002
  Depends on: T-cm-3
  Check: `bun run generate` of a fixture page with one `::example` yields HTML where the preview contains a `pui-btn` element and the code tab contains Shiki token spans; ADR-0002 updated with the result
  Size: L, because it is the assumption the design depends on
  Milestone: M1
- T-cm-5: Docs page route with version resolution
  Does: `pages/docs/[...slug].vue` resolving the version from the first segment (non-latest ids) or defaulting to latest, querying the page from the version's collection, rendering it with the MDC renderer, returning 404 when absent.
  Delivers: REQ-1, REQ-11, AC-1
  Touches: `pages/docs/[...slug].vue`, `app/versions.ts`
  Depends on: T-cm-2, T-cm-3
  Check: `tests/build/routes.spec.ts` asserts `.output/public/docs/components/button/index.html` and `.output/public/docs/v0/components/button/index.html` exist and `.output/public/docs/v1/` does not
  Size: M, because routing across two collections with a fallback
  Milestone: M1
- T-cm-6: Navigation from the folder tree
  Does: `composables/useDocsNav.ts` wrapping `queryCollectionNavigation` for the selected version's collection, and a navigation component rendering sections (titles from `.navigation.yml`) and pages in prefix order.
  Delivers: REQ-4, EDGE-5, AC-4
  Touches: `composables/useDocsNav.ts`, navigation component, `content/**/.navigation.yml`
  Depends on: T-cm-5
  Check: `tests/e2e/navigation.spec.ts` asserts section and page order and titles for v1 and v0 against the fixtures
  Size: M, because it depends on the engine's tree shape confirmed on the first fixture
  Milestone: M1
- T-cm-7: Page header with version badges
  Does: `components/DocsPageHeader.vue` rendering `title`, `description`, and "Added in <since>" / "Changed in <changed>" badges; used by the docs page.
  Delivers: REQ-7, AC-2
  Touches: `components/DocsPageHeader.vue`, `pages/docs/[...slug].vue`
  Depends on: T-cm-5
  Check: `tests/e2e/badges.spec.ts` asserts the badge texts on the chip fixture (`since`) and a fixture with `changed`
  Size: S, because one presentational component with a fixed contract
  Milestone: M1
- T-cm-8: Example block, production version
  Does: Finish `Example.vue` after the spike: preview box with internal scrolling and fixed page width, tabs, styles with perfectui components, authoring note in `content/README.md` showing the `::example` syntax.
  Delivers: REQ-3, REQ-10, EDGE-7, AC-3
  Touches: `components/content/Example.vue`, `content/README.md`
  Depends on: T-cm-4
  Check: `tests/e2e/example.spec.ts` asserts preview, highlighted code tab and that a long snippet scrolls inside the box without widening the page
  Size: S, because the mechanism is proven by the spike
  Milestone: M1
- T-cm-9: Content validator
  Does: `server/utils/validateDocs.ts` checking every collection for missing `title`/`description`, unregistered `::` components, duplicate paths in a version, `since` newer than the folder's major, and internal links to missing pages (warning); errors name file and cause. Unit tests with invalid fixtures under `tests/fixtures/invalid/`.
  Delivers: EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9
  Touches: `server/utils/validateDocs.ts`, `tests/fixtures/invalid/`, `tests/unit/validate-docs.spec.ts`
  Depends on: T-cm-3
  Check: `tests/unit/validate-docs.spec.ts` passes with one failing fixture per rule and the expected message text
  Size: M, because five rules and their messages
  Milestone: M2
- T-cm-10: Generators as prerendered routes
  Does: `server/api/search-index.json.get.ts` and `server/api/assistant-corpus.json.get.ts` calling the validator, then `queryCollectionSearchSections` and `queryCollection` per version from `app/versions.ts`; throw on empty output; `nitro.prerender.routes` lists both; delete nothing yet.
  Delivers: REQ-8, NFR-2, EDGE-8, AC-7, AC-11
  Touches: `server/api/*.get.ts`, `nuxt.config.ts`, `app/versions.ts`
  Depends on: T-cm-2, T-cm-9
  Check: `tests/build/artifacts.spec.ts` asserts both files exist under `.output/public/api/`, every entry has `version` and `url`, corpus entries have `level` and `titles`; `tests/build/static.spec.ts` asserts every collection route exists as `index.html`
  Size: M, because two handlers sharing the validator and the prerender wiring
  Milestone: M2
- T-cm-11: Build fails on invalid content
  Does: `tests/build/validation.spec.ts` running `nuxt generate` against the invalid fixtures (missing title, unregistered component, duplicate slug, empty artifact) and asserting a non-zero exit with messages naming each file.
  Delivers: AC-10, EDGE-2, EDGE-3, EDGE-4, EDGE-8
  Touches: `tests/build/validation.spec.ts`, `tests/fixtures/invalid/`
  Depends on: T-cm-10
  Check: `bun run test:build` runs the spec and it passes
  Size: M, because it drives the generator end to end per fixture
  Milestone: M2
- T-cm-12: Version switch behaviour
  Does: `composables/useVersionSwitch.ts` mapping the current relative path to the target version's collection (same path if it exists, else the target index with `?missing=<path>`), the notice on the index page, and a minimal unstyled switch control for tests (the designed control belongs to the design phase).
  Delivers: REQ-6, EDGE-1, AC-6
  Touches: `composables/useVersionSwitch.ts`, `pages/docs/[...slug].vue`, minimal switch control
  Depends on: T-cm-5
  Check: `tests/e2e/version-switch.spec.ts` covers chip (v1 only) → v0 index with notice, button → same path, and back
  Size: M, because a cross-collection query with a fallback and a notice
  Milestone: M2
- T-cm-13: Remove the old assistant, worker, CDN stylesheet, `docs.json` and `NAV_SECTIONS`
  Does: Delete `components/Organism.AssistantChatGPT.vue`, `runtimeConfig.public.SEARCH_ENDPOINT`, the `assistant:thread` storage use, the "Now with Chat GPT" badge in `pages/index.vue`, `public/highlight-worker.js`, `components/Molecule.CodeWorker.vue`, `assets/highlight.css`, the jsDelivr highlight stylesheet import in `app.vue`, `docs.json`, and `NAV_SECTIONS` in `shared/constants.ts` (with `Organism.DocsNav.vue` now using T-cm-6).
  Delivers: REQ-9, REQ-10, REQ-4, AC-8
  Touches: the files listed, `app.vue`, `nuxt.config.ts`, `shared/constants.ts`, `components/Organism.DocsNav.vue`
  Depends on: T-cm-6, T-cm-8, T-cm-10
  Check: `tests/repo/removals.spec.ts` greps for `SEARCH_ENDPOINT`, `assistant:thread`, `AssistantChatGPT`, "Now with Chat GPT", `NAV_SECTIONS` and asserts the deleted files are absent; `bun run generate` still succeeds
  Size: M, because it touches the root component and configuration
  Milestone: M3
- T-cm-14: Remove the hand-written documentation pages and example constants
  Does: Delete `pages/docs/*.vue`, `pages/docs.vue`, `components/Organism.ComponentExample.vue` and every `CODE_VIEW_*` constant once the 0.23 pages have been migrated to `content/v0/` by the "1.0 documentation content" feature (cross-feature dependency; do not run before it).
  Delivers: REQ-3, AC-3
  Touches: `pages/docs/`, `components/Organism.ComponentExample.vue`
  Depends on: T-cm-13
  Check: `tests/repo/removals.spec.ts` asserts no `CODE_VIEW_` occurrence and no `pages/docs/*.vue` file; `bun run generate` succeeds with every route coming from the collections
  Size: S, because it is deletion guarded by tests
  Milestone: M3
- T-cm-15: Test suite, add-a-page check and CI script
  Does: Playwright configuration serving `.output/public` statically for `tests/e2e/*` and `tests/build/*`, Vitest configuration for `tests/unit/*` and `tests/repo/*`, `tests/build/add-page.spec.ts` adding a fixture page and asserting route, navigation entry, search entry and a `git diff --stat` limited to the new Markdown file; `bun run test` runs everything.
  Delivers: NFR-1, AC-9, AC-5, AC-11
  Touches: `playwright.config.ts`, `vitest.config.ts`, `tests/**`, `package.json`
  Depends on: T-cm-11, T-cm-12, T-cm-13
  Check: `bun run test` exits 0 and the report lists every spec of the verification plan
  Size: M, because it wires two runners against a generated site
  Milestone: M3

- T-cm-16: Re-enable strict indexed access
  Does: Remove the transitional `noUncheckedIndexedAccess: false` from `nuxt.config.ts` once the 0.23-era components are gone, and fix any remaining errors in the new code.
  Delivers: NFR-2
  Touches: `nuxt.config.ts`
  Depends on: T-cm-14
  Check: `bun run typecheck` exits 0 with the flag at its Nuxt 4 default
  Size: S, because it is one configuration line plus whatever the new code reveals
  Milestone: M3

### Order

- Critical paths (two chains of six tasks, computed by the lint): T-cm-1 → T-cm-3 → T-cm-4 → T-cm-8 → T-cm-13 → T-cm-14 (spike → example → removals) and T-cm-1 → T-cm-3 → T-cm-9 → T-cm-10 → T-cm-11 → T-cm-15 (validator → generators → build checks → suite)
- Parallel tracks: T-cm-2 alongside T-cm-3; T-cm-4 → T-cm-8 alongside T-cm-5 → T-cm-6 / T-cm-7 / T-cm-12; T-cm-9 alongside the page work

### Milestones

- M1 pages render from Markdown: T-cm-1, T-cm-2, T-cm-3, T-cm-4, T-cm-5, T-cm-6, T-cm-7, T-cm-8 → usable state: fixture pages in v1 and v0 render at the decided URLs with navigation, badges and example blocks, from `bun run generate`
- M2 build validates and generates: T-cm-9, T-cm-10, T-cm-11, T-cm-12 → usable state: invalid content fails the build naming the file; search document set and assistant corpus are produced; version switching works between fixtures
- M3 old site replaced and verified: T-cm-13, T-cm-14, T-cm-15, T-cm-16 → usable state: no trace of the old assistant, worker, `docs.json`, `NAV_SECTIONS` or hand-written pages; `bun run test` covers every acceptance criterion

### Coverage

| Id | Delivered by |
|----|--------------|
| REQ-1 | T-cm-3, T-cm-5 |
| REQ-2 | T-cm-3 |
| REQ-3 | T-cm-4, T-cm-8, T-cm-14 |
| REQ-4 | T-cm-6, T-cm-13 |
| REQ-5 | T-cm-2 |
| REQ-6 | T-cm-12 |
| REQ-7 | T-cm-7 |
| REQ-8 | T-cm-10 |
| REQ-9 | T-cm-13 |
| REQ-10 | T-cm-4, T-cm-8, T-cm-13 |
| REQ-11 | T-cm-3, T-cm-5 |
| NFR-1 | T-cm-15 |
| NFR-2 | T-cm-1, T-cm-10 |
| AC-1 … AC-11 | see each task's Delivers |

### Open questions

- Sequencing across features: T-cm-14 must wait for the migration of the 0.23 pages to `content/v0/` (feature "1.0 documentation content"); until then the old Vue pages and the new catch-all route coexist, with the file route taking precedence. Recommended: schedule that migration right after M2 so T-cm-14 can close M3.
