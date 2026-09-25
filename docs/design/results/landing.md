# Design results: landing

- Owner: design-execute
- Status: approved
- Date: 2026-09-24
- Brief: docs/design/briefs/landing.md
- Tool: Figma Make (first run), then Claude Design with the perfectui design system
- Mode: assisted, because neither tool offers a generation interface to agents; the user ran the prompts and shared screenshots

## Runs

| Run | Round | Direction | Status | Outputs |
|-----|-------|-----------|--------|---------|
| R1 | 1 | none (Figma Make with the composed frame attached) | done | docs/design/results/landing/round-1/figma-make/hero-1280.png |
| R2 | 1 | B, "Editor and canvas", with C's display number under the hero (Claude Design) | approved | docs/design/results/landing/round-1/claude-design/hero-1280.webp |

These runs happened before design-execute existed and were recorded afterwards from the screenshots the user shared. The Claude Design project also produced the design-system verification page kept in `landing/reference/`.

## Critique

| Criterion | R1 | R2 |
|-----------|----|----|
| CRIT-1 | fail: the perfectui stylesheet was not linked, so "Get started" and "Save" render as unstyled text | partial: tokens, radius and type match the design system, but the accent is red instead of the theme blue |
| CRIT-2 | fail: no mark, no theme blue, no glows; a generic dark template | pass: P mark and wordmark, grid, glows, and the three classes as shape, style and colour chips |
| CRIT-3 | partial: the headline is large, but nothing else on the screen carries scale | pass: the headline at display size and "3.2 kB." at a scale nothing else reaches |
| CRIT-4 | fail: the demo is a static label next to a class line; no real component renders | pass: a live pui-btn preview cycling through class combinations with its markup |
| CRIT-5 | fail: nothing indicates motion; the bars are static pills | partial: the preview cycles (3 / 3) but the scroll motion cannot be judged from a still |
| CRIT-6 | pass: headline, supporting line and body verbatim | partial: the supporting line is split into a heading and the display number, changing its reading |
| CRIT-7 | fail: no narrow version delivered | partial: the 360 px version is pending |
| CRIT-8 | partial: grey navigation text on a dark canvas is close to the contrast limit | partial: muted text sits on the page background as required; focus and targets not yet checked |
| CRIT-9 | pass: no used-by, sponsors or assistant | pass: header holds exactly docs, search, version, mode, theme, GitHub and Figma |
| CRIT-10 | pass: React and utility classes, no heavy assets | partial: grid and glows look like CSS; to confirm in the exported code |

Findings outside the criteria:

- R1 reproduced the attached frame instead of exploring (the tool switched to design-to-code); the lesson is in the design-execute tool notes.
- R2: confirm whether the red accent came from the theme picker; the default must be the theme blue.

## Decision

- Recommendation: R2, keeping the theme blue as default and restoring the supporting line as one sentence; complete it at 360 px and in dark mode.
- Decision: R2 approved by the user on 2026-09-24 ("criou uma landing page incrível").

## Next

- Round 2 in the same Claude Design project: 360 px, dark mode, the remaining sections, the two fixes above; then design-handoff.
