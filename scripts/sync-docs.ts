/**
 * Writes `content/<major>/` from the library's documents before `nuxt generate` and `nuxt dev`
 * (spec library-docs-and-versions, ADR-0010). The library comes from `PERFECTUI_SOURCE` (a local
 * checkout, read as it is on disk), else from `.cache/library/<ref>/`, else from one archive
 * download of the ref. Usage: bun scripts/sync-docs.ts
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { convertDocument, pagePaths, parseSummary } from "../shared/library-docs";
import { versions, type DocVersion } from "../app/versions";

export const CACHE = ".cache/library";
const ARCHIVE = (ref: string) => `https://codeload.github.com/chrissgon/perfectui/tar.gz/${ref}`;

/** The ref a major reads: its pinned `libraryRef`, else the installed version's tag (REQ-2). */
export function refFor(version: DocVersion, installed: string): string {
  return version.libraryRef ?? `v${installed}`;
}

/** A library tree on disk for the ref (REQ-2, NFR-2, EDGE-4); `download` is replaceable in tests. */
export async function resolveLibrary(
  ref: string,
  { source = process.env.PERFECTUI_SOURCE, cache = CACHE, download = downloadArchive } = {},
): Promise<string> {
  if (source) return source;
  const dir = join(cache, ref);
  if (existsSync(join(dir, "docs/README.md"))) return dir;
  const partial = `${dir}.partial`;
  rmSync(partial, { recursive: true, force: true });
  mkdirSync(partial, { recursive: true });
  try {
    await download(ref, partial);
  } catch (error) {
    rmSync(partial, { recursive: true, force: true });
    throw new Error(`library ref "${ref}": ${(error as Error).message}`, { cause: error });
  }
  rmSync(dir, { recursive: true, force: true });
  renameSync(partial, dir);
  return dir;
}

async function downloadArchive(ref: string, into: string): Promise<void> {
  const response = await fetch(ARCHIVE(ref));
  if (!response.ok) throw new Error(`download failed with HTTP ${response.status} (${ARCHIVE(ref)})`);
  const file = join(into, "archive.tar.gz");
  writeFileSync(file, Buffer.from(await response.arrayBuffer()));
  const tar = spawnSync("tar", ["-xzf", file, "-C", into, "--strip-components=1"], { encoding: "utf8" });
  rmSync(file);
  if (tar.status !== 0) throw new Error(`could not extract the archive: ${tar.stderr}`);
  console.log(`sync-docs: downloaded ${ARCHIVE(ref)}`);
}

/** Every page of one major, as `{ file, text }` under `content/<major>/` (REQ-1, EDGE-1, EDGE-3). */
export function convertLibrary(library: string, major: string, ref: string) {
  const sections = parseSummary(readFileSync(join(library, "docs/README.md"), "utf8"));
  const paths = pagePaths(sections, major);
  const files: { file: string; text: string }[] = [];
  const warnings: string[] = [];
  sections.forEach((section, s) => {
    files.push({ file: `${String(s + 1).padStart(2, "0")}.${section.slug}/.navigation.yml`, text: `title: ${section.title}\n` });
    for (const page of section.pages) {
      const source = join(library, page.file);
      if (!existsSync(source)) throw new Error(`docs/README.md:${page.line}: "${page.file}" does not exist at ${ref}`);
      files.push({ file: paths.get(page.file)!.file, text: convertDocument(readFileSync(source, "utf8"), { file: page.file, section, page, paths, ref }) });
    }
  });
  const listed = new Set(sections.flatMap((s) => s.pages.map((p) => p.file)));
  for (const name of readdirSync(join(library, "docs"))) {
    if (name.endsWith(".md") && name !== "README.md" && !listed.has(`docs/${name}`)) {
      warnings.push(`docs/${name} is not in the summary of docs/README.md, so it is not published`);
    }
  }
  return { files, warnings };
}

export async function syncDocs(content = "content") {
  const installed = JSON.parse(readFileSync("node_modules/@chrissgon/perfectui/package.json", "utf8")).version as string;
  for (const version of versions) {
    const ref = refFor(version, installed);
    const started = performance.now();
    const library = await resolveLibrary(ref);
    const { files, warnings } = convertLibrary(library, version.id, ref);
    const root = join(content, version.id);
    rmSync(root, { recursive: true, force: true });
    for (const { file, text } of files) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      writeFileSync(join(root, file), text);
    }
    for (const warning of warnings) console.warn(`sync-docs: warning: ${warning}`);
    const from = process.env.PERFECTUI_SOURCE ? `${library} (PERFECTUI_SOURCE)` : ref;
    console.log(`sync-docs: ${version.id} from ${from}: ${files.filter((f) => f.file.endsWith(".md")).length} pages in ${Math.round(performance.now() - started)} ms`);
  }
}

if (process.argv[1]?.endsWith("sync-docs.ts")) {
  syncDocs().catch((error: Error) => {
    console.error(`sync-docs: ${error.message}`);
    process.exit(1);
  });
}
