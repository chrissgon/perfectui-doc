import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateDocs } from "../../shared/validate-docs";
import { versions } from "../../app/versions";

const COMPONENTS = ["example", "note", "warning"];

function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "docs-"));
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), body);
  }
  return root;
}
const page = (front: string, body = "## Styles\n") => `---\n${front}\n---\n\n${body}`;
const ok = page("title: Button\ndescription: A button.");

describe("content validator (EDGE-2, EDGE-3, EDGE-4, EDGE-6, EDGE-9, AC-10)", () => {
  it("accepts valid content", () => {
    const root = tree({ "v1/04.components/03.button.md": ok, "v0/04.components/03.button.md": ok });
    expect(validateDocs(root, versions, COMPONENTS)).toEqual({ errors: [], warnings: [] });
  });

  it("fails on a missing title or description, naming file and field", () => {
    const root = tree({ "v1/04.components/03.button.md": page("description: A button.") });
    expect(validateDocs(root, versions, COMPONENTS).errors).toEqual([
      'v1/04.components/03.button.md: missing frontmatter field "title"',
    ]);
  });

  it("fails on an unregistered MDC component, ignoring fenced code", () => {
    const body = "::tabs\nx\n::\n\n```md\n::also-ignored\n```\n";
    const root = tree({ "v1/04.components/03.button.md": page("title: B\ndescription: B.", body) });
    expect(validateDocs(root, versions, COMPONENTS).errors).toEqual([
      'v1/04.components/03.button.md: unknown component "tabs"',
    ]);
  });

  it("fails when an example holds more than one fenced block", () => {
    const body = "::example\n```html\n<a></a>\n```\n```html\n<b></b>\n```\n::\n";
    const root = tree({ "v1/04.components/03.button.md": page("title: B\ndescription: B.", body) });
    expect(validateDocs(root, versions, COMPONENTS).errors).toEqual([
      "v1/04.components/03.button.md: an ::example must hold exactly one fenced block, found 2",
    ]);
  });

  it("fails on two files with the same slug in one version, naming both", () => {
    const root = tree({ "v1/04.components/03.button.md": ok, "v1/04.components/09.button.md": ok });
    expect(validateDocs(root, versions, COMPONENTS).errors).toEqual([
      "v1/04.components/09.button.md: path /docs/v1/components/button is also v1/04.components/03.button.md",
    ]);
  });

  it("fails when since names a major newer than the folder's", () => {
    const root = tree({ "v1/04.components/05.chip.md": page('title: C\ndescription: C.\nsince: "2.0"') });
    expect(validateDocs(root, versions, COMPONENTS).errors).toEqual([
      'v1/04.components/05.chip.md: since "2.0" is newer than the folder\'s major (v1)',
    ]);
  });

  // A slug repeated across sections is fine since the 0.23 flat URLs are gone (spec
  // library-docs-and-versions REQ-11).
  it("warns on a link to a missing page, and not on a slug repeated across sections", () => {
    const root = tree({
      "v1/04.components/03.button.md": page("title: B\ndescription: B.", "See [chip](/docs/v1/components/chip).\n"),
      "v1/05.forms/03.button.md": ok,
    });
    const result = validateDocs(root, versions, COMPONENTS);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([
      "v1/04.components/03.button.md: link to /docs/v1/components/chip has no page",
    ]);
  });
});

// Migration guide REQ-5, EDGE-3, AC-5: the version range must match the installed library.
describe("version range of a page", () => {
  const guide = (range: string) => ({ "v1/01.getting-started/04.guide.md": page(`title: G\ndescription: G.\n${range}`) });

  it("accepts a `to` equal to the installed library version", () => {
    const root = tree(guide("from: 0.23.0\nto: 1.0.0-beta.1"));
    expect(validateDocs(root, versions, COMPONENTS, { libraryVersion: "1.0.0-beta.1" }).errors).toEqual([]);
  });

  it("fails on a mismatched `to`, naming the file and both versions", () => {
    const root = tree(guide("from: 0.23.0\nto: 1.0.0"));
    expect(validateDocs(root, versions, COMPONENTS, { libraryVersion: "1.0.0-beta.1" }).errors).toEqual([
      'v1/01.getting-started/04.guide.md: "to" is 1.0.0 but the installed @chrissgon/perfectui is 1.0.0-beta.1',
    ]);
  });

  it("fails on a `from` that is not a version", () => {
    const root = tree(guide("from: soon\nto: 1.0.0-beta.1"));
    expect(validateDocs(root, versions, COMPONENTS, { libraryVersion: "1.0.0-beta.1" }).errors).toEqual([
      'v1/01.getting-started/04.guide.md: "from" is not a version: soon',
    ]);
  });
});
