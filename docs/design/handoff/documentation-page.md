# Handoff: documentation page

- Owner: design-handoff
- Status: draft
- Date: 2026-09-24
- Screen: SCREEN-2 of the flows, with the shell (SCREEN-3) and the search dialog (SCREEN-4)
- Approved design: `docs/design/results/documentation-page.md`, run R1 (direction A, "Canvas first", Claude Design), approved by the user on 2026-09-24
- Export: `docs/design/screens/docs-button/perfect-ui-docs-button.html` and `.png`, unpacked to `docs/design/handoff/documentation-page/export/`

## Summary

The documentation page becomes one Nuxt layout that renders any Markdown page of any version: sidebar from the content folders, page header from frontmatter, example blocks from the Markdown's example syntax, on-page headings from the rendered h2s. The Button page of the export is the reference for the look; its text is the tool's and is replaced by the Markdown source.

## Sources

- `docs/design/results/documentation-page.md` (decision), `docs/design/briefs/documentation-page.md` (constraints, criteria)
- `docs/product/specs/markdown-content-model.md` (example blocks, badges, navigation from folders, versions), `docs/product/specs/search.md` (results as you type, typo tolerance, keyboard), `docs/product/specs/landing-and-site-shell.md` REQ-7 to REQ-10
- `docs/design/design-system.md` (layout values, OPEN-1 on highlighted code); `docs/design/flows.md` SCREEN-2 to SCREEN-5
- The export's page source, 19 style blocks and its behaviour script (`export/scripts/01.js`), read on 2026-09-24
- Library documentation `docs/button.md` of `@chrissgon/perfectui` (the page's real content)

## Reference and shipping

- Reference only, never shipped: the tool's component runtime and React 18 from a CDN; the inlined copy of the perfectui stylesheet (blocks 01 to 15) with its invented tokens; Fira Code from a font CDN (block 18); the hard-coded `NAV`, `SECTIONS`, `ROWS` and `INDEX` data; the simulated index loading (900 ms timer); the Lucide set bundled whole.
- Shipped: `@chrissgon/perfectui` from npm, pinned as the landing handoff's OPEN-1 decides; Inter and Fira Code self-hosted; 13 icons from `handoff/documentation-page/assets/` through the §1.6 icon recipe; wordmark and mark SVGs.

## Tokens

| Value | Where | Maps to | Action |
|-------|-------|---------|--------|
| `--pui-*-fill`, `--pui-*-fill-hover`, `--pui-*-on-fill`, `--pui-*-edge`, `--pui-*-ink` (per-role aliases) | badges, callouts, links, syntax colours | the library's colour classes and contract | fix in code: colour classes for components; the site tokens `--site-theme-ink`, `--site-success-ink`, `--site-warn-ink`, `--site-error-ink` for text |
| `--pui-space-*`, `--pui-radius-*` | spacing and radii | `--pui-space`, `--pui-radius`, card radius 9 px, Tailwind scales | fix in code |
| `--pui-font-sans`, `--pui-font-mono`, `--pui-font-size-small`, `--pui-font-weight-strong`, `--pui-line-height` | all text, code | site type roles | add site tokens `--site-font-sans`, `--site-font-mono` |
| `--pui-surface-*`, `--pui-text-body`, `--pui-text-secondary`, `--pui-backdrop` | page, panels, secondary text, search backdrop | `--pui-bg`, `--pui-bg-muted`, `--pui-bg-emphasis`, `--pui-text`, `--pui-text-muted` | fix in code |
| `--pui-duration`, `--pui-easing` | transitions | the library's 150 ms transitions | fix in code |
| `--logo-filter` | wordmark in dark mode | none | fix in code: inline SVG with `currentColor` |
| Syntax colours: tags `theme ink`, attributes `warn ink`, values `success ink`, punctuation `text-muted`, text `text` | code tabs, inline code | design-system OPEN-1 (highlighted code from the role inks) | add site token: close OPEN-1 with this mapping (OPEN-1 below) |
| #3c32aa | purple in the header band glow | `PerfectUI/doc/glow-purple` | fix in code |
| #676d7b | light `--pui-text-muted` in the inlined library | the library after commit 169cec1 (unreleased) | use token: arrives with the pinned release |
| #000, #fff, #0092cd, #07b6f0, #111827, #16a34a, #1f2937, #22c55e, #374151, #6b7280, #9ca3af, #d1d5db, #d97706, #dc2626, #e5e7eb, #ef4444, #f3f4f6, #f59e0b | the inlined library's token values | the library's own tokens | use token |

## Components

| Region | Unit | Props and data | Content source | States |
|--------|------|----------------|----------------|--------|
| Shell header | `SiteHeader` (shared with the landing) plus `VersionSwitch` (dropdown on `popover`) and `SearchButton` (with the ⌘K hint) | versions, current version | versions configuration | default, narrow with menu control |
| Page header | `DocHeader` (site): section label, title, since or changed badge (`pui-badge pui-soft pui-theme`), description | page | Markdown frontmatter (title, description, since, changed) and the section folder name | with badges, without badges |
| Content with example blocks | Markdown prose rendered by the content module; `ExampleBlock` (site): Preview and Code tabs, language label, copy control, dot-grid canvas; `Callout` note and warning; reference tables with `pui-table` | the example's HTML | the Markdown file of the page (example syntax of the content model); the export's prose is not used | preview, code, copied (1500 ms), note, warning |
| Sidebar navigation of the version | `DocSidebar` (site): collapsible sections, current page marked with `pui-soft pui-theme` | navigation tree | content folders and numeric prefixes of the version (ADR-0004) | expanded, collapsed, current, narrow panel |
| On-page headings list | `DocToc` (site): h2 list with a moving 2 px indicator | headings | rendered h2 of the page | current heading; absent when the page has no h2 |
| Previous and next page links | `DocPager` (site): two framed links | neighbours | navigation order | only previous, only next |
| Edit link | link with the pencil icon | file path | repository URL plus the page's source path | default |
| Search dialog | `SearchDialog` (site) on `pui-modal` with `pui-input`, grouped results, keyboard hints | query, results | the build-time search index (search spec) | empty, loading on first open, results, no results, selected result |
| Footer | `SiteFooter` (shared with the landing) | links | site configuration | default |

## Layout

| Width | Columns and order | Sticky | Collapsed or hidden |
|-------|-------------------|--------|---------------------|
| 1280 and up | `272px minmax(0, 1fr) 208px` inside a 1440 px max frame; content reading width 72ch; header 64 px | header at top 0; sidebar at 65 px with height `calc(100vh - 65px)`, scrolling inside; headings list at 72 px | nothing |
| 1024 to 1279 | sidebar and content; headings list moves into the content as an "On this page" disclosure | header, sidebar | headings column: not designed, follow the flows |
| 768 to 1023 | content only; sidebar becomes a panel behind a menu control | header | sidebar: not designed, follow the flows |
| 360 | one column; code and tables scroll inside their box; search dialog full screen | header | not designed; follow the brief's narrow state |

## Behaviour

| Interaction | Requirement | Rule |
|-------------|-------------|------|
| Example tabs | content-model spec REQ-3; brief keyboard path | Preview and Code as a tab list; arrow keys switch; code never wraps, scrolls horizontally |
| Copy example | content-model spec; brief | clipboard write; "Copied" for 1500 ms; without clipboard access the code is selected |
| Search | search spec | ⌘K or Ctrl+K and `#search=<query>` open the dialog; input focused; results as you type grouped by page with the match highlighted in a snippet of about 120 characters starting 40 before the first hit; up and down move, Enter opens, Esc closes; the index loads on first open (real load, not the export's 900 ms timer) |
| Version switch | content-model spec REQ-5, REQ-6 | same path in the chosen version when it exists; otherwise the version index with the notice (SCREEN-5) |
| Mode and theme | landing spec REQ-8, REQ-9 | as the landing handoff: `setMode` with cookie; `--pui-theme` in session storage |
| Scroll spy | brief | current heading from an intersection observer with root margin `-80px 0px -60% 0px`; anchors offset by `scroll-padding-top: 88px` |

## Motion

| Animation | Trigger | Timing | Final state | Reduced motion |
|-----------|---------|--------|-------------|----------------|
| Current-heading indicator | scroll | 150 ms position transition | indicator beside the current heading | jumps without transition |
| Copy feedback | copy | label and icon change at once, revert after 1500 ms | "Copy" | same (no motion involved) |
| Sidebar sections | toggle | chevron rotation, 150 ms | open or closed | no rotation transition |
| Mode and theme changes | interaction | the library's 150 ms colour transitions | new colours | the library's transitions remain |

## Assets

- `handoff/documentation-page/assets/`: wordmark and mark (inline, `currentColor`); icons check, chevron-down, circle-alert, copy, ellipsis, figma, github, moon, pencil, search, sun, triangle-alert, x (Lucide, §1.6 recipe; brand icons as in the landing handoff).
- Fonts as the landing handoff.

## Deviations

- DEV-1: The prose and the reference table of the Button page are the tool's text, not `docs/button.md` (for example "Pick one of four style classes…" and "Button shape: 8 × 16 px padding…"). Action: fix in code (render the Markdown source); whether to adopt the added prose into the site's content is OPEN-2.
- DEV-2: Navigation, sections and the search index are hard-coded arrays, against the content-model and search specs. Action: fix in code.
- DEV-3: The search dialog simulates loading with a 900 ms timer and searches a fixed list. Action: fix in code (build-time index, typo tolerance as the search spec).
- DEV-4: Mode and theme do not use `setMode` and do not persist. Action: fix in code.
- DEV-5: Fira Code loads from a font CDN. Action: fix in code (self-host).
- DEV-6: Invented tokens and an inlined library copy (Tokens table). Action: fix in code.
- DEV-7: Only 1280 light was delivered: narrow, dark, no-headings, version-notice and search states are not designed. Action: back to design (round 2 in the same project).

## Acceptance

- Reference: `docs/design/screens/docs-button/perfect-ui-docs-button.png` (full page, 1280 light, rendered at 2×).
- Compare at: 1280 px light against the reference; 1280 px dark, 1024, 768 and 360 px against round-2 captures; states: default, copied, search open with results, page without headings.
- Tolerances: layout within 4 px at 1280; exact tokens; the text differs by design (DEV-1), so compare structure and style, not words.

## Open questions

- OPEN-1: Close design-system OPEN-1 with the export's syntax colours (tags in the theme ink, attributes in the warn ink, values in the success ink, punctuation muted)? Blocks: the code block's final colours. Recommended: yes; it is the role-ink mapping the design system proposed, now seen working in both modes.
- OPEN-2: Adopt the tool's explanatory sentences (one per section) into the site's own content for v1? Blocks: nothing (the layout does not depend on it). Recommended: yes for the sentences that state library facts, after checking each against the library's docs, because the library's pages have code but little prose and the user allowed the site to extend them.

## Readiness

- Ready for eng-architecture: yes; DEV-7 needs round 2 before design-implementation-validation beyond 1280 light.
