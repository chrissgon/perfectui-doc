# ADR-0004: Navigation from folder structure and numeric prefixes, with a specification amendment

- Status: accepted
- Date: 2026-09-23
- Serves: REQ-2, REQ-4, EDGE-5

## Context

The specification asks for navigation derived from the collection (REQ-4) and lists `section` and `order` frontmatter fields (REQ-2). Nuxt Content v3 orders content by numeric prefixes on file and folder names ("Use numeric prefixes in file and directory names to specify an order"; the prefix is stripped from generated paths; single digits must be zero-padded; the separator must be `.`), builds the navigation tree from the directory structure with `queryCollectionNavigation`, and lets a folder declare its title and metadata in `.navigation.yml` (content.nuxt.com/docs/collections/types and /docs/utils/query-collection-navigation, accessed 2026-09-23).

## Options

### Option A: folders are sections, numeric prefixes are the order, `.navigation.yml` holds section titles; `section` and `order` frontmatter fields are dropped
- Consequences: uses the documented navigation tree and ordering; slugs stay stable because prefixes are stripped from paths (`01.components/03.button.md` → `/components/button`); reordering is a file rename; requires amending REQ-2 and REQ-4 in the specification.

### Option B: keep `section` and `order` in frontmatter and build the navigation by querying all pages and grouping them in code
- Consequences: matches the specification literally; ignores the documented navigation tree; custom grouping and sorting code to maintain; ordering lives in every file's frontmatter instead of the folder listing.

## Decision

Option A. The maintainer accepted the amendment of REQ-2 and REQ-4 on 2026-09-23.

## Consequences

- Content layout: `content/v1/01.getting-started/01.installation.md`, `content/v1/02.components/01.button.md`, each folder with `.navigation.yml` (`title`, optional `description`).
- The same relative path must exist in every version that documents the topic (REQ-11) after prefix stripping, so numeric prefixes may differ between versions without breaking the version switch.
- Empty sections cannot exist as navigation entries because a folder with no pages produces no tree node (EDGE-5).
