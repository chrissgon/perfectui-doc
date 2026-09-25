# Design brief: documentation page

- Owner: design-brief
- Status: draft
- Date: 2026-09-24
- Type: screen
- For: SCREEN-2 of the flows, with the shell (SCREEN-3), the search dialog (SCREEN-4) and the version notice (SCREEN-5) it embeds
- Values: loaded: the perfectui design-system project in Claude Design (built from the perfectui repository on 2026-09-24)
- Direction: open: three directions
- Lint: ok (2026-09-24)

## Summary

Design the documentation page of the perfectui site as a template for all 27 pages of v1, using the Button page as the real example, in the same visual language as the approved landing page. Structure, copy and states are fixed; the open part is how the reading experience feels, explored in three directions at 1280 px in light mode first.

## Sources

- `docs/design/flows.md`: SCREEN-2 (regions, states, breakpoints), SCREEN-3 (shell), SCREEN-4 (search dialog), SCREEN-5 (version notice); FLOW-2, FLOW-3, FLOW-5
- `docs/product/specs/markdown-content-model.md`: example blocks with preview and code, since and changed badges, navigation from folders, versions; `docs/product/specs/search.md`: results as you type, typo tolerance, keyboard hints
- `docs/design/design-system.md`: tokens, type roles, layout values (sidebar 272, headings column 208, reading width 72ch), components
- Library documentation `docs/README.md` (section order) and `docs/button.md` (page copy and examples) of `@chrissgon/perfectui` 1.0.0-beta.0
- State decisions of 2026-09-23: URL scheme `/docs/<major>/<section>/<slug>`; search in the header; brand colour kept
- The landing page produced in Claude Design (2026-09-24), approved by the user: its header, footer, glows, grid and type are the reference for this page
- User direction of 2026-09-24: design skills produce the inputs, a specialized AI design tool produces the design

## Subject

perfectui is a CSS and JavaScript component library that ships the bare minimum: no runtime dependencies, no CSS reset, no font import, no rule outside a `pui-` class. Behaviour comes from the browser (`<dialog>`, `popover`, `interestfor`, `<details>`). Every element is up to three classes, a shape, a style and a colour: `<button class="pui-btn pui-solid pui-theme">Save</button>`.

The documentation site renders one Markdown file per page. Each page opens with a title and one sentence, then shows sections of live examples: every example is rendered with the real library and has its HTML one tab away, ready to copy. Readers arrive from a search engine or from the landing, find the component, copy the snippet and leave; the page must make that take seconds.

## Audience and voice

- Developers building with perfectui: they scan for the example that matches their case, copy it and go back to their editor; they hate hunting for the code tab, wrapped code and docs that hide the version they are reading.
- Users of 0.23 checking what changed: they need the version they are reading to be obvious and the switch to v0 one click away.
- Voice: the library's docs voice, verbatim; short declarative sentences; no marketing on documentation pages.
- Words to use: shape, style, colour, `pui-`, follows the system, fallback.
- Words to avoid: blazing, powerful, seamless, effortless, best, modern, simply, just.

## Creative direction

No previous version of this page. The landing is the reference for identity, not for density: documentation is read, not watched, so the drama moves from motion to clarity, and the page stays quiet.

From the references (the approved landing; tailwindcss.com/docs and laravel.com/docs as attitudes only): examples are the hero of each section, not the prose; code is beautiful and large enough to read; navigation disappears until needed; the current position (version, section, heading) is always visible.

- Direction A, "Canvas first": every example block is a wide framed canvas with the landing's dot grid, the rendered component centred at a generous size, and the code drawer sliding under it; prose is narrow and sits above; the sidebar is light and nearly invisible.
- Direction B, "Split reference": content and code live side by side on wide screens, prose and preview left and the code of the current example pinned right, following the scroll; on narrow screens it becomes tabs.
- Direction C, "Quiet index": a typographic page with a strong left rail (sections as large numbered headings), example blocks as inline cards in the text flow, and the on-page headings as a progress line that fills as the reader scrolls.

