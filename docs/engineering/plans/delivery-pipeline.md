# Plan: delivery-pipeline

- Task: IDEA-1 in `docs/product/ideas.md` (user, 2026-09-25: "criar um processo de pipeline para o perfectui-doc")
- Date: 2026-09-25

## Pipeline

- Owner: ops-ci-pipeline
- Decisions: preview per pull request, no `dev` branch; the pipeline builds, tests and deploys, Netlify's own builds stopped; no Docker; required checks `check`, `deploy`, `lighthouse`; ruleset on `main`: pull request, the three checks, branches up to date, linear history, no approver, no bypass, no deletion or force push (user, 2026-09-25)
- File: `.github/workflows/ci.yml`; jobs: `check` (install with the frozen lockfile, lint, typecheck, `bun run generate` with `NITRO_PRESET=netlify_static` into `dist/`, unit tests, Playwright chromium, fixture site and quality projects on that `dist/`, upload), `deploy` (the same `dist/` with `netlify-cli@27.10.0`: `--alias=pr-<number>` on a pull request, `--prod` on `main`; outputs the URL), `lighthouse` (mobile Lighthouse on the deployed URL, light and dark)
- Tests changed to read what is shipped: `SITE_DIR` (default `.output/public`), `SITE_URL` (skips the local servers), Lighthouse's colour scheme set explicitly, the accepted light-mode contrast trade-off applied as in axe, failures as pull request annotations naming the audits and elements
- Local run in the pipeline's environment (`SITE_DIR=dist CI=1`, the preset on the build only): 77 unit and 183 browser tests passed, 5 skipped
- Runs on pull request #2:
  - 36192637737 red: `NITRO_PRESET` at the workflow level also moved the fixture site's output, its server never started; scoped to the build step (a2e2f04)
  - 36192928305 red: Lighthouse accessibility 94 on the Button page; unreadable without the log, so failures became annotations (9a3a82f) naming the audits (29b8ba9) and elements (3525128)
  - log shared by the user: `color-contrast` on `pui-solid` labels in light mode; Chrome followed macOS's dark appearance locally, so light mode had never been measured; both schemes measured with the accepted trade-off (715eed1)
  - `landmark-one-main` fixed: documentation pages get a `<main>` (05952f9)
  - 36197178142 green; merged by the user as 51b7548; production run 36197878446 green, https://perfectui.dev serves the new build
- Settings applied by the user: Netlify token, `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets, Netlify builds stopped, ruleset on `main` (all done 2026-09-25)
- Follow-ups: the actions pinned at v4 run on Node 20 and GitHub forces them onto Node 24 with a deprecation warning; move to their current majors in a later change
