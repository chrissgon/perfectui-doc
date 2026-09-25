# Design brief: Open Graph images

- Owner: design-brief
- Status: draft
- Date: 2026-09-24
- Type: image
- For: the `og:image` of the landing and of every documentation page (landing spec REQ-10)
- Values: inline
- Direction: open: three directions
- Lint: ok (2026-09-24)

## Summary

Design the share image of the perfectui site: one card for the landing and one template that every documentation page fills with its own section, title and description. Both at 1200 × 630, legible as a feed thumbnail, in the landing's visual language; three directions explored in round 1.

## Sources

- `docs/product/specs/landing-and-site-shell.md` REQ-10: every page carries `og:image`, the documentation pages with their own title and description
- `docs/marketing/messaging.md`: headline "The bare minimum for elegant interfaces", supporting line "Three classes, no framework, 3.2 kB", voice and words
- `docs/design/design-system.md`: colour, type, radius and the glow paint styles
- Library documentation of `@chrissgon/perfectui` 1.0.0-beta.0 (`docs/*.md`): page titles and first paragraphs; the longest title is "Learn more about the licensing terms for Perfect UI" (51 characters), the longest description 205 characters (Tailwind CSS page); measured 2026-09-24
- The landing produced in Claude Design and approved by the user (2026-09-24): grid, glows, display type
- Open Graph size recommendation of 1200 × 630 (common to the major social platforms)

## Subject

perfectui is a CSS and JavaScript component library that ships the bare minimum: no runtime dependencies, no CSS reset, no font import, no rule outside a `pui-` class; the whole stylesheet is 3.2 kB gzip. Every element is up to three classes: `pui-btn pui-solid pui-theme`.

The images appear when someone pastes a link to the site in a chat, a social post or an issue. The landing card sells the library in one glance; a documentation card tells the reader which page the link opens, so they click the right one.

## Audience and voice

- Developers scrolling a feed or a chat: they see the card at thumbnail size for under a second and decide whether the link is worth opening.
- Voice: the site's; declarative, no exclamation marks, what the library does not do is a feature.
- Words to use: bare minimum, three classes, measured.
- Words to avoid: blazing, powerful, seamless, best, modern, tiny (without the number).

## Creative direction

No previous version. Share cards fail by becoming a logo on a flat colour (nothing to read) or a screenshot shrunk to illegibility. Take from the landing: one element at a scale nothing else reaches, the dot grid, the two glows, the three-class motif.

- Direction A, "Class line": the card is a line of code at display scale, `pui-btn pui-solid pui-theme`, with the rendered button beside it; the title sits above in small type. Docs cards replace the class line with the page title and keep the button motif in the corner.
- Direction B, "Number": the landing card is "3.2 kB" huge over the dot grid with the headline under it; docs cards put the page title at that scale with the section label above and the description below.
- Direction C, "Framed page": a framed container with a 20 px radius, as the kit's documentation frames, glowing band on top, the title inside as if it were the page header; identical structure for landing and docs cards.

Identity hooks: the P mark and "Perfect UI" wordmark, the theme blue, Inter and Fira Code, the dot grid or the glows. Not allowed: screenshots of the site, photographs, third-party logos, more than three texts per card.

## Visual language

Colours (the cards are rendered in light mode; the dark values are for a dark variant if chosen):

| Role | Light | Dark |
|------|-------|------|
| background | #FFFFFF | #000000 |
| muted background, dots | #F3F4F6 | #111827 |
| code background | #E5E7EB | #1F2937 |
| text | #000000 | #FFFFFF |
| secondary text | #6B7280 | #9CA3AF |
| border | #D1D5DB | #374151 |
| theme blue (brand) | #0092CD | #07B6F0 |
| theme ink (text in blue) | #00628B | #6BC9F5 |
| glow purple | #7340D9 at 12% | same |
| glow blue | #1A8CBF at 10% | same |

Type: Inter for text, Fira Code for code. Display 96 px to 160 px Semi Bold with tight tracking; title 64 px Semi Bold; description 32 px Regular at 1.35 line height; labels 24 px Medium. Radius 20 px for framed containers, 6 px for the button motif; borders 1 px; no shadows.

## Content

**Size:** 1200 × 630 px for both cards; safe area 64 px from every edge, where all text stays.

**Format:** PNG, at most 300 KB each; rendered at build time from an HTML template, so text must be real text, not an image.

**Text:**

- Landing card: "The bare minimum for elegant interfaces" (messaging headline) and "Three classes, no framework, 3.2 kB" (supporting line), plus the wordmark.
- Documentation template, variable fields: section label (longest "Getting Started"), page title (longest 51 characters, "Learn more about the licensing terms for Perfect UI"), description (longest 205 characters); plus the wordmark and "v1". The description stays within three lines and ends with an ellipsis if longer; the title within two lines.
- Minimum text size 32 px, so the card reads at 25%.
- Real pages to render in round 2: Button ("The `pui-btn` class turns a `<button>` or an `<a>` into a button. It brings the shape only: pair it with a style and a color."), Tailwind CSS (the longest description) and License (the longest title).

## Constraints

- Colours and type only from Visual language; the brand colour is the theme blue.
- Text verbatim; the variable fields hold their longest values without overflow.
- Contrast: text and secondary text on the background pass AA; no text on the glows' strongest point.
- No site screenshots, photos or third-party logos; at most three texts plus the wordmark per card.
- Renderable from HTML and CSS at build time (no hand-drawn art that cannot be reproduced per page).

## Deliverables

- Round 1: per direction, the landing card and the Button documentation card at 1200 × 630.
- Round 2: the chosen direction's landing card and the documentation template rendered for Button, Tailwind CSS and License, plus the HTML template.

## Evaluation criteria

- CRIT-1: Thumbnail test: at 300 × 158 the main text is readable and the card is recognisably perfectui.
- CRIT-2: Faithful: colours and type trace to Visual language; the brand colour is theme blue.
- CRIT-3: Text verbatim; the longest title and description fit their lines without overflow.
- CRIT-4: Hierarchy: one element dominates; at most three texts plus the wordmark.
- CRIT-5: Consistency: landing and documentation cards look like one family, and like the landing.
- CRIT-6: Output: 1200 × 630 PNG under 300 KB, text inside the 64 px safe area.

## Attachments

- Send: this brief, a screenshot of the approved landing hero, the P mark and wordmark as SVG.
- Do not send in round 1: nothing else; there is no previous card.

## Prompt

```text
Design the Open Graph share images of the perfectui site: a landing card and a template
for documentation pages, both 1200 x 630. This is an exploration: the failure case is a
logo on a flat colour, or a shrunken screenshot nobody can read.

Read the attached brief (design-brief-og-image.md) for the texts (verbatim), the
colours, the type, the longest values the template must fit and the rules.

Direction: <paste one direction from "Creative direction" in the brief>

Non-negotiable: Inter and Fira Code; colours only from the brief; brand colour theme blue
#0092CD; real text, rendered from HTML and CSS; everything inside a 64 px safe area; at
most three texts plus the wordmark; no screenshots, photos or other logos.

Make it readable at thumbnail size: one element at display scale, minimum text 32 px.
Deliver the landing card and the Button documentation card. Before finishing, show both
at 25% and say what still reads.
```

## Open questions

- OPEN-1: Should documentation cards follow the reader's theme colour? Blocks: nothing. Recommended: no; share images are rendered once at build time with the default theme blue, because the reader's choice lives in their browser.

## Readiness

- Ready for design-execute: yes.
