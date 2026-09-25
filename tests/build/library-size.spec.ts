import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const pkg = "node_modules/@chrissgon/perfectui";
const gz = (file: string) => execFileSync("gzip", ["-9", "-n", "-c", `${pkg}/${file}`]).length;

// REQ-2, NFR-2, AC-2: the published numbers equal the test's own gzip -9 -n measurement.
test("api/library-size.json equals gzip -9 -n of the installed files", () => {
  const size = JSON.parse(readFileSync(".output/public/api/library-size.json", "utf8"));
  const version = JSON.parse(readFileSync(`${pkg}/package.json`, "utf8")).version;
  expect(size).toMatchObject({ version, css: gz("dist/perfectui.css"), js: gz("dist/js/index.js"), method: "gzip -9 -n" });
  expect(Number.isNaN(Date.parse(size.measuredAt))).toBe(false);
  if (version === "1.0.0-beta.1") expect([size.css, size.js]).toEqual([3221, 493]);
});
