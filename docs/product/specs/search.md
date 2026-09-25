# Feature specification: search over the documentation

- Owner: product-feature-spec
- Status: draft
- Date: 2026-09-23
- Feature of: PRD `docs/product/prd.md` feature F-5, phase P-1

## Summary

A search box in the site shell that answers as the reader types, over an index generated at build time from the document set of the version being read, with ranked section-level results, highlighted matches and tolerance to a typo, without any request to a search service. It replaces the Algolia DocSearch integration of the 0.23 site, whose index no longer exists.

## Goal and users

- Problem: the 0.23 site searched an Algolia index whose account was deactivated, so search returns nothing; the rebuild must give readers search again without an external account. Source: state decision 2026-09-23 (Algolia deactivated); PRD F-5.
- Users: readers of any version, evaluators and migrating users alike (PRD U-1, U-2). Source: PRD Users; brief decision 4 (search kept for everyone).
- Success: the reader's experience matches what Algolia DocSearch gave (results from the first keystroke, ranking, highlighting, typo tolerance) with 0 external requests; what is not replicated is Algolia's hosted analytics dashboard. Source: user answer 2026-09-23 (state OPEN-3, condition stated by the user); DocSearch documentation ("searchable from the first keystroke", docsearch.algolia.com, accessed 2026-09-23).

## Scope

- In: the search entry point in the shell, the search dialog, the client-side index generated from the document set, ranking and highlighting rules, keyboard behaviour, version filtering, empty and no-result states. Source: PRD F-5; content-model spec REQ-8.
- Out: the document set generation itself (content-model spec REQ-8); search analytics (not replicated by decision); the assistant (PRD F-11). Source: state decision 2026-09-23 (OPEN-3).

## Sources

- `docs/product/prd.md` (2026-09-23): U-1, U-2, F-5, M-4, P-1 (search ships in phase 1)
- `docs/workbench/state.md` decisions of 2026-09-23: Algolia deactivated; search in phase 1; client-side index on the condition that the reader's experience matches DocSearch
- Content-model spec `docs/product/specs/markdown-content-model.md`: REQ-8 (document set with url, title, description, tags, version, section; corpus split by heading), REQ-5 (versions configuration), NFR-2 (static generation)
- `docs/engineering/architecture.md` (codebase map of the 0.23 site on `main`): `Organism.AlgoliaSearch.vue` opened with the `/` key, arrow keys and Enter for navigation, Escape to close, "No results found" state; result fields url, title, description, tags
- Algolia documentation, `minWordSizefor1Typo` (algolia.com/doc, accessed 2026-09-23): "sets the minimum length a query word must have before Algolia allows one typo in that word", default 4
- DocSearch documentation (docsearch.algolia.com/docs/what-is-docsearch, accessed 2026-09-23): documentation "searchable from the first keystroke"
- MiniSearch documentation (lucaong.github.io/minisearch, accessed 2026-09-23), as evidence that the capabilities exist client-side, not as a technology choice: "Exact match, prefix search, fuzzy match, field boosting", results carry a `match` property, "can comfortably run both in Node and in the browser", "memory-efficient index, designed to support memory-constrained use cases like mobile browsers"

## Functional requirements

- REQ-1: The shell shows a search entry point on every documentation page and on the landing; activating it, or pressing `/` outside a text field, opens a search dialog with the input focused. Source: PRD F-5; codebase map (`/` shortcut and dialog on the 0.23 site as baseline); landing spec REQ-6 (entry point present once search is built).
- REQ-2: Results appear as the reader types, from the first character, without a submit action and without any network request other than loading static files of the site. Source: DocSearch documentation ("from the first keystroke"); user answer 2026-09-23 (match DocSearch); content-model spec NFR-2.
- REQ-3: Each result names the page title, the section heading when the match is inside a section, and a snippet with the matched terms highlighted; activating a result opens the page at the section's anchor. Source: content-model spec REQ-8 (corpus split by heading); codebase map (result fields as baseline); user answer 2026-09-23 (highlighting as part of the DocSearch experience).
- REQ-4: Results are restricted to the version being read; on the landing, to the latest version; the version comes from the versions configuration. Source: brief decision 5 (one index with a version filter); content-model spec REQ-5.
- REQ-5: A query word of at least 4 characters matches a term that differs by one character (one typo), and any query word matches terms it prefixes (`moda` finds `modal`); results that match the title rank above results that match only the body. Source: Algolia `minWordSizefor1Typo` default 4 (the behaviour DocSearch readers had); MiniSearch documentation (fuzzy match, prefix search and field boosting exist client-side); user answer 2026-09-23.
- REQ-6: The index is generated during `nuxt generate` from the document set and corpus of content-model REQ-8, published as static files, and loaded by the browser only when the reader opens the search dialog for the first time. Source: content-model spec REQ-8, NFR-2; PRD constraint (content as data).
- REQ-7: Keyboard: arrow keys move the selection, Enter opens the selected result, Escape closes the dialog and returns focus to the entry point; the selected result is announced to assistive technology. Source: codebase map (arrow keys, Enter, Escape on the 0.23 dialog as baseline); PRD M-4 (accessibility).
- REQ-8: With an empty input the dialog shows nothing but the input; with no match it shows a "No results" state that repeats the query; the state is never a blank panel. Source: codebase map ("No results found" state as baseline).

