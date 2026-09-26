# Design brief: LinkedIn launch image for Perfect UI 1.0

- Owner: design-brief
- Status: draft
- Date: 2026-09-26
- Type: image
- For: the image of the LinkedIn launch post on Tuesday 2026-09-29 (`docs/marketing/launch-plan.md` step 3; post text `docs/marketing/posts/linkedin-1.0.0.txt`)
- Tool: Claude Design (user, 2026-09-26: "eu rodo ela no Claude Design")
- Values: inline
- Direction: open: three directions
- Lint: ok (2026-09-26)

## Summary

Design the single image of the post that announces Perfect UI 1.0 on LinkedIn: a portrait card that stops a developer scrolling a feed and says, before any text is read, that a component library now ships at 3.2 kB. The post itself is bilingual (Portuguese and English); the image carries no sentence in either language beyond product words and numbers, so it serves both. Three directions in round 1.

## Sources

- `docs/marketing/messaging.md`: headline "The bare minimum for elegant interfaces", PROOF-1 (the library's size), PROOF-2 (sizes of Pico, Beer CSS, Bootstrap, UIkit and Bulma measured the same way, 2026-09-23), PROOF-4 (three classes), voice and words
- `perfectui` `release-notes/v1.0.0.md` and the measurement of 1.0.0 on 2026-09-26 with `gzip -9 -n`: `dist/perfectui.css` 3,256 B, `dist/js/index.js` 493 B
- `docs/marketing/posts/linkedin-1.0.0.txt`: the approved post text, which the image accompanies
- `docs/design/design-system.md` and `docs/design/briefs/og-image.md` Visual language: colours, type, radius, glows
- The Perfect UI LinkedIn Page the user created on 2026-09-26: dark cover with the headline, the install command and perfectui.dev over a blue glow; the image should read as the same family
- The landing approved in Claude Design (2026-09-24): dot grid, two glows, one element at a scale nothing else reaches

## Subject

Perfect UI is a CSS and JavaScript component library that ships the bare minimum: no runtime dependencies, no CSS reset, no font import, no rule outside a `pui-` class. Version 1.0 is a rewrite: the whole stylesheet is 3,256 bytes gzip and the optional JavaScript loader 493 bytes; the browser provides the behaviour (`<dialog>`, `popover`, `<details>`). Every element is up to three classes, for example `pui-btn pui-solid pui-theme`.

The image appears in a LinkedIn feed, mostly on phones, next to the post text. The reader gives it about a second: they must see "Perfect UI 1.0" and one fact that makes the library different, then decide to read the post or open perfectui.dev.

## Audience and voice

- Front-end developers and the user's professional network, many in Brazil, scrolling a feed on a phone; they have seen many "new UI library" posts and distrust numbers that turn out to be marketing.
- Voice: the site's; declarative, no exclamation marks, what the library does not do is a feature, numbers with their unit.
- Words to use: 1.0, bare minimum, 3.2 kB, no reset, no dependencies, measured.
- Words to avoid: blazing, powerful, seamless, revolutionary, best, modern, tiny (without the number).

## Creative direction

No previous launch image. Launch images fail by becoming a logo and "v1.0 is here" on a gradient (nothing a reader can remember), or by cramming a feature list the post already carries. The Page cover the user made sets the family: dark, a blue glow, the headline in white, the install command in a code chip.

- Direction A, "The number": "3.2 kB" at a scale nothing else reaches, with "Perfect UI 1.0" above and the headline below; the dot grid and the two glows behind; the install command in a code chip at the foot. The launch as a single measurable fact.
- Direction B, "The race": a vertical bar chart of the six libraries measured the same way, Perfect UI's bar a sliver next to UIkit's 84.3 kB, with each library's name and number; "Perfect UI 1.0" and "Measured, not promised." as the only other texts. The difference shown, not claimed.
- Direction C, "Three classes": the class line `pui-btn pui-solid pui-theme` in Fira Code at display scale, and under it the button it renders in a few colours and styles; "Perfect UI 1.0 · 3.2 kB" as the caption. The model of the library in one glance.

Identity hooks every direction keeps: the P mark and the "Perfect UI" wordmark, theme blue, Inter and Fira Code, the dark background with the glows of the Page cover. Allowed: the dot grid, a code chip, rendered Perfect UI buttons. Not allowed: screenshots of the site, photographs, other libraries' logos, emojis, flags, any sentence in Portuguese or English beyond the texts listed in Content.

## Visual language

Colours (the image is dark, like the Page cover; light values are listed for reference only):

| Role | Dark (use) | Light (reference) |
|------|------------|-------------------|
| background | #000000 | #FFFFFF |
| muted background, dots | #111827 | #F3F4F6 |
| code background | #1F2937 | #E5E7EB |
| text | #FFFFFF | #000000 |
| secondary text | #9CA3AF | #6B7280 |
| border | #374151 | #D1D5DB |
| theme blue (brand) | #07B6F0 | #0092CD |
| theme ink (text in blue) | #6BC9F5 | #00628B |
| glow purple | #7340D9 at 12% | same |
| glow blue | #1A8CBF at 10% | same |
| bars of other libraries (direction B) | #374151 | #D1D5DB |

Type: Inter for text, Fira Code for code and numbers in code. Display 160 px to 240 px Semi Bold with tight tracking; title 72 px Semi Bold; supporting line 40 px Regular at 1.3 line height; labels and chart names 32 px Medium. Radius 20 px for framed containers, 6 px for buttons and code chips; borders 1 px; no shadows.

## Content

**Size:** 1080 × 1350 px (4:5 portrait, which takes the most height a single image gets in the LinkedIn feed); safe area 72 px from every edge, where all text stays.

**Format:** PNG, at most 5 MB (LinkedIn accepts images up to that size; smaller is better for upload), sRGB.

**Text, verbatim:**

- "Perfect UI 1.0" (every direction; with the P mark)
- "The bare minimum for elegant interfaces" (messaging headline; directions A and C may use it)
- "3.2 kB" and, where a unit line fits, "of CSS · 493 B of JS · 0 dependencies" (release notes, 2026-09-26)
- "npm i @chrissgon/perfectui" (the install command, as on the Page cover; direction A)
- "Measured, not promised." (direction B)
- Direction B chart, gzip sizes of CSS plus JavaScript measured the same way (`gzip -9 -n`): Perfect UI 1.0 3.7 kB (3,256 + 493 B); Pico 11.6 kB; Beer CSS 22.9 kB; Bootstrap 54.6 kB; UIkit 84.3 kB; Bulma 64.8 kB. Order the bars by size. Footnote in 24 px: "gzip -9 -n of the published builds, 2026-09".
- `pui-btn pui-solid pui-theme` (direction C)
- "perfectui.dev" (every direction, small, at the foot)

Minimum text size 32 px except the chart footnote, so the image reads at 25% on a phone.

## Constraints

- Colours and type only from Visual language; the brand colour is the dark theme blue #07B6F0.
- Text verbatim; numbers exactly as listed, with their units.
- No sentence in Portuguese or English beyond the listed texts: the post carries the language.
- Contrast: text and secondary text on the background pass AA; no text on the glows' strongest point.
- No screenshots, photographs, emojis, flags or other libraries' logos; the other libraries appear only as names in direction B.

## Deliverables

- Round 1: one 1080 × 1350 image per direction.
- Round 2: the chosen direction at 1080 × 1350 as the final PNG, plus a 1200 × 627 landscape variant for the GitHub release and link previews.

## Evaluation criteria

- CRIT-1: Thumbnail test: at 270 × 338 (25%) "Perfect UI 1.0" and the main fact read, and the image is recognisably from the same family as the Page cover.
- CRIT-2: Faithful: colours and type trace to Visual language; the brand colour is theme blue.
- CRIT-3: Text verbatim; every number matches Content, with its unit.
- CRIT-4: Hierarchy: one element dominates; at most four texts besides the chart labels.
- CRIT-5: Language-neutral: no sentence in Portuguese or English beyond the listed texts.
- CRIT-6: Output: 1080 × 1350 PNG, sRGB, text inside the 72 px safe area.

## Attachments

- Send: this brief; the Perfect UI LinkedIn Page cover (the user's export); the P mark and the wordmark as SVG.
- Do not send in round 1: the site's `og.jpg` or any earlier share image, so the tool does not reproduce it.

## Prompt

```text
Design the image of the LinkedIn post that announces Perfect UI 1.0, a CSS and JavaScript
component library that ships at 3.2 kB. Portrait, 1080 x 1350. This is an exploration: the
failure case is a logo and "v1.0 is here" on a gradient, or a feature list nobody reads on
a phone.

Read the attached brief (design-brief-linkedin-launch-1.0.md) for the texts (verbatim), the
numbers, the colours, the type and the rules. Match the family of the attached LinkedIn Page
cover: dark, a blue glow, white headline, code chip.

Direction: <paste one direction from "Creative direction" in the brief>

Non-negotiable: Inter and Fira Code; colours only from the brief; brand colour theme blue
#07B6F0 on #000000; text verbatim and nothing else in Portuguese or English; everything inside
a 72 px safe area; no screenshots, photos, emojis, flags or other logos.

Make it stop a thumb: one element at display scale, minimum text 32 px. Deliver the image
at 1080 x 1350. Before finishing, show it at 25% and list what it does that a plain
"Perfect UI 1.0 is out" card would not.
```

## Open questions

- OPEN-1: Which direction? Blocks: round 2. Recommended: B, "The race", because the difference in size is the one claim a developer can check, and a chart reads at thumbnail size.

## Readiness

- Ready for design-execute: yes, for round 1.
