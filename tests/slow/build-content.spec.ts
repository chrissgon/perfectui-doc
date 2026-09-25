import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { generate, projectCopy, removeCopies } from "../helpers/project-copy";

// Full builds of a project copy (slow): run with `bun run test:slow`.
test.describe.configure({ mode: "serial", timeout: 300_000 });
test.afterAll(removeCopies);

const page = (title: string) => `---\ntitle: ${title}\ndescription: ${title} fixture.\n---\n\n## Basic\n\n::example\n\`\`\`html\n<span class="pui-badge pui-soft pui-theme">x</span>\n\`\`\`\n::\n`;

test("a page added as one Markdown file appears in routes, navigation and search (NFR-1, AC-9)", () => {
  const root = projectCopy({ "content/v1/03.general/02.float.md": page("Float") });
  const run = generate(root);
  expect(run.status, run.output.slice(-2000)).toBe(0);
  const out = join(root, ".output/public");
  expect(existsSync(join(out, "docs/v1/general/float/index.html"))).toBe(true);
  expect(readFileSync(join(out, "docs/v1/components/button/index.html"), "utf8")).toContain('href="/docs/v1/general/float"');
  const search = JSON.parse(readFileSync(join(out, "api/search-index.json"), "utf8")) as { url: string }[];
  expect(search.map((e) => e.url)).toContain("/docs/v1/general/float");
});

test("invalid content fails the build naming each file and cause (AC-10)", () => {
  const root = projectCopy({
    "content/v1/04.components/90.no-title.md": "---\ndescription: No title.\n---\n\nText.\n",
    "content/v1/04.components/91.unknown.md": "---\ntitle: U\ndescription: U.\n---\n\n::tabs\nx\n::\n",
    "content/v1/04.components/92.button.md": page("Button again"),
  });
  const run = generate(root);
  expect(run.status).not.toBe(0);
  expect(run.output).toContain('v1/04.components/90.no-title.md: missing frontmatter field "title"');
  expect(run.output).toContain('v1/04.components/91.unknown.md: unknown component "tabs"');
  expect(run.output).toContain("v1/04.components/92.button.md: path /docs/v1/components/button is also");
});

test("a version with no page fails the build instead of publishing an empty index (EDGE-8)", () => {
  const root = projectCopy({}, ["content/v0/04.components/03.button.md"]);
  const run = generate(root);
  expect(run.status).not.toBe(0);
  expect(run.output).toContain("search document set is empty for v0");
});
