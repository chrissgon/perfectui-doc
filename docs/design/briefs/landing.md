# Design brief: SCREEN-1 Landing, for an external design tool

- Owner: design-ui
- Status: draft
- Date: 2026-09-23
- Screen: docs/design/screens/landing.md (SCREEN-1)
- Tool: Figma Make for the first round (a separate Make file with the design as pasted context or a Make kit); the brief is written for any AI design tool
- Self-contained: the tool reads nothing but this document and, when it can, the perfectui design file

## Summary

Explore a creative, animated landing page for perfectui 1.0 at 1280 and 360 px wide, in light and dark mode, from the copy, values and section order below. The structure and the copy are fixed; the visual direction is open inside the constraints, and the first round returns three directions to choose from.

## Sources

- `docs/marketing/messaging.md` (2026-09-23): SECTION-1 to SECTION-9, PROOF-1 to PROOF-11, voice, words
- `docs/design/design-system.md` (2026-09-23): Colour, Contrast, Type, Space, Layout and Components tables; kit documentation visual language
- `docs/design/flows.md` SCREEN-1: regions, states, breakpoints; FLOW-1, FLOW-4
- `docs/design/screens/landing.md`: layout, states, motion, accessibility; frame `Landing / 1280 / light` 462:2 on page "Site v1" of the perfectui file (key szD991W25tQxPuqhfRektk)
- `docs/product/specs/landing-and-site-shell.md`: REQ-1 to REQ-10, NFR-1 to NFR-3, EDGE-1 to EDGE-9
- User review of the frame 462:2 (2026-09-23): "not bad, but too basic" next to tailwindcss.com and laravel.com; the exploration moves to an external AI design tool, the workbench keeps the guidelines and the review, the final page is written in code
- Library documentation of `@chrissgon/perfectui` 1.0.0-beta.0 (`docs/*.md`): the HTML snippets under Components are copied from it

## Product

perfectui is a CSS and JavaScript library of interface components that ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Behaviour comes from the browser (`<dialog>`, `popover`, `interestfor`, `<details>`), and the optional JavaScript only downloads a fallback for what a browser is missing. The whole stylesheet is 3,155 bytes gzip; the loader is 502 bytes.

Every element is up to three independent classes: a shape (`pui-btn`, `pui-chip`, `pui-badge`, `pui-card`…), a style (`pui-solid`, `pui-soft`, `pui-outline`, `pui-link`) and a colour (`pui-theme`, `pui-success`, `pui-warn`, `pui-error`, `pui-muted`, `pui-surface`, `pui-inverse`). Seven colours and four styles give 28 looks per shape.

```html
<button class="pui-btn pui-solid pui-theme">Get started</button>
```

Dark mode follows the operating system; `data-pui-mode="dark"` on `<html>` forces it. One custom property, `--pui-theme`, recolours every component. Everything lives in a cascade layer, so any plain CSS or Tailwind utility wins without `!important`. MIT licensed; the Figma file is free for commercial and personal use.

## Audience and voice

- Developers evaluating a component library without a framework: they compare size, dependencies and how much of the page the library takes over; they distrust marketing numbers.
- Users of perfectui 0.23 deciding whether the 1.0 rewrite is worth the class renames; they need the migration guide in one click.
- Voice: short declarative sentences in the second person, no exclamation marks; what the library does not do is said as a feature ("no reset", "no font import", "nothing on `window`"); concrete nouns from the library (shape, style, colour, `pui-`, `<dialog>`, `popover`, `light-dark()`).
- Words to use: bare minimum, shape, style, colour, `pui-`, follows the system, cascade layer, fallback, measured.
- Words to avoid: blazing, powerful, seamless, effortless, best, fastest, lightest, revolutionary, modern, utility-first, "framework" for perfectui itself, "tiny" without the number.

## Creative direction

The first version, composed through the design-tool integration, is structurally right and visually flat: nine equal framed cards, text left and demo right, no image, no scale contrast, no depth, no motion visible in a still. This round exists to close that gap without touching the structure.

What to take from the references (tailwindcss.com and laravel.com, structure and attitude only, nothing copied):

- One element in the hero at a scale nothing else on the page reaches: display type of 72 to 96 px on wide screens, or a demo that fills half the viewport.
- Real editor and canvas demos: a code panel in Fira Code next to a live rendering that changes as the code changes, instead of a static button beside a code line.
- A dark canvas with depth: layered bands, blurred glows, faint grid lines or dot fields, so the page is not one white sheet.
- Scroll-driven motion that demonstrates a claim (bars grow, classes type themselves, items strike through), never decoration that moves for its own sake.
- Illustration built from the product's own primitives: buttons, chips, badges, cards and dialogs arranged as a composition; never a stock 3D scene or a device mock-up.

