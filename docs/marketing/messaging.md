# Messaging: perfectui 1.0 landing page

- Owner: mkt-messaging
- Status: draft
- Date: 2026-09-23
- Page: the landing page of the documentation site (PRD F-3, flows SCREEN-1)

## Summary

The page speaks to developers evaluating a lightweight component library and to 0.23 users deciding whether to migrate. It promises the bare minimum: components that weigh 3.2 kB, take their behaviour from the browser, and leave the rest of the page alone; every claim on it is a measurement or a documented behaviour.

## Sources

- `docs/product/prd.md` (2026-09-23): U-1 evaluators, U-2 migrating users, F-3 landing, F-4 migration guide, M-3 size claim integrity, OPEN-5 (messaging with AI assistance, decided by the user)
- Measurement of the installed `@chrissgon/perfectui` 1.0.0-beta.0 on 2026-09-23 with `gzip -9 -c <file> | wc -c`: `dist/perfectui.css` 3,155 B (raw 15,012 B), `dist/css/core.css` 871 B, `dist/js/index.js` 502 B, `dist/js/mode.js` 319 B; largest component stylesheet `form.css` 1,165 B; five fallback files under `dist/js/fallbacks/` (anchor-positioning, checkbox-indeterminate, command-for, dialog-closedby, interest-for)
- Research brief `docs/workbench/research/css-library-alternatives.md` (perfectui repository, 2026-09-23): sizes measured with the same method from the published CDN builds: Pico 2.1.1 11,640 B; Beer CSS 5.0.3 17,035 B CSS + 5,864 B JS; Bootstrap 5.3.8 30,869 B CSS + 23,743 B JS; UIkit 3.25.24 30,944 B + 53,317 B; Bulma 1.0.4 64,842 B; Open Props 1.7.23 7,667 B (tokens only); perfectui 0.23.0 5,978 B + 1,574 B; weekly npm downloads for perfectui 213 (2026-09-15 to 2026-09-21); all measured libraries MIT
- Library `README.md` (perfectui repository): "ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Behavior comes from the browser — `<details>`, `<dialog>`, `popover` — and JavaScript only fills in what a browser is missing"; install by npm, yarn, pnpm, bun or CDN; "ESM only and exposes nothing on `window` or `document`"; "Every element is made of up to three independent classes: a shape, a style and a color"; Figma file "free for both commercial and personal projects"; MIT
- Library `docs/tailwindcss.md`: "Perfect UI does not depend on Tailwind, and Tailwind is not required to use it. They complement each other"; every rule "lives inside `@layer pui.*`", so "a utility always beats the library with no `!important`"; dark variant pointed at `data-pui-mode`; "Perfect UI ships no reset and styles no bare elements"
- Library `docs/darkmode.md`: "follows the operating system by default. There is nothing to configure and nothing to import: colors are declared with `light-dark()`"; one attribute `data-pui-mode` with `light`, `dark` or absent
- Library `MIGRATION.md`: §3 one style class and one colour class instead of combined classes; §4 modal on `<dialog>` with `commandfor`/`command`, dropdown on `popover`, tooltip on `interestfor` ("the change that fixes tooltips on touch screens"), accordion on `<details name>`; §6 theming is `--pui-theme`; §8 "No `loadFunctions()`", "No overrides to undo the reset", "No `!important` to beat the library", "No guard for server rendering"
- Library `DESIGN-SYSTEM.md` §2 and §3: seven colour roles, four styles, 28 combinations; §1.2 four base values (space 4 px, font 14 px, radius 6 px, border 1 px)
- tailwindcss.com landing (accessed 2026-09-23), structure only: hero with headline, one-line body and "Get started"; feature showcase with live interactive demos (responsive slider, dark mode side by side, colour grid, animations); "Ship faster and smaller" with code and numbers; footer with documentation, resources and community links. No sentence copied.
- 0.23 landing (`main:pages/index.vue`, codebase map): sections "Dark Mode & Theme Helpers", "Fully Responsive", "Lightweight & Customizable", "Inspired by Tailwind CSS", with "Learn more" links; kept as a list of themes the site already spoke about
- `docs/workbench/state.md` decisions of 2026-09-23: landing first, creative with animations, faithful to perfectui; no brand phase (logo and theme colour kept); site language English