Identity hooks every direction keeps: the landing's header and footer, the P mark and wordmark, the glow and grid used only in the page header band, framed containers with a 20 px radius, Inter and Fira Code, the theme blue. Allowed: the dot grid inside example canvases; an inverse code block. Not allowed: scroll animations in the content, illustrations, an AI assistant, "soon" badges, a table of contents inside the prose.

## Visual language

Use the perfectui design-system project already loaded in the tool; do not restate or change its tokens. The values this page depends on:

- Brand colour: theme blue #0092CD in light, #07B6F0 in dark (the landing's red accent came from the theme picker and is not the default).
- Type: title 42 px Semi Bold, section headings 24 px Semi Bold, prose 16/24, code 14/20 in Fira Code, labels 12.
- Layout at 1280: sidebar 272 px, content reading width about 72 characters, on-page headings 208 px, header 56 px, gutters 32 px (16 px below 768).
- Example blocks and code blocks: radius 9 px, code background `--pui-bg-emphasis` with `--pui-text`.
- Motion: 150 ms colour transitions only.

## Content

URL of the example: `/docs/v1/components/button`. Every version has its own segment (`/docs/v1`, later `/docs/v0` for 0.23).

**Regions**, in priority order:

1. Page header: section label "Components", title "Button", description "The `pui-btn` class turns a `<button>` or an `<a>` into a button. It brings the shape only: pair it with a style and a color.", and a badge "Changed in 1.0" (soft theme); a second frame shows an "Added in 1.1" badge.
2. Content with example blocks: sections Styles, Colors, Rounded, Disabled, With an icon, Grouping, each with an h2 heading and one example block. An example block has a Preview tab (the real component, reacting to mode and theme), a Code tab (highlighted HTML with a language label) and a copy control ("Copied" for at least 1 second). Examples, verbatim from the library documentation:
   - Styles: `<button class="pui-btn pui-solid pui-theme">Solid</button>`, `<button class="pui-btn pui-soft pui-theme">Soft</button>`, `<button class="pui-btn pui-outline pui-theme">Outline</button>`, `<button class="pui-btn pui-link pui-theme">Link</button>`
   - Colors: solid theme, success, error, warn, muted; then "Two colors are defined against the page rather than against a palette:" with `<button class="pui-btn pui-outline pui-surface">Cancel</button>` and `<button class="pui-btn pui-solid pui-inverse">Continue</button>`
   - Rounded: `<button class="pui-btn pui-solid pui-theme pui-rounded-full">Pill</button>`
   - The prose also holds one inline code sample, one note callout, one warning callout and one reference table (class | what it does) built with `pui-table`.
3. Sidebar navigation of the version, sticky, sections collapsible, current page marked, in this order: Getting Started (Installation, TypeScript, Tailwind CSS, Migrating from 0.x, License); Customization (Dark Mode, Theme Color); General (Layout Group, Float); Components (Accordion, Badge, Button, Card, Chip, Dropdown, List, Modal, Table, Timeline, Tooltip); Forms (Field Group, Input, Input Group, Textarea, Select, Checkbox, Radio, Switch).
4. On-page headings list, sticky: the h2 list, the current section highlighted as the reader scrolls.
5. Previous and next page links at the end: "Badge" and "Card"; an "Edit this page on GitHub" link.

Shell (as on the landing): P mark and wordmark, Docs, search icon with the Cmd/Ctrl+K hint, version switch as a dropdown on `popover` with "v1 (latest)" and "v0 (0.23)", mode toggle, theme picker, GitHub and Figma icons; footer as on the landing.

Search dialog (`pui-modal`): input focused on open; results as you type grouped by page, each with page title, section heading and a snippet with the match highlighted; the selected result marked; footer with keyboard hints (up and down to move, Enter to open, Esc to close); full screen below 640 px.

**States:**

- default: as above.
- page with badges: "Changed in 1.0" and "Added in 1.1" in the page header.
- page without headings: the on-page headings list is absent and the content widens.
- narrow (360 px): sidebar behind a menu button as a panel; on-page headings collapsed into an "On this page" disclosure at the top of the content; example tabs and code scroll inside their box; no horizontal page scroll.
- search: empty; results for "outl" (typo-tolerant, finds "outline"); no results ("No results for 'xyz'"); loading on first open.
- version notice: after switching to v0 on a page that does not exist there, the v0 index opens with "Button has no page in v0 (0.23). You are on the v0 index." and an "older version" mark in the page header.
- dark mode of the full page.

