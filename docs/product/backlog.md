# Backlog: perfectui-doc

- Owner: product-backlog
- Status: draft
- Updated: 2026-09-24
- Release: R-1 (1.0 launch) of `docs/product/roadmap.md`; feature order F-1 with F-10, then F-2 and F-12, then F-8 and F-9, then F-3, F-4, F-5
- Branch: `redesign` (orphan; the tree holds only `AGENTS.md`, `docs/`, `LICENSE`, `.gitignore`, so every task builds from nothing)
- Layout: Nuxt 4 default (`app/` for the application; `content/`, `server/`, `shared/`, `public/`, `tests/` at the root)
- Rules for every task (state decisions and the T-cm-1 review of the incremental attempt): versions pinned exactly as in the designs; `data-pui-mode` only, never a `dark` class; SEO meta at setup; no browser-only handle at setup without a client guard; no `--passWithNoTests`

## Feature: Markdown content model with versioned folders (`T-cm`)

- Specification: docs/product/specs/markdown-content-model.md
- Design: docs/engineering/designs/markdown-content-model.md (ADR-0001 to ADR-0006)
- Sources: the design's verification plan and assumptions to verify; handoff `docs/design/handoff/documentation-page.md`; library documentation `docs/*.md` of `@chrissgon/perfectui` 1.0.0-beta.1 (27 files) as the source of the v1 pages; decision of 2026-09-24 (adopt the design tool's explanatory sentences after checking them)

### Tasks

- T-cm-1: Bootstrap the site skeleton
  Does: `package.json` with the pinned toolchain of the design header (Nuxt 4.5.2, @nuxt/content 3.16.1, Tailwind 4.3.3 through `@tailwindcss/vite`, `@chrissgon/perfectui` 1.0.0-beta.1, TypeScript 6.0.3, fonts, test tools); `nuxt.config.ts` with the content module, `nitro.prerender.failOnError: true`, the library stylesheet and fonts in `css`; `app/app.vue`; `netlify.toml` (build `bun run generate`, publish `.output/public`); scripts `dev`, `generate`, `typecheck`, `lint`, `test`.
  Delivers: NFR-2
  Touches: `package.json`, `nuxt.config.ts`, `app/app.vue`, `app/assets/css/main.css`, `netlify.toml`
  Depends on: none
  Check: `bun run generate` writes `.output/public/index.html`; `bun run typecheck` and `bun run lint` exit 0; every dependency pinned to the design's version
  Size: M, because a whole toolchain on an empty tree, with versions already verified
  Milestone: CM1
  Status: done (2026-09-24) generate exit 0 (5 routes, .output/public/index.html); typecheck exit 0; lint exit 0 (docs/ ignored); versions pinned as the design; layer order proven: pui-btn keeps its fill in both modes and rounded-none wins only with the declared order; review docs/engineering/reviews/T-cm-1.md: approve with changes, Node pinned in netlify.toml; eslint.config.mjs and tsconfig.json added for the lint and typecheck scripts
- T-cm-2: Test harness over the generated output
  Does: Vitest for unit and repository checks; Playwright configured to serve `.output/public` statically; helpers for axe (`@axe-core/playwright`) and Lighthouse; one passing smoke test per runner.
  Delivers: NFR-3
  Touches: `vitest.config.ts`, `playwright.config.ts`, `tests/helpers/*`
  Depends on: T-cm-1
  Check: `bun run test` runs both runners and each smoke test passes, with no pass-with-no-tests flag
  Size: M, because two runners and a static server to wire
  Milestone: CM1
  Status: done (2026-09-24) bun run test exit 0: vitest 2 passed (pinned versions), playwright 3 passed (page, axe helper, Lighthouse helper) over the static server; lint and typecheck exit 0; review docs/engineering/reviews/T-cm-2.md: approve with changes, chrome-launcher declared