Directions to explore, one screen each in the first round (hero, size block and three-classes block at 1280 light):

- Direction A, "three layers": the three classes are the visual system. The hero shows a bare `<button>` assembling from three translucent slabs labelled shape, style and colour, in Fira Code, while the class line types itself; section dividers and the size bars reuse the three-token motif; display type dominates.
- Direction B, "editor and canvas": the hero is a split view, code panel left in Fira Code and a live perfectui page right; scrolling the page edits the code (adds a class, flips `data-pui-mode`, sets `--pui-theme`) and the canvas answers; the header band carries the glows; the canvas may be an inverse band.
- Direction C, "weight": the size story leads. The hero is the number 3.2 kB at display scale with the competitors' bars as a faint background composition that resolves into the measured chart on scroll; the rest of the page uses generous white space and one framed demo per section.

Identity hooks to keep, in any direction: the "P" mark and the "Perfect UI" wordmark; the theme blue; the glow band of the kit's documentation (a purple and a blue blurred ellipse behind the header of a framed container); framed containers with a 20 px radius and a 1 px border; Inter for text and Fira Code for code.

Allowed: a band that inverts its background (inverse role: black in light mode, white in dark mode) to create contrast between sections, including the hero. Not allowed: a colour, a type size or a component that is not in the tables below; a "used by", logos or sponsors section; a mention of an assistant or of features the site does not ship.

## Visual language

Colour, light and dark values. Every fill, stroke and text on the page uses one of these; soft tints are the role fill at 15% opacity (22% on hover), outline hover is the fill at 10%.

| Token | Light | Dark | Role |
|-------|-------|------|------|
| page/bg | #FFFFFF | #000000 | page background |
| page/bg-muted | #F3F4F6 | #111827 | card headers, addons, stripes, hover rows, install field |
| page/bg-emphasis | #E5E7EB | #1F2937 | code block background |
| page/text | #000000 | #FFFFFF | body text, code text |
| page/text-muted | #6B7280 | #9CA3AF | secondary text (only on page/bg) |
| page/border | #D1D5DB | #374151 | borders |
| theme/fill | #0092CD | #07B6F0 | brand blue: solid button, focus ring, perfectui's own bar |
| theme/on-fill | #FFFFFF | #000000 | label on a solid theme fill |
| theme/fill-hover | #007AAD | #48BFF2 | solid theme hover |
| theme/ink | #00628B | #6BC9F5 | links, soft and outline theme text |
| success/fill, success/ink | #16A34A, #0B6E2F | #22C55E, #71D588 | positive state, "copied", added line |
| error/fill, error/ink | #DC2626, #951616 | #EF4444, #FA7B73 | destructive state, removed line |
| warn/fill, warn/ink | #D97706, #934F03 | #F59E0B, #F9B867 | caution state |
| muted/fill, muted/ink | #6B7280, #464B55 | #9CA3AF, #B4B9C3 | neutral state, competitors' bars |
| surface/fill, surface/ink | #FFFFFF, #000000 | #000000, #FFFFFF | the usual secondary button |
| inverse/fill, inverse/on-fill | #000000, #FFFFFF | #FFFFFF, #000000 | inverted band |
| glow-purple | #7340D9 at 12% | same | blurred ellipse about 500 × 320 behind a header band |
| glow-blue | #1A8CBF at 10% | same | blurred ellipse about 400 × 250 behind a header band |
| tag-success | #15803D at 20% | same | fill of a small tag, text in success/ink |

Type. Inter for text and interface, Fira Code for code; fallbacks `system-ui, sans-serif` and `ui-monospace, monospace`.

| Role | Size / line height | Weight | Use |
|------|--------------------|--------|-----|
| display | 56 / 64 px, up to 96 / 96 px in the hero on wide screens | 600 | hero headline |
| h1 | 42 px | 600 | page title (not used on the landing) |
| h2 | 24 px | 600 | section headline |
| h3 | 18 / 24 px | 600 | subsection, migration headline |
| lead | 16 / 24 px, page/text-muted | 400 | supporting line, section body |
| body | 16 / 24 px, page/text | 400 | prose |
| label | 12 / 15 px | 400 or 500 | captions, bar labels, footnotes, tabs |
| code | 14 / 20 px, Fira Code | 400 | code lines, code panels, install command |
| component text | 14 / 17.5 px | 400 | text inside perfectui components |

