import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface LibrarySize {
  version: string;
  css: number;
  js: number;
  method: "gzip -9 -n";
  measuredAt: string;
}

/** The measured files, relative to the package root. */
export const measuredFiles = { css: "dist/perfectui.css", js: "dist/js/index.js" } as const;

/**
 * Gzip sizes of the installed library, with the competitors' method (ADR-0007): system
 * `gzip -9 -n`, so no file name is stored in the header. Throws naming a missing file (EDGE-7).
 */
export function measureLibrary(root: string): LibrarySize {
  const size = (file: string) => {
    const path = join(root, file);
    if (!existsSync(path)) throw new Error(`library size: ${path} is missing from the installed package`);
    return execFileSync("gzip", ["-9", "-n", "-c", path]).length;
  };
  const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as { version: string };
  return {
    version,
    css: size(measuredFiles.css),
    js: size(measuredFiles.js),
    method: "gzip -9 -n",
    measuredAt: new Date().toISOString(),
  };
}
