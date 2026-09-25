import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import MiniSearch from "minisearch";
import { searchOptions } from "../../shared/search-options";
import { versions } from "../../app/versions";
import { SITE_DIR } from "../helpers/site-dir";

// Search REQ-6, ADR-0009: one serialized MiniSearch index per configured version, loadable in
// the browser with the same options.
test("every configured version has an index that loads with MiniSearch.loadJSON", () => {
  for (const version of versions) {
    const json = readFileSync(`${SITE_DIR}/api/search/${version.id}.json`, "utf8");
    const index = MiniSearch.loadJSON(json, searchOptions);
    expect(index.documentCount, version.id).toBeGreaterThan(0);
    const [first] = index.search("button");
    expect(first, version.id).toBeDefined();
    expect(first!.url).toMatch(new RegExp(`^/docs/${version.id}/`));
    expect(first!.title).toBeTruthy();
  }
});
