import { existsSync } from "node:fs";
import Database from "better-sqlite3";
import { expect, test } from "@playwright/test";
import { DB, versions } from "./paths";

// Reads the database Nuxt Content builds for the fixture site.

type Row = { path: string; title: string; since: string | null; changed: string | null; tags: string };

test.describe("documentation collections (REQ-1, REQ-2, REQ-11, EDGE-5)", () => {
  let pages: Record<string, Row[]>;

  test.beforeAll(() => {
    if (!existsSync(DB)) throw new Error(`${DB} is missing: the fixture site is built by its web server`);
    const db = new Database(DB, { readonly: true });
    pages = Object.fromEntries(
      versions.map((v) => [
        v.id,
        db
          .prepare(`select path, title, since, changed, tags from _content_${v.collection} where path not like '%/.navigation'`)
          .all() as Row[],
      ]),
    );
    db.close();
  });

  test("has one collection per configured version", () => {
    for (const v of versions) expect(pages[v.id], v.collection).toBeDefined();
  });

  test("serves the same slug in both versions under the version prefix", () => {
    expect(pages.v1!.map((p) => p.path)).toContain("/docs/v1/components/button");
    expect(pages.v0!.map((p) => p.path)).toContain("/docs/v0/components/button");
  });

  test("strips numeric prefixes from every path", () => {
    const all = Object.values(pages).flat().map((p) => p.path);
    expect(all.filter((p) => /\/\d+\./.test(p))).toEqual([]);
  });

  test("keeps since and changed queryable", () => {
    const chip = pages.v1!.find((p) => p.path === "/docs/v1/components/chip");
    const button = pages.v1!.find((p) => p.path === "/docs/v1/components/button");
    expect(chip?.since).toBe("1.0");
    expect(button?.changed).toBe("1.0");
    expect(JSON.parse(button!.tags)).toEqual(["component", "button"]);
  });

  test("has the chip only in v1", () => {
    expect(pages.v0!.map((p) => p.path)).not.toContain("/docs/v0/components/chip");
  });
});
