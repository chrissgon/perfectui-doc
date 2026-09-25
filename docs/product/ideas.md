# Ideas to develop later

- Owner: none (ordinary work); each idea becomes a spec, a design or a plan when the user picks it up
- Updated: 2026-09-25

## IDEA-1: A delivery pipeline for perfectui-doc

Raised by the user on 2026-09-25, quoted:

1. "Criação de um processo de pipeline utilizando docker. Manter duas principais branches, main e dev."
2. "Criar um processo para poder realizar o deploy em dev e testar na url de dev no netlify."
3. "Com tudo aprovado, subir para a main, porém a main deve estar protegida. Para subir algo nela deve passar por um processo de PR, onde cada PR deve validar testes e etc."
4. "Me ajude a pensar melhor nesse processo, mas o ponto é criar um processo de pipeline para o perfectui-doc."

### How things work today (2026-09-25)

- Netlify builds every push itself with `bun run generate`; `main` is production (https://perfectui.dev), and any other branch gets a branch deploy (`<branch>--perfectui.netlify.app`).
- The tests (`bun run test`: unit, browser, fixture site, axe and Lighthouse) run only on the maintainer's machine. Nothing stops a red commit from reaching production.
- Two production incidents came from the host, not the code: the trailing-slash redirect (fixed in 1e1ba8c) and the 0.23 dependency cache (fixed by clearing the cache). A pipeline that tests what the host serves catches both kinds.

### Questions to settle first, with a recommendation each

- Q1. A long-lived `dev` branch, or a pull request per change with its own Netlify deploy preview? Netlify already gives every pull request a URL, so each change can be tested alone before it merges. A shared `dev` branch adds a second merge and makes changes wait for one another. Recommended: start with previews per pull request and add `dev` only if several changes must be tested together before a release.
- Q2. What is Docker for? The site is static, and Netlify builds without Docker. Docker is useful for one thing here: the same image (Playwright's, with its browsers) running the tests locally and in CI, so a test that passes on the laptop passes in CI. Recommended: Docker for the test environment, not for hosting.
- Q3. Who builds what production serves? Today Netlify rebuilds on its own, so the tested build and the deployed build are two builds. Recommended: GitHub Actions builds once, runs the tests on that output, and deploys that same `dist/` with the Netlify CLI (preview on a pull request, production on `main`). Netlify's own builds are then switched off.
- Q4. Which checks block a merge into `main`? Recommended: lint, typecheck, unit tests, the browser suite and the fixture site on every pull request. Lighthouse on the preview URL, not on the CI runner, because the local measurement sits near its floor while the host scores 98 to 100.
- Q5. Protection rules on `main`: a pull request required, the checks above required, no direct push, and at least one approval? With one maintainer, a required approval blocks every merge, so the rule is "checks green", not "someone approved". Recommended: require the checks and linear history; no required approver.
- Q6. The library's pinned ref (`libraryRef` in `app/versions.ts`): should the pipeline raise a pull request when the library publishes a release, so the site moves to the new tag? Recommended: yes, as a later step (Renovate, or a small workflow in the library that opens the pull request here).

### Decided (user, 2026-09-25)

Q1 previews per pull request, no `dev` branch; Q2 no Docker at all (the user removed it: the runner image and a pinned Playwright give the same browsers); Q3 GitHub Actions builds once, tests that build and deploys the same `dist/` with the Netlify CLI, Netlify's builds stopped; Q4 the checks as recommended, Lighthouse on the deployed preview; Q5 a ruleset on `main` (pull request, the `check`, `deploy` and `lighthouse` checks, linear history, no approver, no bypass); Q6 yes, later. The user created the Netlify token and the repository secrets, stopped Netlify's builds and applied the ruleset. Implemented on branch `ci-pipeline` (`.github/workflows/ci.yml`).

### Where this goes in the workbench

It is the real task for the `ops-ci-pipeline` and `ops-pull-request` skills (inventory waves 4 and 1), which are built only alongside a real project.

## IDEA-2: A release pipeline for the library (perfectui)

Recorded in the library's repository, `docs/workbench/ideas.md` on branch `v1`: there the critical moment is publishing a version, not merging into `main`.
