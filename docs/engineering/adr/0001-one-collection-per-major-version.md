# ADR-0001: One content collection per major version

- Status: proposed
- Date: 2026-09-23
- Serves: REQ-1, REQ-5, REQ-6, REQ-11, EDGE-1

## Context

Documentation lives in `content/v1/` (latest) and `content/v0/` (0.23). The latest version must be served at `/docs/<path>` and older versions at `/docs/<major>/<path>` (user decision, 2026-09-23). Nuxt Content v3 derives a page's path from its file location and lets a collection's `source.prefix` replace the leading folder in the generated path; collections are defined in `content.config.ts` with `defineCollection({ type: 'page', source: { include, exclude, prefix, cwd }, schema })`, and "you can define as many collections as you want" (content.nuxt.com/docs/collections/define, accessed 2026-09-23). Navigation is queried per collection with `queryCollectionNavigation(collection)` (content.nuxt.com/docs/utils/query-collection-navigation).

## Options

### Option A: one collection per major (`docs_v1` with prefix `/docs`, `docs_v0` with prefix `/docs/v0`)
- Consequences: each version maps to its own routes with the documented `prefix`; navigation, search sections and the version switch query one collection by name; adding a version is one folder plus one collection entry plus one line in the versions configuration; the latest collection's prefix has no version segment, which is exactly the URL scheme decided.

### Option B: one collection `docs` over `content/**` with the version derived from the path
- Consequences: one query surface; but one `prefix` per source cannot serve `/docs/<path>` for v1 and `/docs/v0/<path>` for v0 at the same time, so the URL scheme would need a runtime rewrite; navigation would have to be filtered by path on every call; whether a collection accepts several sources with different prefixes is not documented on the page read.

## Decision

Option A. It uses only documented behaviour and matches the decided URL scheme without rewrites.

## Consequences

- `content.config.ts` grows by one entry per major version; the versions configuration (REQ-5) names the collection for each version.
- The version switch (REQ-6) is a query on the target version's collection for the same relative path.
- Cross-version content queries iterate over the configured collections.
