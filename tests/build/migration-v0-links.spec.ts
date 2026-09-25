import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

// Migration guide EDGE-2, AC-3: while v0 is not in the build, no page links to /docs/v0.
test("the production site links to no v0 page", () => {
  const files = readdirSync(".output/public/docs", { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".html"));
  const offenders = files.filter((f) => readFileSync(join(".output/public/docs", f), "utf8").includes('href="/docs/v0'));
  expect(offenders).toEqual([]);
});
