# Launch plan: Perfect UI 1.0.0

- Owner: mkt-launch-plan (written alongside this launch; the skill does not exist yet)
- Status: draft
- Date: 2026-09-26
- Flow: flow-launch (release → site → announcement, user 2026-09-26)

## Goal

Announce 1.0.0 to the people who evaluate a component library without a framework (messaging U-1) and to 0.x users deciding whether to move (U-2), and send them to https://perfectui.dev with the migration guide one click away.

Baseline, to read the launch against (2026-09-26):
- npm downloads, last week (2026-09-18 to 2026-09-24): 231 (`api.npmjs.org/downloads/point/last-week`)
- GitHub `chrissgon/perfectui`: 2 stars, 0 forks
- npm `latest` today: 0.23.0 (1.0 only under `beta`)

## Sequence

| Step | What | Depends on | Owner | Done when |
|------|------|------------|-------|-----------|
| 1 | Release 1.0.0: `v0` branch from `v0.23.0`, `v1` → `main`, tag `v1.0.0`; the workflow publishes to npm as `latest` and creates the GitHub release with `release-notes/v1.0.0.md` | trusted publisher configured on npmjs.com; the `v1` → `main` merge | ops-release; the user merges and configures npm | `npm view @chrissgon/perfectui dist-tags` shows `latest: '1.0.0'`; the release page exists |
| 2 | Site on 1.0.0: `@chrissgon/perfectui` 1.0.0 and `libraryRef` v1.0.0, the modal and indeterminate workarounds removed, the three header menus checked on iOS after scrolling | step 1 | eng skills, a pull request the user merges | production shows 1.0.0 in the version badge, the size chart and the install snippet; the menus stay under their buttons on the user's iPhone |
| 3 | LinkedIn post on the user's profile, with an image, published through `providers/publisher/linkedin.py` after one approval of the exact text, image and time | step 2; the LinkedIn app, Page and OAuth (user) | mkt-social-copy, mkt-publish | the provider returns the post URL; the post shows on the profile |
| 4 | Read the results a week later against the baseline | step 3 | the user and this flow | npm downloads for the week after, stars, the post's impressions and link clicks (LinkedIn analytics) |

The GitHub release is step 1's output and part of the announcement: the LinkedIn post links to the site, and the site's release notes link lives on the release page.

## Channels

| Channel | Audience | Content | Published by |
|---------|----------|---------|--------------|
| LinkedIn (user's profile) | the user's network; developers who follow front-end work | one post: the promise, three proofs, the link, one image | the provider, automatically, after approval |
| GitHub release v1.0.0 | people who watch the repository; npm and GitHub users landing on the release | `release-notes/v1.0.0.md` | the publish workflow on the tag |

Not in this launch (user, 2026-09-26): X (no account), Reddit, Hacker News.

## Message

- Promise (messaging): components with the bare minimum: no reset, no font, no runtime dependencies, behaviour from the browser, 3.2 kB of CSS.
- Proofs to use: PROOF-1 (3,256 B CSS and 493 B JS, `gzip -9 -n`, 1.0.0), PROOF-2 (smaller than Pico, Beer CSS, Bootstrap, UIkit and Bulma, measured the same way), PROOF-5 (behaviour from the browser: `<dialog>`, `popover`, `interestfor`, `<details>`).
- Call to action: https://perfectui.dev; for 0.x users, the migration guide.
- Voice (messaging): say what it does not do, as a feature; concrete nouns; short declarative sentences; no exclamation marks.

## Risks

- `latest` still points at 0.23.0 until step 1: announcing before it would send `npm i` readers to the old API. The sequence prevents it.
- The LinkedIn token lasts 60 days and cannot be refreshed without partner status: the provider checks it before publishing and the user signs in again when it expires.
- A post with a link may reach fewer people than one without; mitigation, if the user wants it: the link in the post and nothing else, measured against the baseline (no claim about the algorithm is made here).

## Open decisions (checkpoint)

- Date and time of the post.
- Language of the post.
- The image: the site's share image or a launch image made for the post.
