# ADR-0005: Unversioned documentation paths redirect through generated Netlify rules

- Status: proposed
- Date: 2026-09-24
- Serves: REQ-1, REQ-5, NFR-2

## Context

Every documentation page lives under `/docs/<major>/...` and `/docs` plus any unversioned `/docs/...` path must redirect to the same path under the current major (REQ-1, user decision 2026-09-23). The site is fully static on Netlify (NFR-2). Netlify reads a `_redirects` file at the publish root; "By default, you can't shadow a URL that actually exists within the site", which applies to splat rules, and a trailing `!` forces the rule over existing files (docs.netlify.com/manage/routing/redirects/rewrites-proxies, accessed 2026-09-24). Nitro documents `routeRules` or a `_redirects` file in `public/` for Netlify, without saying whether the static preset writes route rules into `_redirects` (nitro.build/deploy/providers/netlify, accessed 2026-09-24). The current major must come from the versions configuration only (REQ-5).

## Options

### Option A: a server route `/_redirects`, prerendered, that writes the rules from the versions configuration
- Consequences: two non-forced rules (`/docs /docs/v<latest> 301`, `/docs/* /docs/v<latest>/:splat 301`) generated at build; versioned files shadow the splat, so there is no loop; changing the latest version changes the file with no edit elsewhere; relies on Nitro writing a `text/plain` prerendered route to a file named `_redirects` (to verify; fallback: the same content written by a `nitro` `prerender:done` hook).

### Option B: a hand-written `public/_redirects`
- Consequences: simplest; but the latest version id is written in a second file, breaking REQ-5 and AC-5, and a new major needs a manual edit that nothing checks.

### Option C: `routeRules` redirects in `nuxt.config.ts`
- Consequences: framework-native; but whether the static preset turns them into Netlify rules with splats is not documented, and a prerendered HTML redirect per known path cannot catch paths that never existed.

## Decision

Option A.

## Consequences

- `nitro.prerender.routes` lists `/_redirects`; the build test AC-1 asserts the file's exact two lines for the configured latest version.
- A mistyped versioned path such as `/docs/v1/missing` gets the site's 404, not a redirect loop.
- If the site ever leaves Netlify, only this generator changes.
