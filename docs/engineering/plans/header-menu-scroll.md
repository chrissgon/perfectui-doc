# Plan: header-menu-scroll

- Task: "no dropdown do ícone de 3 pontos no header, o dropdown desaparece acima do header quando deslizamos a tela pra baixo" (user, 2026-09-26, iPhone screenshot of the landing on perfectui.netlify.app); "se você scrollar a página para depois da primeira seção você já deve visualizar o bug"
- Date: 2026-09-26
- Flow: flow-fix-bug (draft), phase 1

## Root cause

- Owner: eng-root-cause
- Evidence: confirmed

### Report
Seen: on a phone, with the header's three-dot menu open, scrolling past the landing's first section makes the menu jump above the header, out of view. Expected: the menu stays under its button while the header stays on screen. Reported by: the user, with a screenshot.
Suggested fix: none

### Reproduction
`scripts/repro-header-menu-scroll.mjs`: run with `node scripts/repro-header-menu-scroll.mjs` (the published library from `node_modules`, a sticky header with the same dropdown, a 390 × 844 viewport, served through Playwright's routing).

| Case | Chromium (Playwright) | WebKit 26.6 (Playwright) |
|------|-----------------------|--------------------------|
| menu open, `scrollY` 0 | panel top 62, `end span-start` | panel top 62, `end span-start` |
| `scrollY` 600 | panel top 54, `end span-start` | panel top 54, `end span-start` |
| `scrollY` 1200 | panel top 54, `end span-start` | **panel top -17, `start span-start`** (above the button, off screen) |

The built site, served the same way, shows the same in WebKit: panel top 54 at 600, -115 from 900 (the first section is 897 px tall); Chromium keeps 54 at every position.
On the device (user, 2026-09-26, iPhone, perfectui.netlify.app): at the top of the landing the panel opens under the button; after scrolling into the second section its bottom edge shows above the header, under the status bar, which is the flipped position measured here.

### Cause
`perfectui` `src/css/components/dropdown.css:27` `position: absolute;` with `:31` `position-try-fallbacks: flip-block, flip-inline;`
The open panel sits in the top layer with `position: absolute`, so its containing block is the initial containing block (the first viewport's rectangle at the top of the document), while its anchor sits in a sticky header that stays on screen. The rule assumes the fallback test sees the panel where it is drawn. WebKit tests the preferred position against that containing block without the anchor's scroll: once the page has scrolled about a viewport, the position under the button lies outside it, so WebKit applies `flip-block` and draws the panel above the button, off screen. Chromium applies the scroll first and keeps the preferred position. The specification sides with Chromium: "When a positioned box (after applying any default scroll shift) overflows its inset-modified containing block, and has more than one position option in its position options list, it determines position fallback styles to attempt to find an option that avoids overflow." (CSS Anchor Positioning, https://drafts.csswg.org/css-anchor-position-1/#fallback-apply). WebKit's behaviour is its bug, but the library meets it on every iPhone and in Safari.

### Discriminating experiment
| Case (WebKit, `scrollY` 1200) | Predicted by the cause | Observed | Rules out |
|------|------------------------|----------|-----------|
| library as published | flips above | top -17, `start span-start` | — |
| `position-try-fallbacks: none` | stays under the button | top 54, `end span-start` | the panel not following the scroll at all (it does follow; only the flip moves it) |
| `position: fixed` (containing block = viewport) | stays under the button | top 54, `end span-start` | a cause in the header's styles (glass, z-index): same header, no flip |
| `scrollY` 600 (anchor still within the first viewport's height) | stays | top 54 | a flip on any scroll |
| Chromium, every case | stays | top 54 | a cause outside WebKit's fallback test |

### Reach
- Triggers: a Perfect UI dropdown or tooltip (both `position: absolute` with `position-try-fallbacks`) whose anchor stays on screen while the page scrolls more than about a viewport: sticky or fixed headers, toolbars, floating buttons; WebKit only (Safari on macOS, every browser on iOS).
- Seen today at: https://perfectui.dev below 1024 px, the header's three-dot menu on the landing (reported). The theme picker (`ThemePicker.vue`) and the version menu (`VersionMenu.vue`) flip too (measured in phase 6: panel top -40 and -65 at `scrollY` 1200 in WebKit).
- Same assumption elsewhere: `perfectui` `src/css/components/tooltip.css:27` and `:31` (`position: absolute`, `flip-block`); searched `src/css/components` for `position-try-fallbacks` and `position: absolute`. `timeline.css:23` is absolute but not anchored.

### Why it escaped
- The site's browser tests run in Chromium only; the library's WebKit project covers the fallback script, not native anchor positioning with a scrolled sticky anchor. No test opens a menu in a sticky header and scrolls past a viewport.
- Introduced with the dropdown in `perfectui` 54918a4 (2026-09-17) and its directions in 78f5882 (2026-09-17).

### What a fix must preserve
- WebKit and Chromium, 390 × 844, header menu open, `scrollY` 0, 600 and 1200: the panel's top is 4 px below the button's bottom (the bug case: WebKit at 1200 today gives -17).
- A dropdown near the bottom of the viewport still flips above its trigger (`flip-block`), in both engines.
- A dropdown near the right edge still flips inline (`flip-inline`) or aligns to the end as `pui-align-end` asks.
- Browsers without anchor positioning keep the script fallback (`anchor-positioning.ts`), which already uses `position: fixed`.
- The tooltip keeps its preferred side (top) and its flip below when there is no room above.

### Found on the way
- Playwright's WebKit never fires `load` or `DOMContentLoaded` on the built site served by `tests/helpers/static-server.mjs` (the same pages load through Playwright's routing); a local WebKit project for the site needs another server or routing.

## Failing tests

- Owner: eng-unit-tests
- Command: `bun run build && bunx playwright test tests/sticky-overlays.spec.ts` in `perfectui` (branch `fix/dropdown-scroll-flip`, commit 7bbb000); runtimes: Chromium and WebKit 26.6 (the library's two Playwright projects)
- Files: `perfectui` `tests/sticky-overlays.spec.ts`, `tests/fixtures/sticky-overlays.html` (a sticky header with a dropdown and a tooltip, a dropdown fixed at the bottom of the viewport, one fixed at its right edge; 390 × 844)

| Test | Source | Expected before the change | Observed before (per runtime) |
|------|--------|----------------------------|-------------------------------|
| a dropdown opened from a sticky header stays under its trigger after scrolling 1200 px | Root cause › Reproduction; What a fix must preserve (the bug case) | fails now in WebKit | Chromium: passes; WebKit: `Expected: 4` `Received: -66` |
| a dropdown opened from a sticky header stays under its trigger after scrolling 600 px | What a fix must preserve | passes now | passes in both |
| a tooltip on a sticky header keeps its side after scrolling past a viewport | Root cause › Reach (tooltip.css, same rule) | fails now in WebKit | Chromium: passes; WebKit: `Expected: true` `Received: false` |
| a dropdown with no room below its trigger still opens above it | What a fix must preserve (flip-block) | passes now | Chromium: **fails**, `Expected: <= 800.5` `Received: 867`; WebKit: passes |
| a dropdown with no room on its end side still flips to the start side | What a fix must preserve (flip-inline) | passes now | passes in both |

- Result before the change: 3 failed, 7 passed. Two failures are the `fails now` rows; the third is a preserved behaviour that does not hold today in Chromium.
- Found while writing the tests: in Chromium the `absolute` panel's box is the whole scrollable document (4,060 px here), so a panel below a trigger fixed at the viewport's bottom "fits" and never flips: it opens under the screen's edge, out of reach. WebKit flips it. Same family as the reported bug: an `absolute` panel measured against the document while its trigger does not scroll. Probe (not part of the suite): with `.pui-dropdown { position: fixed }` both cases pass in both engines (bottom menu ends at 797, above the trigger at 800; header menu at top 52 after 1,200 px).
- Pending decisions: whether the Chromium bottom-edge case joins this fix (recommended: yes, the same cause from the other side, and the fix under consideration covers both), or goes to the backlog with the test marked `fixme`.

## Impact

- Owner: eng-impact-analysis
- Change under analysis: an open dropdown or tooltip stays next to its trigger while the page scrolls, and flips only when the viewport has no room on the preferred side, in Chromium and WebKit alike, including triggers that do not scroll (sticky or fixed) (user, 2026-09-26: the Chromium bottom-edge case joins this change); any approach
- Baseline measured: `bun run size` in `perfectui` on 2026-09-26: `perfectui.css` 3,265 B gzip (budget 6,005 B), `js/index.js` 487 B (budget 1,587 B), `fallbacks/anchor-positioning.js` 904 B

### Code the change touches
| Path | What it holds | Touched when |
|------|---------------|--------------|
| `perfectui` `src/css/components/dropdown.css` (the `@supports (position-area: block-end)` block, lines 25-78) | native placement: `position: absolute`, `position-area`, `position-try-fallbacks` | always |
| `perfectui` `src/css/components/tooltip.css` (same block, line 27) | the tooltip's native placement, same rule | always (same cause, WebKit test fails) |
| `perfectui` `src/js/fallbacks/anchor-positioning.ts` | placement for browsers without anchor positioning; already `position: fixed` against the viewport, repositions on scroll and resize | only if an approach changes the fallback; none of the measured ones needs it |
| `perfectui` `dist/` | built output, generated by `bun run build` | always, generated |
| `perfectui-doc` `app/assets/css/main.css` | the site's own CSS, where the modal margin workaround already lives | only under an approach that works around the library in the site until a release |

### Rules and budgets the change meets
| Rule | Source | Where the change stands |
|------|--------|-------------------------|
| "All library CSS lives inside `@layer pui.*`. Never use `!important`." | ARCHITECTURE.md §2 rule 4 | a change of `position` inside the existing layered block keeps it |
| "HTML API = native HTML API … JS only emulates native behavior when missing" | §2 rule 7 | an approach that adds script to browsers that have anchor positioning would break it: user decision |
| "No DOM scanning / re-initialization. No `MutationObserver` … Use event delegation on `document`." | §2 rule 9 | any script approach must stay delegated |
| "Library output must stay small. Every PR reports gzip size of `dist/`" | §2 rule 12, §11 | `absolute` → `fixed` is three characters shorter per rule; to be measured |
| "Overlay placement … each flipping to the opposite side when the preferred one does not fit … both paths place an overlay the same way" | §6 | today the native path does not keep this promise in either engine for non-scrolling triggers; the change restores it |

### Tests that encode today's behaviour
- `perfectui` `tests/fallbacks.spec.ts` "a dropdown opens below its trigger", "a direction class moves the dropdown to the other side", "pui-align-end lines the dropdown up with the trigger's end", "interestfor shows a tooltip above its trigger on hover": placement of in-flow triggers; must keep passing.
- `perfectui` `tests/sticky-overlays.spec.ts` (phase 2): the three failing tests change to passing by design; the other seven must keep passing.
- `perfectui` `bun run test` also runs the SSR import check and the exports check on every build: must keep passing.
- `perfectui-doc`: no test opens a header menu and scrolls; the site's suites run in Chromium only.

### Public surface and documents
- `perfectui` `docs/dropdown.md` §Placement: "Placement uses CSS anchor positioning. Browsers that do not have it yet get the same placement, including the direction classes, from the fallback in the script." (still true; may gain a sentence on triggers in sticky headers)
- `perfectui` `docs/tooltip.md` §Placement: "The tooltip sits above its trigger and flips below when there is no room." (becomes true for sticky triggers in WebKit)
- `perfectui` `ARCHITECTURE.md` §6 "Overlay placement" and §8 "How the anchor fallback finds its anchor": the promise above; the fallback text already describes a fixed panel.
- `perfectui-doc` pins `@chrissgon/perfectui` 1.0.0-beta.1 (`package.json`) and the documentation at `libraryRef`; its header holds three `pui-dropdown`s (`SiteHeader.vue` menu, `ThemePicker.vue`, `VersionMenu.vue`) and 19 content pages use dropdowns or tooltips inside the page flow. The site meets the fix only with a new library release, unless it works around it meanwhile, as it did for the modal margin (`app/assets/css/main.css`).

### Who meets the change and at what cost
- Every page with a Perfect UI dropdown or tooltip: the native path (all current Chromium, Safari 26 and iOS 26) runs the changed CSS; browsers on the fallback are unaffected. No byte or runtime cost for a CSS-only approach.
- Behaviour change for in-flow triggers near the bottom of a long page in Chromium: today the panel opens below and the user scrolls to it; with a viewport-based flip it opens above, as WebKit already does.
- Release impact: a fix, `fix(dropdown): …` and `fix(tooltip): …` in the generated changelog; a prerelease bump (1.0.0-beta.2), no API change. The release itself is on hold (state file, 2026-09-25).

### Risks
- An in-flow trigger scrolling while its panel is open: measured with a probe on `overlays.html` (390 × 600, body padded to scroll): with `position: fixed` the panel follows its trigger at a 4 px gap after scrolling 0, 100 and 400 px, in Chromium and WebKit; the same as `absolute`. Settled.
- A trigger inside a transformed or filtered ancestor: a top-layer popover is not contained by ancestors, so `fixed` still refers to the viewport; check with the site's glass header (`backdrop-filter`) during integration tests.
- Older engines without `position-area` keep the fallback; the `@supports` guard is unchanged. Settled by construction.
- The tooltip opens on hover and focus through `interestfor` (a fallback in WebKit 26.6): its placement goes through the same CSS, covered by the phase 2 test.

## Options and decision

- Owner: eng-tradeoffs
- Decision record: `perfectui` `docs/engineering/adr/0002-overlays-positioned-against-the-viewport.md` (proposed, commit dfafd13)

| Option | Tests (sticky + fallbacks, both engines) | In-flow trigger follows while scrolling | `perfectui.css` gzip | Rules |
|--------|------------------------------------------|------------------------------------------|----------------------|-------|
| A: `position: fixed` on the native path (library) | 28 passed | yes, 4 px gap at 0, 100, 400 px | 3,264 B (−1) | none crossed |
| B: no `position-try-fallbacks` (library) | 24 passed, 4 failed (edge flips lost) | — | 3,231 B (−34) | breaks the §6 promise |
| C: script re-placing native overlays on scroll | not prototyped | — | — | crosses rule 7 while A passes |
| D: override in the site's CSS | header menu top 54 at 0, 1,200, 3,000 px; docs example gap 4 → 4 (WebKit and Chromium, built site through routing) | yes | site only | none; fixes one site |
| E: document the limitation | reported case stays broken | — | — | — |

- Recommendation: A in `perfectui`, plus D in perfectui-doc until `libraryRef` moves to a release with A (releases on hold), then removed like the modal margin workaround.
- Scratch: two worktrees under `/tmp/hms-*` and a temporary edit of `app/assets/css/main.css`, all removed; `git status` clean in both repositories.
- Waiting: the user's choice.

## Change

- Owner: eng-implement
- Decision: option A only (user, 2026-09-26: "Pode aplicar apenas a opção A. O site será corrigido quando subirmos uma nova versão"); ADR-0002 accepted.
- `perfectui` `src/css/components/dropdown.css` and `src/css/components/tooltip.css`: the native path's `position: absolute` becomes `position: fixed`, with a comment pointing to ADR-0002 (commit 9ff2f9c on `fix/dropdown-scroll-flip`, local).
- Checks with the change: `bunx playwright test tests/sticky-overlays.spec.ts`: 10 passed (the three failures of the Failing tests section now pass); `bun run lint`: clean; `CI=1 bun run test`: build, "ssr: 7 entries imported in Node, no DOM required", "exports: 7 documented specifiers all resolve", 86 passed; `bun run size`: `perfectui.css` 3,264 B (was 3,265), `js/index.js` 487 B.
- perfectui-doc: no change; the header menu keeps flipping in WebKit until `libraryRef` and the `@chrissgon/perfectui` dependency move to a release carrying 9ff2f9c.

## Integration tests

- Owner: eng-integration-tests
- File: `perfectui` `tests/sticky-overlays.spec.ts` (through `tests/fixtures/sticky-overlays.html` loading the built `dist/`, served by `scripts/serve.mjs`), runtimes Chromium and WebKit 26.6: 10 passed with the change
- Against the code before the change (`perfectui` dfafd13, worktree `/tmp/hms-before`, removed; `sticky-overlays.spec.ts` and `fallbacks.spec.ts`): new behaviour 3 failed (Chromium "a dropdown with no room below its trigger still opens above it"; WebKit "a dropdown opened from a sticky header stays under its trigger after scrolling 1200 px" and "a tooltip on a sticky header keeps its side after scrolling past a viewport"); preserved behaviour 25 passed
- Through the real site (perfectui-doc built with the fixed `dist/` copied into `node_modules/@chrissgon/perfectui` for the run, then restored and compared byte for byte; served through Playwright's routing; 390 × 844; glass header with `backdrop-filter`):

| Header menu | WebKit before (0 → 1,200 px) | WebKit after (0 → 1,200 → 3,000 px) | Chromium before and after |
|-------------|------------------------------|-------------------------------------|---------------------------|
| three-dot menu | 54 → -115 | 54 → 54 → 54 | 54 at every position |
| theme picker | 54 → -40 | 54 → 54 → 54 | 54 at every position |
| version menu | 46 → -65 | 46 → 46 → 46 | 47 at every position |

- The glass header's `backdrop-filter` does not contain the fixed panels (Impact › Risks): settled.
- Full check with the change: `CI=1 bun run test` in `perfectui`: 86 passed, SSR and exports checks pass (phase 5).
- No scratch left: worktrees pruned, the site's `node_modules` restored, `git status` clean in both repositories.

## Docs

- Owner: eng-docs
- Documents checked against the change: `perfectui` `docs/dropdown.md`, `docs/tooltip.md`, `ARCHITECTURE.md`, `README.md`, `MIGRATION.md` (grep `anchor`, `placement`, `flip`, `sticky`, `viewport`, `position`)

| Document | Sentence before | After | Why |
|----------|-----------------|-------|-----|
| `docs/dropdown.md` §Placement | "Placement uses CSS anchor positioning. Browsers that do not have it yet get the same placement, including the direction classes, from the fallback in the script." | adds: "Either way the panel is placed against the viewport, so a menu opened from a sticky header or a fixed bar stays next to its trigger while the page scrolls, and flips only when the screen has no room." | the case the fix makes true, verified by `tests/sticky-overlays.spec.ts` (10 passed, both engines) and on the site (Integration tests) |
| `docs/dropdown.md` §Placement | "Each one flips to the opposite side when the preferred one does not fit, so a menu never opens off screen." | unchanged | was false for non-scrolling triggers, true now |
| `docs/tooltip.md` §Placement | "The tooltip sits above its trigger and flips below when there is no room." | unchanged | was false for a sticky trigger in WebKit, true now (the tooltip test passes) |
| `ARCHITECTURE.md` §6 Overlay placement | "…so both paths place an overlay the same way." | adds: "Both place it against the viewport (`position: fixed` in the top layer): with `absolute` the flip was tested against the document, which WebKit and Chromium each got wrong for triggers that do not scroll (ADR-0002)." | the design rule behind the fix, where the next reader looks |

- Checks: `bunx prettier --check docs/dropdown.md ARCHITECTURE.md` passes; the site converts it (`PERFECTUI_SOURCE=../perfectui bun run docs:sync` in perfectui-doc: 28 pages, the sentence on the Dropdown page). Commit `perfectui` d628495.
- Changelog: generated from commits by `changelogen`; the entry comes from `fix(overlays): place dropdowns and tooltips against the viewport`.
- Follow-ups outside this repository: perfectui-doc takes the fix with the next release; then check the three header menus after scrolling past the first section in Safari or iOS (state file, Decisions).
- Proposed, not written: none.

## Review

- Owner: eng-code-review
- Record: `perfectui` `docs/engineering/reviews/fix-dropdown-scroll-flip.md` (commit 872518d): verdict approve, no finding; lint 0, typecheck 0, `CI=1 bun run test` 0 (86 passed, SSR and exports checks); the bug-fix checklist filled (fix at the cause, regression tests fail on dfafd13 and pass now).
- Outside the change: a WebKit project for the site needs Playwright routing or another server (proposed backlog item).
