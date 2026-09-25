import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// T-cm-17 to T-cm-19: every page is written from one library document and keeps its sections.
// The library checkout sits next to this repository (PERFECTUI_DOCS overrides the path).
const LIBRARY_DOCS = process.env.PERFECTUI_DOCS ?? "../perfectui/docs";

/** Site page (under content/v1) → library document (under docs/). */
export const sources: Record<string, string> = {
  "01.getting-started/01.installation.md": "installation.md",
  "01.getting-started/02.typescript.md": "typescript.md",
  "01.getting-started/03.tailwind-css.md": "tailwindcss.md",
  "01.getting-started/05.license.md": "license.md",
  "02.customization/01.dark-mode.md": "darkmode.md",
  "02.customization/02.theme-color.md": "theme-color.md",
  "03.general/01.layout-group.md": "layout-group.md",
  "03.general/02.float.md": "float.md",
  "04.components/01.accordion.md": "accordion.md",
  "04.components/02.badge.md": "badge.md",
  "04.components/03.button.md": "button.md",
  "04.components/04.card.md": "card.md",
  "04.components/05.chip.md": "chip.md",
  "04.components/06.dropdown.md": "dropdown.md",
  "04.components/07.list.md": "list.md",
  "04.components/08.modal.md": "modal.md",
  "04.components/09.table.md": "table.md",
  "04.components/10.timeline.md": "timeline.md",
  "04.components/11.tooltip.md": "tooltip.md",
  "05.forms/01.field-group.md": "field-group.md",
  "05.forms/02.input.md": "input.md",
  "05.forms/03.input-group.md": "input-group.md",
  "05.forms/04.textarea.md": "textarea.md",
  "05.forms/05.select.md": "select.md",
  "05.forms/06.checkbox.md": "checkbox.md",
  "05.forms/07.radio.md": "radio.md",
  "05.forms/08.switch.md": "switch.md",
};

const count = (text: string, marker: RegExp) => {
  let fenced = false;
  let n = 0;
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    else if (!fenced && marker.test(line)) n++;
  }
  return n;
};

describe.skipIf(!existsSync(LIBRARY_DOCS))(`content written from the library docs (${LIBRARY_DOCS})`, () => {
  for (const [page, source] of Object.entries(sources)) {
    it(`${page} has as many h2 as ${source} has ###`, () => {
      const site = readFileSync(join("content/v1", page), "utf8");
      const lib = readFileSync(join(LIBRARY_DOCS, source), "utf8");
      expect(count(site, /^## /)).toBe(count(lib, /^### /));
    });
  }

  it("every v1 page has a source, except the migration guide", () => {
    const pages = readdirSync("content/v1", { recursive: true, encoding: "utf8" })
      .filter((f) => f.endsWith(".md"))
      // The migration guide's source is MIGRATION.md at the tag (tests/build/migration-headings.spec.ts).
      .filter((f) => !f.includes("migrating-from-0-23"));
    expect(pages.filter((p) => !(p in sources))).toEqual([]);
  });
});