## Audience

- U-1: evaluating a component library without a framework, comparing size, dependencies and how much of the page it takes over; fears: another reset fighting their CSS, JavaScript that re-initialises the DOM, a font they did not ask for, numbers that turn out to be marketing. Source: PRD U-1; research brief "Implications for positioning"; README ("bare minimum" list).
- U-2: on 0.23, deciding whether the rewrite is worth the class renames; fears: broken pages, no guide, losing dark mode and theming. Source: PRD U-2; MIGRATION.md "Why" and §1 to §8.

## Promise

Components with the bare minimum: no reset, no font, no runtime dependencies, behaviour from the browser, 3.2 kB of CSS. Source: README ("ships the bare minimum" sentence); measurement 2026-09-23.

## Voice

- Say what it does not do, as a feature: "no reset", "no font import", "nothing on `window`". Source: derived from README and MIGRATION.md §8 ("What you no longer have to do").
- Concrete nouns from the library: shape, style, colour, `pui-` class, `<dialog>`, `popover`, `light-dark()`. Source: derived from README and the docs.
- Short declarative sentences, second person, no exclamation marks. Source: derived from the docs (every page opens with one plain sentence).

## Proof points

- PROOF-1: The whole library is 3.2 kB of CSS (3,155 B) and 0.5 kB of JavaScript (502 B), gzip. Evidence: `gzip -9` of `dist/perfectui.css` and `dist/js/index.js` of the installed 1.0.0-beta.0, 2026-09-23; the site recomputes the number at build time (PRD M-3) and prints the method and the version next to it. Source: measurement 2026-09-23; PRD M-3.
- PROOF-2: Measured the same way, perfectui is smaller than every alternative in the research brief: Pico 11,640 B, Beer CSS 17,035 B + 5,864 B, Bootstrap 30,869 B + 23,743 B, UIkit 30,944 B + 53,317 B, Bulma 64,842 B. Evidence: research brief table, `gzip -9` of the published CDN builds at the pinned versions, 2026-09-23; competitors' numbers are static on the page with their versions and the date. Source: research brief §4.
- PROOF-3: No runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Evidence: README statement; `perfectui.css` `:root` sets only `--pui-*` custom properties and `color-scheme`; the stylesheet has no element selectors outside `pui-` classes (DESIGN-SYSTEM "How to read this"). Source: README; `dist/perfectui.css`.
- PROOF-4: An element is up to three independent classes: a shape, a style and a colour; 7 colours × 4 styles = 28 combinations per shape. Evidence: README "Writing a component"; DESIGN-SYSTEM §2 (seven roles) and §3 (four styles). Source: README; DESIGN-SYSTEM §2, §3.
- PROOF-5: Behaviour comes from the browser: modal on `<dialog>` with `commandfor` and `command`, dropdown on `popover`, tooltip on `interestfor`, accordion on `<details name>`; the JavaScript is an optional loader that downloads a fallback only for what the browser is missing (5 fallback files). Evidence: MIGRATION.md §4; README install section; `dist/js/fallbacks/` listing. Source: MIGRATION.md §4; README; measurement listing 2026-09-23.
- PROOF-6: Dark mode follows the operating system with nothing to configure; an explicit choice is one attribute, `data-pui-mode`, on `<html>`; theming is one custom property, `--pui-theme`. Evidence: docs/darkmode.md; MIGRATION.md §5 and §6. Source: docs/darkmode.md; MIGRATION.md.
- PROOF-7: Every rule lives in a cascade layer, so any plain CSS or Tailwind utility wins without `!important`; the two do not overlap because perfectui ships no reset; Tailwind's dark variant can share `data-pui-mode`. Evidence: docs/tailwindcss.md. Source: docs/tailwindcss.md.
- PROOF-8: Nothing to undo after install: no `loadFunctions()`, no overrides to undo a reset, no `!important`, no guard for server rendering, ESM only with nothing on `window` or `document`. Evidence: MIGRATION.md §8; README. Source: MIGRATION.md §8; README.
- PROOF-9: Installable by npm, yarn, pnpm, bun or a CDN `<link>` plus a module `<script>`; components importable one by one (`core.css` 871 B plus a component stylesheet). Evidence: README install section; measurement of `core.css`. Source: README; measurement 2026-09-23.
- PROOF-10: MIT licensed; the Figma file is free for commercial and personal use. Evidence: README badges and contribution section; research brief (all measured libraries MIT). Source: README.
- PROOF-11: 1.0 is a rewrite and a written migration guide covers every change from 0.23 in eight sections. Evidence: MIGRATION.md ("`1.0.0` is a rewrite", sections 1 to 8); PRD F-4. Source: MIGRATION.md; PRD F-4.