**Breakpoints:** 1280 (three columns), 1024 (on-page headings move into the content), 768 (sidebar becomes a panel behind a menu control), 360 (one column, as in the narrow state).

**Motion:** 150 ms colour transitions on controls and on mode and theme changes; the current heading highlight moves with the scroll; the code tab switch and the "Copied" feedback are instant or 150 ms; nothing moves in the content on scroll; under reduced motion only the colour changes remain.

## Constraints

- Only the loaded design system; real, working `pui-` markup for every component and example; the site chrome may use site components built from the same tokens; no shadows; never restyle a `pui-` component.
- Load the library with `https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.0/dist/perfectui.css` (the npm `latest` tag still points at 0.23).
- Copy verbatim as in Content; add no sentence; no AI assistant, no "soon" badges, no content beyond the Button page.
- Muted text only on the page background; visible focus ring on every control; keyboard: Tab through the sidebar, arrow keys switch example tabs, Enter copies.
- Code lines never wrap inside code blocks; they scroll horizontally inside their box.
- The page must stay fast: no web fonts beyond Inter and Fira Code, no images besides the logo.

## Deliverables

- Round 1: one run per direction; the Button page at 1280 px in light mode, plus the search dialog open with results for "outl" in a second frame.
- Round 2: the chosen direction in every state listed in Content, at 1280 and 360 px, light and dark.

## Evaluation criteria

- CRIT-1: Faithful: every colour, type size and radius comes from the perfectui design system; the brand colour is the theme blue.
- CRIT-2: Real examples: every preview is working `pui-` markup; the code tab shows exactly that markup.
- CRIT-3: Copy verbatim: title, description, section names, examples and navigation as in Content; nothing added.
- CRIT-4: Scan speed: the first example block is visible at 1280 × 800 without scrolling, and its code is one click away.
- CRIT-5: Orientation: version, section and current heading are visible at every scroll position.
- CRIT-6: Continuity: header, footer and identity hooks match the approved landing.
- CRIT-7: Narrow: at 360 px nothing scrolls horizontally except code and tables inside their box, and the sidebar and headings are one tap away.
- CRIT-8: Accessibility: contrast pairs of the design system, visible focus, keyboard paths as in Constraints.
- CRIT-9: Quiet: no scroll-driven motion in the content; the drama comes from type, canvas and code.

## Attachments

- Send: this brief (as a file), a screenshot of the approved landing's header and hero, screenshots of tailwindcss.com/docs and laravel.com/docs as attitude references.
- Do not send in round 1: any earlier mockup of a documentation page.

## Prompt

```text
Design the documentation page of the perfectui site, using the perfectui design system of
this project and the landing page we approved as the reference for header, footer, type
and identity. This is an exploration of the reading experience, not a copy of any docs
site: the failure case is a generic three-column docs template with small grey examples.

Read the attached brief (design-brief-documentation-page.md): it has the exact copy, the
Button page's examples, the navigation, every region and state, and the rules.

Direction: <paste one direction from "Creative direction" in the brief>

Non-negotiable: link https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.0/dist/perfectui.css,
every example is real working pui- markup with a Code tab showing that exact markup and a
copy control; brand colour theme blue #0092CD (#07B6F0 dark); Inter and Fira Code; no
shadows; no restyled pui- components; copy verbatim; no AI assistant.

Make it excellent to read: examples are the hero of each section, code is large and never
wraps, the current version, section and heading are always visible, and the page stays
quiet (colour transitions only, nothing animates on scroll).

Deliver the Button page at 1280 px in light mode and, in a second frame, the search dialog
open with results for "outl". Before finishing, list three things this page does that a
standard docs template would not.
```

## Open questions

- OPEN-1: Should the v0 version switch appear before the v0 archive exists (phase 2 of the roadmap)? Blocks: nothing (the design shows both states). Recommended: design it now and hide it in the build until v0 ships, so the shell does not change later.

## Readiness

- Ready for design-execute: yes.
