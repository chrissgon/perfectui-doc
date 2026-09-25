// Builds the test fixture site and serves it: the project with its documentation content and
// versions configuration replaced by tests/fixtures/site (fixture pages for every content-model
// feature, and a v0 version). The production site keeps only real content (T-cm-22).
// Usage: node tests/helpers/fixture-site.mjs <port>
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { join, relative } from "node:path";

export const FIXTURE_ROOT = ".fixture-site";
const SKIP = new Set(["node_modules", ".output", ".nuxt", ".data", ".git", "docs", "test-results", "playwright-report", FIXTURE_ROOT]);

export function buildFixtureSite(cwd = process.cwd()) {
  const root = join(cwd, FIXTURE_ROOT);
  rmSync(root, { recursive: true, force: true });
  // Entry by entry: cpSync refuses to copy a folder into one of its own subfolders.
  const skip = (src) => ["content/v1", "content/v0"].includes(relative(cwd, src));
  for (const name of readdirSync(cwd)) {
    if (SKIP.has(name)) continue;
    cpSync(join(cwd, name), join(root, name), { recursive: true, filter: (src) => !skip(src) });
  }
  cpSync(join(cwd, "tests/fixtures/site"), root, { recursive: true });
  symlinkSync(join(cwd, "node_modules"), join(root, "node_modules"));
  const run = spawnSync(join(root, "node_modules/.bin/nuxt"), ["generate"], { cwd: root, encoding: "utf8", timeout: 240_000 });
  if (run.status !== 0) throw new Error(`fixture site build failed:\n${run.stdout}\n${run.stderr}`.slice(-4000));
  return join(root, ".output/public");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.argv[2] ?? "4174";
  const out = buildFixtureSite();
  if (!existsSync(join(out, "index.html"))) throw new Error("fixture site has no index.html");
  spawn(process.execPath, ["tests/helpers/static-server.mjs", out, port], { stdio: "inherit" });
}
