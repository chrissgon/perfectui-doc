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

  it("warns on a link to a missing page and on a slug repeated across sections", () => {
    const root = tree({
      "v1/04.components/03.button.md": page("title: B\ndescription: B.", "See [chip](/docs/v1/components/chip).\n"),
      "v1/05.forms/03.button.md": ok,
    });
    const result = validateDocs(root, versions, COMPONENTS);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([
      "v1/04.components/03.button.md: link to /docs/v1/components/chip has no page",
      'v1/05.forms/03.button.md: slug "button" is also used by v1/04.components/03.button.md, so the 0.23 flat URL /docs/button redirects to the first one',
    ]);
  });
});
