# Feature specification: the library's documents as the site's pages, and a version menu

- Owner: product-feature-spec
- Status: draft
- Date: 2026-09-25
- Feature of: PRD `docs/product/prd.md` features F-13 and F-6, phase P-2

## Summary

The site stops keeping its own copy of the documentation. At build time it reads the library repository's `docs/` and `MIGRATION.md` at the documented version's git ref and converts them into the pages it renders today. The header's version badge opens a menu that lists every documented major and the 0.23 documentation archived on GitHub. The 0.23 site and its redirects are removed.

## Goal and users

- Problem: every page exists twice, once in the library's `docs/` (read on GitHub) and once in the site's `content/`. Every fix is made twice, and the two copies drift; a repository test only compares their section counts. Source: user, 2026-09-25 ("qualquer ajuste na doc precisaria ser atualizado lá, como também no repo perfectui-doc").
- Users: the maintainer, who writes the documentation (PRD F-10), and every reader, who needs the site to match the version they installed (PRD U-1, U-2).
- Success: a documentation change is one commit in the library repository; the site shows it after the next build that points at that ref, and no page file is kept in the site repository. Source: user answer 2026-09-25 (option A).

## Scope

- In: fetching the library's documents at a ref; converting them to the content model; navigation from the library's summary; the version menu on the header badge; the archived 0.23 entry; links from the migration guide to the 0.23 documents on GitHub; removal of the 0.23 flat-URL redirects. Source: user answers 2026-09-25.
- Out: converting the 0.23 pages (PRD F-7, retired); the landing's copy, which stays in the site (`content/landing.yml`); switching production to the new site (a release action with its own approval); the markers written into the library's documents, which are a change in the library repository (delivered by a task, reviewed there).

## Sources

