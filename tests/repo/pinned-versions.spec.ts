import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Project rule (state decision 2026-09-23): every dependency pinned to an exact version.
describe("package.json", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const all = { ...pkg.dependencies, ...pkg.devDependencies } as Record<string, string>;

  it("pins every dependency to an exact version", () => {
    const ranged = Object.entries(all).filter(([, v]) => !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(v));
    expect(ranged).toEqual([]);
  });

  it("uses perfectui 1.0.0-beta.1", () => {
    expect(all["@chrissgon/perfectui"]).toBe("1.0.0-beta.1");
  });
});
