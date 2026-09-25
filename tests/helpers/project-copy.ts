import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";

const SKIP = new Set(["node_modules", ".output", ".nuxt", ".data", ".git", "dist", "test-results", "docs"]);

const copies: string[] = [];

/** Deletes every copy made by `projectCopy` (call from `afterAll`). */
export function removeCopies(): void {
  for (const root of copies.splice(0)) rmSync(root, { recursive: true, force: true });
}

/** A copy of the project with extra files, for builds that must not touch the real tree. */
export function projectCopy(files: Record<string, string>, remove: string[] = []): string {
  const root = mkdtempSync(join(tmpdir(), "perfectui-doc-"));
  copies.push(root);
  // Only top-level folders are skipped (app/pages/docs must be copied).
  const skip = (src: string) => {
    const rel = relative(process.cwd(), src);
    return rel !== "" && !rel.includes("/") && SKIP.has(rel);
  };
  cpSync(process.cwd(), root, { recursive: true, filter: (src) => !skip(src) });
  symlinkSync(join(process.cwd(), "node_modules"), join(root, "node_modules"));
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), body);
  }
  for (const path of remove) rmSync(join(root, path), { force: true });
  return root;
}

/** Runs `nuxt generate` in a copy; returns its exit code and output. */
export function generate(root: string) {
  const run = spawnSync(join(root, "node_modules/.bin/nuxt"), ["generate"], { cwd: root, encoding: "utf8", timeout: 240_000 });
  return { status: run.status, output: `${run.stdout}\n${run.stderr}` };
}
