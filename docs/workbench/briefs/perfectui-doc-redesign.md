# Brief: perfectui-doc redesign

- Owner: core-clarify
- Status: approved
- Date: 2026-09-23

## Goal

A new documentation site for perfectui 1.0 in which documentation is written in Markdown, every published version of the library stays documented behind a version switcher, and an assistant running in the visitor's browser can answer "how do I build X with perfectui"; it must serve both people evaluating the library against alternatives and people migrating from 0.23.

## Scope

- In:
  - An entirely new visual design, built on Nuxt and Tailwind with perfectui's own components for the site's UI.
  - Documentation for 1.0 authored in Markdown with Nuxt Content v3; example blocks (preview and code tabs) as components inside Markdown (MDC).
  - A version switcher; 0.23 archived as the first older version.
  - The assistant as an experiment behind a flag: WebGPU detection, opt-in model download, retrieval over the documentation, search kept for everyone.
  - One content source feeding pages, the search index and the assistant corpus.
- Out (explicit):
  - Replacing search at launch.
  - One deployment per version (the Tailwind model).
  - Assistant support on browsers without WebGPU, or on mobile as a target.
  - Changes to the library itself; the site consumes the published 1.0.
- Phases (approved by the user, 2026-09-23): 1) content model, 1.0 documentation and design; 2) version switcher with the 0.23 archive; 3) assistant experiment.

## Constraints

- Stack: Nuxt for SSR and SEO, Tailwind for utility classes, perfectui for components (user, round 1).
- No hosting cost for the assistant: inference in the visitor's browser (user, round 1).
- Hosting: Netlify (`README.md`); deployment configuration lives outside the repository (codebase map).
- Content as data: pages, search and assistant corpus derive from the same Markdown collections (follows from decisions 4 and 6).

## Decisions

| # | Decision | Chosen | Why | By |
|---|----------|--------|-----|----|
| 1 | Scope of the change | New design, 1.0 implementation, Markdown documentation, version switcher, browser-side assistant | Hand-written Vue pages are what the user wants to stop editing; versions must survive releases; no initial AI cost | user |
| 2 | Audience at launch | Evaluators and migrating users, both | Research brief: size is measurable and carries the message; migration guide serves existing users | user |
| 3 | Stack | Nuxt and Tailwind stay; perfectui for the site's components | perfectui's bare-minimum positioning is against component libraries, not utility layers or frameworks; the workbench's dogfooding recommendation was withdrawn | user |
| 4 | Assistant at launch | Experiment behind a flag; search kept | About one in five browsers lacks WebGPU; first use downloads hundreds of MB to GB; quality must be measured on real use | user |
| 5 | Versioning model | Versions as content folders in one site, one build, one index | Content as data makes it natural; one search index and one assistant corpus with a version filter | user |
| 6 | Markdown pipeline | Nuxt Content v3 with MDC | Components inside Markdown keep interactive examples without hand-written Vue; Shiki highlighting; SSG/SSR; MDC verified on 2026-09-23 | user |
| 7 | Versioning mechanics | One folder per major (`content/v1/`, `content/v0/`); the current major always reflects its latest minor, with `since:` (and `changed:`) frontmatter rendered as badges for additions in minors; navigation derived from each version's folder; switching versions maps the same path when it exists in the target version, otherwise lands on that version's index with a notice; a future v2 is a new folder and v1 is frozen | Answers "what happens to a component added later when the reader switches to an older version": it is simply absent from that version's navigation, and the switch never 404s | user (confirmed 2026-09-23) |
| 8 | Current assistant | Decommission the WebSocket integration and remove the "Now with Chat GPT" badge until the new assistant ships | It was an old implementation on the ChatGPT Assistants API; the landing promises what the navigation marks as "Soon" | user (confirmed 2026-09-23) |

## Facts established without asking

- Tailwind documents each major version as a separate site on a subdomain (`v3.tailwindcss.com` at v3.4.17, `v2.tailwindcss.com` with "You're looking at the documentation for Tailwind CSS v2" and a link to the current docs at the root domain) (source: those sites, accessed 2026-09-23).
- WebGPU is enabled by default in Chrome and Edge 113+, Firefox 141+ (145+ on Apple Silicon), Safari 26; global support about 82% in mid-2026; practical in-browser models are 0.5B to 8B parameters quantized, hundreds of MB to a few GB, cached by the browser; 71 to 80% of native speed (source: WebLLM documentation and secondary guides, accessed 2026-09-23; the 82% figure is a secondary aggregate).
- Nuxt Content v3: "You can use any Vue component in your Markdown files." (MDC); Shiki highlighting; custom frontmatter fields must be declared in `content.config.ts` to be queryable; runs in static generation, SSR, serverless and edge (source: content.nuxt.com, accessed 2026-09-23).
- From `docs/engineering/architecture.md`: 32 hand-written Vue documentation pages; `docs.json` is a 110 KB content index that no file reads; an assistant already exists as a WebSocket client to `SEARCH_ENDPOINT` with its backend outside the repository; the landing advertises "Now with Chat GPT" while the navigation shows "Assistant — Soon" disabled; no tests, CI or deployment configuration; `@chrissgon/perfectui` pinned at `^0.23.0`.

## Open questions

- [x] Decision 7, versioning mechanics: confirmed by the user on 2026-09-23
- [x] Decision 8, decommissioning the current assistant and removing the badge: confirmed; the old implementation used the ChatGPT Assistants API
- [x] Phase order 1 → 2 → 3: confirmed
- None open. Next: `product-feature-spec` for phase 1.

## Contradictions surfaced

- "Replace Algolia if fast enough" versus "runs on the visitor's machine": incompatible for the share of browsers without WebGPU and for first-use download; resolved by decision 4 (search kept, assistant as experiment).
- "Do it like Tailwind" versus the preferred one-site model: Tailwind deploys one site per major; resolved by decision 5 (one site, content folders), with the Tailwind model recorded as the rejected alternative.
- Landing badge "Now with Chat GPT" versus navigation "Assistant — Soon": resolved by decision 8 (both removed until the new assistant ships).
