# ADR-0008: The landing's showcase renders named example blocks from the documentation

- Status: accepted (spike T-sh-11, 2026-09-25)
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

## Spike result (T-sh-11, 2026-09-25)

- Option A holds. A page's stored body is a `minimark` tree (`[tag, props, ...children]`); `ExampleRef` finds the `example` node whose `name` matches, keeps the body's `style` node (the highlighting classes), and renders that body with `ContentRenderer`. The node's props gain `layout: "stacked"`, which `Example` renders as preview above code with no tabs, the export's look.
- A missing page or name throws during prerender and `failOnError` stops the build (slow test: removing `name="basic"` from the modal page fails with `no example named "basic" in /docs/v1/components/modal`).
- The fixture site (T-cm-22) renders a stub home page, since its content has none of the named examples.

