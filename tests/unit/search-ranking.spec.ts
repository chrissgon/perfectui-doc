import { existsSync, readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { searchOptions } from "../../shared/search-options";
import { prepareQuery, runSearch } from "../../shared/search-query";
import type { SearchDocument } from "../../shared/search-set";

// Search REQ-2, REQ-3, REQ-5, EDGE-3, EDGE-4, AC-5, over the index `bun run generate` built.
const FILE = ".output/public/api/search/v1.json";
let index: MiniSearch<SearchDocument>;

beforeAll(() => {
  if (!existsSync(FILE)) throw new Error(`${FILE} is missing: run \`bun run generate\` first`);
  index = MiniSearch.loadJSON(readFileSync(FILE, "utf8"), searchOptions);
});

const titles = (query: string) => runSearch(index, query).map((r) => r.title);

describe("search ranking", () => {
  it("finds a page from a prefix: 'moda' finds Modal", () => {
    expect(titles("moda")[0]).toBe("Modal");
  });

  it("tolerates one typo from four characters: 'tooltpi' finds Tooltip", () => {
    expect(titles("tooltpi")).toContain("Tooltip");
  });

  it("does not fuzz short words: 'mdl' finds nothing by typo", () => {
    expect(titles("mdl")).not.toContain("Modal");
  });

  it("ranks a title match above body matches", () => {
    expect(titles("accordion")[0]).toBe("Accordion");
  });

  it("returns at most 10 results, each with a url and a snippet with <mark>", () => {
    const results = runSearch(index, "pui");
    expect(results.length).toBeLessThanOrEqual(10);
    const withMark = runSearch(index, "dialog").find((r) => r.snippet.includes("<mark>"));
    expect(withMark?.url).toMatch(/^\/docs\/v1\//);
    expect(withMark!.snippet.length).toBeLessThanOrEqual(120 + "<mark></mark>".length * 6);
  });

  it("escapes the snippet: page text never becomes markup", () => {
    const hit = runSearch(index, "dialog").find((r) => /&lt;dialog/.test(r.snippet));
    expect(hit).toBeDefined();
    expect(runSearch(index, "dialog").every((r) => !/<dialog/.test(r.snippet))).toBe(true);
  });
});

describe("query preparation", () => {
  it("treats a query with no letter or digit as empty (EDGE-3)", () => {
    expect(prepareQuery("  ?!-- ")).toBe("");
    expect(runSearch(index, "?!--")).toEqual([]);
  });

  it("collapses whitespace and cuts to 200 characters (EDGE-4)", () => {
    expect(prepareQuery("  a   b  ")).toBe("a b");
    expect(prepareQuery("x".repeat(250))).toHaveLength(200);
  });
});
