# Design: the library's documents as the site's pages, and a version menu

- Owner: eng-architecture
- Status: draft
- Date: 2026-09-25
- Specification: docs/product/specs/library-docs-and-versions.md
- Frameworks and versions relied on: Nuxt 4.5.2, @nuxt/content 3.16.1 (types read in `node_modules/@nuxt/content/dist/module.d.mts`, 2026-09-25), bun 1.2 (`Bun.spawn`, `tar` on the build image), GitHub codeload archives (`HEAD` on `codeload.github.com/chrissgon/perfectui/tar.gz/v1.0.0-beta.1` answered 200, 2026-09-25)

## Summary

A sync step (`scripts/sync-docs.ts`) runs before `nuxt generate` and `nuxt dev`. For each documented major in `app/versions.ts`, it resolves the library ref (the installed version's tag, or a pinned ref), takes the library from a local checkout or a cached archive, and passes `docs/README.md`, the linked documents and `MIGRATION.md` to `shared/library-docs.ts`. That module writes `content/<major>/NN.<section>/NN.<slug>.md` in the exact form the content model reads today. Nothing downstream changes: validation, navigation, search, examples and the fixture site read the same folders. The header's version badge becomes the trigger of a `pui-dropdown` menu (`VersionMenu`) listing the documented majors and the archived 0.23 documents on GitHub. The first version of the library's markers comes from a one-time reverse conversion of the site's current pages, and the forward conversion must return those pages unchanged (NFR-1).

## Sources

- Spec `docs/product/specs/library-docs-and-versions.md`; PRD F-6, F-13; roadmap R-2
- ADR-0002 (example block), ADR-0004 (navigation from folders), ADR-0005 (redirect rules), ADR-0008 (named examples in the showcase)
- Library `docs/README.md` summary and `docs/*.md` on branch `v1`; tag `v0.23.0`
- Site files: `content/v1/**` (28 pages), `app/versions.ts`, `app/components/content/V0.vue`, `server/routes/_redirects.get.ts`, `app/components/SiteHeader.vue`, `app/composables/useVersionSwitch.ts`, `tests/repo/content-sources.spec.ts`

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | Where the conversion runs | a sync step writing `content/<major>/` before the build | engineering | ADR-0010 |
| 2 | Which ref a major reads | the installed version's tag; `libraryRef` pins another | decided | user answer 2026-09-25; spec REQ-2 |
| 3 | How the site marks live examples, callouts and metadata in the library | `html live [name=<id>]`, GitHub alerts, `<!-- site: key: value -->` | engineering | spec REQ-5, REQ-6, REQ-8; ADR-0010 consequences |
| 4 | First version of the markers | reverse conversion of the site's current pages, committed in the library | engineering | spec NFR-1; ADR-0010 |
| 5 | Version menu | `pui-dropdown` popover opened by the badge; archived entries listed in `app/versions.ts` | decided | user answer 2026-09-25; spec REQ-9 |
| 6 | 0.23 flat-URL redirects | removed | decided | user answer 2026-09-25; spec REQ-11 |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Summary parser | sections and pages, in order, from the summary | `shared/library-docs.ts` (`parseSummary`) | `docs/README.md` text | `[{ section, pages: [{ title, slug, file }] }]` | REQ-3, EDGE-1, EDGE-7 |
| Document converter | one library document to one site page | `shared/library-docs.ts` (`convertDocument`) | text, file name, section, page map, ref | page text with frontmatter and MDC blocks | REQ-4, REQ-5, REQ-6, REQ-7, REQ-8, EDGE-2, EDGE-5, EDGE-6 |
| Library source | a library tree on disk for a ref | `scripts/sync-docs.ts` (`resolveLibrary`) | ref, `PERFECTUI_SOURCE`, cache | folder path | REQ-2, NFR-2, EDGE-4 |
| Sync step | writes each major's pages, warns about unlisted documents | `scripts/sync-docs.ts` | `app/versions.ts`, `package.json` | `content/<major>/**` | REQ-1, EDGE-3 |
| Reverse port (one-time) | writes the library's marked documents from the site's current pages | `scripts/port-pages-to-library.ts`, deleted after use | `content/v1/**`, library `docs/` | library `docs/*.md`, `MIGRATION.md` | NFR-1 |
| Versions configuration | documented majors with their library ref, and archived entries | `app/versions.ts` | none | `versions`, `archivedVersions` | REQ-2, REQ-9 |
| Version menu | the badge as a menu of majors and archived entries | `app/components/VersionMenu.vue` in `SiteHeader` | versions, current route | navigation through `useVersionSwitch`, GitHub link | REQ-9, EDGE-8 |
| Redirect rules | `/docs` and `/docs/<major>` to the first page, nothing for 0.23 | `server/routes/_redirects.get.ts` | versions, first pages | `_redirects` | REQ-11 |

## Data or content model

The generated pages keep the content model unchanged (content-model spec REQ-1 to REQ-3). The conversion rules, in order:

| Library | Site page | Rule, and the failure it raises |
|---------|-----------|---------------------------------|
| summary line `Getting Started`, then `- [Installation](…/docs/installation.md)` | `content/v1/01.getting-started/01.installation.md` | section and page numbered by position; the slug is the link text in kebab case (EDGE-7 on a clash) |
| `# Button` | `title: Button` | first h1 (EDGE-2 when missing) |
| first paragraph after the h1 | `description: "…"` | plain text, quoted |
| `#### Components` above the h1 | dropped | the section comes from the summary |
| `### Styles`, `#### Detail` | `## Styles`, `### Detail` | one level up |
| ```` ```html live ```` / ```` ```html live name=basic ```` | `::example` / `::example{name="basic"}` around a ```` ```html ```` fence | EDGE-5 when not html, or on a duplicate name |
| `> [!WARNING]` block | `::warning` … `::` | EDGE-6 for a kind with no callout |
| `<!-- site: changed: "1.0" -->` | `changed: "1.0"` | keys `changed`, `since`, `from`, `to` |
| (none) | `tags: [component, button]` | section kind (`component`, `form`, `guide`) and slug |
| `[Card](https://github.com/chrissgon/perfectui/blob/main/docs/card.md#header)` or `(./card.md#header)` | `[Card](/docs/v1/components/card#header)` | other library links become `https://github.com/chrissgon/perfectui/blob/<ref>/<path>` |

`app/versions.ts` gains `libraryRef?: string` per major and `archivedVersions: [{ label: "0.23", href: "https://github.com/chrissgon/perfectui/tree/v0.23.0/docs" }]`.

## Contracts

### Routes
| Route | Params | Resolves to | Serves |
|-------|--------|-------------|--------|
| `/docs/<major>/<section>/<slug>` | as today | a generated page | REQ-1, REQ-3 |
| `/docs`, `/docs/<major>` | none | 301 to the major's first page (route rule and `_redirects`) | REQ-11 |

### Files and generated artifacts
| Path | Produced by | Shape (example) | Consumed by | Serves |
|------|-------------|-----------------|-------------|--------|
| `content/v1/**` (ignored) | sync step | `04.components/03.button.md` with `title`, `description`, `tags`, `::example` | Nuxt Content | REQ-1 |
| `.cache/library/<ref>/` (ignored) | library source | `docs/`, `MIGRATION.md` from the archive | sync step | NFR-2 |
| `_redirects` | redirect route | `/docs/v1 /docs/v1/getting-started/installation 301!` | Netlify | REQ-11 |

### Component interfaces
| Component | Props / inputs | Slots / events | Serves |
|-----------|----------------|----------------|--------|
| `parseSummary(text)` | README text | throws `Summary: …` | REQ-3 |
| `convertDocument(text, ctx)` | `{ file, section, slug, pages, ref, major }` | returns page text; throws `<file>:<line>: …` | REQ-4 to REQ-8 |
| `VersionMenu` | none (reads versions and route) | none | REQ-9 |

## Flows

### Build
1. Sync step: for each major, the library source resolves the ref (`libraryRef` or `v<installed version>`), then uses `PERFECTUI_SOURCE` if set, else the cache, else downloads one archive (NFR-2).
2. Summary parser, then document converter for each page; the sync step empties `content/<major>/`, writes the pages and warns about documents missing from the summary (EDGE-3).
3. `nuxt generate` runs as today: validation, prerender, search index, `_redirects`.

### Version switch
1. The reader opens the badge; `VersionMenu` lists the majors (current marked) and "0.23" (external link).
2. A major: `useVersionSwitch` navigates to the same page, or to the target's first page with `?missing=` (content-model REQ-6).

### Failure paths
| EDGE | Where it is caught | What happens | Message names |
|------|--------------------|--------------|---------------|
| EDGE-1 | summary parser with the file list | build fails | the link and the ref |
| EDGE-2 | document converter | build fails | the file |
| EDGE-3 | sync step | warning, page not published | the file |
| EDGE-4 | library source | build fails, no stale copy used | the ref |
| EDGE-5, EDGE-6 | document converter | build fails | file, line, snippet language or kind |
| EDGE-7 | summary parser | build fails | both links |
| EDGE-8 | `VersionMenu` | one major and the archived entry | none |

## Removals

| Removed | Replaced by | Must keep working | Checked by |
|---------|-------------|-------------------|------------|
| `content/v1/**` in git | generated pages | every page, example, callout and badge | round-trip test (AC-2), the existing e2e suite |
| `app/components/content/V0.vue`, `:v0` in the guide | ordinary links to `blob/v0.23.0/docs/` | the guide's table | AC-6 |
| flat 0.23 rules in `_redirects` | nothing | `/docs`, `/docs/<major>` | AC-7 |
| `tests/repo/content-sources.spec.ts` | the round trip | nothing (the duplication it policed is gone) | AC-2 |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | build with the library fixture; no tracked file under `content/v1/` | build assertion | `tests/build/library-pages.spec.ts` |
| AC-2 | reverse port, then forward conversion equals the current pages byte for byte (normalised whitespace) | unit, one-time then kept on the fixture | `tests/unit/library-docs.spec.ts` |
| AC-3 | converted links | unit | `tests/unit/library-docs.spec.ts` |
| AC-4 | each EDGE on a fixture library | unit | `tests/unit/library-docs.spec.ts` |
| AC-5 | open the menu; switch in the fixture site with two majors | e2e | `tests/e2e/version-menu.spec.ts`, `tests/fixture-site/version-switch.spec.ts` |
| AC-6 | guide links | build assertion | `tests/build/migration-v0-links.spec.ts` (rewritten) |
| AC-7 | `_redirects` lines | build assertion | `tests/fixture-site/routes.spec.ts` |
| AC-8 | timed sync with a cached library; request log | manual measurement recorded in the review | `bun run generate` twice |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1 | Components (sync step), Contracts (files) |
| REQ-2 | Decisions 2, library source |
| REQ-3 | Summary parser, content model table |
| REQ-4 | Document converter, content model table |
| REQ-5 | content model table (`html live`) |
| REQ-6 | content model table (alerts) |
| REQ-7 | content model table (links) |
| REQ-8 | content model table (`site:` comments, tags) |
| REQ-9 | Version menu, version switch flow |
| REQ-10 | Removals (`V0.vue`) |
| REQ-11 | Redirect rules, routes |
| NFR-1 | Reverse port, AC-2 |
| NFR-2 | Library source, AC-8 |
| EDGE-1 to EDGE-8 | Failure paths |
| AC-1 to AC-8 | Verification plan |