Space and shape. Unit 4 px; gaps 8, 12, 16, 24, 32, 48 px. Framed container: radius 20 px, 1 px border page/border, band padding 40 px vertical and 48 px horizontal, gap 32 px between blocks; footer padding 48 / 40 px. Page frame 1280 px wide, header 56 px high, gutters 16 px narrow and 32 px from 768 px up; reading width 72 characters (about 720 px). Radii: 6 px for buttons, chips, badges, inputs; 9 px for cards and code blocks; 9999 px for pills and switches. Border 1 px everywhere. No shadows anywhere (dialogs use a backdrop, dropdowns a border). Focus ring 2 px in theme/fill, 2 px outside the element, following its radius. Transitions 150 ms on colour, border and text; none under reduced motion.

Breakpoints (Tailwind defaults): 640, 768, 1024, 1280 px. Below 640 everything is one column.

## Components

Real markup of the library; demos render these, not drawings of them. Components keep the library's look (the site never restyles a `pui-` class).

```html
<!-- shape + style + colour -->
<button class="pui-btn pui-solid pui-theme">Button</button>
<span class="pui-chip pui-soft pui-success">Active</span>
<span class="pui-badge pui-outline pui-muted">Draft</span>

<!-- card -->
<div class="pui-card">
  <div class="pui-card-header">Card header</div>
  <div class="pui-card-content">Content goes here.</div>
</div>

<!-- modal: <dialog> driven by commandfor / command -->
<button class="pui-btn pui-solid pui-theme" commandfor="confirm" command="show-modal">Delete project</button>
<dialog class="pui-modal" id="confirm" closedby="any">
  <div class="pui-card">
    <div class="pui-card-header">Delete project</div>
    <div class="pui-card-content">This cannot be undone.</div>
  </div>
</dialog>

<!-- dropdown: popover -->
<button class="pui-btn pui-outline pui-surface" popovertarget="menu">Menu</button>
<div class="pui-dropdown" id="menu" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item">Profile</li>
    <li class="pui-list-item">Billing</li>
    <li class="pui-list-item">Sign out</li>
  </ul>
</div>

<!-- tooltip: interestfor -->
<button class="pui-btn pui-outline pui-surface" interestfor="help">?</button>
<div class="pui-tooltip" id="help" popover="hint">We never share your email.</div>

<!-- accordion: <details name> -->
<div class="pui-accordion">
  <details class="pui-accordion-item" name="faq">
    <summary>What is Perfect UI?</summary>
    <p>A lightweight CSS and JavaScript library.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Does it need JavaScript?</summary>
    <p>Only to emulate what a browser is missing.</p>
  </details>
</div>

<!-- switch -->
<label><input type="checkbox" class="pui-switch" checked /> Dark mode</label>

<!-- mode and theme -->
<html data-pui-mode="dark" style="--pui-theme: #7c3aed">
```

Site-only elements, drawn from the values above: header (56 px: mark and wordmark left; Docs link, search icon, version tag "1.0", mode toggle, theme colour picker, GitHub and Figma icons right; on narrow screens the logo, the search icon and the mode toggle stay visible and the rest goes behind a menu control), copy control on the install field (icon becomes a check in success/ink and the label reads "Copied"), code block on page/bg-emphasis, size chart, package-manager tabs, callout with a diff line, footer (wordmark, copyright, tagline "Components the browser already knows how to run.", links Docs, GitHub, Figma, MIT license).

## Page structure

Nine sections in this order; headline, body, demo and call to action are final copy, verbatim.

