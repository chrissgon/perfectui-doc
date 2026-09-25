/**
 * The library's documents as the site's pages (spec library-docs-and-versions, ADR-0010). The
 * library writes for GitHub; this module turns its summary into navigation and each document
 * into a page of the content model. Every failure names the file and, when there is one, the
 * line, so a build stops on the library's own words.
 */

export const REPOSITORY = "https://github.com/chrissgon/perfectui";

export interface SummaryPage {
  title: string;
  slug: string;
  /** Path in the library repository: `docs/button.md` or `MIGRATION.md`. */
  file: string;
  line: number;
}

export interface SummarySection {
  title: string;
  slug: string;
  pages: SummaryPage[];
}

export interface PagePath {
  /** Under `content/<major>/`: `04.components/03.button.md`. */
  file: string;
  url: string;
}

export interface ConvertContext {
  file: string;
  section: SummarySection;
  page: SummaryPage;
  paths: Map<string, PagePath>;
  ref: string;
}

export const kebab = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const pad = (n: number) => String(n).padStart(2, "0");

/** A link target in the library, as a repository path (`docs/card.md`), or null when external. */
function libraryPath(url: string, from: string): { path: string; ref?: string; anchor: string } | null {
  const [target = "", anchor = ""] = url.split("#");
  const github = /^https:\/\/github\.com\/chrissgon\/perfectui\/(?:blob|tree)\/([^/]+)\/(.*)$/.exec(target);
  if (github) return { ref: github[1], path: github[2]!, anchor };
  if (/^[a-z]+:|^\/|^$/i.test(target)) return null;
  const parts = from.split("/").slice(0, -1);
  for (const part of target.split("/")) {
    if (part === "..") parts.pop();
    else if (part !== ".") parts.push(part);
  }
  return { path: parts.join("/"), anchor };
}

/** Sections and pages, in order, from the summary of `docs/README.md` (REQ-3, EDGE-7). */
export function parseSummary(text: string, file = "docs/README.md"): SummarySection[] {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => /^##\s+Summary\s*$/i.test(l));
  const sections: SummarySection[] = [];
  const seen = new Map<string, number>();
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) continue;
    if (/^#{1,2}\s/.test(line)) break;
    const item = /^[-*]\s+\[([^\]]+)\]\(([^)]+)\)/.exec(line);
    if (!item) {
      sections.push({ title: line.replace(/^#+\s*/, ""), slug: kebab(line), pages: [] });
      seen.clear();
      continue;
    }
    const section = sections.at(-1);
    if (!section) throw new Error(`${file}:${i + 1}: a page link comes before any section`);
    const target = libraryPath(item[2]!, file);
    if (!target) throw new Error(`${file}:${i + 1}: "${item[2]}" is not a document of the library`);
    const slug = kebab(item[1]!);
    const other = seen.get(slug);
    if (other) throw new Error(`${file}:${i + 1}: the slug "${slug}" is also used on line ${other}`);
    seen.set(slug, i + 1);
    section.pages.push({ title: item[1]!, slug, file: target.path, line: i + 1 });
  }
  return sections;
}

/** Each document's numbered file under `content/<major>/` and its URL (ADR-0004). */
export function pagePaths(sections: SummarySection[], major: string): Map<string, PagePath> {
  const paths = new Map<string, PagePath>();
  sections.forEach((section, s) =>
    section.pages.forEach((page, p) =>
      paths.set(page.file, {
        file: `${pad(s + 1)}.${section.slug}/${pad(p + 1)}.${page.slug}.md`,
        url: `/docs/${major}/${section.slug}/${page.slug}`,
      }),
    ),
  );
  return paths;
}

const CALLOUTS: Record<string, string> = { NOTE: "note", WARNING: "warning" };
const KINDS: Record<string, string> = { components: "component", forms: "form", general: "layout" };
const META_KEYS = ["tags", "since", "from", "to", "changed"];

/** Rewrites Markdown links outside code spans (REQ-7). */
function convertLinks(line: string, ctx: ConvertContext): string {
  return line
    .split(/(`[^`]*`)/)
    .map((part, i) =>
      i % 2
        ? part
        : part.replace(/\]\(([^)\s]+)\)/g, (whole, url: string) => {
            const target = libraryPath(url, ctx.file);
            if (!target) return whole;
            // A link pinned to a tag (the 0.23 documents) stays where its author pointed it.
            if (target.ref && /^v\d/.test(target.ref)) return whole;
            const page = ctx.paths.get(target.path);
            const anchor = target.anchor ? `#${target.anchor}` : "";
            if (page) return `](${page.url}${anchor})`;
            return `](${REPOSITORY}/blob/${ctx.ref}/${target.path}${anchor})`;
          }),
    )
    .join("");
}

