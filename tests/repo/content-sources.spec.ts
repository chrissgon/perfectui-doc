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
      .filter((f) => !f.includes("migrating-from-0-23"));
    const unmapped = pages.filter((p) => !(p in sources));
    // Pages still to be written in T-cm-18 and T-cm-19 are the fixtures they replace.
    expect(unmapped.filter((p) => !/^0[345]\./.test(p))).toEqual([]);
  });
});
