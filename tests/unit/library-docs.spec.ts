import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { convertDocument, pagePaths, parseSummary, type ConvertContext } from "../../shared/library-docs";

// T-ld-1 (spec library-docs-and-versions REQ-3 to REQ-8, EDGE-2, EDGE-5 to EDGE-7, AC-3, AC-4).
const LIBRARY = "tests/fixtures/library";
const read = (file: string) => readFileSync(join(LIBRARY, file), "utf8");
const REF = "v1.0.0-beta.2";

const sections = parseSummary(read("docs/README.md"));
const paths = pagePaths(sections, "v1");
const context = (file: string): ConvertContext => {
  const section = sections.find((s) => s.pages.some((p) => p.file === file))!;
  return { file, section, page: section.pages.find((p) => p.file === file)!, paths, ref: REF };
};
const convert = (file: string, text = read(file)) => convertDocument(text, context(file));

describe("summary (REQ-3)", () => {
  it("gives sections and pages in order, with slugs from the link text", () => {
    expect(sections.map((s) => [s.title, s.slug])).toEqual([
      ["Getting Started", "getting-started"],
      ["Components", "components"],
    ]);
    expect(sections[0]!.pages.map((p) => [p.title, p.slug, p.file])).toEqual([
      ["Installation", "installation", "docs/installation.md"],
      ["Migrating from 0.x", "migrating-from-0-x", "MIGRATION.md"],
    ]);
    expect(sections[1]!.pages.map((p) => p.file)).toEqual(["docs/button.md", "docs/card.md"]);
  });

  it("maps each document to its numbered file and its URL", () => {
    expect(paths.get("docs/button.md")).toEqual({ file: "02.components/01.button.md", url: "/docs/v1/components/button" });
    expect(paths.get("MIGRATION.md")).toEqual({ file: "01.getting-started/02.migrating-from-0-x.md", url: "/docs/v1/getting-started/migrating-from-0-x" });
  });

  it("fails on two links with the same slug in a section, naming both lines (EDGE-7)", () => {
    const text = "## Summary\n\nForms\n\n- [Input](input.md)\n- [Input](input-2.md)\n";
    expect(() => parseSummary(text)).toThrow('docs/README.md:6: the slug "input" is also used on line 5');
  });
});

describe("document (REQ-4, REQ-8)", () => {
  const button = convert("docs/button.md");

  it("takes the title from the h1, the description from the first paragraph, and drops the label above the title", () => {
    expect(button).toMatch(/^---\ntitle: Button\ndescription: "The `pui-btn` class turns a `<button>` into a button."\ntags: \[component, button\]\nchanged: "1.0"\n---\n/);
    expect(button).not.toContain("#### Components");
    expect(button).not.toMatch(/^# Button/m);
    expect(button).not.toContain("<!-- site:");
  });

  it("moves headings up one level from h3", () => {
    expect(button).toMatch(/^## Styles$/m);
    expect(button).toMatch(/^### In a group$/m);
  });

  it("derives tags from the section, and a site comment overrides them", () => {
    expect(convert("docs/installation.md")).toContain("tags: [guide]\n");
    expect(convert("MIGRATION.md")).toMatch(/tags: \[guide, migration\]\nfrom: 0.23.0\nto: 1.0.0-beta.1\n---/);
  });

  it("keeps the description plain: emphasis is dropped, inline code stays", () => {
    const page = convert("docs/card.md", "# Card\n\nA card is a **surface**, a `pui-card`.\n");
    expect(page).toContain('description: "A card is a surface, a `pui-card`."');
  });

  it("gives no description when code comes first, rather than a paragraph further down", () => {
    const page = convert("docs/button.md", "# Button\n\n```html\n<a></a>\n```\n\nLater prose.\n");
    expect(page).toContain('description: ""');
    expect(page).toContain("Later prose.");
  });

  it("fails on a document with no h1 (EDGE-2)", () => {
    expect(() => convert("docs/card.md", "#### Components\n\nNo title here.\n")).toThrow("docs/card.md: no level-1 heading");
  });
});

describe("blocks (REQ-5, REQ-6)", () => {
  const button = convert("docs/button.md");

  it("turns html live fences into example blocks, named when asked, and leaves other fences as code", () => {
    expect(button).toContain('::example\n```html\n<button class="pui-btn pui-solid pui-theme">Save</button>\n```\n::');
    expect(button).toContain('::example{name="basic"}\n```html\n<button class="pui-btn pui-soft pui-theme">Soft</button>\n```\n::');
    expect(button).toContain('```html\n<!-- a fragment, shown as code only -->');
    expect(button).toContain("```css\n.pui-btn { color: red; }\n```");
    expect(button.match(/::example/g)).toHaveLength(2);
  });

  it("turns GitHub alerts into callouts", () => {
    expect(convert("docs/installation.md")).toContain("::warning\nPerfect UI no longer exposes anything on `window`.\n::");
    expect(button).toContain("::note\nGroup buttons with `pui-group-row`.\nSee [Card](/docs/v1/components/card).\n::");
  });

  it("skips the empty quoted line after the alert marker, which keeps Prettier from joining the two", () => {
    const text = "# Button\n\nA button.\n\n> [!WARNING]\n>\n> `aria-describedby` ties the message.\n";
    expect(convert("docs/button.md", text)).toContain("::warning\n`aria-describedby` ties the message.\n::");
  });

  it("fails on live code that is not html, naming the line (EDGE-5)", () => {
    const text = "# Button\n\nA button.\n\n```css live\n.a {}\n```\n";
    expect(() => convert("docs/button.md", text)).toThrow('docs/button.md:5: "live" needs an html block, found "css"');
  });

  it("fails on two examples with the same name (EDGE-5)", () => {
    const text = "# Button\n\nA button.\n\n```html live name=basic\n<a></a>\n```\n\n```html live name=basic\n<b></b>\n```\n";
    expect(() => convert("docs/button.md", text)).toThrow('docs/button.md:9: the example name "basic" is also used on line 5');
  });

  it("fails on an alert kind the site has no callout for (EDGE-6)", () => {
    const text = "# Button\n\nA button.\n\n> [!CAUTION]\n> Careful.\n";
    expect(() => convert("docs/button.md", text)).toThrow('docs/button.md:5: no callout for the alert kind "CAUTION"');
  });

  it("leaves markers inside a fence alone", () => {
    const text = "# Button\n\nA button.\n\n```md\n### Not a heading\n> [!NOTE]\n```\n";
    expect(convert("docs/button.md", text)).toContain("```md\n### Not a heading\n> [!NOTE]\n```");
  });
});

describe("links (REQ-7, AC-3)", () => {
  const installation = convert("docs/installation.md");

  it("sends a link to another document to its page, keeping the anchor", () => {
    expect(installation).toContain("[Button](/docs/v1/components/button#styles)");
  });

  it("sends any other library link to GitHub at the ref", () => {
    expect(installation).toContain(`[the source](https://github.com/chrissgon/perfectui/blob/${REF}/src/index.ts)`);
  });

  it("keeps a link pinned to a tag, such as the 0.23 documents", () => {
    expect(convert("MIGRATION.md")).toContain("[`btn`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/button.md)");
  });
});
