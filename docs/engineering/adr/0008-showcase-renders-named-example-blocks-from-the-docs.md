# ADR-0008: The landing's showcase renders named example blocks from the documentation

- Status: proposed
- Date: 2026-09-24
- Serves: REQ-5, NFR-1

## Context

The landing shows at least four live components rendered from the same example blocks the documentation uses, with no example HTML in the landing's source (REQ-5, AC-5). Examples are `::example` blocks in the Markdown pages (content-model design, ADR-0002). MDC blocks accept attributes (`::example{name="basic"}`), and a page queried from a collection returns its body as an AST that `ContentRenderer` renders (content.nuxt.com, files/markdown and components/content-renderer, accessed 2026-09-23). The approved design's overlays section shows a modal, a dropdown, a tooltip and an accordion.

## Options

### Option A: `ExampleRef` queries a docs page and renders only the child of its body with the requested `name`
- Consequences: one source for every example; authors name the examples the landing uses; the build fails when a referenced name disappears, so the landing cannot drift from the docs; depends on selecting one node of the body AST and rendering it alone (to verify; fallback: Option B).

### Option B: shared example files under `content/examples/`, included by both the docs page and the landing
- Consequences: explicit files, trivially renderable; but examples leave the page they document, so authors edit two places when a page changes, against NFR-1's single-file promise.

### Option C: copy the four examples into the landing
- Consequences: simplest; violates REQ-5 and AC-5.

## Decision

Option A, with B as the fallback.

## Consequences

- The four overlay examples are named in their pages (`modal/basic`, `dropdown/basic`, `tooltip/basic`, `accordion/basic`).
- AC-5's repository check also asserts that every `ExampleRef` name exists in the content at build.
