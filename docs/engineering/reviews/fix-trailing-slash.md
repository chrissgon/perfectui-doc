# Code review: documentation pages emptied after hydration on Netlify

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree on branch `redesign` after commit 32f4052 (19 files: `nuxt.config.ts`, the documentation page, `usePageMeta`, `useVersionSwitch`, `tests/helpers/page-file.ts`, `tests/helpers/static-server.mjs`, `tests/e2e/trailing-slash.spec.ts` and 11 tests moved to the page-file helper)
- Intent: on the first Netlify branch deploy (https://redesign--perfectui.netlify.app), every documentation page showed its content, then lost all of it after hydration with no console error (0 headings after load on the Button page). Lighthouse on the migration guide measured CLS 0.38 (the footer jumping up), so performance scored 71–82.
- Checks run (2026-09-25): the new `tests/e2e/trailing-slash.spec.ts` failed on two pages before the fix, passed after, and fails again with the fix removed (removed, built, run, restored); `bun run generate` exit 0 (pages written as `<route>.html`); `bun run lint` exit 0; `bun run typecheck` exit 0; `bun run test` exit 0 (79 unit, 160 browser, 3 skipped); `bun run test:slow` 5 passed

## Root cause

1. **The redirect.** Pages were written as `<route>/index.html`, and Netlify redirects `/docs/v1/components/button` to `/docs/v1/components/button/` (301).
2. **The empty page.** On the client, the route's catch-all parameter then ended with an empty segment, so the page looked up `/docs/v1/components/button/`. That key matched neither the prerendered payload nor any page, and the page rendered nothing.
3. **Why tests missed it.** The local test server served both forms without a redirect, and every test used the form without a slash.

## Summary

Two fixes, one for the cause and one for robustness:
- **Cause:** pages are written as `<route>.html` (`nitro.prerender.autoSubfolderIndex: false`), so the host serves `/docs/v1/components/button` without a redirect. That also saves every direct visit a round trip.
- **Robustness:** the page drops empty segments when it builds the content path, and `og:url` and the version switch trim a trailing slash, so a slash URL typed by a reader or produced by a host is the same page.

The tests read prerendered files through one helper (`pageFile`) instead of eleven hand-built `index.html` paths. The test server resolves a slash URL to `<route>.html`. Verdict: approve with changes (one high finding, to close on the host).

## Findings

| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | high | regression and performance | `nuxt.config.ts:46` | `autoSubfolderIndex: false,` | How Netlify serves `/docs/v1` when both `docs/v1.html` and a `docs/v1/` folder (holding `_payload.json` files) exist, and what it does with `/docs/v1/components/button/`, can only be confirmed on the host. | After the next approved push, check on the branch deploy: no 301 on the unslashed URLs, 200 with content on both forms, then re-run Lighthouse for T-mg-5. |

## Checked with no finding

- scope and contracts: routes and redirects are unchanged; `_redirects` still maps the 0.23 URLs (verified on the preview before this change).
- quality and maintainability: one helper knows the file layout; the comment in `nuxt.config.ts` says why.
- edge cases: `/`, a version index and deep pages resolve in both forms locally; `og:url` never ends with a slash except for `/`.
- regression and performance: all suites pass; the prerendered HTML is unchanged apart from its file name.
- security and data: none.
- tests: the new test reproduces the defect and guards both forms.

## Verdict

approve with changes
