import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "yaml";
import type { DocVersion } from "../app/versions";

/**
 * Checks the Markdown sources for what Nuxt Content does not enforce (content-model design,
 * validation rules). It reads the files, not the database: the engine derives a title from the
 * first heading, so a missing `title` field is only visible in the source.
 * Errors fail the build; warnings are printed.
 */
export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;
const FENCE = /^(```|~~~)/;

function markdownFiles(dir: string): string[] {
  let names: string[];
  try {
    names = readdirSync(dir).sort();
  } catch {
    return [];
  }
  return names.flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return markdownFiles(path);
    return name.endsWith(".md") ? [path] : [];
  });
}

/** `v1/04.components/03.button.md` → `/docs/v1/components/button` */
export function pagePath(file: string): string {
  const segments = file.replace(/\.md$/, "").split("/").map((s) => s.replace(/^\d+\./, ""));
  return `/docs/${segments.join("/")}`;
}

function majorOf(version: string): number {
  return Number.parseInt(version.replace(/^v/, ""), 10);
}

const VERSION = /^\d+\.\d+\.\d+(?:-[\w.]+)?$/;

export function validateDocs(
  contentDir: string,
  versions: readonly DocVersion[],
  components: readonly string[],
  options: { libraryVersion?: string } = {},
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const known = new Set(components);

  for (const version of versions) {
    const files = markdownFiles(join(contentDir, version.id));
    const paths = new Map<string, string>();
    const pages = new Set(files.map((f) => pagePath(relative(contentDir, f))));

    for (const abs of files) {
      const file = relative(contentDir, abs);
      const source = readFileSync(abs, "utf8");
      const match = FRONTMATTER.exec(source);
      const front = (match ? parse(match[1]!) : {}) ?? {};
      const body = match ? source.slice(match[0].length) : source;

      for (const field of ["title", "description"]) {
        if (typeof front[field] !== "string" || !front[field].trim()) {
          errors.push(`${file}: missing frontmatter field "${field}"`);
        }
      }

      // A version range (the migration guide): `from` is a version, `to` the installed library.
      if (front.from !== undefined && !VERSION.test(String(front.from))) {
        errors.push(`${file}: "from" is not a version: ${front.from}`);
      }
      if (front.to !== undefined && options.libraryVersion && String(front.to) !== options.libraryVersion) {
        errors.push(`${file}: "to" is ${front.to} but the installed @chrissgon/perfectui is ${options.libraryVersion}`);
      }
      for (const field of ["since", "changed"]) {
        const value = front[field];
        if (value !== undefined && majorOf(String(value)) > majorOf(version.id)) {
          errors.push(`${file}: ${field} "${value}" is newer than the folder's major (${version.id})`);
        }
      }

      // MDC components and example blocks, outside fenced code.
      let inFence = false;
      let exampleFences: number | null = null;
      for (const line of body.split("\n")) {
        if (FENCE.test(line.trim())) {
          if (!inFence && exampleFences !== null) exampleFences++;
          inFence = !inFence;
          continue;
        }
        if (inFence) continue;
        const block = /^::([a-z][\w-]*)/.exec(line.trim());
        if (block) {
          if (!known.has(block[1]!)) errors.push(`${file}: unknown component "${block[1]}"`);
          if (block[1] === "example") exampleFences = 0;
        } else if (line.trim() === "::" && exampleFences !== null) {
          if (exampleFences !== 1) {
            errors.push(`${file}: an ::example must hold exactly one fenced block, found ${exampleFences}`);
          }
          exampleFences = null;
        }
        for (const inline of line.matchAll(/(?<![:\w]):([a-z][\w-]*)[{[]/g)) {
          if (!known.has(inline[1]!)) errors.push(`${file}: unknown component "${inline[1]}"`);
        }
        for (const link of line.matchAll(/\]\((\/docs\/[^)#\s]+)/g)) {
          const target = link[1]!.replace(/\/$/, "");
          if (target.startsWith(`/docs/${version.id}/`) && !pages.has(target)) {
            warnings.push(`${file}: link to ${target} has no page`);
          }
        }
      }

      const path = pagePath(file);
      const twin = paths.get(path);
      if (twin) errors.push(`${file}: path ${path} is also ${twin}`);
      else paths.set(path, file);

    }
  }
  return { errors, warnings };
}
