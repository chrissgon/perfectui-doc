import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Database from "better-sqlite3";
import { expect, test } from "@playwright/test";
import { versions } from "../../app/versions";

// NFR-2, AC-11: every documentation route is a static file; the generated files are present.
test("every collection route exists as a static HTML file", () => {
  const db = new Database(".data/content/contents.sqlite", { readonly: true });
  for (const v of versions) {
    const rows = db.prepare(`select path from _content_${v.collection} where path not like '%/.navigation'`).all() as { path: string }[];
    for (const { path } of rows) expect(existsSync(join(".output/public", path, "index.html")), path).toBe(true);
  }
  db.close();
});

test("the generated files are in the output and no server bundle is needed", () => {
  for (const file of ["_redirects", "api/search-index.json", "api/assistant-corpus.json", "404.html"]) {
    expect(existsSync(join(".output/public", file)), file).toBe(true);
  }
  expect(readdirSync(".output").filter((n) => n === "server")).toEqual([]);
});
