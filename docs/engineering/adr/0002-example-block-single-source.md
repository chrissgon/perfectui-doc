# ADR-0002: Example blocks written once, in a fenced block inside an MDC component

- Status: proposed
- Date: 2026-09-23
- Serves: REQ-3, REQ-10, NFR-1, EDGE-7

## Context

Every example must render a preview (the HTML executed) and a code tab (the same HTML highlighted) from one place in the Markdown file, with highlighting done at build time by Shiki (Nuxt Content v3; brief decision 6). MDC block components receive Markdown in a default slot and props inline or as YAML (content.nuxt.com/docs/files/markdown, accessed 2026-09-23). Shiki highlights fenced code blocks in Markdown, not strings passed as props.

## Options

### Option A: fenced ```html block in the component's default slot; the component renders the slot for the code tab and derives the preview from the slot's text
- Consequences: the snippet is written once; highlighting comes from the build for free; the component must recover the raw text from the rendered slot (text nodes of the highlighted `<pre>`), which works on the server and the client but must be proven in a spike before pages are written.

### Option B: the snippet as a YAML block-scalar prop (`code: |`), preview from the prop, code tab highlighted at runtime
- Consequences: simple component; but highlighting at runtime reintroduces a client-side highlighter, contradicting REQ-10 and the removal of the worker; the prop is not a fenced block, so no build-time highlighting.

### Option C: a parse hook that reads the fenced block and injects it as a prop
- Consequences: single source and build-time highlighting; depends on Nuxt Content's file hooks, not read on the pages consulted; more moving parts than A.

## Decision

Option A, with C as the fallback if the spike shows the raw text cannot be recovered reliably from the slot.

## Consequences

- The first backlog task of this feature is the spike: one page, one `::example` block, preview and code tab rendered by `nuxt generate` (AC-3).
- The component contract is a single default slot; authors never repeat a snippet.
