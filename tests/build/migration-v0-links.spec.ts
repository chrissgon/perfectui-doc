import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { pageFile } from "../helpers/page-file";

// Spec library-docs-and-versions REQ-10, AC-6: the guide's 0.23 names open the 0.23 documents on
// GitHub, and no page links to a /docs/v0 page, since 0.23 is not documented on the site.
const guide = () => readFileSync(pageFile(".output/public", "/docs/v1/getting-started/migrating-from-0-x"), "utf8");

test("the guide's 0.23 names link to the 0.23 documents on GitHub", () => {
  const links = [...guide().matchAll(/href="(https:\/\/github\.com\/chrissgon\/perfectui\/blob\/v0\.23\.0\/docs\/[a-z-]+\.md)"/g)].map((m) => m[1]);
  // Ten names, of which float has no 0.23 document and stays text.
  expect(links).toHaveLength(9);
});

test("no page links to a v0 page", () => {
  expect(guide()).not.toContain('href="/docs/v0');
});
