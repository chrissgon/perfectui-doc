# Feature specification: landing page and site shell

- Owner: product-feature-spec
- Status: draft
- Date: 2026-09-23
- Feature of: PRD `docs/product/prd.md` features F-3 (landing page), F-8 (mode and theme preview) and F-9 (share and search-engine metadata), phase P-1

## Summary

The landing page at `/` lets an evaluator learn what perfectui is, read its measured size with the method behind the number, copy the install command, see live components and jump into the documentation or the migration guide. The site shell (header, footer, mode and theme controls) is shared by the landing and every documentation page. Copy and section texts are decided later in a messaging step; this spec states what the page must let the reader do and what must be measurable.

## Goal and users

- Problem: the 0.23 landing promises an assistant that does not exist, states no measured size, and its dark-mode and theme helpers no longer exist in 1.0. Source: codebase map (`pages/index.vue`: "Now with Chat GPT" badge, four reason blocks, `setMode` and palette helpers); brief decision 8; library `MIGRATION.md` sections 5 and 6.
- Users: evaluators comparing libraries (PRD U-1); migrating users looking for the guide (PRD U-2). Source: PRD Users.
- Success: PRD M-3 (size claim equals the build measurement) and M-4 (Lighthouse targets) hold on the landing; every visitor can reach the docs and the migration guide in one click. Source: PRD M-3, M-4, F-3.

## Scope

- In: the landing page structure and behaviour; the site shell: header (navigation to docs, version label, repository link), footer, mode toggle and theme colour picker; per-page share and search-engine metadata for the whole site. Source: PRD F-3, F-8, F-9.
- Out: the copy, the section texts and the visual design (messaging step and design phase, PRD OPEN-5); the documentation layout (content-model spec); search (PRD F-5, own spec); the assistant (PRD F-11). Source: PRD OPEN-5; user answer 2026-09-23 (landing texts later, with AI assistance).

## Sources

- `docs/product/prd.md` (2026-09-23): U-1, U-2, F-3, F-8, F-9, M-3, M-4, constraints, OPEN-5
- `docs/workbench/state.md` decisions of 2026-09-23: landing texts defined later; lessons from the T-cm-1 review (`data-pui-mode`, SEO meta at setup); quality targets
- `docs/engineering/architecture.md` (codebase map of the 0.23 site on `main`): landing sections (hero with install command and copy control, "why" block with four reasons, dark-mode and theme-colour blocks, get-started block), `Atom.DarkMode.vue` (cookie `darkmode`), `Atom.ThemeColorPicker.vue` (session storage), `Atom.LogoVersion.vue`, GitHub and Figma links in the headers, `useSeoMeta` inside a client-only guard
- Research brief `css-library-alternatives` (perfectui repository, 2026-09-23): measured sizes with method (`gzip -9` of the published build), "Implications for positioning"
- Library `MIGRATION.md` sections 5 (dark mode: `data-pui-mode`, cookie, follows the OS when absent) and 6 (theming: `--pui-theme`)
- `@chrissgon/perfectui` 1.0.0-beta.0 as installed: exports `./mode` (`setMode`, `getMode`) and `./perfectui.css`; `--pui-theme` defaults to `light-dark(#0092cd,#07b6f0)`

## Functional requirements

