import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { pickLatest, versions } from "../../app/versions";

const SOURCE_DIRS = ["app", "server", "shared"];
const SOURCE_EXT = /\.(ts|vue|mjs|js)$/;

function sourceFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return SOURCE_EXT.test(name) ? [path] : [];
  });
}

describe("versions configuration (REQ-5, AC-5)", () => {
  it("is the only source file that names a version id", () => {
    const literals = versions.map((v) => new RegExp(`["'\`]${v.id}["'\`]`));
    const files = [...SOURCE_DIRS.flatMap(sourceFiles), "nuxt.config.ts"].filter(
      (f) => f !== join("app", "versions.ts"),
    );
    const offenders = files.filter((f) => literals.some((re) => re.test(readFileSync(f, "utf8"))));
    expect(offenders).toEqual([]);
  });

  it("marks exactly one version as latest", () => {
    expect(pickLatest(versions).id).toBe("v1");
  });

  it("fails naming the file when no version is latest", () => {
    expect(() => pickLatest([{ id: "v0", label: "0.23", collection: "docs_v0", latest: false }])).toThrow(
      /app\/versions\.ts/,
    );
  });

  it("fails naming the file when two versions are latest", () => {
    const two = [
      { id: "v1", label: "1.x", collection: "docs_v1", latest: true },
      { id: "v0", label: "0.23", collection: "docs_v0", latest: true },
    ];
    expect(() => pickLatest(two)).toThrow(/app\/versions\.ts/);
  });
});
