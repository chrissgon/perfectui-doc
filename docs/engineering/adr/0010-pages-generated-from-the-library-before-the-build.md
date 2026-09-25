# ADR-0010: Pages generated from the library's documents before the build

- Status: proposed
- Date: 2026-09-25
- Serves: REQ-1, REQ-2, REQ-3, REQ-4, REQ-5, REQ-6, REQ-7, REQ-8, NFR-1, NFR-2, EDGE-1, EDGE-4

## Context

The site's 28 pages are copies of the library's `docs/*.md` and `MIGRATION.md`, extended by hand, and every fix is made twice (user, 2026-09-25). The user chose the library as the single source, converted at build, following the installed version's tag (spec REQ-1, REQ-2). The library's documents are flat (`docs/button.md`), ordered only by the summary in `docs/README.md`, and written for GitHub, while the site's content model expects section folders with numeric prefixes (ADR-0004), frontmatter (content-model REQ-2) and MDC blocks (`::example`, `::warning`; ADR-0002). The content model already validates pages at build (content-model NFR-1), and the fixture site builds from its own `content/`.

## Options

### Option A: a sync step writes `content/<major>/` from the library before `nuxt generate` and `nuxt dev`
- Consequences: the content model, its validation, navigation, search and the fixture site stay unchanged, since they read the same folders; the conversion is a pure function tested on strings; the step fetches one archive per major (`codeload.github.com/chrissgon/perfectui/tar.gz/<ref>`), or reads a local checkout, into a cache under `.cache/library/<ref>/`; `content/v1/` becomes a generated, ignored folder. Cost: a step before every build and dev server, and a build that needs the network unless the cache or a checkout exists.

### Option B: Nuxt Content's repository source (`source.repository`, @nuxt/content 3.16.1) with a transform hook
- Consequences: no separate step, and Nuxt Content downloads the repository; but the flat files keep their names, so sections and order would need a second mechanism instead of the folders of ADR-0004; heading shifts, `html live` fences and alerts would be rewritten inside parse hooks the fixture site does not exercise; the downloaded files are outside the validation that reads `content/`.

### Option C: the library ships `docs/` in its npm package and the site reads `node_modules`
- Consequences: no download, and the documents always match the installed version exactly; but a documentation fix needs a library release, and the library's package grows for every user to carry the site's source. It changes the library's `files` for the site's convenience.

## Decision

Option A. It keeps every contract the content model already proves (folders, frontmatter, blocks, validation) and adds one tested conversion in front of it. The installed version's tag is the default ref (spec REQ-2), and the pinned-ref override covers the time before a library release carries the markers.

## Consequences

- `shared/library-docs.ts` holds the conversion (summary, document, links), and `scripts/sync-docs.ts` fetches and writes; `bun run generate` and `bun run dev` run the sync first.
- `content/v1/` is generated and ignored; `content/landing.yml` stays in the repository.
- The markers live in the library's documents (`html live`, `name=`, GitHub alerts, `<!-- site: … -->` comments); their first version is produced by a one-time reverse conversion of the site's current pages, so the round trip proves NFR-1.
- A second documented major needs its own library ref in `app/versions.ts`, and its live examples need that major's stylesheet: out of scope until a second major exists.
