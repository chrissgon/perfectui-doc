# Design results: og-image

- Owner: design-execute
- Status: approved
- Date: 2026-09-24
- Brief: docs/design/briefs/og-image.md
- Tool: code prototype (HTML with the perfectui 1.0.0-beta.0 stylesheet, rendered in headless Chromium)
- Mode: automatic, because the cards become the build-time HTML template (brief Constraints) and a browser is available locally

## Runs

| Run | Round | Direction | Status | Outputs |
|-----|-------|-----------|--------|---------|
| R1 | 1 | A, "Class line" | done | docs/design/results/og-image/round-1/a-class-line/landing-card.png, docs/design/results/og-image/round-1/a-class-line/docs-card-button.png |
| R2 | 1 | B, "Number" | done | docs/design/results/og-image/round-1/b-number/landing-card.png, docs/design/results/og-image/round-1/b-number/docs-card-button.png |
| R3 | 1 | C, "Framed page" | done | docs/design/results/og-image/round-1/c-framed-page/landing-card.png, docs/design/results/og-image/round-1/c-framed-page/docs-card-button.png |

Each run folder also holds its prompt pack and the HTML of every card; `round-1/thumbnails.png` shows the six cards at 25% for CRIT-1.

| R4 | 1 | the user's own thumbnail (dark canvas, headline, class line and an isometric composition of perfectui components) | approved | docs/design/results/og-image/final/perfectui-thumbnail.webp |

## Critique

| Criterion | R1 | R2 | R3 | R4 |
|-----------|----|----|----|----|
| CRIT-1 | partial: at 25% the headline and the class line read, but no element pulls the eye and the docs description is small | pass: "3.2 kB" and "Button" read instantly at 25%; the card is recognisably the landing's hero | partial: the headline reads, but the outer frame costs a tenth of the area and the description is small | pass: the headline and the class line read at 25%, and the component composition is unmistakably a UI library |
| CRIT-2 | pass: white, dots in the border grey, glows, theme blue #0092CD on the real pui-btn, ink #00628B for the class token | pass: grid in the muted grey, glows, "kB" in theme blue, text and secondary text only | partial: the tag uses the success ink on the green tag tint, which the design system has but the brief's Visual language does not list | pass: black canvas, theme blue, Inter and Fira Code, the library's own components in the composition |
| CRIT-3 | partial: texts verbatim; the longest title and description are clamped in the template but not rendered until round 2 | partial: texts verbatim; longest values not rendered until round 2, and the 150 px title needs a check with the 51-character License title | partial: texts verbatim; longest values not rendered until round 2 | partial: headline and supporting line verbatim; one image for every page, so no page title or description |
| CRIT-4 | partial: the 44 px headline and the 46 px class line compete, and the middle of the landing card is empty | pass: one element dominates each card, three texts plus the wordmark | partial: the docs card has a clear title; the landing card's headline and supporting line leave a large empty middle | pass: the headline dominates the left half, the composition supports it |
| CRIT-5 | pass: both cards share dots, glows and the blue button motif | pass: both cards use the grid and display type, and echo the approved landing's "3.2 kB." hero | partial: consistent with each other, but closer to the kit's documentation frames than to the approved landing | pass: it continues the landing's dark hero and three-class code line |
| CRIT-6 | pass: 1200 × 630 PNG, 86 KB and 91 KB, text inside the 64 px safe area | pass: 1200 × 630 PNG, 90 KB and 94 KB, text inside the safe area | pass: 1200 × 630 PNG, 87 KB and 89 KB, text inside the safe area | fail: 2000 × 1422 WebP (219 KB); a 1200 × 630 PNG or JPG is needed, and a 1.91:1 crop would cut the wordmark |

Findings outside the criteria:

- The prototypes load Inter and Fira Code from a font CDN; the build template must use the site's self-hosted fonts (design-system Type), or the renderer must wait for them.
- The wordmark SVG is black only; a dark variant of any card would need a white wordmark.

## Decision

- Recommendation: direction B, "Number", for round 2: it is the only one that passes the thumbnail test and it continues the approved landing's hero. Round 2 renders the landing card and the documentation template for Button, Tailwind CSS (longest description) and License (longest title, where the 150 px title may need to step down to 96 px on two lines).
- Decision: the user's own thumbnail replaces the three directions, for the landing and, until a documentation template is decided, for every page (user, 2026-09-24). It is 2000 × 1422 WebP; share cards crop to 1.91:1, which would cut the wordmark at the top, and some crawlers do not read WebP, so a 1200 × 630 PNG or JPG version is requested from the user.

## Next

- The site uses the 1200 × 630 version as `og:image` on every page once the user provides it (landing spec REQ-10).
