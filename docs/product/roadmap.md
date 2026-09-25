# Roadmap: perfectui documentation site (1.0 rebuild)

- Owner: product-roadmap
- Status: draft
- Date: 2026-09-23
- PRD: docs/product/prd.md

## Summary

Three releases, one per PRD phase. The first proves the whole authoring chain at the 1.0 launch: pages from Markdown, navigation, landing, migration guide, search and site shell, with every metric of the PRD's phase P-1 green in the build. The second adds versions with the 0.23 archive; the third runs the assistant experiment behind a flag. No dates: no source gives a launch date or capacity.

## Sources

- `docs/product/prd.md` (2026-09-23): features F-1 to F-12 with priority and phase, metrics M-1 to M-4, risks R-1 to R-5, phases P-1 to P-3 and their exit criteria
- `docs/product/specs/markdown-content-model.md` (F-1, F-2, F-10, F-12): REQ-5 versions configuration, REQ-8 document set and corpus, REQ-3 example blocks as single source
- `docs/product/specs/landing-and-site-shell.md` (F-3, F-8, F-9): REQ-5 showcase reuses the documentation's example blocks; REQ-7 shell shared with documentation pages; REQ-4 call to action to the migration guide
- `docs/product/specs/migration-guide.md` (F-4): REQ-1 page rendered by the content model; REQ-3 links to v0 pages appear when v0 exists
- `docs/product/specs/search.md` (F-5): REQ-6 index generated from the document set and corpus of content-model REQ-8; REQ-4 filtered by the versions configuration
- `docs/workbench/state.md` decisions of 2026-09-23: search in phase 1; area order product, design, engineering, AI; v0 in scope; design generated in the design tool
- Brief `docs/workbench/briefs/perfectui-doc-redesign.md`: phases 1 to 3 approved by the user

## Method

Method: dependency first (a feature never ships before what it needs), then priority (`must` before `should` before `later`), then risk (features that retire a PRD risk earlier go earlier inside a release). Dates: none; no source gives a launch date or capacity, so releases carry exit criteria instead.

## Dependencies

- F-1: Depends on: none. It is the content model itself (content-model spec).
- F-10: Depends on: F-1, because the authoring workflow is the content model's build behaviour (content-model spec NFR-1, AC-9).
- F-2: Depends on: F-1, because navigation is derived from the content folders (content-model spec REQ-4).
- F-12: Depends on: F-1, because badges read `since` and `changed` from the frontmatter schema (content-model spec REQ-2, REQ-7).
- F-8: Depends on: none. The mode toggle and theme picker call the library directly (landing spec REQ-8, REQ-9).
- F-9: Depends on: F-1, because documentation pages take their title and description from frontmatter (landing spec REQ-10).
- F-3: Depends on: F-1, F-8, F-9, because the showcase reuses the documentation's example blocks (landing spec REQ-5) and the landing carries the shell with the mode and theme controls and the page metadata (landing spec REQ-7, REQ-10).
- F-4: Depends on: F-1, F-3, because the guide is a page rendered by the content model (migration-guide spec REQ-1) and is linked from the landing (landing spec REQ-4).
- F-5: Depends on: F-1, F-10, F-2, because the index is generated from the document set and corpus of the build (search spec REQ-6) and results open pages at section anchors that navigation defines (search spec REQ-3).
- F-6: Depends on: F-1, F-2, because switching maps the same path across version folders and needs the versions configuration (content-model spec REQ-5, REQ-6, REQ-11).
- F-7: Depends on: F-1, F-6, because the v0 pages are content in `content/v0/` served behind the switcher (PRD F-7; content-model spec REQ-1).
- F-11: Depends on: F-10, F-6, because the assistant retrieves from the corpus the build generates (content-model spec REQ-8) and filters by the version being read (brief decision 5).

## Releases