## Sections

- SECTION-1: Hero. Purpose: the reader knows in one screen what perfectui is and can install it. Proof: PROOF-1, PROOF-3. Headline: The bare minimum for elegant interfaces. Body: Three classes, no framework, 3.2 kB. A CSS and JavaScript library with no reset, no font, no runtime dependencies and no rule outside a `pui-` class; the browser does the work. Demo: the three classes `pui-btn pui-solid pui-theme` typed one by one in a code line while a bare `<button>` on the right takes shape, then style, then colour; the sequence loops through other shapes and colours; reduced motion shows the final state. Install command `npm i @chrissgon/perfectui` with a copy control beneath the body. CTA: Get started → /docs; secondary: Migrating from 0.x → the migration guide. Source: README; measurement 2026-09-23; PRD F-3, F-4; flows SCREEN-1 regions.
- SECTION-2: Size, measured. Purpose: the reader believes the size because the method is on the page. Proof: PROOF-1, PROOF-2. Headline: 3.2 kB. Measured, not promised. Body: `perfectui.css` is 3,155 bytes gzip; the optional JavaScript loader is 502. The bars below are the same measurement run on the published builds of the alternatives. Demo: horizontal bars that grow on scroll, one per library (perfectui, Pico, Beer CSS, Bootstrap, UIkit, Bulma), CSS and JS as two segments, version labels, and a footnote with the command and the date; perfectui's bar is computed at build time from the installed package. CTA: none. Source: measurement 2026-09-23; research brief §4; PRD M-3.
- SECTION-3: Three classes. Purpose: the reader understands the model without reading the docs. Proof: PROOF-4. Headline: A shape, a style, a colour. Body: Every element is up to three classes you can combine freely: what it is, how the colour is applied, which colour. Seven colours and four styles give 28 looks per shape, and adding a colour never multiplies your classes. Demo: an interactive picker with three rows of chips (shape: button, chip, badge; style: solid, soft, outline, link; colour: the seven roles); the live element and the code line `class="pui-btn pui-solid pui-theme"` update on every choice, with a small transition on the element. CTA: See the components → /docs/v1/components/button. Source: README "Writing a component"; DESIGN-SYSTEM §2, §3.
- SECTION-4: The browser does the work. Purpose: the reader sees overlays working with no script of theirs. Proof: PROOF-5. Headline: Overlays without a plugin. Body: Modals are `<dialog>`, menus are `popover`, tooltips are `interestfor`, accordions are `<details>`. The optional loader downloads a fallback only when a browser is missing one of them. Demo: four small live examples side by side (modal, dropdown, tooltip, accordion), each with the HTML that drives it and a "no JavaScript of yours" label; opening one animates it as the browser does. CTA: none. Source: MIGRATION.md §4; README; fallbacks listing.
- SECTION-5: Dark mode and theme. Purpose: the reader sees the whole page change with one attribute and one variable. Proof: PROOF-6. Headline: One attribute for dark mode. One variable for your colour. Body: With no attribute, perfectui follows the operating system. Set `data-pui-mode` to choose, and `--pui-theme` to make every component yours. Demo: a mode switch and a colour picker that change the section's components live, with the two lines of code beneath (`<html data-pui-mode="dark">`, `--pui-theme: #7c3aed`); the transition is the library's own 150 ms. CTA: Dark mode docs → /docs/v1/customization/dark-mode. Source: docs/darkmode.md; MIGRATION.md §5, §6; DESIGN-SYSTEM §5.
- SECTION-6: With Tailwind, not instead of it. Purpose: the reader who uses Tailwind knows the two do not fight. Proof: PROOF-7. Headline: Your utilities always win. Body: Every perfectui rule lives in a cascade layer, so a Tailwind utility or a line of your CSS beats it with no `!important`. No reset, so nothing overlaps Preflight. Demo: one code line `class="pui-btn pui-solid pui-theme w-full"` with the button stretching to full width as the utility is added; a second line showing the dark variant pointed at `data-pui-mode`. CTA: Tailwind guide → /docs/v1/getting-started/tailwind-css. Source: docs/tailwindcss.md.
- SECTION-7: Nothing to undo. Purpose: the reader stops expecting the usual clean-up. Proof: PROOF-3, PROOF-8. Headline: Nothing you have to undo. Body: No reset to override, no font to remove, no `!important` to beat, no initialiser to call after rendering, no guard for server rendering. ESM only, nothing on `window`. Demo: a short list with a strike-through animation on each "no" item as it scrolls into view. CTA: none. Source: MIGRATION.md §8; README.
- SECTION-8: Coming from 0.x. Purpose: a 0.23 user finds the guide in one click. Proof: PROOF-11. Headline: Coming from 0.x? Body: 1.0 is a rewrite: every class is prefixed, styles and colours are separate classes, and the browser replaced the JavaScript. The guide lists every change. Demo: one before/after diff line (`btn style-solid-primary` → `pui-btn pui-solid pui-theme`). CTA: Read the migration guide → the migration guide. Source: MIGRATION.md; PRD F-4; landing spec REQ-4.
- SECTION-9: Install and links. Purpose: the reader installs and finds the repository, the Figma file and the license. Proof: PROOF-9, PROOF-10. Headline: Install it your way. Body: A package for npm, yarn, pnpm or bun, or two tags from a CDN. Import everything or only the components you use. Demo: tabs per package manager with the copy control, the CDN snippet, and links to GitHub, the Figma file and the MIT license in the footer. CTA: Get started → /docs. Source: README; measurement of `core.css`.

## Taglines

- The bare minimum for elegant interfaces.
- Three classes, no framework, 3.2 kB.
- Components the browser already knows how to run.

## Words

- Use: bare minimum, shape, style, colour, `pui-`, follows the system, cascade layer, fallback, measured, "no reset", "no font", "nothing on `window`". Source: README; docs; MIGRATION.md §8.
- Avoid: blazing, powerful, seamless, effortless, best, fastest, lightest, revolutionary, modern, utility-first, framework (for perfectui itself), tiny (without the number)

## Open questions

- OPEN-1 (resolved 2026-09-23): the size bars name Pico, Beer CSS, Bootstrap, UIkit and Bulma with versions and the measurement date (user). Blocks: nothing. Recommended: as decided.
- OPEN-2 (resolved 2026-09-23): headline "The bare minimum for elegant interfaces", supporting line "Three classes, no framework, 3.2 kB" (user). Blocks: nothing. Recommended: as decided.
- OPEN-3 (resolved 2026-09-23): no "used by" or sponsors section (user). Blocks: nothing. Recommended: as decided.

## Readiness

- Ready for design-ui: yes; no open question remains.
