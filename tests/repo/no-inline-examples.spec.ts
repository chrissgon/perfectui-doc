import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

// REQ-3, AC-3: examples live in Markdown, never as HTML strings in the source.
describe("no example HTML in the source", () => {
  // Templates may use pui- classes; what the spec forbids is example HTML kept as a string
  // in script code, so only .ts files and <script> blocks are scanned, line by line.
  it("no string in script code under app/ holds pui- markup", () => {
    const scriptOf = (file: string) => {
      const text = readFileSync(file, "utf8");
      if (file.endsWith(".ts")) return text;
      return [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
    };
    const inString = /["'`][^"'`\n]*<[a-z][^>\n]*class=\\?["']pui-/;
    const offenders = files("app")
      .filter((f) => /\.(ts|vue)$/.test(f))
      .filter((f) => scriptOf(f).split("\n").some((line) => inString.test(line)));
    expect(offenders).toEqual([]);
  });

  it("the scan finds an example string planted in script code", () => {
    const planted = 'const example = \'<button class="pui-btn pui-solid pui-theme">x</button>\';';
    expect(/["'`][^"'`\n]*<[a-z][^>\n]*class=\\?["']pui-/.test(planted)).toBe(true);
  });
});
