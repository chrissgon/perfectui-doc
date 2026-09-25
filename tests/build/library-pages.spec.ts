import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { pageFile } from "../helpers/page-file";

// Spec library-docs-and-versions AC-1: the pages come from the library at build time; the site
// repository keeps none, and every generated page is published.
test("no documentation page is tracked in the site repository", () => {
  expect(execSync("git ls-files content/v1", { encoding: "utf8" }).trim()).toBe("");
});

test("every generated page is published under its versioned URL", () => {
  const pages = readdirSync("content/v1", { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".md"));
  expect(pages).toHaveLength(28);
  for (const page of pages) {
    const route = "/docs/v1/" + page.replace(/\d+\./g, "").replace(/\.md$/, "");
    expect(existsSync(pageFile(".output/public", route)), route).toBe(true);
  }
});
