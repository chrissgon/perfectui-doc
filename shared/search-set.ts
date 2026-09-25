import type { DocVersion } from "../app/versions";

/** One heading section as `queryCollectionSearchSections` returns it. */
export interface Section {
  id: string;
  title: string;
  titles: string[];
  content: string;
  level: number;
}

export interface SearchDocument {
  id: string;
  version: string;
  url: string;
  title: string;
  heading: string;
  section: string;
  content: string;
}

export interface CorpusEntry {
  id: string;
  version: string;
  url: string;
  titles: string[];
  level: number;
  content: string;
}

/** The search document set of one version (content-model REQ-8); empty fails (EDGE-8). */
export function toSearchDocuments(
  sections: Section[],
  version: DocVersion,
  sectionOf: (path: string) => string | undefined,
): SearchDocument[] {
  if (!sections.length) throw new Error(`[docs] search document set is empty for ${version.id}`);
  return sections.map((s) => ({
    id: s.id,
    version: version.id,
    url: s.id,
    title: s.level === 1 ? s.title : (s.titles[0] ?? s.title),
    heading: s.level === 1 ? "" : s.title,
    section: sectionOf(s.id.split("#")[0]!) ?? "",
    content: s.content,
  }));
}

/** The assistant corpus of one version, one entry per heading section (REQ-8); empty fails. */
export function toCorpus(sections: Section[], version: DocVersion): CorpusEntry[] {
  if (!sections.length) throw new Error(`[docs] assistant corpus is empty for ${version.id}`);
  return sections.map((s) => ({
    id: s.id,
    version: version.id,
    url: s.id,
    titles: [...s.titles, s.title],
    level: s.level,
    content: s.content,
  }));
}
