import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const strip = (name: string) => name.replace(/^\d+\./, "");

/**
 * The route of a version's first page, read from its content folder in the order the numeric
 * prefixes give (ADR-0004): the first section folder with a page, then its first page. The
 * prerender starts there, since the version index is now a redirect the crawler cannot follow.
 */
export function firstPageRoute(contentDir: string, versionId: string): string | undefined {
  const root = join(contentDir, versionId);
  // Before the first sync (a fresh clone running `nuxt prepare`) the folder does not exist yet.
  if (!existsSync(root)) return undefined;
  const sections = readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  for (const section of sections) {
    const [page] = readdirSync(join(root, section))
      .filter((name) => name.endsWith(".md"))
      .sort();
    if (page) return `/docs/${versionId}/${strip(section)}/${strip(page.replace(/\.md$/, ""))}`;
  }
  return undefined;
}