- SECTION-1 Hero. Headline: The bare minimum for elegant interfaces. Supporting line: Three classes, no framework, 3.2 kB. Body: A CSS and JavaScript library with no reset, no font, no runtime dependencies and no rule outside a `pui-` class; the browser does the work. Demo: the three classes `pui-btn`, `pui-solid`, `pui-theme` typed one by one in a code line (about 400 ms per token) while a bare `<button>` takes shape, then style, then colour; after a pause the sequence loops through two other shape and colour pairs; paused on hover. Install command `npm i @chrissgon/perfectui` with a copy control under the body. Calls to action: "Get started" (solid theme button) and "Migrating from 0.x" (outline surface button).
- SECTION-2 Size, measured. Headline: 3.2 kB. Measured, not promised. Body: `perfectui.css` is 3,155 bytes gzip; the optional JavaScript loader is 502. The bars below are the same measurement run on the published builds of the alternatives. Demo: horizontal bars that grow from zero when the block enters the viewport, perfectui first, numbers counting up, once; one bar per library with CSS and JS as two segments and the version beside the name: perfectui 1.0.0-beta.0 3,155 + 502; Pico 2.1.1 11,640; Beer CSS 5.0.3 17,035 + 5,864; Bootstrap 5.3.8 30,869 + 23,743; UIkit 3.25.24 30,944 + 53,317; Bulma 1.0.4 64,842. Footnote: `gzip -9` of the published builds, measured 2026-09-23. perfectui's bar is theme/fill, the others muted/fill with the JS segment as the soft tint. No call to action.
- SECTION-3 Three classes. Headline: A shape, a style, a colour. Body: Every element is up to three classes you can combine freely: what it is, how the colour is applied, which colour. Seven colours and four styles give 28 looks per shape, and adding a colour never multiplies your classes. Demo: a picker with three rows of chips (shape: button, chip, badge; style: solid, soft, outline, link; colour: theme, success, warn, error, muted, surface, inverse); the live element and the code line `class="pui-btn pui-solid pui-theme"` update on every choice with the library's 150 ms transition, and the changed token is highlighted. Call to action: "See the components".
- SECTION-4 The browser does the work. Headline: Overlays without a plugin. Body: Modals are `<dialog>`, menus are `popover`, tooltips are `interestfor`, accordions are `<details>`. The optional loader downloads a fallback only when a browser is missing one of them. Demo: four small live examples in a 2 × 2 grid (modal, dropdown, tooltip, accordion), each with the HTML that drives it and a "no JavaScript of yours" label; opening one animates as the browser does, nothing added. No call to action.
- SECTION-5 Dark mode and theme. Headline: One attribute for dark mode. One variable for your colour. Body: With no attribute, perfectui follows the operating system. Set `data-pui-mode` to choose, and `--pui-theme` to make every component yours. Demo: a mode switch and a colour picker that change the section's components live, with the two lines `<html data-pui-mode="dark">` and `--pui-theme: #7c3aed` beneath; the transition is the library's 150 ms. Call to action: "Dark mode docs".
- SECTION-6 With Tailwind, not instead of it. Headline: Your utilities always win. Body: Every perfectui rule lives in a cascade layer, so a Tailwind utility or a line of your CSS beats it with no `!important`. No reset, so nothing overlaps Preflight. Demo: the code line `class="pui-btn pui-solid pui-theme w-full"` with the button stretching to full width as `w-full` is added; a second line showing the dark variant pointed at `data-pui-mode`. Call to action: "Tailwind guide".
- SECTION-7 Nothing to undo. Headline: Nothing you have to undo. Body: No reset to override, no font to remove, no `!important` to beat, no initialiser to call after rendering, no guard for server rendering. ESM only, nothing on `window`. Demo: a short list of the five "no" items; each gets its strike-through drawn left to right (about 300 ms) as it enters the viewport, staggered by 80 ms. No call to action.
- SECTION-8 Coming from 0.x. Headline: Coming from 0.x? Body: 1.0 is a rewrite: every class is prefixed, styles and colours are separate classes, and the browser replaced the JavaScript. The guide lists every change. Demo: one before/after diff line, `btn style-solid-primary` removed in error/ink and `pui-btn pui-solid pui-theme` added in success/ink. Call to action: "Read the migration guide" (soft theme button).
- SECTION-9 Install and links. Headline: Install it your way. Body: A package for npm, yarn, pnpm or bun, or two tags from a CDN. Import everything or only the components you use. Demo: tabs per package manager (npm, yarn, pnpm, bun) with the copy control, then the CDN snippet (`<link>` to `dist/perfectui.css` and `<script type="module">` importing `dist/js/index.js`). Call to action: "Get started". The footer follows.

## Constraints

- Every colour, type size and radius comes from Visual language; the reviewer must be able to name the token of every fill. No gradients other than the two glows; no shadows; no images heavier than 100 KB; no video, canvas or WebGL.
- Demos are real perfectui markup with real behaviour, not screenshots or redrawn components; the library's components are not restyled.
- Copy is verbatim from Page structure; no sentence is added, and the words to avoid do not appear.
- Contrast: page/text-muted only on page/bg; no white text on theme blue, success or warn under 24 px except inside the library's own solid button; code text is page/text on page/bg-emphasis.
- Targets at least 24 × 24 px, 40 × 40 px for header icon controls; the focus ring visible on every control; reading order equals the section order at every width.
- On a 360 px wide screen the headline, the supporting line, the install command and "Get started" stay inside the first viewport, and every section stacks in one column.
- Motion: every animation has a final state that carries the same information; under `prefers-reduced-motion` only the final states show and the library's 150 ms transitions remain; without JavaScript the copy control, mode toggle, theme picker and pickers are inert and every demo shows its finished state.
- Header and footer contents are fixed (Components, site-only elements); the search icon stays because search ships with the site.
- Buildable in Nuxt with Tailwind and perfectui using CSS animations and an intersection observer, so that Lighthouse mobile performance stays at or above 90 and accessibility at or above 95.

