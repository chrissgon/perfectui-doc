# Design: search

- Owner: eng-architecture
- Status: draft
- Date: 2026-09-24
- Specification: docs/product/specs/search.md
- Frameworks and versions relied on: as `docs/engineering/designs/markdown-content-model.md`, plus minisearch 7.2.0 (registry, 2026-09-24; lucaong.github.io/minisearch: `fuzzy` accepts a number or a function of the term, `prefix`, `boost` per field, `toJSON` and `MiniSearch.loadJSON` for a prebuilt index, results carry `terms` and `match` per field, accessed 2026-09-24); Chrome DevTools Protocol `Emulation.setCPUThrottlingRate` through Playwright's CDP session for the latency test

## Summary

At build, one prerendered route per version turns that version's entries of the content model's search document set into a serialized MiniSearch index. The search dialog (the approved design's `SearchDialog` on `pui-modal`) loads the index of the version being read the first time it opens, then answers every keystroke in the browser: prefix matching for every word, one typo for words of four characters or more, title matches boosted over body matches, snippets with the matched terms highlighted, keyboard navigation and a live region announcing the selection. No service, key or request beyond the site's own static files.

## Sources

- `docs/product/specs/search.md` (REQ-1 to REQ-8, NFR-1 to NFR-3, EDGE-1 to EDGE-8, AC-1 to AC-10)
- `docs/engineering/designs/markdown-content-model.md` (search document set, versions configuration, generators with `failOnError`)
- `docs/design/handoff/documentation-page.md` (search dialog: states, keyboard hints, ⌘K and `#search=`, snippet of about 120 characters from 40 before the first hit, full screen below 640 px)
- MiniSearch documentation (header); ADR-0009

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | Provider | client-side index built at generate time | decided | user, 2026-09-23 |
| 2 | Index library | MiniSearch, serialized per version | engineering | ADR-0009 |
| 3 | Shortcuts | `/` outside text fields (spec) and ⌘K or Ctrl+K (approved design) | decided | REQ-1; handoff |
| 4 | Index split | one file per version, loaded on first open | engineering | REQ-4, REQ-6, NFR-2; filtering by construction, no alternative worth an ADR |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Index generator | build the serialized index of one version from the document set | `server/routes/api/search/[version].json.get.ts` | search document set entries of the version, search options | `api/search/<version>.json` | REQ-6, EDGE-7 |
| Search options | fields, stored fields, boosts, fuzzy and prefix rules shared by build and browser | `shared/search-options.ts` | none | options object | REQ-5 |
| Search button | the header entry point and the shortcuts | `app/components/SearchButton.vue` | `features.search` | opens the dialog | REQ-1, EDGE-1, EDGE-8 |
| Search dialog | input, results, states, keyboard, live region | `app/components/SearchDialog.vue` | current version | navigation to a result | REQ-1 to REQ-4, REQ-7, REQ-8, EDGE-2 to EDGE-6 |
| Search composable | load the version's index once, run queries, build snippets | `app/composables/useSearch.ts` | version, query | results with highlighted snippets | REQ-2, REQ-3, REQ-5, NFR-1 |

## Data or content model

Search options (`shared/search-options.ts`), used by the generator and by `MiniSearch.loadJSON`:

```ts
export const searchOptions = {
  fields: ['title', 'heading', 'content'],
  storeFields: ['title', 'heading', 'url', 'section'],
  searchOptions: { prefix: true, fuzzy: (term: string) => (term.length >= 4 ? 1 : 0), boost: { title: 3, heading: 2 } },
}
```

A document is one section entry of the content model's set: `{ id, url (with #anchor), title (page), heading (section, empty for the page intro), section (navigation section), content }`. Query preparation: trim, collapse whitespace, cut to 200 characters (EDGE-4); a query with no letter or digit is empty (EDGE-3).

## Contracts

| Contract | Shape | Serves |
|----------|-------|--------|
| `/api/search/<version>.json` | MiniSearch `toJSON()` of the version's documents, prerendered for every version in the configuration | REQ-4, REQ-6 |
| `SearchDialog` | props `version`; opens on the button, `/` outside text fields, ⌘K or Ctrl+K, and `#search=<query>` | REQ-1, REQ-7 |
| Result item | page title, section heading when present, snippet of about 120 characters starting 40 before the first match with `<mark>` around matched terms, link to `url` | REQ-3, EDGE-6 |
| States | empty (input only), loading (first open), results, "No results for '<query>'", "Search is unavailable" with Retry | REQ-8, EDGE-2 |

## Flows

### Build
1. Prerender fetches `/api/search/<version>.json` for each configured version; the generator reads that version's entries; an empty set throws and the build fails (EDGE-7).

### Search
1. First open: `useSearch` fetches the version's file and calls `MiniSearch.loadJSON`; the dialog shows "Loading" meanwhile; a failed fetch shows "Search is unavailable" with Retry (EDGE-2).
2. Each input event: prepare the query; empty shows nothing (REQ-8); otherwise `search(query)` and render the top 10 results; the selected result is announced through `aria-activedescendant` and a polite live region (REQ-7).
3. Version change while open: load the other version's index if needed and re-run the same query (EDGE-5).
4. Enter opens the result's URL; Escape closes and returns focus to the button.

### Failure paths
| EDGE | Caught by | What happens |
|------|-----------|--------------|
| EDGE-1 | server-rendered button without hydration | inert; navigation remains |
| EDGE-2 | `useSearch` | unavailable state with Retry |
| EDGE-3 | query preparation | treated as empty |
| EDGE-4 | query preparation | searches the first 200 characters |
| EDGE-5 | `SearchDialog` watcher | re-filters to the new version, query kept |
| EDGE-6 | result item | each result shows its page title |
| EDGE-7 | index generator | build fails |
| EDGE-8 | `SearchButton` key handler | ignores `/` in inputs, textareas and contenteditable |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | the button and `/` open the dialog with the input focused, on the landing and a docs page; `/` in a text field types a slash | e2e | `tests/e2e/search-open.spec.ts` |
| AC-2 | typing one character shows results; the only requests are the site's static files | e2e | `tests/e2e/search-results.spec.ts` |
| AC-3 | a result shows title, heading and a snippet with `<mark>`; activating it lands on the anchor | e2e | `tests/e2e/search-results.spec.ts` |
| AC-4 | on a v1 page only v1 URLs appear; on the landing, the latest version's | e2e | `tests/e2e/search-version.spec.ts` |
| AC-5 | "moda" finds Modal; "tooltpi" (one typo, 7 letters) finds Tooltip; "mdl" does not fuzz; a title match ranks above a body match | unit over the built index | `tests/unit/search-ranking.spec.ts` |
| AC-6 | arrows move the selection, Enter opens, Escape closes and returns focus; the live region announces the selection | e2e | `tests/e2e/search-keyboard.spec.ts` |
| AC-7 | empty input shows only the input; "xyz" shows "No results for 'xyz'" | e2e | `tests/e2e/search-states.spec.ts` |
| AC-8 | with CPU throttling at 4×, time from input to rendered results under 100 ms over 20 queries (95th percentile) | e2e | `tests/quality/search-latency.spec.ts` |
| AC-9 | sum of `gzip -9 -n` sizes of the files requested on first open (index, dialog chunk, MiniSearch chunk) at most 300 KB | build test | `tests/quality/search-size.spec.ts` |
| AC-10 | axe on the page with the dialog open: 0 violations; Lighthouse accessibility still ≥ 95 | build test | `tests/quality/axe.spec.ts` |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1, REQ-7 | search button, dialog, AC-1, AC-6 |
| REQ-2, REQ-6 | index generator, composable, AC-2 |
| REQ-3 | result item, AC-3 |
| REQ-4 | per-version files, AC-4 |
| REQ-5 | search options, ADR-0009, AC-5 |
| REQ-8 | states, AC-7 |
| NFR-1, NFR-2, NFR-3 | composable and AC-8; per-version files and AC-9; dialog and AC-10 |
| EDGE-1 to EDGE-8 | failure paths |
| AC-1 to AC-10 | verification plan |

## Assumptions to verify before implementation

- The serialized index of about 30 pages split by section stays well under the 300 KB budget compressed; measure on the first full content build.
- `MiniSearch.loadJSON` with the same options restores fuzzy and prefix behaviour; functions in options are passed at load, not serialized (documented).

## Open questions

- none.