- `docs/product/prd.md` (2026-09-25): F-6, F-7 (retired), F-10, F-13, P-2
- User answers of 2026-09-25: option A (library as the source, converted at build, following the installed version's tag); production by replacing `main`; 0.23 redirects removed; the badge becomes the version menu's trigger
- Library repository `chrissgon/perfectui`: `docs/README.md` (the summary: five sections, 27 links in order), `docs/*.md` (26 documents), `MIGRATION.md`, tag `v0.23.0` (the 0.23 `docs/`, 25 documents plus its README)
- The site's pages as of commit f4b7fca: 28 files under `content/v1/`, with frontmatter keys `title`, `description`, `tags` (28), `changed` (1), `from` and `to` (1), 79 `::example` blocks of which 4 are named `basic`, 9 `::warning` callouts and 10 `:v0` links
- `docs/product/specs/markdown-content-model.md` (REQ-1 to REQ-11, the content model the converted pages must satisfy)

## Functional requirements

- REQ-1: The build takes the pages of each documented major from the library repository at that major's git ref: the documents linked from the `docs/README.md` summary, and `MIGRATION.md` when the summary links it. No documentation page of a documented major is kept in the site repository. Source: user answer 2026-09-25 (option A).
- REQ-2: The ref of the latest major is the tag of the installed library version (`v<version>` from `package.json`), unless the versions configuration pins another ref for that major; a local library checkout replaces the download when the maintainer points the build at it. Source: user answer 2026-09-25 (follow the installed version's tag).
- REQ-3: Navigation comes from the summary: each plain line before a list is a section, in order; each link in the list is a page, in order; a page's slug is its link text in kebab case. Source: library `docs/README.md`; content-model spec REQ-4.
- REQ-4: A page's title is the document's first level-1 heading; its description is the first paragraph after that heading, as plain text; a heading line above the title (the library's `#### Components` section label) is dropped; level-3 headings become level 2 and deeper headings move up one level. Source: library documents compared with the site's pages, 2026-09-25.
- REQ-5: A fenced block whose info string is `html live` becomes a live example block; `html live name=<id>` becomes a named example block; every other fenced block stays a highlighted code block. Source: site pages (79 examples, 4 named); library documents.
- REQ-6: A GitHub alert (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`, `> [!IMPORTANT]`) becomes the site's callout of the matching kind. Source: site pages (9 `::warning`); GitHub alert syntax.
- REQ-7: A link to another document of the summary (absolute GitHub URL or relative path, with or without an anchor) becomes a link to that page on the site, keeping the anchor; any other link to the library repository stays a link to GitHub at the same ref. Source: library `docs/README.md` (absolute links to `blob/main/docs/*.md`).
- REQ-8: Page metadata that Markdown cannot express is read from HTML comments of the form `<!-- site: <key>: <value> -->` placed after the title (`changed`, `since`, `from`, `to`), which GitHub does not render; `tags` are derived from the section and the slug. Source: site pages (`changed: "1.0"` on Button; `from` and `to` on the migration guide; `tags` on 28 pages).
- REQ-9: The version badge in the header opens a menu listing every documented major with its label, the current one marked, and the archived 0.23 documentation, which opens the library's `docs/` at tag `v0.23.0` on GitHub. Picking a documented major opens the same page in that major when it exists, otherwise that major's first page with a notice. Source: PRD F-6; user answer 2026-09-25.
- REQ-10: The migration guide's links to 0.23 pages point at the 0.23 documents on GitHub at tag `v0.23.0`, written as ordinary links in `MIGRATION.md`. Source: user answer 2026-09-25 (0.23 read on GitHub).
- REQ-11: The rules that sent the 0.23 site's flat URLs (`/docs/<slug>`) to 1.0 pages are removed; `/docs` and `/docs/<major>` still open the major's first page. Source: user answer 2026-09-25 ("pode remover").

## Non-functional requirements

- NFR-1: The conversion of the library at the ref the site uses today reproduces the site's current 28 pages with 100% of their sections (h2 count), example blocks (count, live or code, name) and callouts, checked before the site's own copies are deleted. Source: PRD R-4's successor risk (roadmap R-2).
- NFR-2: A build with the library already on disk (local checkout or cache) adds at most 5 s to `nuxt generate`; a build that downloads makes exactly one archive request per documented major. Source: engineering target for the build time, 2026-09-25.

## Constraints

- technical: the documents stay readable on GitHub: every marker (info-string words, alerts, `site:` comments) is either rendered by GitHub or hidden by it. Source: user answer 2026-09-25 (the library keeps its `docs/`).
- technical: the converted pages pass the existing build validation of the content model (content-model spec REQ-1 to REQ-3, NFR-1). Source: content-model spec.
- operational: pushing to the library repository and publishing a library release are the user's actions, each approved separately (AGENTS.md rule 4).

## Edge cases

- EDGE-1: the summary links a document that does not exist at the ref → the build fails naming the link and the ref.
- EDGE-2: a document has no level-1 heading → the build fails naming the file.
- EDGE-3: a document in `docs/` is not linked from the summary → it is not published, and the build prints a warning naming it.
- EDGE-4: the ref does not exist or the download fails → the build fails naming the ref; no previously downloaded copy is used silently.
- EDGE-5: `html live` on a snippet that is not HTML, or two examples with the same name on one page → the build fails naming the file and the line.
- EDGE-6: an alert kind the site has no callout for → the build fails naming the file and the kind.
- EDGE-7: two summary links give the same slug in one section → the build fails naming both.
- EDGE-8: the version menu with one documented major → it lists that major and the archived 0.23 entry; nothing else changes.
- Categories skipped: permissions and concurrency (a static build with one writer); data migration (no stored data).

## Acceptance criteria

- AC-1:
  Given the library at the ref the site uses
  When the site builds
  Then every page of the summary is published at `/docs/v1/<section>/<slug>` and `content/v1/` holds no committed page
  Covers: REQ-1, REQ-2, REQ-3
- AC-2:
  Given the library at the ref of commit f4b7fca's pages
  When the conversion runs
  Then its output matches the site's current 28 pages in title, description, tags, sections, example blocks, named examples and callouts
  Covers: REQ-4, REQ-5, REQ-6, REQ-8, NFR-1
- AC-3:
  Given a document linking another document with an anchor, and a link to the library's `src/`
  When the page renders
  Then the first link opens the site page at the anchor and the second opens GitHub at the ref
  Covers: REQ-7
- AC-4:
  Given the fixture library with each failure of EDGE-1, EDGE-2, EDGE-4, EDGE-5, EDGE-6 and EDGE-7
  When the conversion runs
  Then it fails with a message naming the file, line or ref; with EDGE-3 it warns and continues
  Covers: EDGE-1, EDGE-2, EDGE-3, EDGE-4, EDGE-5, EDGE-6, EDGE-7
- AC-5:
  Given a documentation page
  When the reader opens the version badge
  Then a menu lists 1.x as current and "0.23" linking to `github.com/chrissgon/perfectui/tree/v0.23.0/docs`; with two documented majors in the fixture site, picking the other opens the same page, or its first page with the notice when the page is missing
  Covers: REQ-9, EDGE-8
- AC-6:
  Given the migration guide
  When it renders
  Then its 0.23 links open documents under `blob/v0.23.0/docs/` on GitHub
  Covers: REQ-10
- AC-7:
  Given the generated `_redirects`
  When it is read
  Then it has no `/docs/<slug>` rule for a page and keeps the `/docs` and `/docs/<major>` rules
  Covers: REQ-11
- AC-8:
  Given the library on disk
  When `nuxt generate` runs with and without the conversion
  Then the difference is at most 5 s, and a download build logs one archive request per major
  Covers: NFR-2

## Assumptions

- ASSUMPTION-1: the next library release (after `v1.0.0-beta.1`) carries the markers of REQ-5, REQ-6 and REQ-8. Safe because: the user publishes the library and chose option A knowing the documents change; until then the site pins the library commit that adds them (REQ-2).

## Open questions

- OPEN-1: The migration guide's slug becomes `migrating-from-0-x` (its summary link text) instead of `migrating-from-0-23`. Blocks: nothing (the site is not in production yet). Recommended: accept it; the landing's link is updated in the same change.

## Readiness

- Ready for architecture: yes; OPEN-1 blocks nothing.