- T-cm-3: Versions configuration
  Does: `app/versions.ts` (`v1` latest, label `1.x`; `v0` deprecated, label `0.23`, listed but without content until R-2) and a startup check that exactly one version is latest.
  Delivers: REQ-5, AC-5
  Touches: `app/versions.ts`, `tests/repo/versions.spec.ts`
  Depends on: T-cm-1
  Check: `tests/repo/versions.spec.ts`: version ids appear only in `app/versions.ts`; a fixture without a latest version fails with a message naming the file
  Size: S, because one file with a fixed shape
  Milestone: CM1
  Status: done (2026-09-24) tests/repo/versions.spec.ts 4 passed (a planted "v1" in app/probe.ts made it fail, then removed); bun run test exit 0 (6 unit, 3 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-3.md: approve
- T-cm-4: Collections, schema and fixtures
  Does: `content.config.ts` with `docs_v1` (prefix `/docs/v1`) and `docs_v0` (prefix `/docs/v0`) sharing the schema; section folders with `.navigation.yml`; fixtures `components/button.md` in both versions and `components/chip.md` (`since: "1.0"`) in v1 only, plus an empty section folder.
  Delivers: REQ-1, REQ-2, REQ-11, EDGE-5
  Touches: `content.config.ts`, `content/v1/**`, `content/v0/**`
  Depends on: T-cm-3
  Check: `tests/unit/schema.spec.ts`: both collections return the fixtures with paths `/docs/v1/components/button` and `/docs/v0/components/button`, no numeric prefixes, `since` queryable
  Size: M, because two collections and a folder convention to prove
  Milestone: CM1
  Status: done (2026-09-24) tests/unit/schema.spec.ts 5 passed over the generated database (a chip with since 2.0 made it fail, then restored); bun run test exit 0 (11 unit, 3 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-4.md: approve with changes, follow-ups T-cm-21 and T-cm-22
- T-cm-5: Spike: example block from one fenced snippet
  Does: prove ADR-0002 option A (recover the raw HTML from the highlighted slot during prerender) on the button fixture; if it fails, implement option C and record the outcome in the ADR.
  Delivers: REQ-3, REQ-10
  Touches: `app/components/content/Example.vue`, ADR-0002
  Depends on: T-cm-4, T-cm-7
  Check: `tests/e2e/example.spec.ts` (first version): the static HTML of the button page holds a rendered `pui-btn` and Shiki markup for the same snippet; ADR-0002 status updated
  Size: L, because it is the design's riskiest assumption
  Milestone: CM1
  Status: done (2026-09-24) option A proven: tests/e2e/example.spec.ts 2 passed (failed before the component existed); prerendered HTML holds the live button and the Shiki markup; ADR-0002 accepted; bun run test exit 0 (11 unit, 9 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-5.md: approve with changes
- T-cm-6: Spike: code colours through CSS variables
  Does: prove ADR-0006 (a Shiki CSS-variables theme passed through Nuxt Content's highlight option) with `app/assets/css/code.css` defining the five `--site-code-*` variables from the role inks in both modes; fall back to dual themes if rejected and record it.
  Delivers: REQ-10
  Touches: `nuxt.config.ts` highlight option, `app/assets/css/code.css`, ADR-0006
  Depends on: T-cm-4
  Check: the button page's code spans use `var(--site-code-…)`; switching `data-pui-mode` changes their computed colour in a Playwright test; ADR-0006 status updated
  Size: M, because an option to confirm and a fallback ready
  Milestone: CM1
  Status: done (2026-09-24) tests/e2e/code-colours.spec.ts 2 passed (failed before the theme existed, and again when an empty settings array hid the rules); ADR-0006 accepted; punctuation moved to muted/ink after a 4.19:1 contrast; bun run test exit 0 (11 unit, 11 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-6.md: approve with changes
- T-cm-7: Documentation page route and version index
  Does: `app/pages/docs/[version]/[...slug].vue` (unknown version or path gives 404; `useSeoMeta` at setup from frontmatter) and `app/pages/docs/[version]/index.vue` (sections and pages of the version, notice when `?missing=`).
  Delivers: REQ-1, REQ-6, AC-1
  Touches: `app/pages/docs/[version]/[...slug].vue`, `app/pages/docs/[version]/index.vue`
  Depends on: T-cm-4
  Check: `tests/build/routes.spec.ts`: `docs/v1/components/button/index.html` and `docs/v0/components/button/index.html` exist, no unversioned documentation file exists, the title and description meta come from the frontmatter
  Size: M, because two pages and the version resolution contract
  Milestone: CM1
  Status: done (2026-09-24) tests/build/routes.spec.ts 4 passed (failed before the pages existed); 16 routes prerendered; bun run test exit 0 (11 unit, 7 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-7.md: approve with changes; app.vue, pages/index.vue and nuxt.config.ts changed for routing
- T-cm-8: Redirects generator
  Does: `server/routes/_redirects.get.ts` writing one rule per v1 page for the 0.23 flat URL, then `/docs /docs/v1 301` and `/docs/* /docs/v1/:splat 301`, from the versions configuration and the latest collection; listed in `nitro.prerender.routes`; verify the file lands as `_redirects` (ADR-0005 assumption), else use the `prerender:done` hook.
  Delivers: REQ-1, REQ-5, AC-1
  Touches: `server/routes/_redirects.get.ts`, `nuxt.config.ts`, ADR-0005
  Depends on: T-cm-7
  Check: `tests/build/routes.spec.ts`: `.output/public/_redirects` holds `/docs/button /docs/v1/components/button 301` and the two general rules, in that order
  Size: M, because a Nitro output behaviour to confirm
  Milestone: CM1
  Status: done (2026-09-24) tests/build/routes.spec.ts 5 passed (the redirects test failed before the generator existed); .output/public/_redirects has 2 flat rules and the 2 general rules; ADR-0005 file output verified; bun run test exit 0 (11 unit, 12 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-8.md: approve with changes
- T-cm-9: Navigation and sidebar
  Does: `useDocsNav(version)` from `queryCollectionNavigation`, descending to the `/docs/<version>` node (the collection prefix nests the tree as `/docs` → `/docs/<version>` → sections → pages, found in T-cm-7); `DocSidebar` with collapsible sections, current page marked, panel behind a menu control below 1024 px.
  Delivers: REQ-4, EDGE-5, AC-4
  Touches: `app/composables/useDocsNav.ts`, `app/components/DocSidebar.vue`
  Depends on: T-cm-7
  Check: `tests/e2e/navigation.spec.ts`: prefix order with `.navigation.yml` titles, URLs without prefixes, the empty section absent, panel behaviour at 768 px; no file under `app/` lists sections
  Size: M, because a composable and a responsive component
  Milestone: CM2
  Status: done (2026-09-24) tests/e2e/navigation.spec.ts 3 passed and tests/repo/navigation-source.spec.ts 1 passed (navigation tests failed before the sidebar existed); bun run test exit 0 (19 unit, 15 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-9.md: approve with changes, the panel closes on page change
- T-cm-10: Page header with badges
  Does: `DocHeader` with section label, title, description, "Added in" and "Changed in" badges (`pui-badge pui-soft pui-theme`).
  Delivers: REQ-7, AC-2
  Touches: `app/components/DocHeader.vue`
  Depends on: T-cm-7
  Check: `tests/e2e/badges.spec.ts`: the chip fixture shows "Added in 1.0", a `changed` fixture shows "Changed in 1.0"
  Size: S, because one component with a clear contract
  Milestone: CM2
  Status: done (2026-09-24) tests/e2e/badges.spec.ts 3 passed (the two badge tests failed before the component existed); bun run test exit 0 (19 unit, 18 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-10.md: approve with changes; site ink tokens added
- T-cm-11: Documentation layout, on-page headings and pager
  Does: `app/layouts/docs.vue` (three columns at 1280 px as the handoff, headings as a disclosure below 1024 px), `DocToc` with the current heading highlighted, `DocPager` with previous, next and the edit link.
  Delivers: REQ-4, NFR-3
  Touches: `app/layouts/docs.vue`, `app/components/DocToc.vue`, `app/components/DocPager.vue`
  Depends on: T-cm-9, T-cm-10
  Check: `tests/e2e/doc-layout.spec.ts`: columns at 1280, disclosure at 1024, no horizontal scroll at 360, headings list absent on a page without h2, pager targets follow navigation order
  Size: M, because three components following one handoff
  Milestone: CM2
  Status: done (2026-09-24) tests/e2e/doc-layout.spec.ts 5 passed (three failed before the implementation); bun run test exit 0 (21 unit, 27 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-11.md: approve with changes; DocLayout component instead of a Nuxt layout; site.config.ts created early
- T-cm-12: Example block and callouts, final
  Does: `Example` with Preview and Code tabs (arrow keys), language label, copy control ("Copied" for 1500 ms, selected text without clipboard), dot-grid canvas, content scrolling in its box; `Note` and `Warning` MDC callouts.
  Delivers: REQ-3, EDGE-7, AC-3
  Touches: `app/components/content/Example.vue`, `app/components/content/Note.vue`, `app/components/content/Warning.vue`
  Depends on: T-cm-5, T-cm-6
  Check: `tests/e2e/example.spec.ts` (complete): tabs by keyboard, copy, a long snippet scrolls without widening the page; `tests/repo/no-inline-examples.spec.ts` finds no example HTML string under `app/`
  Size: M, because interaction and states on top of the spike
  Milestone: CM2
  Status: done (2026-09-24) tests/e2e/example.spec.ts 6 passed (five failed before the implementation; the 360 px test caught the page widening to 2032 px, fixed in the page grid); tests/repo/no-inline-examples.spec.ts 2 passed; bun run test exit 0 (21 unit, 22 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-12.md: approve with changes
- T-cm-13: Content validator
  Does: `server/utils/validateDocs.ts` for EDGE-2, EDGE-3, EDGE-4, EDGE-6 (failures) and EDGE-9 (warning), messages naming file and cause; rows whose path ends in `/.navigation` (the indexed `.navigation.yml` files) are not pages and are skipped; an `::example` holds exactly one fenced block (T-cm-5 review); two latest-version pages with the same slug in different sections warn, because the flat 0.23 redirect can only point to one (T-cm-8 review).
  Delivers: REQ-2, EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9, AC-10
  Touches: `server/utils/validateDocs.ts`, `tests/fixtures/invalid/**`
  Depends on: T-cm-4
  Check: `tests/build/validation.spec.ts`: three invalid fixtures make `nuxt generate` exit non-zero with each file and cause named; a broken link only warns
  Size: M, because five rules with fixtures
  Milestone: CM2
  Status: done (2026-09-24) tests/unit/validate-docs.spec.ts 7 passed (failed before the module existed); a file without title and with ::tabs made bun run generate exit 1 naming the file and both causes, then removed; bun run test exit 0 (18 unit, 12 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-13.md: approve with changes, the build-level test moves to T-cm-16
- T-cm-14: Search document set and assistant corpus
  Does: the two prerendered routes of ADR-0003, calling the validator first, one entry per heading section with `version` and `url`, skipping `/.navigation` rows; empty sets throw.
  Delivers: REQ-8, EDGE-8, AC-7
  Touches: `server/routes/api/search-index.json.get.ts`, `server/routes/api/assistant-corpus.json.get.ts`
  Depends on: T-cm-13
  Check: `tests/build/artifacts.spec.ts`: both files exist, entries carry `version` and `url`, corpus entries `level` and `titles`; an empty-version fixture fails the build
  Size: M, because two generators on one query
  Milestone: CM2
  Status: done (2026-09-24) tests/unit/search-set.spec.ts 3 passed (failed before the module existed); tests/build/artifacts.spec.ts 3 passed; both files have 10 entries; bun run test exit 0 (24 unit, 30 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-14.md: approve with changes; highlighting CSS excluded from the sets
- T-cm-15: Version switch behaviour
  Does: `useVersionSwitch` (same path when it exists in the target, else the target index with `?missing=`) and the notice on the version index; the switch control itself ships with release R-2.
  Delivers: REQ-6, EDGE-1, AC-6
  Touches: `app/composables/useVersionSwitch.ts`, `app/pages/docs/[version]/index.vue`
  Depends on: T-cm-7
  Check: `tests/e2e/version-switch.spec.ts` with the fixtures: chip (v1 only) lands on `/docs/v0?missing=components/chip` with the notice naming chip and 0.23; button maps to the same path and back
  Size: M, because routing plus a notice state
  Milestone: CM2
  Status: done (2026-09-24) tests/unit/version-switch.spec.ts 3 passed (failed before the module existed); tests/e2e/version-switch.spec.ts 2 passed (the notice existed since T-cm-7); bun run test exit 0 (27 unit, 32 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-15.md: approve with changes; the R-2 control task must exercise the composable end to end
- T-cm-16: Build assertions for the authoring promise
  Does: tests for AC-9 (a page added as one Markdown file appears in the route list, navigation and search set, and the diff is that file), AC-11 (every collection route is a static file, the generated files present, no server bundle needed) and AC-10 at build level (a copy of the project with invalid fixtures, and one with a version that has no page, makes `nuxt generate` exit non-zero naming each file and cause; T-cm-13 and T-cm-14 reviews).
  Delivers: NFR-1, NFR-2, AC-9, AC-10, AC-11
  Touches: `tests/build/add-page.spec.ts`, `tests/build/static.spec.ts`
  Depends on: T-cm-14, T-cm-11
  Check: both test files pass after `bun run generate`
  Size: S, because two test files over an existing build
  Milestone: CM2
  Status: done (2026-09-25) bun run test:slow 3 passed (add a page, invalid content, empty version; full builds of a project copy, copies removed after); tests/build/static.spec.ts 2 passed; bun run test exit 0 (27 unit, 34 browser); lint and typecheck exit 0; review docs/engineering/reviews/T-cm-16.md: approve with changes; tests in tests/slow and tests/build/static.spec.ts
- T-cm-17: Getting started and customization pages
  Does: write `content/v1/01.getting-started/` (installation, TypeScript, Tailwind CSS, license) and `02.customization/` (dark mode, theme color) from the library's documentation, examples as `::example`, checked explanatory sentences added.
  Delivers: REQ-1, REQ-3
  Touches: `content/v1/01.getting-started/**`, `content/v1/02.customization/**`
  Depends on: T-cm-12, T-cm-13
  Check: every page builds, the validator passes, each page's h2 count equals its library source's `###` count
  Size: M, because six pages of content
  Milestone: CM3
  Status: done (2026-09-25) six pages built and validated; tests/repo/content-sources.spec.ts h2 = source ### for each (7 passed); tests/e2e/prose.spec.ts 3 passed; bun run test 42 unit + 91 browser
- T-cm-18: General and components pages
  Does: write `03.general/` (layout group, float) and `04.components/` (11 pages) the same way; name the examples the landing uses (`modal/basic`, `dropdown/basic`, `tooltip/basic`, `accordion/basic`).
  Delivers: REQ-1, REQ-3
  Touches: `content/v1/03.general/**`, `content/v1/04.components/**`
  Depends on: T-cm-17
  Check: every page builds with every example rendering a `pui-` element; h2 counts equal the sources'; the four named examples exist; the headings column highlights the heading scrolled into view (T-cm-11 review)
  Size: L, because thirteen pages
  Milestone: CM3
- T-cm-19: Forms pages
  Does: write `05.forms/` (field group, input, input group, textarea, select, checkbox, radio, switch).
  Delivers: REQ-1, REQ-3
  Touches: `content/v1/05.forms/**`
  Depends on: T-cm-17
  Check: every page builds; h2 counts equal the sources'
  Size: M, because eight pages
  Milestone: CM3
- T-cm-20: Documentation page quality
  Does: Lighthouse mobile and axe on the Button page's static file.
  Delivers: NFR-3, AC-12
  Touches: `tests/quality/lighthouse.spec.ts`, `tests/quality/axe.spec.ts`
  Depends on: T-cm-18
  Check: performance ≥ 90, accessibility ≥ 95, 0 WCAG 2.2 AA violations except the accepted library trade-off: `color-contrast` on the labels of `pui-solid` with `pui-theme`, `pui-success` or `pui-warn` in light mode
  Size: S, because the harness exists; fixes, if any, get their own task
  Milestone: CM3

- T-cm-21: Type-check the tests
  Does: `tests/tsconfig.json` extending the Nuxt config with `tests/**` included, `@types/better-sqlite3` pinned, and the `typecheck` script covering it.
  Delivers: NFR-1
  Touches: `tests/tsconfig.json`, `package.json`
  Depends on: T-cm-4
  Check: a test with a deliberate type error makes `bun run typecheck` exit non-zero; the current tests type-check
  Size: S, because configuration and one type package
  Milestone: CM2
  Status: done (2026-09-24) a type error planted in tests/ made bun run typecheck exit 2 (it exited 0 before); clean typecheck, lint and tests (11 unit, 12 browser) exit 0; review docs/engineering/reviews/T-cm-21.md: approve
- T-cm-22: Keep the v0 fixture out of the published site
  Does: move the v0 button fixture to test-only content read by the build tests (or replace it with the converted v0 pages if roadmap OPEN-1 starts v0 in R-1), so no one-page 0.23 archive is published.
  Delivers: REQ-1, REQ-11
  Touches: `content/v0/**`, `tests/fixtures/**`
  Depends on: T-cm-15
  Check: a production build has no `docs/v0/` folder unless the v0 pages exist; the build tests still cover both versions
  Size: M, because the tests that rely on the fixture change with it
  Milestone: CM3
  Status: done (2026-09-25) production output has docs/v1 only (tests/build/static.spec.ts); content-model tests run on the fixture site (project fixtures); bun run test 35 unit + 88 browser; test:slow 3 passed; lint and typecheck exit 0
### Order

- Critical path: T-cm-1 → T-cm-3 → T-cm-4 → T-cm-5 → T-cm-12 → T-cm-17 → T-cm-18 → T-cm-20
- Parallel tracks: T-cm-2 alongside T-cm-3; T-cm-6, T-cm-7 and T-cm-13 alongside T-cm-5; then T-cm-8, T-cm-9, T-cm-10, T-cm-15 from T-cm-7; T-cm-14 from T-cm-13; T-cm-19 alongside T-cm-18

### Milestones

- CM1 Pages render from Markdown: T-cm-1 to T-cm-8 → usable state: a fixture page renders at its versioned URL with a working example block and unversioned URLs redirect
- CM2 The documentation experience works and bad content fails the build: T-cm-9 to T-cm-16, T-cm-21 → usable state: navigation, header, layout, examples, validation, generated sets and the switch behaviour all pass their tests
- CM3 The 1.0 documentation is written: T-cm-17 to T-cm-20, T-cm-22 → usable state: 27 pages minus the guide render and the documentation page meets the quality bar

### Coverage

| Id | Delivered by |
|----|--------------|
| REQ-1 | T-cm-4, T-cm-7, T-cm-8, T-cm-17 to T-cm-19 |
| REQ-2 | T-cm-4, T-cm-13 |
| REQ-3 | T-cm-5, T-cm-12 |
| REQ-4 | T-cm-9, T-cm-11 |
| REQ-5 | T-cm-3, T-cm-8 |
| REQ-6 | T-cm-7, T-cm-15 |
| REQ-7 | T-cm-10 |
| REQ-8 | T-cm-14 |
| REQ-10 | T-cm-5, T-cm-6 |
| REQ-11 | T-cm-4 |
| NFR-1, NFR-2, NFR-3 | T-cm-16; T-cm-1, T-cm-16; T-cm-2, T-cm-11, T-cm-20 |
| AC-1 to AC-7, AC-9 to AC-12 | see each task's Delivers |
| REQ-9, AC-8 | withdrawn in the specification |

## Feature: landing page and site shell (`T-sh`)

- Specification: docs/product/specs/landing-and-site-shell.md
- Design: docs/engineering/designs/landing-and-site-shell.md (ADR-0007, ADR-0008)
- Sources: handoff `docs/design/handoff/landing.md` (timings, tokens, deviations); messaging (copy); state decisions of 2026-09-24 (three-step mode cycle, `gzip -9 -n`, the user's thumbnail as `og:image`)

### Tasks

- T-sh-1: Site and features configuration
  Does: `app/site.config.ts` (site URL, package name, repository, Figma, license) and `app/features.ts` (`search` off until T-sr-3, `assistant` false).
  Delivers: REQ-3, REQ-6, REQ-7
  Touches: `app/site.config.ts`, `app/features.ts`
  Depends on: T-cm-1
  Check: `tests/unit/site-config.spec.ts`: the install command is built from `packageName`; no other file under `app/` holds the package name or the repository URL
  Size: S, because two constant files
  Milestone: SH1
  Status: done (2026-09-25) tests/unit/site-config.spec.ts 4 passed (failed before: missing app/features); vitest 31 passed; lint and typecheck exit 0
- T-sh-2: Mode before first paint and the mode toggle
  Does: inline head script (cookie `pui-mode`, session colour) placed before the stylesheet; `ModeToggle` cycling light → dark → system with sun, moon and monitor icons, calling `setMode`.
  Delivers: REQ-8, EDGE-4, EDGE-5, AC-8
  Touches: `app/app.vue`, `app/components/ModeToggle.vue`
  Depends on: T-cm-2
  Check: `tests/e2e/mode.spec.ts`: no cookie leaves the attribute absent and follows `prefers-color-scheme`; a stored cookie renders that mode on first paint; the toggle cycles three states; no `dark` class anywhere
  Size: M, because a script ordering assumption and three states
  Milestone: SH1
  Status: done (2026-09-25) tests/e2e/mode.spec.ts 6 passed (6 failed before); bun run test 31 unit + 40 browser; lint and typecheck exit 0
- T-sh-3: Theme picker
  Does: `ThemePicker` with the presets and a colour input; sets `--pui-theme` on `<html>` and in session storage.
  Delivers: REQ-9, EDGE-6, AC-9
  Touches: `app/components/ThemePicker.vue`
  Depends on: T-sh-2
  Check: `tests/e2e/theme.spec.ts`: the colour applies to a component and an example block without reload and survives a reload in the session; `#ffffff` applies with no error
  Size: S, because one component on the head script's storage
  Milestone: SH1
  Status: done (2026-09-25) tests/e2e/theme.spec.ts 3 passed (3 failed before); bun run test 31 unit + 43 browser; lint and typecheck exit 0
- T-sh-4: Header, footer and default layout
  Does: `SiteHeader` (logo, version label from the versions configuration, docs link, mode toggle, theme picker, GitHub, Figma, search slot behind `features.search`, menu control below 1024 px), `SiteFooter`, `app/layouts/default.vue` wrapping the docs layout; inline SVG icons from the handoff assets.
  Delivers: REQ-6, REQ-7, AC-7
  Touches: `app/components/SiteHeader.vue`, `app/components/SiteFooter.vue`, `app/layouts/default.vue`
  Depends on: T-sh-1, T-sh-3, T-cm-11
  Check: `tests/e2e/shell.spec.ts`: the landing and one docs page have the same header and footer contents; no search entry point while `features.search` is off
  Size: M, because three shared components
  Milestone: SH1
  Status: done (2026-09-25) tests/e2e/shell.spec.ts 6 passed (5 failed before); bun run test 31 unit + 49 browser; lint and typecheck exit 0; screenshots at 1280 light and dark and 360 checked
- T-sh-5: Page metadata and share image
  Does: `usePageMeta` (title, description, Open Graph, Twitter card, absolute `og:image` from the site URL) used by the landing and the docs page; `public/og.jpg` copied from `docs/design/results/og-image/final/og-1200x630.jpg`.
  Delivers: REQ-10, AC-10
  Touches: `app/composables/usePageMeta.ts`, `public/og.jpg`
  Depends on: T-sh-1, T-cm-7
  Check: `tests/build/meta.spec.ts`: the seven tags in `index.html` and in the button page, the latter with its frontmatter values
  Size: S, because one composable and a provided image
  Milestone: SH1
  Status: done (2026-09-25) tests/build/meta.spec.ts 3 passed (3 failed before); bun run test 31 unit + 52 browser; test:slow 3 passed; lint and typecheck exit 0
- T-sh-6: Spike: library size at build
  Does: `server/routes/api/library-size.json.get.ts` running `gzip -9 -n` on the installed files; confirm `gzip` exists on the Netlify build image with a deploy preview.
  Delivers: REQ-2, NFR-2, EDGE-7, AC-2
  Touches: `server/routes/api/library-size.json.get.ts`, ADR-0007
  Depends on: T-cm-1
  Check: `tests/build/library-size.spec.ts`: the JSON equals the test's own `gzip -9 -n` numbers (3,221 and 493 for 1.0.0-beta.1); a missing file fails the build naming it
  Size: M, because an environment assumption to confirm
  Milestone: SH2
  Status: done (2026-09-25) tests/build/library-size.spec.ts 1 passed and tests/unit/library-size.spec.ts 2 passed (unit failed before: module missing); JSON 3221/493 with macOS gzip; bun run test 33 unit + 53 browser; Netlify gzip confirmation pending the first deploy preview (needs approval)
- T-sh-7: Landing copy collection
  Does: `content/landing.yml` with the nine sections verbatim from messaging and the `landing` data collection; the page fails the build on a missing or extra section id.
  Delivers: REQ-1, REQ-4
  Touches: `content/landing.yml`, `content.config.ts`
  Depends on: T-cm-4
  Check: `tests/unit/landing-copy.spec.ts`: every headline of messaging SECTION-1 to SECTION-9 is in the collection verbatim
  Size: S, because data entry against a schema
  Milestone: SH2
  Status: done (2026-09-25) tests/unit/landing-copy.spec.ts 6 passed (failed before: module missing); bun run test 39 unit + 53 browser; lint and typecheck exit 0
- T-sh-8: Motion composable and copy command
  Does: `useMotion` (reduced motion, in-view trigger, timers only in `onMounted`) and `CopyCommand` (clipboard, "Copied" for 1800 ms, selection fallback, inert without JavaScript).
  Delivers: REQ-3, EDGE-3, EDGE-9, AC-3
  Touches: `app/composables/useMotion.ts`, `app/components/CopyCommand.vue`
  Depends on: T-cm-2
  Check: `tests/e2e/copy.spec.ts`: click and keyboard copy, feedback at least 1 s, fallback selection with the clipboard denied (also for the documentation example block, T-cm-12 review); a unit test shows no timer before mount
  Size: M, because shared behaviour every section uses
  Milestone: SH2
  Status: done (2026-09-25) tests/e2e/copy.spec.ts 5 passed (4 failed before; the example-block fallback already held); tests/unit/motion.spec.ts 1 passed and fails with a planted setup timer; bun run test 40 unit + 58 browser; lint and typecheck exit 0
- T-sh-9: Hero
  Does: `LandingHero` and `ClassCycleDemo` with the handoff's timings; the server renders the first combination complete.
  Delivers: REQ-1, AC-1
  Touches: `app/components/landing/LandingHero.vue`, `app/components/landing/ClassCycleDemo.vue`, `app/pages/index.vue`
  Depends on: T-sh-7, T-sh-8, T-sh-4
  Check: `tests/e2e/landing-viewport.spec.ts`: headline, supporting line, install command and "Get started" inside 360×640 and 1280×800
  Size: M, because the page's most visible motion
  Milestone: SH2
  Status: done (2026-09-25) tests/e2e/landing-viewport.spec.ts 6 passed (6 failed before); bun run test 40 unit + 64 browser; lint and typecheck exit 0; screenshots at 1280 light, dark and 360 compared with the export
- T-sh-10: Size chart
  Does: `SizeChart` from the library size JSON and the static competitors' list; bars and counters per the handoff; footnote with method and version.
  Delivers: REQ-2, AC-2
  Touches: `app/components/landing/SizeChart.vue`, `app/data/competitors.ts`
  Depends on: T-sh-6, T-sh-8
  Check: `tests/build/library-size.spec.ts` (extended): the numbers in the HTML equal the JSON; "gzip" and the version in the same block
  Size: M, because data binding plus motion
  Milestone: SH2
  Status: done (2026-09-25) tests/build/library-size.spec.ts 2 passed (chart case failed before); tests/e2e/size-chart.spec.ts 3 passed; bun run test 40 unit + 68 browser; lint and typecheck exit 0
- T-sh-11: Spike and overlays showcase from named examples
  Does: prove ADR-0008 (`ExampleRef` renders one named example of a docs page), else shared example files; `OverlaysShowcase` with the four named examples.
  Delivers: REQ-5, AC-5
  Touches: `app/components/ExampleRef.vue`, `app/components/landing/OverlaysShowcase.vue`, ADR-0008
  Depends on: T-cm-18, T-sh-9
  Check: `tests/e2e/showcase.spec.ts`: four live components open and close natively; a missing name fails the build
  Size: L, because an assumption of the design plus a section
  Milestone: SH3
- T-sh-12: Class picker and mode and theme demo
  Does: `ClassPicker` (chips with `aria-pressed`, live element, highlighted token) and `ModeThemeDemo` (section-scoped mode and theme).
  Delivers: REQ-5, AC-5
  Touches: `app/components/landing/ClassPicker.vue`, `app/components/landing/ModeThemeDemo.vue`
  Depends on: T-sh-9
  Check: `tests/e2e/showcase.spec.ts` (extended): every shape, style and colour combination renders the matching classes; the section demo changes only its section
  Size: M, because two interactive demos
  Milestone: SH3
  Status: done (2026-09-25) tests/e2e/showcase.spec.ts 4 passed (4 failed before); bun run test 40 unit + 72 browser; lint and typecheck exit 0
- T-sh-13: Tailwind and nothing-to-undo sections
  Does: `TailwindDemo` (typed ` w-full`) and `StrikeList` with the handoff's timings.
  Delivers: REQ-4
  Touches: `app/components/landing/TailwindDemo.vue`, `app/components/landing/StrikeList.vue`
  Depends on: T-sh-8
  Check: with reduced motion both render their final states; with motion, the final states match after the timings
  Size: S, because two small motion sections
  Milestone: SH3
  Status: done (2026-09-25) tests/e2e/landing-motion.spec.ts 3 passed (3 failed before); bun run test 40 unit + 75 browser; lint and typecheck exit 0
- T-sh-14: Migration callout and install tabs
  Does: `MigrationCallout` (diff line, link to the guide) and `InstallTabs` (npm, yarn, pnpm, bun; CDN snippet pinned from configuration; copy controls).
  Delivers: REQ-4, AC-4
  Touches: `app/components/landing/MigrationCallout.vue`, `app/components/landing/InstallTabs.vue`
  Depends on: T-sh-8, T-sh-1
  Check: `tests/e2e/landing-migration.spec.ts`: the guide link is visible before the end of the showcase and opens the guide; tabs by arrow keys
  Size: S, because two static sections with copy controls
  Milestone: SH3
  Status: done (2026-09-25) tests/e2e/landing-migration.spec.ts 5 passed (4 failed before); the guide-link case asserts no dead link until T-mg-1 builds the guide; bun run test 40 unit + 80 browser; lint and typecheck exit 0
- T-sh-15: Landing robustness checks
  Does: tests for JavaScript disabled, 320 px width and unshipped features.
  Delivers: NFR-3, EDGE-1, EDGE-2, AC-6, AC-12
  Touches: `tests/e2e/no-js.spec.ts`, `tests/build/no-unshipped.spec.ts`
  Depends on: T-sh-11, T-sh-12, T-sh-13, T-sh-14
  Check: with JavaScript off every text, link and the command are visible and calls to action navigate; no horizontal scroll at 320 px; no "assistant", "ChatGPT" or "soon" in the output
  Size: S, because tests over a finished page
  Milestone: SH3
- T-sh-16: Landing quality
  Does: Lighthouse mobile and axe on `index.html`.
  Delivers: NFR-1, AC-11
  Touches: `tests/quality/lighthouse.spec.ts`, `tests/quality/axe.spec.ts`
  Depends on: T-sh-15
  Check: performance ≥ 90, accessibility ≥ 95, 0 WCAG 2.2 AA violations except the accepted library trade-off: `color-contrast` on the labels of `pui-solid` with `pui-theme`, `pui-success` or `pui-warn` in light mode
  Size: S, because the harness exists
  Milestone: SH3

### Order

- Critical path: T-cm-1 → T-cm-2 → T-sh-2 → T-sh-3 → T-sh-4 → T-sh-9 → T-sh-12 → T-sh-15 → T-sh-16
- Parallel tracks: T-sh-1, T-sh-6, T-sh-7, T-sh-8 alongside T-sh-2 and T-sh-3; T-sh-10, T-sh-13, T-sh-14 alongside T-sh-9; T-sh-11 once T-cm-18 lands

### Milestones

- SH1 The shell works on every page: T-sh-1 to T-sh-5 → usable state: header, footer, mode, theme and meta tags pass their tests on the landing and a docs page
- SH2 The landing's top half is live: T-sh-6 to T-sh-10 → usable state: hero, install and the measured size chart render from their sources
- SH3 The landing is complete: T-sh-11 to T-sh-16 → usable state: every section live, robust without JavaScript and at the quality bar

### Coverage

| Id | Delivered by |
|----|--------------|
| REQ-1 to REQ-10 | T-sh-1 to T-sh-14 (see each task's Delivers) |
| NFR-1, NFR-2, NFR-3 | T-sh-16; T-sh-6; T-sh-15 |
| AC-1 to AC-12 | see each task's Delivers |

## Feature: migration guide page (`T-mg`)

- Specification: docs/product/specs/migration-guide.md
- Design: docs/engineering/designs/migration-guide.md
- Sources: the library's `MIGRATION.md` at tag `v1.0.0-beta.1`

### Tasks

- T-mg-1: Version range fields and check
  Does: optional `from` and `to` in the schema, the validator rule against the installed package, the range line in `DocHeader`.
  Delivers: REQ-5, EDGE-3, AC-5
  Touches: `content.config.ts`, `server/utils/validateDocs.ts`, `app/components/DocHeader.vue`
  Depends on: T-cm-10, T-cm-13
  Check: `tests/build/validation.spec.ts` (extended): a mismatched `to` fails naming the file and both versions; a matching one shows "applies to 0.23.0 → 1.0.0-beta.1"
  Size: M, because three components change together
  Milestone: MG1
- T-mg-2: Table wrapper and v0 links
  Does: `ProseTable` (scroll box, `pui-table`) and the inline `V0` component; confirm an inline component renders inside a table cell.
  Delivers: REQ-3, EDGE-1, EDGE-2, EDGE-5, AC-3
  Touches: `app/components/content/ProseTable.vue`, `app/components/content/V0.vue`
  Depends on: T-cm-12
  Check: `tests/build/migration-v0-links.spec.ts`: with the v0 button fixture `btn` links to it; without it every name is text; a wide table scrolls in its box at 360 px
  Size: M, because an MDC assumption to confirm
  Milestone: MG1
- T-mg-3: Diff highlighting
  Does: enable the `diff` grammar and colour removed and added lines with the error and success inks, markers kept.
  Delivers: REQ-4, AC-4
  Touches: `nuxt.config.ts` highlight `langs`, `app/assets/css/code.css`
  Depends on: T-cm-6
  Check: `tests/build/migration-diff.spec.ts`: removed and added lines carry distinct classes and their markers
  Size: S, because configuration and CSS
  Milestone: MG1
- T-mg-4: The guide page
  Does: `content/v1/01.getting-started/04.migrating-from-0-23.md` from `MIGRATION.md`, tables with `:v0`, nine diff blocks, `changed: "1.0"`; the heading sync test.
  Delivers: REQ-1, REQ-2, REQ-6, EDGE-6, AC-1, AC-2
  Touches: `content/v1/01.getting-started/04.migrating-from-0-23.md`, `tests/build/migration-headings.spec.ts`
  Depends on: T-mg-1, T-mg-2, T-mg-3
  Check: the page is in the getting-started navigation; its h2 sequence equals `MIGRATION.md` at the pinned tag; nine diff blocks render
  Size: M, because a long page with three tables
  Milestone: MG1
- T-mg-5: Guide quality and switch
  Does: Lighthouse, axe and scroll checks at 360 px; the switch to v0 lands on the v0 index with the notice.
  Delivers: NFR-1, EDGE-4, AC-6
  Touches: `tests/e2e/migration-guide.spec.ts`
  Depends on: T-mg-4, T-cm-15
  Check: performance ≥ 90, accessibility ≥ 95, 0 violations except the accepted library trade-off (solid theme, success and warn labels in light mode), page scroll width equals the viewport
  Size: S, because checks over one page
  Milestone: MG1

### Order

- Critical path: T-mg-1 → T-mg-4 → T-mg-5
- Parallel tracks: T-mg-2 and T-mg-3 alongside T-mg-1

### Milestones

- MG1 A 0.23 user can follow the guide in the site: T-mg-1 to T-mg-5 → usable state: the guide renders with ranges, tables, diffs and links, at the quality bar

### Coverage

| Id | Delivered by |
|----|--------------|
| REQ-1 to REQ-6, NFR-1 | T-mg-1 to T-mg-5 (see each task's Delivers) |
| AC-1 to AC-6 | see each task's Delivers |

## Feature: search (`T-sr`)

- Specification: docs/product/specs/search.md
- Design: docs/engineering/designs/search.md (ADR-0009)
- Sources: handoff `docs/design/handoff/documentation-page.md` (dialog)

### Tasks

- T-sr-1: Search options and per-version index
  Does: `shared/search-options.ts` and `server/routes/api/search/[version].json.get.ts` serializing a MiniSearch index per configured version from the document set; listed in the prerender routes.
  Delivers: REQ-6, EDGE-7
  Touches: `shared/search-options.ts`, `server/routes/api/search/[version].json.get.ts`, `nuxt.config.ts`
  Depends on: T-cm-14
  Check: `.output/public/api/search/v1.json` exists and loads with `MiniSearch.loadJSON`; an empty version fails the build
  Size: M, because a generator and shared options
  Milestone: SR1
- T-sr-2: Search composable
  Does: `useSearch` (load once per version, query preparation, top 10, snippets with `<mark>`).
  Delivers: REQ-2, REQ-3, REQ-5, EDGE-3, EDGE-4, AC-5
  Touches: `app/composables/useSearch.ts`, `tests/unit/search-ranking.spec.ts`
  Depends on: T-sr-1
  Check: `tests/unit/search-ranking.spec.ts` over the built index: "moda" finds Modal, "tooltpi" finds Tooltip, "mdl" does not fuzz, title outranks body; punctuation-only is empty; 250 characters are cut to 200
  Size: M, because ranking rules under test
  Milestone: SR1
- T-sr-3: Search button and shortcuts
  Does: `SearchButton` in the header slot, `/` outside text fields, ⌘K or Ctrl+K, `#search=`; turn `features.search` on.
  Delivers: REQ-1, EDGE-1, EDGE-8, AC-1
  Touches: `app/components/SearchButton.vue`, `app/features.ts`
  Depends on: T-sh-4
  Check: `tests/e2e/search-open.spec.ts`: each trigger opens the dialog with the input focused; `/` in a field types a slash
  Size: S, because one component and its keys
  Milestone: SR1
- T-sr-4: Search dialog
  Does: `SearchDialog` on `pui-modal`: states (empty, loading, results, no results, unavailable with Retry), result items, keyboard, live region, full screen below 640 px, re-filter on version change.
  Delivers: REQ-2, REQ-3, REQ-4, REQ-7, REQ-8, EDGE-2, EDGE-5, EDGE-6, AC-2, AC-3, AC-4, AC-6, AC-7
  Touches: `app/components/SearchDialog.vue`
  Depends on: T-sr-2, T-sr-3
  Check: `tests/e2e/search-results.spec.ts`, `search-keyboard.spec.ts`, `search-states.spec.ts`, `search-version.spec.ts` pass; only the site's static files are requested
  Size: L, because many states and accessibility behaviour in one component
  Milestone: SR1
- T-sr-5: Search quality
  Does: latency under 4× CPU throttling, first-open size, axe with the dialog open.
  Delivers: NFR-1, NFR-2, NFR-3, AC-8, AC-9, AC-10
  Touches: `tests/quality/search-latency.spec.ts`, `tests/quality/search-size.spec.ts`, `tests/quality/axe.spec.ts`
  Depends on: T-sr-4, T-cm-18
  Check: 95th percentile under 100 ms over 20 queries; first-open files at most 300 KB with `gzip -9 -n`; 0 violations except the accepted library trade-off (solid theme, success and warn labels in light mode)
  Size: M, because measurements on the full content
  Milestone: SR1

### Order

- Critical path: T-cm-14 → T-sr-1 → T-sr-2 → T-sr-4 → T-sr-5
- Parallel tracks: T-sr-3 alongside T-sr-2

### Milestones

- SR1 Readers find any page as they type: T-sr-1 to T-sr-5 → usable state: search answers over v1 with typo tolerance, highlighting and keyboard, within the latency and size budgets

### Coverage

| Id | Delivered by |
|----|--------------|
| REQ-1 to REQ-8, NFR-1 to NFR-3 | T-sr-1 to T-sr-5 (see each task's Delivers) |
| AC-1 to AC-10 | see each task's Delivers |

## Release order across features

1. CM1 (content model renders), then CM2 and SH1 in parallel (the shell needs the docs layout, T-cm-11).
2. SH2 while CM3 is written (the landing's top half needs no documentation content).
3. SH3 (needs the named examples of T-cm-18), MG1, SR1.
4. Exit of R-1: every milestone's checks green, including `bun run test:slow` (the full-build tests, run before each milestone review until CI runs them; T-cm-16 review), then a deploy preview for review; deploying to production is an outside action that needs its own approval.

## Open questions

- none.
