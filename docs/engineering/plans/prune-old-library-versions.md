# Plan: prune the library's versions up to 0.20.0

- Status: approved 2026-09-25 (user): unpublish on npm; the `delete` and `vv0.4.7` tags go with the rest; the user deletes the 5 releases in the web UI first, then I delete the 40 tags
- Date: 2026-09-25
- Request, quoted: "O perfectui no npm e github tem muitas tags desnecessárias … Gostaria de deletar a maioria, tudo da versão 0.20.0 para baixo."
- Repository: `chrissgon/perfectui`; package `@chrissgon/perfectui`

## Facts (read on 2026-09-25)

| Where | Total | Up to 0.20.0 (to remove) | Kept |
|-------|-------|--------------------------|------|
| git tags on `origin` | 45 | 40 | `v0.20.1`, `v0.21.1`, `v0.23.0`, `v1.0.0-beta.0`, `v1.0.0-beta.1` |
| GitHub releases | 5 | 5 (`v0.3.1`, `vv0.4.7`, `v0.4.8`, `v0.4.10`, `v0.4.11`) | none |
| npm versions | 62 | 57 (`0.1.0` to `0.20.0`) | `0.20.1`, `0.21.1`, `0.23.0`, `1.0.0-beta.0`, `1.0.0-beta.1` |

- The 40 tags include 24 without the `v` prefix (`0.2.0` to `0.14.4`), `vv0.4.7`, and one named `delete` (on the `v0.3.1` commit).
- npm: `latest` is `0.23.0`, `beta` is `1.0.0-beta.1`, and neither changes. One maintainer (`chrissgon`). deps.dev lists 0 dependents. 213 downloads last week; the versions to remove had about 15 of them (`0.20.0` 2, `0.7.13` 2, `0.12.2` 2, the rest 1 or 0).
- `v0.23.0` must stay: the site's version menu and the migration guide link to its `docs/`.

## What can be automated

| Step | Automatable | Who runs it | Reversible |
|------|-------------|-------------|------------|
| 1. Delete the 5 GitHub releases | only with a GitHub token (no `gh` CLI on this machine); 5 clicks in the web UI otherwise | the user (web UI), or me with `gh` installed and logged in | no |
| 2. Delete the 40 tags on GitHub and locally | yes: one `git push origin --delete …` and one `git tag -d …` | me, after approval of the exact list | yes, while the commits exist (a tag can be pushed again) |
| 3. Remove the 57 npm versions | yes, as a loop of `npm unpublish @chrissgon/perfectui@<version>` (npm has no range form for unpublish) | the user, logged in to npm; I never handle npm credentials | **no**: an unpublished version number can never be published again |

Order: releases first (a release whose tag is deleted is left pointing at nothing), then tags, then npm.

## npm: unpublish or deprecate

- Unpublish removes the versions from npm. npm's policy for versions older than 72 hours requires no dependents in the public registry, under 300 downloads in the last week, and a single owner, and all three hold today. The script unpublishes one version first as a probe and stops if npm refuses. With two-factor authentication on writes, each command asks for a one-time code. The script reads one per version, or the user runs it with a granular access token that allows publishing without a code, created for this task and revoked right after. Anyone with a lockfile pinned to a removed version gets a 404 on a fresh install; jsDelivr may keep serving files it has already cached.
- Deprecate keeps the versions but marks them: one command covers all of them (`npm deprecate "@chrissgon/perfectui@<=0.20.0" "Unsupported. Use 1.x: https://perfectui.netlify.app"`), it is reversible (the same command with an empty message), and installs keep working. The versions still appear in the npm version list.

## Scripts (nothing runs before approval)

Tags (step 2), run by me in `../perfectui`:

```bash
tags=$(git tag | python3 -c 'import sys,re
keep={"v0.20.1","v0.21.1","v0.23.0","v1.0.0-beta.0","v1.0.0-beta.1"}
for t in sys.stdin.read().split():
    if t not in keep: print(t)')
echo "$tags" | wc -l            # expect 40
git push origin --delete $tags
git tag -d $tags
```

npm (step 3), run by the user after `npm login`:

```bash
versions=$(npm view @chrissgon/perfectui versions --json | python3 -c 'import json,sys
def key(v): return tuple(int(x) for x in v.split("-")[0].split("."))
print(" ".join(v for v in json.load(sys.stdin) if "-" not in v and key(v) <= (0,20,0)))')
set -- $versions; echo "$# versions"   # expect 57
npm unpublish "@chrissgon/perfectui@$1" || exit 1   # the probe
shift
for v in "$@"; do npm unpublish "@chrissgon/perfectui@$v" || break; sleep 2; done
npm view @chrissgon/perfectui versions --json   # expect the 5 kept versions
```

## Checks after each step

- Releases: `https://api.github.com/repos/chrissgon/perfectui/releases` returns an empty list.
- Tags: `git ls-remote --tags origin | grep -v '\^{}' | wc -l` returns 5.
- npm: `npm view @chrissgon/perfectui versions` lists exactly the 5 kept versions, and `npm view @chrissgon/perfectui dist-tags` is unchanged.

## Decisions for the user

1. npm: unpublish (permanent) or deprecate (reversible)? Recommended: unpublish, since the user wants them gone and the policy allows it today; deprecate if keeping old installs working matters more.
2. The tag named `delete` and `vv0.4.7` are removed with the rest. Recommended: yes.
3. Releases: the user deletes the 5 in the GitHub web UI, or installs `gh` and logs in so I can do it. Recommended: the web UI, since there are only five.
