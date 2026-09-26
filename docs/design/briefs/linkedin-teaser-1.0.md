# Design brief: LinkedIn teaser image for Perfect UI 1.0

- Owner: design-brief
- Status: draft
- Date: 2026-09-26
- Type: image
- For: the image of the LinkedIn teaser post on Monday 2026-09-28 (`docs/marketing/launch-plan.md`; post text `docs/marketing/posts/linkedin-teaser-1.0.0.txt`)
- Tool: Claude Design (user, 2026-09-26)
- Values: inline
- Lint: ok (2026-09-26)
- Direction: chosen: A, "Components only", an edit of the existing thumbnail (user, 2026-09-26)

## Summary

Edit the existing Perfect UI thumbnail (the Figma cover, attached as `perfectui-thumbnail-figma.png`, 2000 × 1422) into the image of Monday's teaser post. Keep the isometric wall of components, the Perfect UI logo and the code example; remove the headline and the supporting line, which are in English while the post is bilingual, and remove the "Pro plan" pricing card, which makes a free library look paid. Recompose to portrait for the feed. One round, one result: this is an edit, not an exploration.

## Sources

- The user's decision, 2026-09-26: "modificar a imagem, mantendo apenas os componentes e removendo o card de Pro Plan para evitar parecer que é algo pago, a logo do perfectui deve ser mantida e o exemplo de código também"
- The existing thumbnail, received from the user on 2026-09-26 and kept at `docs/marketing/posts/images/perfectui-thumbnail-figma.png`
- `docs/marketing/posts/linkedin-teaser-1.0.0.txt`: the approved post text, which carries the message in both languages
- `docs/design/briefs/linkedin-launch-1.0.md` Visual language: the colours and type of the dark launch images
- `docs/marketing/messaging.md`: voice (no exclamation marks, what the library does not do is a feature)

## Subject

Perfect UI is a free, MIT-licensed CSS and JavaScript component library that ships the bare minimum: no runtime dependencies, no CSS reset, no font import; version 1.0 comes out on Tuesday 2026-09-29. The thumbnail shows what it builds: buttons, forms, a message list, badges, a chart, tabs and a calendar heat map, each labelled with the class or attribute that styles it (`.pui-btn.pui-solid`, `--pui-theme`, `data-pui-mode="dark"`, `.pui-input`).

The image appears in a LinkedIn feed on Monday, next to a bilingual post announcing that 1.0 ships the next day. It must look like a real, finished product and carry no sentence in any language.

## Audience and voice

- Front-end developers and the user's professional network, many in Brazil, scrolling a feed on a phone; the post text speaks to them in Portuguese and English, the image speaks through the product itself.
- Voice: the product shown, not described; nothing that reads like a price, a plan or a sale.
- Words to use: none beyond the logo, the code example and the component labels already in the thumbnail.
- Words to avoid: any headline, tagline, price or plan name.

## Creative direction

The previous version is the thumbnail itself: it works as a cover, but for this post it fails in two places the user named: the English headline "The bare minimum for elegant interfaces." and the line "Three classes, no framework, 3.2 kB." speak one language in a bilingual post, and the "Pro plan · $12 / month · Upgrade" card suggests a paid product, which Perfect UI is not.

The edit keeps the attitude of the original: an isometric wall of real components floating over a dark background with a blue glow, class labels on dotted leader lines, light and dark cards side by side.

- Direction A, "Components only" (chosen by the user): the same wall recomposed to portrait, the Perfect UI logo at the top left as in the original, the code example `<button class="pui-btn pui-solid pui-theme">` in its code chip near the bottom left, and where the Pro plan card was, another component from the same family (for example a second button card, the Components list or the Release v1.0 checklist) so the wall has no hole.

Identity hooks to keep: the Perfect UI logo, the dark background and its blue glow, theme blue #07B6F0, Inter and Fira Code, the class labels on leader lines. Allowed: moving, scaling and repeating the existing component cards; extending the wall to fill the portrait frame. Not allowed: any new sentence, a price, a plan, a currency sign, emojis, flags, photographs, other logos.

## Visual language

Colours, as in the original thumbnail and the launch image:

| Role | Dark (use) | Light (reference) |
|------|------------|-------------------|
| background | #000000 | #FFFFFF |
| muted background | #111827 | #F3F4F6 |
| code background | #1F2937 | #E5E7EB |
| text | #FFFFFF | #000000 |
| secondary text | #9CA3AF | #6B7280 |
| border | #374151 | #D1D5DB |
| theme blue (brand) | #07B6F0 | #0092CD |
| glow blue | #1A8CBF at 10% | same |

Type: Inter for text (the logo's neighbourhood and the component text) and Fira Code for code (the code example and the class labels), at the sizes of the original: code example 32 px, class labels 24 px, component titles 28 px to 36 px, component text 20 px to 24 px. Radius 20 px for cards, 6 px for buttons and chips; borders 1 px; safe area 72 px.

## Content

**Size:** 1080 × 1350 px (4:5 portrait); safe area 72 px from every edge for the logo and the code example.

**Format:** PNG, sRGB, at most 5 MB.

**Text, verbatim:**

- The Perfect UI logo (wordmark), top left, as in the original.
- The code example `<button class="pui-btn pui-solid pui-theme">`, in its code chip with the line number 1, as in the original.
- The component labels and class labels already on the cards, unchanged.
- Removed: "The bare minimum for elegant interfaces.", "Three classes, no framework, 3.2 kB.", "$ npm i @chrissgon/perfectui", and the whole "Pro plan" card ("Pro plan", "For growing teams", "$12 / month", "Unlimited projects", "Custom tokens", "Priority support", "Upgrade", "Popular").

## Constraints

- Keep the original's colours, type and component look; no new style.
- No text besides the logo, the code example and the existing component and class labels.
- Nothing that reads as a price, a plan or an upgrade anywhere in the image.
- The logo and the code example stay inside the safe area and readable at 25%.
- No hole where the Pro plan card was: the wall continues.

## Deliverables

- Round 1: the edited image at 1080 × 1350, PNG.

## Evaluation criteria

- CRIT-1: The headline, the supporting line and the install command are gone, and no other sentence was added.
- CRIT-2: No price, plan, currency or "Upgrade" appears anywhere in the image.
- CRIT-3: The Perfect UI logo and the code example `<button class="pui-btn pui-solid pui-theme">` are present, unchanged, and readable at 270 × 338 (25%).
- CRIT-4: The components look like the original's (same colours, radii, type), and the wall has no gap where the Pro plan card was.
- CRIT-5: Output: 1080 × 1350 PNG, sRGB, logo and code example inside the 72 px safe area.

## Attachments

- Send: this brief and the original thumbnail `perfectui-thumbnail-figma.png` (this round is an edit of it, so the tool must see it).
- Do not send: the launch image brief or any launch image, to keep the two posts distinct.

## Prompt

```text
Edit the attached Perfect UI thumbnail (perfectui-thumbnail-figma.png) into a portrait image for
a LinkedIn post, 1080 x 1350. This is an edit, not a new design: keep the isometric wall of
components, the dark background with its blue glow, the class labels on dotted leader lines,
the Perfect UI logo at the top left and the code example <button class="pui-btn pui-solid
pui-theme"> in its code chip.

Remove: the headline "The bare minimum for elegant interfaces.", the line "Three classes, no
framework, 3.2 kB.", the install command "$ npm i @chrissgon/perfectui", and the whole
"Pro plan" pricing card. Perfect UI is a free library: nothing in the image may read as a
price, a plan or an upgrade. Fill the Pro plan card's place with another component from the
same wall (a button card, the Components list or the Release v1.0 checklist) so there is no
gap.

Non-negotiable: no new text of any kind; the original's colours, type and component look;
brand blue #07B6F0 on #000000; logo and code example inside a 72 px safe area and readable
at 25%. Read the attached brief (design-brief-linkedin-teaser-1.0.md) for the details.

Deliver the image at 1080 x 1350. Before finishing, list every text left in the image.
```

## Open questions

- OPEN-1: Should the install command "$ npm i @chrissgon/perfectui" stay? Blocks: nothing. Recommended: no, as the user named only the logo and the code example; it returns on request.

## Readiness

- Ready for design-execute: yes.