- REQ-1: The landing at `/` shows, inside the first viewport on a 360×640 mobile screen and on a 1280×800 desktop screen, what perfectui is (one sentence and one paragraph, texts to be defined), the install command and the primary call to action to `/docs` (which redirects to the current major's index). Source: PRD F-3; codebase map (hero block of the 0.23 landing as baseline); user answer 2026-09-23 (texts later).
- REQ-2: The landing shows the gzip size of `perfectui.css` and of the JavaScript entry of the installed library version, with the version number and the method (`gzip -9` of the published build) next to the numbers; the numbers are computed at build time from the installed package and are never typed by hand. Source: PRD M-3; research brief implications.
- REQ-3: The install command (`npm i @chrissgon/perfectui`) has a copy control that reports "copied" for at least 1 second after activation, by pointer and by keyboard; the package name comes from one configuration value, not from a literal in the template. Source: codebase map (install command and copy control on the 0.23 landing); PRD F-3.
- REQ-4: The landing has a secondary call to action to the migration guide page, visible without scrolling past the components showcase, so a 0.23 user reaches the guide in one click. Source: PRD F-4, U-2.
- REQ-5: The landing has a components showcase with at least 4 live perfectui components rendered from the same example blocks the documentation uses (no example HTML duplicated in the landing's source). Source: codebase map (four reason widgets on the 0.23 landing as baseline); content-model spec REQ-3 (single source for examples).
- REQ-6: The landing and the shell mention no feature that the current build does not ship: no assistant, no search entry point unless the search feature is built, no "soon" badges. Source: brief decision 8; PRD scope Out.
- REQ-7: The header, on the landing and on every documentation page, has a link to the documentation index, the label of the latest documented version read from the versions configuration, links to the GitHub repository and to the Figma file, the mode toggle and the theme colour picker; the footer has the license and the repository link. Source: codebase map (`Atom.LogoVersion.vue`, GitHub link, header components); content-model spec REQ-5 (versions configuration); PRD F-8.
- REQ-8: The mode toggle calls the library's `setMode` with `dark`, `light` or `system`; `<html>` carries `data-pui-mode` from the prerendered HTML on, never a `dark` class; with no stored choice the site follows the operating system. Source: PRD constraints (lessons); `MIGRATION.md` section 5; package `./mode` export.
- REQ-9: The theme colour picker sets `--pui-theme` on `<html>` to the chosen preset (five presets and no free colour input, user review 2026-09-25), persists the choice in the browser for the session, and every perfectui component on the page and every example block follows it without reload. Source: PRD F-8; `MIGRATION.md` section 6; codebase map (`Atom.ThemeColorPicker.vue` behaviour as baseline).
- REQ-10: Every page's prerendered HTML carries `<title>`, `meta description`, `og:title`, `og:description`, `og:image`, `og:url` and `twitter:card`, with the page's own title and description for documentation pages and the site's for the landing. Source: PRD F-9; state decision (prerendered pages carry no Open Graph meta today).

## Non-functional requirements

- NFR-1: The generated landing scores at least 90 for performance and at least 95 for accessibility in Lighthouse on mobile, and 0 violations against WCAG 2.2 AA in the accessibility check of the build tests. Source: PRD M-4 (user answer 2026-09-23).
- NFR-2: The size numbers of REQ-2 differ by 0 B from a `gzip -9` measurement of the same files run by the build tests. Source: PRD M-3.
- NFR-3: With JavaScript disabled, 100% of the landing's text, links and the install command remain visible and the calls to action work; only the copy control, the mode toggle and the theme picker may be absent. Source: content-model spec NFR-2 (fully prerendered site); PRD constraint (static generation).

## Constraints

- Technical: Nuxt, Tailwind and perfectui 1.0 components for the shell; `data-pui-mode` and `--pui-theme` are the only theming mechanisms; SEO meta set at component setup, not inside a client-only guard. Source: PRD constraints; state decision (lessons).
- Technical: the size measurement runs inside `nuxt generate` against the installed package (`node_modules/@chrissgon/perfectui`), so the number always matches the pinned version. Source: PRD constraint (content as data, generators inside the build); PRD M-3.
- Business: copy and section texts arrive from the messaging step; until then the design and the implementation use placeholders marked as such. Source: user answer 2026-09-23 (PRD OPEN-5).
- Operational: static hosting on Netlify. Source: state decision.

## Edge cases

- EDGE-1: JavaScript disabled → text, links and install command visible; copy control, mode toggle and theme picker hidden or inert; no broken layout (NFR-3).
- EDGE-2: viewport 320 px wide → no horizontal scroll; the install command wraps or scrolls inside its own box.
- EDGE-3: `prefers-reduced-motion: reduce` → no animation runs on the landing (the 0.23 landing had a pulsing badge).
- EDGE-4: no stored mode and the operating system is in dark mode → the page renders dark on first paint with no flash; `getMode()` returns `system`.
- EDGE-5: a stored mode cookie exists → the prerendered HTML is patched to that mode before first paint or the switch happens within the first frame after hydration; the shell shows the stored mode in the toggle.
- EDGE-6: the theme colour picker receives a colour with low contrast against the surface (for example `#ffffff` in light mode) → the picker applies it anyway and shows no error; contrast of the site's own text is not affected because it does not derive from `--pui-theme`.
- EDGE-7: the installed package lacks a file the size measurement expects → the build fails naming the file; no landing is published with a stale number.
- EDGE-8: the versions configuration has no version marked latest → the build fails naming the configuration file.
- EDGE-9: the copy control is activated when the clipboard API is unavailable (insecure context) → the control shows the command selected for manual copy and no error dialog.
- Categories skipped: timing and volume (a static page with no concurrent state); integration (no external service is called from the landing).

## Acceptance criteria

- AC-1:
  Given the generated `index.html`
  When it is opened at 360×640 and at 1280×800
  Then the sentence, the paragraph placeholder, the install command and the primary call to action to `/docs` are inside the first viewport in both sizes
  Covers: REQ-1
- AC-2:
  Given the site is generated with the pinned library version
  When the build tests run `gzip -9` on the installed `perfectui.css` and JavaScript entry
  Then the numbers printed on the landing equal the measurements (0 B difference) and the version and the words "gzip" appear within the same block
  Covers: REQ-2, NFR-2
- AC-3:
  Given the landing is open with JavaScript enabled
  When the copy control is activated by click and, separately, by keyboard
  Then the clipboard holds `npm i @chrissgon/perfectui`, the control reads "copied" for at least 1 second, and the package name in the command comes from the configuration value (changing it changes the command)
  Covers: REQ-3
- AC-4:
  Given the landing is open
  When the reader scrolls to the end of the components showcase
  Then a call to action to the migration guide page has been visible, and following it opens the migration guide
  Covers: REQ-4
- AC-5:
  Given the landing's source and the generated HTML
  When the showcase is inspected
  Then at least 4 perfectui components are rendered live, each from an example block that also exists in the documentation content, and no example HTML string is defined in the landing's source
  Covers: REQ-5
- AC-6:
  Given the generated landing and shell HTML
  When searched for the words "assistant", "ChatGPT", "soon" and for a search entry point
  Then none appears unless the corresponding feature is built and enabled in this build
  Covers: REQ-6
- AC-7:
  Given the generated landing and one generated documentation page
  When their headers and footers are inspected
  Then both contain the docs link, the latest version label from the versions configuration, the GitHub link, the mode toggle and the theme picker, and both footers contain the license and the repository link
  Covers: REQ-7
- AC-8:
  Given the generated HTML of any page
  When `<html>` is inspected before and after the reader toggles the mode
  Then it carries `data-pui-mode` and never a `dark` class, `setMode` is called with the chosen value, and with no stored choice the attribute follows `prefers-color-scheme`
  Covers: REQ-8
- AC-9:
  Given the landing is open with a showcase component and an example block on screen
  When the reader picks a colour in the theme picker
  Then `--pui-theme` on `<html>` equals the colour, the showcase and the example block change colour without reload, and reloading the page keeps the colour for the session
  Covers: REQ-9
- AC-10:
  Given the generated `index.html` and one generated documentation page
  When their `<head>` is inspected
  Then each has `<title>`, `meta description`, `og:title`, `og:description`, `og:image`, `og:url` and `twitter:card`, and the documentation page's title and description are its own frontmatter values
  Covers: REQ-10
- AC-11:
  Given the generated landing
  When Lighthouse (mobile) and the accessibility check of the build tests run against it
  Then performance is at least 90, accessibility at least 95, and 0 WCAG 2.2 AA violations are reported
  Covers: NFR-1
- AC-12:
  Given the generated landing opened with JavaScript disabled
  When the page is read
  Then all text, links and the install command are visible and the calls to action navigate; the copy control, mode toggle and theme picker are absent or inert without errors
  Covers: NFR-3

## Assumptions

- ASSUMPTION-1: The GitHub repository link points at `https://github.com/chrissgon/perfectui` as today. Safe because: the codebase map records it and nothing in the brief changes it.
- ASSUMPTION-2: The theme colour persists per session (session storage), as on the 0.23 site, not across sessions. Safe because: it matches today's behaviour; a cookie would let the server render the colour but the brief does not ask for it.

## Open questions

- OPEN-1: Which sections the landing has beyond the hero, the size block, the showcase and the migration call to action, and all texts. Blocks: nothing in this spec (the design phase needs the section list; texts can be placeholders). Recommended: decide in the messaging step with AI assistance, as the user chose on 2026-09-23; start the design from hero, size with method, install, live showcase, migration call to action and footer.
- OPEN-2 (resolved 2026-09-23): the header keeps the Figma link, since the file exists today (user). Blocks: nothing. Recommended: as decided.

## Readiness

- Ready for architecture: yes. OPEN-1 and OPEN-2 block no requirement; the design phase can start with the section list recommended in OPEN-1 and placeholder texts.
