# Screen: SCREEN-1 Landing

- Owner: design-ui
- Status: draft
- Date: 2026-09-23
- Flows: docs/design/flows.md (SCREEN-1)
- Design system: docs/design/design-system.md

## Summary

The landing lets an evaluator understand perfectui, trust its measured size, install it and enter the documentation, and sends a 0.23 user to the migration guide; the nine sections of the messaging document become nine bands, each carrying one live demo. Variants: the widest and narrowest breakpoints in light and dark mode, plus the copied, no-JavaScript and reduced-motion states.

## Sources

- `docs/design/flows.md` SCREEN-1 (regions in priority order, states, breakpoints), FLOW-1, FLOW-4, FLOW-6; IA-1, IA-15 to IA-18
- `docs/marketing/messaging.md` (2026-09-23): SECTION-1 to SECTION-9 with headline, body, demo and CTA; PROOF-1 to PROOF-11; words to use and avoid; OPEN-1 to OPEN-3 resolved by the user
- `docs/product/specs/landing-and-site-shell.md`: REQ-1 to REQ-10, NFR-1 to NFR-3, EDGE-1 to EDGE-9
- `docs/design/design-system.md`: Colour, Contrast, Type, Layout and Components tables; the kit documentation's framed container (radius 20, band padding 40/48, section gap 32, footer 48/40, glow paint styles)
- The perfectui design file (key szD991W25tQxPuqhfRektk): component sets Button (Style × Color, Label), Badge (Style × Color, Label), Card (Type), Accordion Item (Position, State, Highlighted), Dropdown (Side, Align, Type); text styles `site/*`; logo groups 87:2 (wordmark) and 87:15 (mark)
- `docs/workbench/state.md` decisions of 2026-09-23: landing first, creative, with animations, faithful to perfectui; tailwindcss.com as inspiration for structure and interactive demos; page "Site v1"
- tailwindcss.com landing (accessed 2026-09-23), structure only: hero, feature showcase with live demos, "ship smaller" numbers, footer

## Variants

- breakpoint/xl × light × default: page "Site v1", frame `Landing / 1280 / light` (node 462:2; sections 462:3 header, 462:31 hero, 463:6 size, 464:6 three classes, 464:58 overlays, 464:126 mode and theme, 465:53 tailwind, 465:70 nothing to undo, 465:95 migration, 465:104 install, 465:123 footer)
- breakpoint/xl × dark × default: `Landing / 1280 / dark` (pending the review of the light variant)
- breakpoint/sm and below (360 wide) × light × default: `Landing / 360 / light` (pending)
- copied, no JavaScript and reduced motion: documented as diffs under States, not separate frames (they change one control or remove motion)

## Layout