## Deliverables

- Round 1: three directions (A, B, C above, or a fourth the tool proposes with its idea in one sentence), each as one screen at 1280 px in light mode covering the hero, the size block and the three-classes block, with motion described or prototyped.
- Round 2, after the review chooses one direction: the full page at 1280 and 360 px, in light and dark mode, with every animation of Page structure prototyped and the reduced-motion final states; the generated code is a reference for the implementation, not the implementation.

## Evaluation criteria

- CRIT-1: Faithful: every colour, type size, radius and spacing traces to Visual language; no foreign value.
- CRIT-2: Identity: the hero is recognisable as perfectui before reading (mark, theme blue, glows, three-class motif or the library's own components as composition).
- CRIT-3: Drama: one element in the hero at a scale nothing else reaches (display type of 72 px or more, or a demo filling half the viewport).
- CRIT-4: Real demos: every demo is the library's markup with its real behaviour; nothing faked.
- CRIT-5: Motion with purpose: each animation demonstrates a claim of its section and has a final state; reduced motion honoured.
- CRIT-6: Copy verbatim: headlines, bodies and calls to action as in Page structure; no invented sentence; no avoided word.
- CRIT-7: Narrow first viewport: at 360 px the headline, supporting line, install command and "Get started" are visible without scrolling.
- CRIT-8: Accessibility: contrast pairs as in Constraints; targets; focus ring; reading order.
- CRIT-9: Scope: nine sections and the shell, nothing more; no "used by", sponsors, assistant or unshipped feature.
- CRIT-10: Buildable: CSS and intersection-observer motion, no heavy assets; the direction can be implemented in the site's stack within the performance budget.

## How to run

1. Figma Make is its own file type, not a mode of the design file: in the file browser open Drafts (or the team, on a Full seat) and click "Make". Give it the design as context: select the frame `Landing / 1280 / light` (462:2, page "Site v1") in the perfectui file, copy it and paste it into the Make chat, or click "+" then "Add context" and paste the frame's URL. On a paid plan with a Full seat, also give it the library: publish the perfectui file's variables and styles as a library and add them as style context, or build a Make kit ("Settings" then "Create a kit") with the npm package `@chrissgon/perfectui`, the published library and this brief as its guidelines, then pick it with "Select a Make kit" in the prompter. On a Starter plan the library step is unavailable; this brief carries every value for that reason. In another tool, paste this document whole and attach a screenshot of the frame.
2. Paste the Prompt below, then the sections Product to Constraints as context; ask for round 1 (three directions).
3. Bring the three screens back to the workbench for a critique against CRIT-1 to CRIT-10; choose one direction, or ask for a second round with the critique's findings.
4. Ask for round 2 on the chosen direction; critique again; record the chosen direction, its frame or file and the review in the screen document; implement in code from the brief and the screen document, and validate the implementation against both.

## Prompt

```text
Design the landing page of perfectui 1.0, a CSS and JavaScript component library whose
whole stylesheet is 3.2 kB gzip. Audience: developers evaluating a component library
without a framework, and users of the previous version looking for the migration guide.

Give me three visual directions, one screen each, 1280 px wide, light mode, covering the
hero, the "3.2 kB, measured" block and the "a shape, a style, a colour" block:
A "three layers" (the three classes as the visual system), B "editor and canvas" (live
code panel and rendering), C "weight" (the size number leads). Name a fourth if you have
a better idea.

Rules: use only the colours, type scale, radii and spacing in the brief; Inter and Fira
Code; the library's real components and real markup for every demo; the copy verbatim;
motion that demonstrates a claim and has a final state; no shadows, no stock
illustration, no logos or "used by" section; one element in the hero at a scale nothing
else reaches. The brief follows.
```

## Open questions

- OPEN-1: May the hero and one more section invert their background (inverse band) in light mode? Blocks: nothing (default: allowed). Recommended: allowed, because the inverse role is a library token, the page still follows the mode, and it is the cheapest way to the depth the references have.

## Readiness

- Ready for round 1 in the external tool: yes.
