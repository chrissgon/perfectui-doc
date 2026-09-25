# Run pack: documentation-page, round 1, direction C

Tool: Claude Design (assisted). Open a new project with the perfectui design system, attach the files listed below, paste the prompt, and bring back screenshots at 1280 px of the page and of the search dialog, plus the share link.

Attachments:

- Send: this brief (as a file), a screenshot of the approved landing's header and hero, screenshots of tailwindcss.com/docs and laravel.com/docs as attitude references.
- Do not send in round 1: any earlier mockup of a documentation page.

Prompt:

```text
Design the documentation page of the perfectui site, using the perfectui design system of
this project and the landing page we approved as the reference for header, footer, type
and identity. This is an exploration of the reading experience, not a copy of any docs
site: the failure case is a generic three-column docs template with small grey examples.

Read the attached brief (design-brief-documentation-page.md): it has the exact copy, the
Button page's examples, the navigation, every region and state, and the rules.

Direction: Direction C, "Quiet index": a typographic page with a strong left rail (sections as large numbered headings), example blocks as inline cards in the text flow, and the on-page headings as a progress line that fills as the reader scrolls.

Non-negotiable: link https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.0/dist/perfectui.css,
every example is real working pui- markup with a Code tab showing that exact markup and a
copy control; brand colour theme blue #0092CD (#07B6F0 dark); Inter and Fira Code; no
shadows; no restyled pui- components; copy verbatim; no AI assistant.

Make it excellent to read: examples are the hero of each section, code is large and never
wraps, the current version, section and heading are always visible, and the page stays
quiet (colour transitions only, nothing animates on scroll).

Deliver the Button page at 1280 px in light mode and, in a second frame, the search dialog
open with results for "outl". Before finishing, list three things this page does that a
standard docs template would not.
```