- R-1: 1.0 launch. Goal: every component and guide of perfectui 1.0 documented from Markdown on a site an evaluator can search and a migrating user can follow. Includes: F-1, F-10, F-2, F-12, F-8, F-9, F-3, F-4, F-5. Order: F-1 with F-10 (the content model is what everything else renders through, and the add-page check proves the authoring goal first), then F-2 and F-12 (navigation and badges complete the documentation reading experience from the same folders), then F-8 and F-9 (the shell's controls and metadata are needed by every page and by the landing), then F-3 (the landing reuses example blocks and the shell, and the design phase delivers its layout), then F-4 (one content page linked from the landing), then F-5 (the index needs the final document set and section anchors; PRD R-2 is retired here by shipping search before the exit). Exit: the site generates statically with M-1 at 14 of 14 components documented, the landing and the migration guide published, search answering over the current version, and M-2, M-3 and M-4 green in the build tests (PRD P-1). Depends on: none.
- R-2: Versions. Goal: 0.23 stays documented as v0 behind a version switcher. Includes: F-6, F-7. Order: F-6 (the switcher and the version-aware routing come first so v0 pages have a home), then F-7 (the 32 pages converted page by page against branch `main`, which retires PRD R-4 by comparing section and example counts). Exit: every 0.23 page reachable under `/docs/v0/`, the switch lands on the same path or the version index with a notice, one search index and one corpus carry a version filter (PRD P-2). Depends on: R-1.
- R-3: Assistant experiment. Goal: a reader with WebGPU can ask questions answered from the documentation, behind a flag. Includes: F-11. Order: F-11 (the evaluation set of PRD OPEN-4 is defined before the model is wired, so quality is measured, not assumed). Exit: behind a flag, on a browser with WebGPU, the assistant answers from the corpus of the selected version and its quality is measured against the target of PRD OPEN-4 (PRD P-3). Depends on: R-2.

## Now, next, later

- Now: F-1, F-10
- Next: F-2, F-12, F-8, F-9, F-3, F-4, F-5
- Later: F-6, F-7, F-11

## Risks by release

- R-1: PRD R-1 (library beta may rename classes) mitigated by pinning the exact version and validating every example block in the build from F-1 on; PRD R-2 (search provider) retired by placing F-5 inside R-1 after the client-side decision of 2026-09-23; PRD R-5 (AI-generated design drifts from the 14 shipped components) mitigated by validating the design against the component list before F-3 and F-8 are implemented.
- R-2: the switch control's check clicks the control on a shared page and on a v1-only page, exercising `useVersionSwitch` end to end (T-cm-15 review). PRD R-4 (v0 conversion loses content) mitigated by converting F-7 page by page with section and example counts compared against branch `main`.
- R-3: PRD R-3 (WebGPU coverage and model size) mitigated by the flag, detection and opt-in download of brief decision 4; the quality target is PRD OPEN-4.

## Not planned

- none: every PRD feature is placed; F-11 (later) ships in R-3.

## Assumptions

- ASSUMPTION-1: The design phase runs between the content model (F-1, F-10) and the shell and landing (F-8, F-9, F-3) inside R-1, so engineering can start the content model while the design is generated. Safe because: the content model has no visual dependency (its spec covers structure and build behaviour) and the user approved the area order product, design, engineering, AI on 2026-09-23.
- ASSUMPTION-2: The 1.0 pages themselves (writing the 14 component pages and the guides) are content work inside F-1's release, not a feature of their own. Safe because: the PRD's M-1 counts them as R-1's exit and the content-model spec leaves the page list to the feature spec's assumption 2; the backlog will cut them as content tasks.

## Open questions

- OPEN-1: Should the conversion of the 32 v0 pages (F-7) start during R-1, in parallel, as pure content work once the content model renders? Blocks: nothing in R-1 (F-7 stays in R-2 for shipping). Recommended: yes, start it as soon as F-1's fixtures render, because it depends only on the content model and shortens R-2 to F-6 plus review.

## Readiness

- Ready for design and engineering: yes: start with F-1 and F-10 in engineering while the design phase produces the shell and landing for F-8, F-9 and F-3; OPEN-1 blocks nothing.
