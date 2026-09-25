# Design: migration guide page

- Owner: eng-architecture
- Status: draft
- Date: 2026-09-24
- Specification: docs/product/specs/migration-guide.md
- Frameworks and versions relied on: as `docs/engineering/designs/markdown-content-model.md`; Nuxt Content prose components (a `ProseTable` component in `app/components/content/` replaces the default table renderer; content.nuxt.com, components/prose, accessed 2026-09-23); Shiki's `diff` grammar (listed in the highlight `langs`)

## Summary

The guide is one Markdown page of the 1.0 content, copied by hand from the library's `MIGRATION.md` at each release, rendered by the content model like any other page. Three additions make it work: two optional frontmatter fields (`from`, `to`) shown in the page header and checked against the installed library at build; a `v0` inline component that links a 0.23 name to its v0 page only when that page exists in the build; and a table wrapper that scrolls wide tables inside their own box. Diff blocks use Shiki's `diff` grammar with the site's code colours.

## Sources

- `docs/product/specs/migration-guide.md` (REQ-1 to REQ-6, NFR-1, EDGE-1 to EDGE-6, AC-1 to AC-6)
- The library's `MIGRATION.md` at tag `v1.0.0-beta.1` (Why, sections 1 to 8, Known trade-offs; eleven ```diff blocks (nine in the first count; corrected 2026-09-25, T-mg-4); mapping tables in sections 3, 4, 7)
- `docs/engineering/designs/markdown-content-model.md` (schema, validator, collections, code theme of ADR-0006); `docs/design/handoff/documentation-page.md` (tables with `pui-table`, callouts)
- State decisions: the package does not ship `MIGRATION.md`, the site keeps its own copy (2026-09-23); the site pins 1.0.0-beta.1 (2026-09-24)

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | Where the guide lives | `content/v1/01.getting-started/04.migrating-from-0-23.md`, navigation title "Migrating from 0.x" | decided | spec REQ-1; spec OPEN-2 recommendation (slug); the approved sidebar's label |
| 2 | Version range | optional `from` and `to` in the shared schema; validator compares `to` with the installed package | engineering | REQ-5; no viable alternative (a hard-coded range would drift) |
| 3 | Links to v0 pages | `:v0{name="btn" to="components/button"}` resolves at render against the v0 collection | engineering | REQ-3, EDGE-1, EDGE-2; a plain Markdown link would be dead in P-1 |
| 4 | Wide tables | `ProseTable` wraps every Markdown table in a horizontally scrolling box with `pui-table` | engineering | NFR-1, EDGE-5; applies site-wide, no alternative worth an ADR |
| 5 | Keeping the copy in sync | a test compares the page's headings with `MIGRATION.md` at the pinned tag | engineering | REQ-2; the package does not ship the file |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Guide page | the guide's content, headings with anchors, three mapping tables, eleven diff blocks | `content/v1/01.getting-started/04.migrating-from-0-23.md` | `MIGRATION.md` (by hand) | Markdown | REQ-1, REQ-2, REQ-6, EDGE-6 |
| Schema fields | `from`, `to` (optional strings) | `content.config.ts` (docs schema) | frontmatter | queryable fields | REQ-5 |
| Version check | fail when `to` differs from the installed `@chrissgon/perfectui` version | `server/utils/validateDocs.ts` | page frontmatter, `node_modules/@chrissgon/perfectui/package.json` | error naming file, `to` and installed version | REQ-5, EDGE-3 |
| Page header range | "applies to <from> → <to>" under the description | `app/components/DocHeader.vue` (optional `from`, `to` props) | page fields | header line | REQ-5 |
| v0 link | a link to `/docs/v0/<to>` when that page exists in `docs_v0`, else plain text | `app/components/content/V0.vue` (MDC inline `:v0`) | `name`, `to` | link or text | REQ-3, EDGE-1, EDGE-2 |
| Table wrapper | scroll box around every Markdown table, `pui-table` class | `app/components/content/ProseTable.vue` | table slot | wrapped table | REQ-3, NFR-1, EDGE-5 |
| Diff highlighting | `diff` grammar with removed and added lines in the error and success inks, markers kept | `content.config.ts` highlight `langs`, `app/assets/css/code.css` | fenced ```diff blocks | highlighted markup | REQ-4 |

## Data or content model

Frontmatter of the guide:

```yaml
title: Migrating from 0.x
description: Every change from 0.23 to 1.0, with the class that replaces each old one.
from: 0.23.0
to: 1.0.0-beta.1
changed: "1.0"
```

A mapping table row in Markdown: `| :v0{name="btn" to="components/button"} | pui-btn pui-solid pui-theme |`. Validation: `to` must equal the installed version (EDGE-3); `from` must be a version string; the `:v0` component is registered, so the content-model validator accepts it (content-model EDGE-3).

## Contracts

| Contract | Shape | Serves |
|----------|-------|--------|
| URL | `/docs/v1/getting-started/migrating-from-0-23`; flat 0.23 URL `/docs/migrating-from-0-23` redirects there (ADR-0005) | REQ-1, REQ-6 |
| `V0` props | `name` (text shown), `to` (path inside v0) | REQ-3 |
| `DocHeader` additions | `from?`, `to?` | REQ-5 |
| Landing link | messaging SECTION-8 call to action points to the URL above (landing-and-site-shell design) | REQ-6 |

## Flows

### Build
1. The content model parses the page; the validator compares `to` with the installed package version; a mismatch throws (EDGE-3).
2. Prerender renders the page: `:v0` queries `docs_v0` for `/docs/v0/<to>`; absent collection or page renders plain text (EDGE-1, EDGE-2); present renders a link.
3. Diff blocks are highlighted with the `diff` grammar at build time.

### Failure paths
| EDGE | Caught by | What happens |
|------|-----------|--------------|
| EDGE-1 | `V0` | plain text for a name with no v0 page |
| EDGE-2 | `V0` | plain text everywhere while v0 is absent; links appear when v0 lands, with no edit to the guide |
| EDGE-3 | validator | build fails naming the file, `to` and the installed version |
| EDGE-4 | version switch (content model) | v0 index with the notice |
| EDGE-5 | `ProseTable` | the table scrolls in its box; the page does not |
| EDGE-6 | authoring rule | the page gets `changed:` when the library's guide changes |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | the page exists at its URL and appears in the getting-started section of the v1 navigation | build assertion + e2e | `tests/e2e/migration-guide.spec.ts` |
| AC-2 | fetch `MIGRATION.md` at the pinned tag and compare its h2 sequence with the page's; every heading has an id | build test | `tests/build/migration-headings.spec.ts` |
| AC-3 | build with and without a v0 fixture; `btn` links to `/docs/v0/components/button` only in the first; no dead link in either | build assertion | `tests/build/migration-v0-links.spec.ts` |
| AC-4 | eleven diff blocks in the static HTML; removed and added lines carry distinct classes and keep `-` and `+` | build assertion | `tests/build/migration-diff.spec.ts` |
| AC-5 | build with `to` equal to the installed version shows "applies to 0.23.0 → 1.0.0-beta.1"; a fixture with a different `to` fails naming file and both versions | build assertion | `tests/build/validation.spec.ts` |
| AC-6 | Lighthouse and axe at 360 px; page scroll width equals the viewport; each table's box scrolls | build test + e2e | `tests/quality/lighthouse.spec.ts`, `tests/e2e/migration-guide.spec.ts` |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1, REQ-6 | guide page, URL, landing link, AC-1 |
| REQ-2 | guide page, sync test, AC-2 |
| REQ-3 | v0 link, table wrapper, AC-3 |
| REQ-4 | diff highlighting, AC-4 |
| REQ-5 | schema fields, version check, page header range, AC-5 |
| NFR-1 | table wrapper, AC-6 |
| EDGE-1 to EDGE-6 | failure paths |
| REQ-10, REQ-11, NFR-3 (of the content-model spec, cited by this spec) | diff highlighting uses the content model's build-time Shiki (REQ-10); the v0 link relies on same-path slugs (REQ-11); the quality bar is the content model's (NFR-3) |
| AC-1 to AC-6 | verification plan |

## Assumptions to verify before implementation

- An inline MDC component (`:v0{…}`) renders inside a Markdown table cell (documented for inline components; confirm on the first fixture).
- Overriding `ProseTable` in `app/components/content/` replaces the table renderer for every page (Nuxt Content prose components; confirm).

## Open questions

- none: the specification's OPEN-2 (slug) takes its recommendation, `migrating-from-0-23`, listed as decision 1 so the user can change it before the page is written.
