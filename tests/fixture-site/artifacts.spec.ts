import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT, versions } from "./paths";

const read = (name: string) => JSON.parse(readFileSync(`${OUT}/api/${name}`, "utf8"));

test.describe("generated sets in the output (REQ-8, AC-7)", () => {
  test("both files exist and every entry carries version and url", () => {
    for (const name of ["search-index.json", "assistant-corpus.json"]) {
      const entries = read(name) as { version: string; url: string }[];
      expect(entries.length, name).toBeGreaterThan(0);
      for (const e of entries) {
        expect(versions.map((v) => v.id)).toContain(e.version);
        expect(e.url).toMatch(/^\/docs\/v\d+\//);
      }
    }
  });

  test("corpus entries have level and titles; no generated CSS leaks into the text", () => {
    const corpus = read("assistant-corpus.json") as { level: number; titles: string[]; content: string }[];
    for (const e of corpus) {
      expect(e.level).toBeGreaterThan(0);
      expect(e.titles.length).toBeGreaterThan(0);
      expect(e.content).not.toContain("shiki");
    }
  });

  test("no hand-maintained content index exists in the repository", () => {
    expect(existsSync("docs.json")).toBe(false);
  });
});