## Non-functional requirements

- NFR-1: Once the index is loaded, results for a query render within 100 ms on a mid-range mobile device as measured by the build tests in a browser with 4x CPU throttling, so typing never waits for results. Source: user answer 2026-09-23 (search spec OPEN-1 approved).
- NFR-2: The static files loaded on first open of the dialog total at most 300 KB compressed for a version with up to 60 pages. Source: user answer 2026-09-23 (search spec OPEN-2 approved).
- NFR-3: The search dialog scores 0 WCAG 2.2 AA violations and does not lower the page's Lighthouse accessibility score below 95 on mobile. Source: PRD M-4.

## Constraints

- Technical: no external search service, account or key; everything is produced by the build and served as static files. Source: state decision 2026-09-23 (OPEN-3); PRD constraint (static generation).
- Technical: the index is derived from the same document set and corpus that feed the assistant, never from a separate content walk. Source: brief decision 5; content-model spec REQ-8.
- Operational: analytics on searches are not collected. Source: state decision 2026-09-23 (analytics not replicated).

## Edge cases

- EDGE-1: JavaScript disabled → the entry point is absent or inert; navigation remains the way to find pages (landing spec NFR-3).
- EDGE-2: the index file fails to load (network error on a static file) → the dialog shows a "Search is unavailable" state with a retry, never an empty result list.
- EDGE-3: a query of only punctuation or whitespace → treated as empty (REQ-8).
- EDGE-4: a query longer than 200 characters → truncated to 200 before searching; the input keeps the text.
- EDGE-5: the reader switches version while the dialog is open → results re-filter to the new version; the query is kept.
- EDGE-6: two sections with the same heading on different pages → both results show their page title, so they are distinguishable.
- EDGE-7: the document set for a version is empty at build time → the build fails (content-model spec EDGE-8); no index is published for that version.
- EDGE-8: the `/` key is pressed inside a text field or the dialog → it types a slash; only outside text fields does it open search.
- Categories skipped: timing across users and volume (client-side, one reader per index copy); integration (no external service).

## Acceptance criteria

- AC-1:
  Given a generated documentation page and the generated landing
  When the reader activates the entry point or presses `/` outside a text field
  Then the search dialog opens with its input focused on both pages
  Covers: REQ-1
- AC-2:
  Given the dialog is open and network requests are recorded
  When the reader types `mod`
  Then results are shown before any further action, and the only requests made are for static files of the site
  Covers: REQ-2, REQ-6
- AC-3:
  Given a page with a section heading "Static backdrop" under the modal page
  When the reader types `backdrop`
  Then a result shows the page title, the heading and a snippet with `backdrop` highlighted, and activating it opens the page scrolled to that heading's anchor
  Covers: REQ-3
- AC-4:
  Given v1 and v0 content both contain a button page
  When the reader searches `button` from a v0 page and then from a v1 page
  Then the results from the v0 page point only at `/docs/v0/` URLs and the results from the v1 page only at `/docs/v1/` URLs
  Covers: REQ-4
- AC-5:
  Given the index for v1
  When the reader types `modla` (one typo) and, separately, `moda` (a prefix)
  Then the modal page appears in the results for both, and for the query `modal` the result whose title is "Modal" ranks above any result matching only in the body
  Covers: REQ-5
- AC-6:
  Given the dialog has results
  When the reader presses ArrowDown twice, Enter, and later Escape on a reopened dialog
  Then the third result is selected and announced, Enter opens it, and Escape closes the dialog and returns focus to the entry point
  Covers: REQ-7
- AC-7:
  Given the dialog is open
  When the input is empty and, separately, contains `zzzzqq`
  Then the empty state shows only the input, and the no-result state reads "No results for zzzzqq"
  Covers: REQ-8
- AC-8:
  Given the index is loaded in a browser with 4x CPU throttling
  When the build test measures the time from a keystroke to results rendered for 20 queries
  Then every measurement is at most 100 ms
  Covers: NFR-1
- AC-9:
  Given the generated site for a version with up to 60 pages
  When the dialog is opened for the first time and the loaded static files are summed
  Then their compressed size is at most 300 KB
  Covers: NFR-2
- AC-10:
  Given a documentation page with the dialog open and results shown
  When the accessibility check and Lighthouse (mobile) run
  Then 0 WCAG 2.2 AA violations are reported and accessibility stays at or above 95
  Covers: NFR-3

## Assumptions

- ASSUMPTION-1: One index per version, loaded on demand, is acceptable instead of one index for all versions with a filter. Safe because: brief decision 5 asks for one document set with a version filter, which the build still produces; splitting the loaded file per version is an implementation choice that keeps NFR-2 small and does not change what the reader sees.

## Open questions

- OPEN-1 (resolved 2026-09-23): 100 ms under 4x CPU throttling (user). Blocks: nothing. Recommended: as decided.
- OPEN-2 (resolved 2026-09-23): 300 KB compressed for up to 60 pages (user). Blocks: nothing. Recommended: as decided.

## Readiness

- Ready for architecture: yes. Every REQ and NFR is sourced and covered; no open question remains.
