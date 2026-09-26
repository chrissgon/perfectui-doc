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
- Seen today at: https://perfectui.dev below 1024 px, the header's three-dot menu on the landing (reported). The theme picker (`ThemePicker.vue`) and the version menu (`VersionMenu.vue`) are `pui-dropdown`s in the same header: same mechanism, not measured separately.
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
