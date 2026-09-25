import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

describe("navigation comes from the content folders (REQ-4, AC-4)", () => {
  it("no source file lists section titles", () => {
    const titles = ["Getting Started", "Customization", "Components", "Forms"];
    const offenders = files("app").filter((f) => titles.some((t) => readFileSync(f, "utf8").includes(`"${t}"`)));
    expect(offenders).toEqual([]);
  });
});
