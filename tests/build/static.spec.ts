import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { expect, test } from "@playwright/test";
import { versions } from "../../app/versions";
import { pageFile } from "../helpers/page-file";
import { SITE_DIR } from "../helpers/site-dir";

// NFR-2, AC-11 on the production site: every documentation route is a static file, the
// generated files are present, and only configured versions are published (T-cm-22).
test("every collection route exists as a static HTML file", () => {
  const db = new DatabaseSync(".data/content/contents.sqlite", { readOnly: true });
  for (const v of versions) {
    const rows = db.prepare(`select path from _content_${v.collection} where path not like '%/.navigation'`).all() as { path: string }[];
    expect(rows.length, v.id).toBeGreaterThan(0);
    for (const { path } of rows) expect(existsSync(pageFile(SITE_DIR, path)), path).toBe(true);
  }
  db.close();
});

test("the generated files are in the output and no server bundle is needed", () => {
  for (const file of ["_redirects", "api/search-index.json", "api/assistant-corpus.json", "api/library-size.json", "404.html"]) {
    expect(existsSync(join(SITE_DIR, file)), file).toBe(true);
  }
  expect(existsSync(".output/server"), "a server bundle").toBe(false);
});

test("only configured versions are published: no fixture archive", () => {
  const published = readdirSync(`${SITE_DIR}/docs`).filter((n) => /^v\d+$/.test(n)).sort();
  expect(published).toEqual(versions.map((v) => v.id).sort());
  expect(existsSync(`${SITE_DIR}/docs/v0`)).toBe(versions.some((v) => v.id === "v0"));
});