/** One library document as one page of the content model (REQ-4 to REQ-8). */
export function convertDocument(text: string, ctx: ConvertContext): string {
  const { file } = ctx;
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  const meta = new Map<string, string>();
  const names = new Map<string, number>();
  let title: string | undefined;
  let description: string | undefined;
  let fence: { marker: string; live: boolean } | null = null;
  let callout: string | null = null;

  const closeCallout = () => {
    if (callout) out.push("::");
    callout = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]!;
    const at = `${file}:${i + 1}`;

    if (fence) {
      if (raw.trim() === fence.marker) {
        out.push(raw);
        if (fence.live) out.push("::");
        fence = null;
      } else out.push(raw);
      continue;
    }

    const open = /^(\s*)(```+|~~~+)\s*([\w-]*)\s*(.*)$/.exec(raw);
    if (open && title !== undefined) {
      closeCallout();
      // The description is the first block after the title, or none when that block is code.
      description ??= "";
      const [, indent, marker, lang, rest] = open;
      const words = rest!.split(/\s+/).filter(Boolean);
      const live = words.includes("live");
      if (live) {
        if (lang !== "html") throw new Error(`${at}: "live" needs an html block, found "${lang || "none"}"`);
        const name = words.find((w) => w.startsWith("name="))?.slice(5);
        if (name) {
          const other = names.get(name);
          if (other) throw new Error(`${at}: the example name "${name}" is also used on line ${other}`);
          names.set(name, i + 1);
        }
        out.push(name ? `::example{name="${name}"}` : "::example", `${indent}${marker}html`);
      } else out.push(raw);
      fence = { marker: marker!, live };
      continue;
    }

    const site = /^<!--\s*site:\s*([a-z]+):\s*(.*?)\s*-->$/.exec(raw.trim());
    if (site) {
      if (!META_KEYS.includes(site[1]!)) throw new Error(`${at}: unknown site key "${site[1]}"`);
      meta.set(site[1]!, site[2]!);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(raw);
    if (title === undefined) {
      if (heading?.[1] === "#") title = heading[2]!.trim();
      // Everything above the title (the library's section label) is dropped.
      continue;
    }

    if (description === undefined) {
      if (!raw.trim()) continue;
      if (!heading && !raw.startsWith(">") && !/^[-*|]/.test(raw)) {
        const paragraph = [raw.trim()];
        while (i + 1 < lines.length && lines[i + 1]!.trim()) paragraph.push(lines[++i]!.trim());
        // Plain text for the meta description: emphasis markers go, inline code stays.
        description = convertLinks(paragraph.join(" "), ctx).replace(/(\*\*|__)(.+?)\1/g, "$2");
        continue;
      }
      description = "";
    }

    const alert = /^>\s*\[!([A-Z]+)\]\s*$/.exec(raw);
    if (alert) {
      closeCallout();
      const kind = CALLOUTS[alert[1]!];
      if (!kind) throw new Error(`${at}: no callout for the alert kind "${alert[1]}"`);
      out.push(`::${kind}`);
      callout = kind;
      continue;
    }
    if (callout) {
      if (raw.startsWith(">")) {
        const text = raw.replace(/^>\s?/, "");
        // An empty quoted line right after the marker keeps Prettier 3.5 from joining the marker
        // with a line that starts with code; it is not part of the callout.
        if (text.trim() || out.at(-1) !== `::${callout}`) out.push(convertLinks(text, ctx));
        continue;
      }
      closeCallout();
    }

    if (heading) {
      const level = heading[1]!.length;
      out.push(`${"#".repeat(level >= 3 ? level - 1 : level)} ${heading[2]}`);
      continue;
    }
    out.push(convertLinks(raw, ctx));
  }
  closeCallout();

  if (title === undefined) throw new Error(`${file}: no level-1 heading`);
  const kind = KINDS[ctx.section.slug];
  const tags = meta.get("tags") ?? (kind ? `[${kind}, ${ctx.page.slug}]` : "[guide]");
  const front = [`title: ${title}`, `description: ${JSON.stringify(description ?? "")}`, `tags: ${tags}`];
  for (const key of META_KEYS.slice(1)) if (meta.has(key)) front.push(`${key}: ${meta.get(key)}`);

  const body = out.join("\n").replace(/^\n+/, "").replace(/\n{3,}/g, "\n\n").replace(/\n*$/, "\n");
  return `---\n${front.join("\n")}\n---\n\n${body}`;
}