| Region | Placement (wide) | Placement (narrow) | Component | Text style | Tokens (fill / stroke / text) | Spacing |
|--------|------------------|--------------------|-----------|------------|-------------------------------|---------|
| Shell header | full width, height layout/header-height; logo mark and wordmark left, docs link, search entry point, version label, mode toggle, theme picker, GitHub and Figma links right | logo, search icon and mode toggle visible; the rest behind a menu control | Site shell (site component); Badge Style=Soft Color=Theme for the version label; Button Style=Link Color=Surface for links | site/label for the version label, text/body for links | page/bg at 90% with backdrop blur / page/border bottom / page/text, icons page/text-muted | layout/gutter, space/16 between items |
| Value proposition (SECTION-1 hero) | framed container (layout/container-radius, page/border stroke) full content width; two columns: text left (headline, supporting line, body), demo right | one column: text, then demo | Site hero container (site component); the demo is a Button Style=Solid Color=Theme instance plus a code line | site/display headline, site/lead supporting line and body, site/code for the class line | page/bg fill with glow-purple and glow-blue ellipses behind (blurred, as the kit's header band) / page/border / page/text, page/text-muted for body | layout/band-padding, space/16 between text blocks, space/32 between columns |
| Install command with copy control | under the hero body, left column | full width under the body | Input group flush (site copy control on a code field) | site/code | page/bg-muted fill / page/border / page/text; copy icon page/text-muted, copied state success/ink | space/12 inside, space/16 above |
| Primary call to action | beside the install command; secondary CTA beside it | stacked, full width | Button Style=Solid Color=Theme "Get started"; Button Style=Outline Color=Surface "Migrating from 0.x" | text/body (component) | theme/fill / theme/edge / theme/on-fill; surface/fill / surface/edge / surface/ink | space/8 between buttons |
| Size block (SECTION-2) | framed container full width: headline and body left, bar chart right | one column: text, then bars | Site size chart (site component): one row per library, CSS and JS segments, version label, footnote with method and date | site/h2 headline, site/body, site/label for bar labels and footnote, site/code for numbers | perfectui bar theme/fill; other bars muted/fill; JS segment muted/soft-fill; tracks page/bg-muted; text page/text, footnote page/text-muted | layout/band-padding, space/8 between bars, layout/section-gap between text and chart |
| Components showcase (SECTION-3 three classes, SECTION-4 overlays, SECTION-5 mode and theme) | three framed containers stacked, each text left and live demo right; the picker demo shows chip rows and the resulting element with its code line; the overlays demo shows four small examples in a 2 × 2 grid; the mode demo shows a switch and colour picker over a set of components | one column per container: text, then demo | Chip rows (site chips built on Badge Style=Soft/Solid Color=Theme as selected), Button, Badge, Card instances; Accordion Item and Dropdown instances; Modal and Tooltip drawn from tokens (no component in the file); Checkbox and switch drawn from tokens | site/h2, site/body, site/code, text/body inside components | as the components' own tokens; code lines page/bg-emphasis fill with page/text; labels page/text-muted | layout/band-padding, space/12 between chips, space/16 between examples |
| Further sections (SECTION-6 Tailwind, SECTION-7 nothing to undo) | two framed containers: code line with a stretching button; a list with strike-through items | one column | Button Style=Solid Color=Theme; site list (site component) | site/h2, site/body, site/code | page/bg / page/border / page/text; struck items page/text-muted | layout/band-padding, space/8 between list items |
| Migration call to action (SECTION-8) | framed container with the before/after line and the CTA | one column | Site callout (site component) with a diff line; Button Style=Soft Color=Theme "Read the migration guide" | site/h3 headline, site/body, site/code | page/bg-muted fill / page/border / page/text; removed line error/ink, added line success/ink | layout/band-padding |
| Install and links (SECTION-9) | framed container with package-manager tabs and the CDN snippet | one column | Site tabs (site component, tabs as Badge Style=Soft Color=Theme for the active tab and Style=Link Color=Surface for others); copy control | site/h2, site/code, site/label for tabs | page/bg-emphasis code fills / page/border / page/text | layout/band-padding, space/12 |
| Footer | full width, centred: wordmark, copyright, tagline, links to GitHub, Figma, license, documentation | same, stacked | Site footer (site component); wordmark vector 87:2 | text/body copyright, site/label tagline and links | page/bg / page/border top / page/text-muted | layout/footer-padding, space/12 between lines |

## Copy

- Headline and supporting line (hero): from messaging SECTION-1 ("The bare minimum for elegant interfaces"; "Three classes, no framework, 3.2 kB")
- Hero body, install command, CTAs: from messaging SECTION-1 and PROOF-9
- Size block headline, body and footnote: from messaging SECTION-2 and PROOF-1, PROOF-2 (the perfectui number is computed at build; the design shows the measured value of 2026-09-23)
- Three classes, overlays, mode and theme, Tailwind, nothing to undo, migration, install: from messaging SECTION-3 to SECTION-9
- Navigation labels: from flows SCREEN-3 regions (Docs, GitHub, Figma) and the specs
- Footer copyright and tagline: from the kit documentation footer pattern and messaging PROOF-10 (license)

## States

- default: as the Layout table.
- copied: the copy control's icon becomes a check in success/ink and its label reads "Copied" for at least the time the landing spec requires; nothing else moves.
- no JavaScript (EDGE-1 of the landing spec): copy controls, mode toggle, theme picker and the interactive pickers render inert; the code lines and the final state of every demo are visible; the hero shows the finished button, not the typing.
- reduced motion (EDGE-3): every animation below is replaced by its final state; transitions of the library's 150 ms remain.

## Motion

- Hero: the class line types `pui-btn`, `pui-solid`, `pui-theme` one token at a time (about 400 ms per token) while the button gains shape, then fill, then colour; after a pause it cycles through two other shape and colour pairs; loops; paused on hover and under reduced motion.
- Size bars: each bar grows from zero to its width when the block enters the viewport, perfectui first, with the number counting up; runs once.
- Three classes: a 150 ms transition on the element when a chip is chosen; the code line highlights the changed token.
- Overlays: the browser's own open and close of dialog, popover and details; no added animation.
- Mode and theme: the library's 150 ms colour transition when the switch or picker changes.
- Nothing to undo: each list item gets its strike-through drawn left to right (about 300 ms) as it enters the viewport, staggered by 80 ms.
- All motion respects `prefers-reduced-motion`; nothing essential is conveyed by motion (landing spec EDGE-3; design-system Layout "motion").

## Accessibility

- Contrast pairs used: page/text on page/bg (pass); page/text-muted on page/bg (pass); theme/ink on page/bg (pass); success/ink on page/bg (pass); error/ink on page/bg (pass); muted/ink on page/bg (pass); theme/on-fill on theme/fill for the primary button label at text/body size (fails AA in light mode as a library trade-off; the site keeps the library's button and states the trade-off in the design system); page/text on page/bg-emphasis (code blocks; see Findings).
- Targets: header icon-only controls at the comfortable value of target/min; buttons at the library's button height, above target/min; chips in the picker at the library's chip height with space/12 padding around, so the hit area reaches target/min.
- Focus: the focus/ring token (theme/fill, outside the element, following its radius) on every control in every state; the copy control and picker chips are buttons, so they receive it.
- Reading order: equals the priority order of the flows (hero, install, CTA, size, showcase, further sections, migration, install and links, footer); the demo columns follow their text at every breakpoint.

## Design tool

- Page: "Site v1" (id 454:10) in the perfectui file
- Frames: `Landing / 1280 / light` 462:2 built on 2026-09-23 in four sequential writes plus three targeted fixes; dark and narrow variants pending
- Screenshots reviewed: hero after write 1 (space nodes in the class line collapsed → single text node with range colours); full page after write 4 (text columns had a fixed height from an early resize → set to hug; size-chart tracks narrowed so the byte counts fit; long code lines set to fill and wrap); post-fix full page reviewed with no clipped text
- Components used from the file: Button (Solid/Theme, Outline/Surface, Soft/Theme, Link/Theme), Badge (Soft/Theme, Solid/Theme, Outline/Surface, Soft/Success, Link/Surface), Card (Modal), Accordion Item (First/Open, Last/Closed), Dropdown (Bottom/Start/Menu); wordmark 87:2 and mark 87:15 cloned into the header and footer

## Findings for design-system

- Add the pair page/text on page/bg-emphasis (code block foreground on its background) to the Contrast table; expected to pass in both modes given the luminance gap between the text and emphasis tokens.
- Site components used here that the Components table already lists: site shell, copy control, code block, callout, keyboard hint; new here: size chart, tabs, hero container, site list. Add the four to the Components table with owner `site`.
- The file has no Modal, Tooltip, Input, Checkbox or Switch component; the overlays and mode demos draw them from tokens as the design system allows (design tool section).

## Open questions

- OPEN-1: The size chart compares CSS plus JS per library; show the two segments stacked in one bar or two bars per library? Blocks: nothing (default: one bar, two segments). Recommended: one bar with two segments, because the reader's question is the total and the segment answers the follow-up.

## Readiness

- Ready for design-handoff: after the three variants are built and reviewed.
