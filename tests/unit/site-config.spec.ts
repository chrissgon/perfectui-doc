import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { features } from "../../app/features";
import { installCommand, site } from "../../app/site.config";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

// Module specifiers (`import … from "@chrissgon/perfectui/mode"`, `@import "…/perfectui.css"`)
// name the installed package, not the configured one, so they are not literals to forbid.
const withoutImports = (text: string) =>
  text.replace(/(?:@import|\bimport\b[^"'\n]*?(?:from)?)\s*["'][^"'\n]+["']/g, "");

// REQ-3, AC-3; REQ-7: one configuration value for the package name and the links.
describe("site configuration", () => {
  it("builds every install command from the package name", () => {
    expect(installCommand("npm")).toBe(`npm i ${site.packageName}`);
    expect(installCommand("yarn")).toBe(`yarn add ${site.packageName}`);
    expect(installCommand("pnpm")).toBe(`pnpm add ${site.packageName}`);
    expect(installCommand("bun")).toBe(`bun add ${site.packageName}`);
    expect(installCommand("npm", "other-name")).toBe("npm i other-name");
  });

  it("no other file under app/ holds the package name or the repository URLs", () => {
    const literals = [site.packageName, site.repository, site.docsRepository, site.figma, site.url];
    const offenders = files("app")
      .filter((f) => f !== join("app", "site.config.ts"))
      .filter((f) => /\.(ts|vue|css)$/.test(f))
      .filter((f) => literals.some((l) => withoutImports(readFileSync(f, "utf8")).includes(l)));
    expect(offenders).toEqual([]);
  });

  it("the scan finds a planted literal and ignores module specifiers", () => {
    const planted = `const cmd = "npm i ${site.packageName}";`;
    expect(withoutImports(planted).includes(site.packageName)).toBe(true);
    expect(withoutImports('@import "@chrissgon/perfectui/perfectui.css";')).not.toContain(site.packageName);
    expect(withoutImports('import { setMode } from "@chrissgon/perfectui/mode";')).not.toContain(site.packageName);
  });
});

// REQ-6: unshipped features are off.
describe("features configuration", () => {
  it("ships without search until T-sr-3 and without the assistant", () => {
    expect(features).toEqual({ search: false, assistant: false });
  });
});
