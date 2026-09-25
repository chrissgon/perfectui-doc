# ADR-0001: One content collection per major version

- Status: proposed
- Date: 2026-09-23 (revised 2026-09-24 for the final URL scheme)
- Serves: REQ-1, REQ-5, REQ-6, REQ-11, EDGE-1

## Context

Documentation lives in `content/v1/` (latest) and `content/v0/` (0.23). Every version, the latest included, is served at `/docs/<major>/<section>/<slug>` (user decision, 2026-09-23, final); unversioned paths redirect to the latest major (ADR-0005). Nuxt Content v3 derives a page's path from its file location and lets a collection's `source.prefix` replace the leading folder in the generated path; collections are defined in `content.config.ts` with `defineCollection({ type: 'page', source: { include, exclude, prefix, cwd }, schema })`, and "you can define as many collections as you want" (content.nuxt.com/docs/collections/define, accessed 2026-09-23). Navigation is queried per collection with `queryCollectionNavigation(collection)` (content.nuxt.com/docs/utils/query-collection-navigation).

## Options

### Option A: one collection per major (`docs_v1` with prefix `/docs/v1`, `docs_v0` with prefix `/docs/v0`)
- Consequences: each version maps to its own routes with the documented `prefix`; navigation, search sections and the version switch query one collection by name; adding a version is one folder plus one collection entry plus one line in the versions configuration; queries never filter by path.

### Option B: one collection `docs` over `content/**` with the version derived from the path
- Consequences: with every version prefixed, one collection with prefix `/docs` now yields the right paths without rewrites, so this option became viable on 2026-09-24; but navigation, search sections and the switch would filter by path on every call, and a later major with a different frontmatter schema could not get its own schema.

## Decision

Option A. It uses only documented behaviour, keeps every query scoped to one version without path filters, and lets a future major change its schema alone.

## Consequences

- `content.config.ts` grows by one entry per major version; the versions configuration (REQ-5) names the collection for each version.
- The version switch (REQ-6) is a query on the target version's collection for the same relative path.
- Cross-version content queries iterate over the configured collections.
