# Design: landing page and site shell

- Owner: eng-architecture
- Status: draft
- Date: 2026-09-24
- Specification: docs/product/specs/landing-and-site-shell.md
- Frameworks and versions relied on: as `docs/engineering/designs/markdown-content-model.md` (registry checked 2026-09-24), plus @fontsource-variable/inter 5.3.0 and @fontsource/fira-code 5.3.0; the library's mode API and the no-flash recipe from `@chrissgon/perfectui` 1.0.0-beta.1 `docs/darkmode.md` ("Avoiding the flash": read the `pui-mode` cookie in a script in the `<head>` before the stylesheet); Nuxt `useSeoMeta` and `useHead` (nuxt.com/docs/api/composables, accessed 2026-09-24)

## Summary

The shell (header, footer, mode toggle, theme picker) is one layout shared by the landing and the documentation layout. Mode and theme are applied before first paint by a tiny inline script in `<head>` that reads the library's `pui-mode` cookie and the session's theme colour; after hydration the controls call the library's `setMode` and set `--pui-theme`. The landing is ten section components built from the approved export, fed by three sources only: the messaging copy, the documentation's own example blocks (queried by name from the docs collection) and a build-time measurement of the installed library. Every page sets its SEO and Open Graph meta at setup, so the prerendered HTML carries them. Motion runs only on the client, only when reduced motion is not requested; the server renders every demo in its final state, which is also what readers without JavaScript see.

## Sources

