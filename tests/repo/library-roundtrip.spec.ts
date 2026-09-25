import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { convertDocument, pagePaths, parseSummary } from "../../shared/library-docs";

// T-ld-2 (AC-2, NFR-1): the library's documents, converted, give back the site's pages. Runs while
// both exist (the library checkout next to this repository, LIBRARY overrides it); T-ld-3 removes
// the site's copies and this test with them.
const LIBRARY = process.env.LIBRARY ?? "../perfectui";
const CONTENT = "content/v1";
const pages = existsSync(CONTENT)
  ? readdirSync(CONTENT, { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".md")).sort()
  : [];

// Differences that are intended: the guide's slug follows its summary link, and its 0.23 names
// link to the 0.23 documents on GitHub instead of the `:v0` component.
const expected = (page: string, text: string) =>
  text.replace(/:v0\{name="([^"]+)" to="[^"]*\/([^"/]+)"\}/g, (_, name: string, doc: string) =>
    doc === "float" ? `\`${name}\`` : `[\`${name}\`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/${doc}.md)`,
  );
// Prettier formats the library's Markdown on commit: tables are realigned and emphasis markers
// normalised, which render the same.
const normalise = (text: string) =>
  text
    .split("\n")
    .map((line) => (line.trimStart().startsWith("|") ? line.replace(/ {2,}/g, " ").replace(/-{3,}/g, "---").replace(/ \|/g, "|").replace(/\| /g, "|") : line.trimEnd()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

describe.skipIf(!existsSync(join(LIBRARY, "docs/README.md")) || pages.length === 0)("library round trip (AC-2, NFR-1)", () => {
  const sections = parseSummary(readFileSync(join(LIBRARY, "docs/README.md"), "utf8"));
  const paths = pagePaths(sections, "v1");
  const byFile = new Map([...paths].map(([doc, path]) => [path.file, doc]));
  const rename = (page: string) => page.replace("04.migrating-from-0-23", "04.migrating-from-0-x");

  it("covers the 28 pages", () => {
    expect(pages).toHaveLength(28);
    expect(pages.filter((p) => !byFile.has(rename(p)))).toEqual([]);
  });

  for (const page of pages) {
    it(page, () => {
      const doc = byFile.get(rename(page))!;
      const section = sections.find((s) => s.pages.some((p) => p.file === doc))!;
      const converted = convertDocument(readFileSync(join(LIBRARY, doc), "utf8"), {
        file: doc,
        section,
        page: section.pages.find((p) => p.file === doc)!,
        paths,
        ref: "v1",
      });
      expect(normalise(converted)).toBe(normalise(expected(page, readFileSync(join(CONTENT, page), "utf8"))));
    });
  }
});
