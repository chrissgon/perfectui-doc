# Code review: T-cm-18

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 9464e2f (25 files: 13 pages under `content/v1/03.general/` and `04.components/`, `shared/example-scope.ts`, `Example.vue`, `DocToc.vue`, `app/assets/css/main.css`, `app/assets/css/prose.css`, `tests/unit/example-scope.spec.ts`, `tests/e2e/components-content.spec.ts`, `tests/repo/content-sources.spec.ts`, the state file, backlog)
- Intent: T-cm-18 (`Does:` write `03.general/` (layout group, float) and `04.components/` (11 pages) the same way; name the examples the landing uses (`modal/basic`, `dropdown/basic`, `tooltip/basic`, `accordion/basic`); `Check:` every page builds with every example rendering a `pui-` element; h2 counts equal the sources'; the four named examples exist; the headings column highlights the heading scrolled into view (T-cm-11 review))
- Checks run (2026-09-25): `bun run generate` exit 0; `tests/repo/content-sources.spec.ts` 20 passed; `tests/unit/example-scope.spec.ts` 4 passed; `tests/e2e/components-content.spec.ts` 6 passed, three runs in a row; `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (59 unit, 97 browser); screenshots of the table, modal, accordion, list and dropdown pages

## Summary

The 13 pages are written from the library's documents, with the four named examples the landing will show. Rendering real component documentation found four defects the fixtures could not show, all fixed here:
1. **Fragments rendered live.** Many library snippets are fragments: a lone `<tr>` or `<td>`, `<!-- ... -->` elisions, overlays with no trigger outside them. As live previews they rendered nothing or broke, so they now stay code: 47 live examples, 13 code-only.
2. **Shared ids between examples.** The library reuses ids and group names across a page's examples: `id="menu"` four times on the dropdown page. Each live preview now gets its own suffix on ids, on the attributes pointing at them, and on `name`s (`shared/example-scope.ts`). The code tab and the copy keep the author's HTML.
3. **Examples inherited the site's styles.** Preflight and the unlayered prose rules reached inside previews and changed the library's rendering; the list gained or lost markers depending on the rule. Inside a preview, the `base` layer now rolls back to the browser's (`all: revert-layer`), and prose rules stop at example blocks.
4. **Modal not centred.** A modal opened in the top-left corner: Preflight's `margin: 0` removes the browser centring the library relies on. The site restores it (`@layer components`); the library gap is recorded in the state file for a later library change.

Verdict: approve with changes (one medium finding, one low).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium | scope and contracts | `app/assets/css/main.css:24` | `.pui-modal { margin: auto; }` | Any site using the library with Tailwind v4 gets an uncentred modal; the library's Tailwind guide says the layer order is enough. The site hides the problem from its own readers. | Library change recorded in `docs/workbench/state.md` (set `margin: auto` on `pui-modal`, mention it in the guide); needs the user's go-ahead for the library. |
| 2 | low | scope and contracts | `content/v1/04.components/06.dropdown.md` | `::example{name="basic"}` | 3 of the dropdown's 5 snippets (placement and alignment variants, a panel with a close button) are code-only because they have no trigger outside the overlay; readers do not see those variants live. | Adding triggers would change the library's snippets; if wanted, write site examples with triggers ("checked explanatory sentences" allow it) in a later content pass. |

## Checked with no finding

- scope and contracts: file prefixes follow the library README's order; the four named examples are the first example of their page (`[data-example][name="basic"]` asserted); the landing's "See the components" link target still exists.
- quality and maintainability: the scoping is one pure function with unit tests; `DocToc` marks the current link with `aria-current="location"`, which also serves assistive technology.
- edge cases: server and client produce the same preview ids (checked on the tooltip page), so hydration keeps the markup; no page repeats an id; no page scrolls sideways at 360 px.
- regression and performance: the fixture site's content-model tests are unchanged and pass; the production pages the shell and theme tests use (button) still carry a solid theme example.
- security and data: previews render only the page author's Markdown; scripts are never live.
- tests: pui- rendering per example on all 13 pages, named examples, unique ids, the heading highlight by scroll position, modal centring, and a plain-page rendering inside examples.

## Verdict

approve with changes
Next: commit T-cm-18; then T-cm-19 (forms pages)
