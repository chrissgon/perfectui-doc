# ADR-0009: Client-side search with a MiniSearch index serialized at build

- Status: accepted (T-sr-1, 2026-09-25)
- Date: 2026-09-24
- Serves: REQ-2, REQ-5, REQ-6, NFR-1, NFR-2

## Context

Search runs in the browser over an index produced by `nuxt generate`, with the reader experience of Algolia DocSearch: results from the first keystroke, prefix matches, one typo for words of four characters or more, title matches ranked higher, highlighted snippets (spec REQ-2, REQ-5; user, 2026-09-23). The index must come from the content model's document set, not from a separate content walk (spec constraint), load only on first open, answer within 100 ms under 4× CPU throttling and weigh at most 300 KB compressed on first open (NFR-1, NFR-2).

## Options

### Option A: MiniSearch 7.2.0, index built in a prerendered route and loaded with `MiniSearch.loadJSON`
- Consequences: fuzzy per term length, prefix search and per-field boosts are documented options; results carry the matched terms for highlighting; the index is built from the document set inside the same build; about 7 KB gzip of library code; no worker needed at tens of pages.

### Option B: FlexSearch 0.8.212
- Consequences: faster at very large corpora; but its typo handling is tokenizer and encoder based rather than an edit distance per term length, so "one typo from four characters" needs custom work, and its export format is split across keys.

### Option C: Pagefind
- Consequences: built for static sites with a chunked index and its own UI; but it indexes the generated HTML after the build, a second content walk the spec forbids, and its UI would have to be replaced to match the approved dialog.

## Decision

Option A.

## Consequences

- `shared/search-options.ts` is imported by the build route and by the browser, so both sides agree on fields and rules.
- AC-5 runs against the built index, so a change of options that breaks typo tolerance or ranking fails the tests.
