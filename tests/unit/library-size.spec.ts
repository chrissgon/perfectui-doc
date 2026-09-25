import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { measureLibrary } from "../../shared/library-size";

// EDGE-7: a missing file stops the build naming it.
describe("library size measurement", () => {
  it("fails naming the missing file", () => {
    const root = mkdtempSync(join(tmpdir(), "pui-size-"));
    writeFileSync(join(root, "package.json"), JSON.stringify({ version: "9.9.9" }));
    mkdirSync(join(root, "dist"));
    writeFileSync(join(root, "dist", "perfectui.css"), ".pui-btn{}");
    expect(() => measureLibrary(root)).toThrow(/dist\/js\/index\.js/);
  });

  it("measures both files of a complete package", () => {
    const root = mkdtempSync(join(tmpdir(), "pui-size-"));
    writeFileSync(join(root, "package.json"), JSON.stringify({ version: "9.9.9" }));
    mkdirSync(join(root, "dist", "js"), { recursive: true });
    writeFileSync(join(root, "dist", "perfectui.css"), ".pui-btn{}");
    writeFileSync(join(root, "dist", "js", "index.js"), "export {}");
    const size = measureLibrary(root);
    expect(size).toMatchObject({ version: "9.9.9", method: "gzip -9 -n" });
    expect(size.css).toBeGreaterThan(0);
    expect(size.js).toBeGreaterThan(0);
  });
});