- `docs/product/specs/landing-and-site-shell.md` (REQ-1 to REQ-10, NFR-1 to NFR-3, EDGE-1 to EDGE-9, AC-1 to AC-12)
- `docs/design/handoff/landing.md` (components, layout, behaviour, motion timings, tokens, deviations DEV-1 to DEV-8); `docs/design/handoff/documentation-page.md` (shared shell)
- `docs/marketing/messaging.md` (SECTION-1 to SECTION-9, PROOF-1, PROOF-2); research brief `css-library-alternatives` §4 of the library repository (competitors measured with `curl -sL <cdn url> | gzip -9 | wc -c`, 2026-09-23)
- Measurement of `@chrissgon/perfectui` 1.0.0-beta.1 on 2026-09-24: `gzip -9 -n` gives 3,221 B for `dist/perfectui.css` and 493 B for `dist/js/index.js`; `gzip -9 -c <file>` adds the file name to the header (3,235 B, 502 B); Node's zlib at level 9 gives 3,229 B and 487 B
- `docs/design/results/og-image.md` (the user's thumbnail as `og:image`); the 0.23 site's URL `https://perfectui.netlify.app` (branch `main`)
- `docs/engineering/designs/markdown-content-model.md` (versions configuration, example block, collections); ADR-0007, ADR-0008

## Decisions

| # | Decision | Chosen | Class | ADR or source |
|---|----------|--------|-------|---------------|
| 1 | Shell shared by landing and docs | one `default` layout with `SiteHeader` and `SiteFooter`; the docs layout nests inside it | engineering | REQ-7; no viable alternative |
| 2 | Mode and theme before first paint | inline head script reading the `pui-mode` cookie and `sessionStorage` | decided | library `docs/darkmode.md`; REQ-8, REQ-9, EDGE-4, EDGE-5 |
| 3 | Size measurement | `gzip -9 -n` of the installed files at build, the competitors' method | engineering | ADR-0007 |
| 4 | Showcase examples | named example blocks queried from the docs collection | engineering | ADR-0008 |
| 5 | Fonts | Inter and Fira Code from `@fontsource` packages, bundled at build | engineering | handoff (self-hosted); no network at build, no runtime CDN |
| 6 | Icons | inline SVG components for the 16 icons of the handoffs | engineering | handoff assets; inline SVG costs no request and paints with `currentColor`, so the mask recipe's per-icon request is avoided |
| 7 | Site configuration | `app/site.config.ts`: package name, site URL, repository, Figma file, license | engineering | REQ-3, REQ-7, REQ-10 |
| 8 | Open Graph image | the user's thumbnail as a 1200 × 630 static file | decided | user, 2026-09-24 |

## Components

| Component | Responsibility | Location | Inputs | Outputs | Satisfies |
|-----------|----------------|----------|--------|---------|-----------|
| Site configuration | the single place for package name, site URL, links, license | `app/site.config.ts` | none | constants | REQ-3, REQ-7, REQ-10 |
| No-flash head script | set `data-pui-mode` from the cookie and `--pui-theme` from session storage before the stylesheet applies | `app/app.vue` via `useHead` (inline script, first in `<head>`) | cookie, session storage | attributes on `<html>` | REQ-8, REQ-9, EDGE-4, EDGE-5 |
| Default layout | header, page slot, footer | `app/layouts/default.vue` | route | page frame | REQ-7 |
| Site header | logo and version label, docs link, search entry point, mode toggle, theme picker, GitHub and Figma links; menu control below 1024 px | `app/components/SiteHeader.vue` | versions configuration, site configuration, features | header markup | REQ-6, REQ-7 |
| Mode toggle | cycle light → dark → system (sun, moon, monitor icons; the label names the next mode) and call `setMode` | `app/components/ModeToggle.vue` | current mode | `setMode('light' | 'dark' | 'system')` | REQ-8, EDGE-4 |
| Theme picker | presets only (colour input removed, user review 2026-09-25); set `--pui-theme`; persist for the session | `app/components/ThemePicker.vue` | presets | style on `<html>`, session storage | REQ-9, EDGE-6 |
| Site footer | tagline, links, license, display wordmark | `app/components/SiteFooter.vue` | site configuration, messaging tagline | footer markup | REQ-7 |
| SEO composable | title, description, Open Graph and Twitter meta at setup | `app/composables/usePageMeta.ts` | page title, description, path | head tags | REQ-10 |
| Library size generator | measure the installed files and expose the numbers | `server/routes/api/library-size.json.get.ts` | `node_modules/@chrissgon/perfectui/dist/…`, `package.json` version | `{ version, css, js, method, measuredAt }` | REQ-2, NFR-2, EDGE-7 |
| Landing page | compose the sections; set the landing's meta | `app/pages/index.vue` | messaging copy, library size, example blocks | page | REQ-1, REQ-4, REQ-10 |
| Hero | headline, supporting line, body, class-cycle demo, install command, CTAs | `app/components/landing/LandingHero.vue`, `ClassCycleDemo.vue` | copy, cycle list | markup; motion on the client | REQ-1, REQ-3, REQ-4 |
| Copy command | clipboard write with "Copied" feedback, manual-select fallback | `app/components/CopyCommand.vue` | command | copied state | REQ-3, EDGE-9 |
| Size chart | one row per library, CSS and JS segments, counters, footnote with method and version | `app/components/landing/SizeChart.vue` | library size, competitors' static list | markup | REQ-2 |
| Showcase | class picker, overlays, mode and theme demo | `app/components/landing/ClassPicker.vue`, `OverlaysShowcase.vue`, `ModeThemeDemo.vue` | named example blocks | live components | REQ-5 |
| Further sections | Tailwind demo, strike list, migration callout, install tabs | `app/components/landing/…` | copy | markup | REQ-4, REQ-3 |
| Motion composable | `prefers-reduced-motion`, in-view trigger, client-only timers | `app/composables/useMotion.ts` | element, options | `inView`, `allowed` | NFR-1, NFR-3, EDGE-3 |
| Features configuration | which optional features the build ships (search, assistant) | `app/features.ts` | none | flags | REQ-6 |

## Data or content model

The landing's copy is data, not markup: a Nuxt Content data collection over `content/landing.yml` holds the nine sections verbatim from messaging (headline, body, call to action, labels), so a copy fix is one YAML edit (collection `type: 'data'`, content.nuxt.com/docs/collections/types, accessed 2026-09-23).

```ts
landing: defineCollection({ type: 'data', source: 'landing.yml', schema: z.object({
  sections: z.array(z.object({ id: z.string(), headline: z.string(), body: z.string(),
    cta: z.object({ label: z.string(), to: z.string() }).optional() })),
  tagline: z.string(),
}) })
```

`app/site.config.ts` (the only file with the package name and links):

```ts
export const site = { url: 'https://perfectui.netlify.app', packageName: '@chrissgon/perfectui',
  repository: 'https://github.com/chrissgon/perfectui', figma: 'https://www.figma.com/file/szD991W25tQxPuqhfRektk/PerfectUI',
  license: 'MIT' } as const
```

`app/data/competitors.ts` holds the static competitors' list below; `app/features.ts` holds `{ search: boolean, assistant: false }`. Validation: the landing collection schema fails the build on a missing field; a `landing.yml` section id that the page does not render, or a rendered id missing from the file, fails the build naming the id.

## Contracts

### Routes and files
| Route or file | Shape | Serves |
|---------------|-------|--------|
| `/` | the landing, prerendered | REQ-1 to REQ-5 |
| `/api/library-size.json` | `{ "version": "1.0.0-beta.1", "css": 3221, "js": 493, "method": "gzip -9 -n", "measuredAt": "<build date>" }`, prerendered | REQ-2, NFR-2 |
| `/og.jpg` | 1200 × 630 JPG (quality 85, 198 KB) from the user's thumbnail `docs/design/results/og-image/final/og-1200x630.jpg`, in `public/` | REQ-10 |
| head of every page | `<title>`, `meta description`, `og:title`, `og:description`, `og:image` (absolute, from the site URL), `og:url`, `twitter:card=summary_large_image` | REQ-10 |
| `<html>` | `data-pui-mode` when a choice exists (cookie `pui-mode`), `style="--pui-theme: …"` when a colour was picked this session; never a `dark` class | REQ-8, REQ-9 |

### Component interfaces
| Component | Props | Events | Serves |
|-----------|-------|--------|--------|
| `CopyCommand` | `text`, `label?` | none | REQ-3, EDGE-9 |
| `SizeChart` | `perfectui` (`{ version, css, js, method, measuredAt }`), `others` (`[{ name, version, css, js }]`) | none | REQ-2 |
| `ModeToggle` | none | none | REQ-8 |
| `ThemePicker` | `presets` | none | REQ-9 |
| `ExampleRef` | `page` (docs path), `name` (example name) | none | REQ-5 |

Competitors' list (`app/data/competitors.ts`, static, from messaging PROOF-2 and the research brief, `gzip -9` over stdin, which stores no file name): Pico 2.1.1 11,640; Beer CSS 5.0.3 17,035 + 5,864; Bootstrap 5.3.8 30,869 + 23,743; UIkit 3.25.24 30,944 + 53,317; Bulma 1.0.4 64,842; measured 2026-09-23.

## Flows

### Build
1. `nuxt generate` prerenders `/`, which fetches `/api/library-size.json` during prerender; the generator reads the installed files, runs `gzip -9 -n`, and throws when a file is missing (EDGE-7), stopping the build through `failOnError`.
2. The same build validates the versions configuration: no version with `latest: true` throws naming `app/versions.ts` (EDGE-8).
3. The landing queries the docs collection for the named example blocks of the showcase (ADR-0008); a missing name fails the build naming the page and the example.

### First paint and mode
1. The head script runs before the stylesheet: cookie `pui-mode=light|dark` sets `data-pui-mode`; no cookie leaves it absent so the page follows the system (EDGE-4); a session colour sets `--pui-theme`.
2. After hydration, `ModeToggle` reads `getMode()` and shows the matching icon (EDGE-5); a click calls `setMode`, which writes the attribute and the cookie.
3. `ThemePicker` sets `--pui-theme` on `<html>` and in session storage; every component and example block follows without reload (REQ-9); a low-contrast choice is applied without error and does not change the site's own text colours (EDGE-6).

### Motion
1. Server: every demo in its final state (typed classes complete, bars full, items struck).
2. Client with motion allowed: each demo resets to its start state when it enters the viewport and runs with the handoff's timings; timers and observers are created only in `onMounted`, never at setup.
3. Reduced motion or no JavaScript: nothing resets; final states stay (EDGE-1, EDGE-3).

### Failure paths
| EDGE | Caught by | What happens |
|------|-----------|--------------|
| EDGE-1 | server-rendered final states, `CopyCommand` and controls render inert without hydration | text, links and command visible |
| EDGE-2 | layout rules (`min-width: 0`, code boxes scroll) | no horizontal scroll at 320 px |
| EDGE-3 | `useMotion` | no animation |
| EDGE-4 | head script | follows the system, no flash |
| EDGE-5 | head script and `ModeToggle` | stored mode on first paint; toggle shows it |
| EDGE-6 | `ThemePicker` | colour applied, no error |
| EDGE-7 | library size generator | build fails naming the file |
| EDGE-8 | versions validation | build fails naming `app/versions.ts` |
| EDGE-9 | `CopyCommand` | command selected for manual copy, no dialog |

## Verification plan

| AC | Check | Type | Command or location |
|----|-------|------|---------------------|
| AC-1 | open the static `index.html` at 360×640 and 1280×800; headline, supporting line, install command and "Get started" are inside the viewport | e2e | `tests/e2e/landing-viewport.spec.ts` |
| AC-2 | run `gzip -9 -n` on the installed files in the test and compare with the numbers in the HTML and in `api/library-size.json`; version and "gzip" in the same block | build assertion | `tests/build/library-size.spec.ts` |
| AC-3 | click and keyboard on the copy control; clipboard holds the command; "Copied" for at least 1 s; changing the package name in `site.config.ts` changes the command (unit) | e2e + unit | `tests/e2e/copy.spec.ts`, `tests/unit/site-config.spec.ts` |
| AC-4 | scroll through the showcase; the migration link has been visible; following it opens the guide | e2e | `tests/e2e/landing-migration.spec.ts` |
| AC-5 | at least 4 live `pui-` components in the showcase; each comes from a named example that exists in the docs content; no example HTML string under `app/` | e2e + repository check | `tests/e2e/showcase.spec.ts`, `tests/repo/no-inline-examples.spec.ts` |
| AC-6 | the generated landing and shell contain no "assistant", "ChatGPT", "soon", and a search entry point only when `features.search` is on | build assertion | `tests/build/no-unshipped.spec.ts` |
| AC-7 | header and footer of the landing and of one docs page carry the docs link, the latest version label from the versions configuration, GitHub, mode toggle, theme picker, license and repository | e2e | `tests/e2e/shell.spec.ts` |
| AC-8 | `<html>` carries `data-pui-mode` and never a `dark` class; `setMode` is called with the choice; with no cookie the attribute is absent and the page follows `prefers-color-scheme` | e2e | `tests/e2e/mode.spec.ts` |
| AC-9 | pick a colour; `--pui-theme` on `<html>` equals it; showcase and an example block change without reload; reload keeps it for the session | e2e | `tests/e2e/theme.spec.ts` |
| AC-10 | `<head>` of `index.html` and of one docs page has the seven tags; the docs page's title and description are its frontmatter | build assertion | `tests/build/meta.spec.ts` |
| AC-11 | Lighthouse mobile on `index.html`: performance ≥ 90, accessibility ≥ 95; axe: 0 WCAG 2.2 AA violations | build test | `tests/quality/lighthouse.spec.ts`, `tests/quality/axe.spec.ts` |
| AC-12 | JavaScript disabled: all text, links and the command visible, calls to action navigate, controls absent or inert without errors | e2e | `tests/e2e/no-js.spec.ts` |

## Traceability

| Id | Where in this design |
|----|----------------------|
| REQ-1, REQ-4 | landing page, hero, further sections, AC-1, AC-4 |
| REQ-2, NFR-2 | library size generator, size chart, ADR-0007, AC-2 |
| REQ-3 | copy command, site configuration, AC-3 |
| REQ-5 | showcase, `ExampleRef`, ADR-0008, AC-5 |
| REQ-6 | features configuration, site header, AC-6 |
| REQ-7 | default layout, header, footer, AC-7 |
| REQ-8, REQ-9 | head script, mode toggle, theme picker, AC-8, AC-9 |
| REQ-10 | SEO composable, `/og.jpg`, AC-10 |
| NFR-1, NFR-3 | motion composable, fonts, inline icons, AC-11, AC-12 |
| EDGE-1 to EDGE-9 | failure paths |
| AC-1 to AC-12 | verification plan |

## Assumptions to verify before implementation

- Named example blocks can be selected from a queried page body and rendered alone (`ExampleRef`, ADR-0008); fallback in the ADR.
- `gzip` is on the build image's path (Netlify's Linux image ships GNU gzip); GNU gzip and the macOS gzip used for the competitors may differ by a few bytes on the same file, so the perfectui number is exact for the build environment and the test runs in the same environment.
- An inline script added with `useHead` is emitted before the stylesheet links in the prerendered `<head>`; confirm on the first build and order it with `tagPriority: 'critical'` if needed.

## Open questions

- Q1 (resolved 2026-09-24): the mode toggle cycles light → dark → system, with sun, moon and monitor icons, and its label names the next mode (user).
- Q2 (resolved 2026-09-24): messaging PROOF-1 corrected to the competitors' method: 3,221 B and 493 B for 1.0.0-beta.1 (user).
