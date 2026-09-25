# Run pack: og-image, round 1, direction A

Tool: code prototype (automatic). The agent built the cards from this prompt as HTML with the perfectui stylesheet and rendered them with the design-execute screenshot script.

Attachments:

- Send: this brief, a screenshot of the approved landing hero, the P mark and wordmark as SVG.
- Do not send in round 1: nothing else; there is no previous card.

Prompt:

```text
Design the Open Graph share images of the perfectui site: a landing card and a template
for documentation pages, both 1200 x 630. This is an exploration: the failure case is a
logo on a flat colour, or a shrunken screenshot nobody can read.

Read the attached brief (design-brief-og-image.md) for the texts (verbatim), the
colours, the type, the longest values the template must fit and the rules.

Direction: Direction A, "Class line": the card is a line of code at display scale, `pui-btn pui-solid pui-theme`, with the rendered button beside it; the title sits above in small type. Docs cards replace the class line with the page title and keep the button motif in the corner.

Non-negotiable: Inter and Fira Code; colours only from the brief; brand colour theme blue
#0092CD; real text, rendered from HTML and CSS; everything inside a 64 px safe area; at
most three texts plus the wordmark; no screenshots, photos or other logos.

Make it readable at thumbnail size: one element at display scale, minimum text 32 px.
Deliver the landing card and the Button documentation card. Before finishing, show both
at 25% and say what still reads.
```
