import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { SITE_DIR } from "../helpers/site-dir";

const pkg = "node_modules/@chrissgon/perfectui";
const gz = (file: string) => execFileSync("gzip", ["-9", "-n", "-c", `${pkg}/${file}`]).length;

// REQ-2, NFR-2, AC-2: the published numbers equal the test's own gzip -9 -n measurement.
test("api/library-size.json equals gzip -9 -n of the installed files", () => {
  const size = JSON.parse(readFileSync(`${SITE_DIR}/api/library-size.json`, "utf8"));
  const version = JSON.parse(readFileSync(`${pkg}/package.json`, "utf8")).version;
  expect(size).toMatchObject({ version, css: gz("dist/perfectui.css"), js: gz("dist/js/index.js"), method: "gzip -9 -n" });
  expect(Number.isNaN(Date.parse(size.measuredAt))).toBe(false);
  if (version === "1.0.0") expect([size.css, size.js]).toEqual([3256, 493]);
});

// REQ-2, AC-2: the landing prints the JSON's numbers, with the version and the method in the
// same block; the prerendered HTML is the final state every reader gets first.
test("the size chart in index.html prints the measured numbers, version and method", () => {
  const size = JSON.parse(readFileSync(`${SITE_DIR}/api/library-size.json`, "utf8"));
  const html = readFileSync(`${SITE_DIR}/index.html`, "utf8");
  const block = html.match(/<section[^>]*id="size"[\s\S]*?<\/section>/)?.[0];
  expect(block, "size section").toBeTruthy();
  const text = block!.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  const fmt = (n: number) => n.toLocaleString("en-US");
  expect(text).toContain(`${fmt(size.css)} bytes gzip`);
  expect(text).toContain(`loader is ${fmt(size.js)}`);
  expect(text).toContain(`${fmt(size.css)} + ${fmt(size.js)}`);
  expect(text).toContain(fmt(size.css + size.js));
  expect(text).toContain(size.version);
  expect(text).toContain("gzip -9 -n");
});
