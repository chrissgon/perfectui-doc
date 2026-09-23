# ADR-0003: Search document set and assistant corpus as prerendered server routes

- Status: proposed
- Date: 2026-09-23
- Serves: REQ-8, NFR-2, EDGE-8, EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9

## Context

The site is fully static (`nuxt generate`, user decision 2026-09-23). Two artifacts must be produced from the collections at build time: a search document set and an assistant corpus (REQ-8). Nitro: "routes specified in `prerender.routes` will be fetched during the build and copied to the `.output/public` directory as a static asset", and `failOnError: true` halts the build when prerendering fails (nitro.build/config, accessed 2026-09-23). The site's `nuxt.config.ts` already passes `nitro` options. Nuxt Content exposes `queryCollectionSearchSections(collection, { ignoredTags, minHeading, maxHeading, extraFields })` returning sections with `id`, `title`, `titles`, `content`, `level`, usable on the server with `event` as first argument (content.nuxt.com/docs/utils/query-collection-search-sections).

## Options

### Option A: server routes `/api/search-index.json` and `/api/assistant-corpus.json`, listed in `nitro.prerender.routes`, built from the collections; they validate the content and throw on violations
- Consequences: one build produces pages and artifacts; failures stop the build through `failOnError`; the same handlers serve development; the artifacts are plain static files in `.output/public/api/`.

### Option B: a post-build script that reads the generated HTML or the content folder and writes the files
- Consequences: a second pipeline with its own parser, run outside Nuxt; content validation would be duplicated; errors would surface after the site is already generated.

## Decision

Option A.

## Consequences

- `nuxt.config.ts` sets `nitro.prerender.routes` for the two artifacts and `nitro.prerender.failOnError: true`.
- Content validation for the edge cases that Nuxt Content may not enforce (missing required fields, duplicate slugs, `since` newer than the major, broken internal links) lives in a server utility used by both handlers, so the build fails with a message naming the file.
- The artifact shapes are contracts in the design; the search provider decision (spec OPEN-3) consumes the search document set without changing it.
