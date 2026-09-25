import type MiniSearch from "minisearch";
import type { SearchDocument } from "./search-set";

export interface SearchResult {
  id: string;
  url: string;
  title: string;
  heading: string;
  section: string;
  /** About 120 characters of the section, HTML-escaped, with the matched terms in <mark>. */
  snippet: string;
}

const MAX_QUERY = 200;
const SNIPPET = 120;
const BEFORE = 40;

/** Trim, collapse whitespace, cut to 200 characters; no letter or digit means empty (EDGE-3, EDGE-4). */
export function prepareQuery(raw: string): string {
  const query = raw.trim().replace(/\s+/g, " ").slice(0, MAX_QUERY);
  return /[\p{L}\p{N}]/u.test(query) ? query : "";
}

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A window of the text around the first matched term, escaped, with every matched term marked. */
export function snippet(content: string, terms: string[]): string {
  // Markdown inline-code backticks are not part of the text a reader sees.
  const text = content.replace(/`/g, "").replace(/\s+/g, " ").trim();
  const pattern = terms.length ? new RegExp(terms.map(escapeRegExp).sort((a, b) => b.length - a.length).join("|"), "gi") : null;
  const first = pattern ? text.search(pattern) : -1;
  const start = first > BEFORE ? first - BEFORE : 0;
  const window = text.slice(start, start + SNIPPET);
  const marked = pattern
    ? window.split(pattern).reduce<string[]>((out, part, i, parts) => {
        out.push(escape(part));
        const match = i < parts.length - 1 ? window.match(pattern)![i] : undefined;
        if (match) out.push(`<mark>${escape(match)}</mark>`);
        return out;
      }, []).join("")
    : escape(window);
  return `${start > 0 ? "…" : ""}${marked}${start + SNIPPET < text.length ? "…" : ""}`;
}

/**
 * Words of four characters or more with two neighbouring characters swapped: a transposition is
 * one typo for a reader (REQ-5) but two edits for MiniSearch's Levenshtein distance.
 */
export function transpositions(query: string): string[] {
  return query.split(" ").filter((w) => w.length >= 4).flatMap((word) =>
    Array.from({ length: word.length - 1 }, (_, i) => word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2)).filter((v) => v !== word),
  );
}

/** The top 10 results of a query, ranked by the index's options (REQ-2, REQ-3, REQ-5). */
export function runSearch(index: MiniSearch<SearchDocument>, raw: string): SearchResult[] {
  const query = prepareQuery(raw);
  if (!query) return [];
  const variants = transpositions(query);
  const hits = variants.length
    ? index.search({ combineWith: "OR", queries: [query, { queries: variants, combineWith: "OR", fuzzy: false, prefix: false }] })
    : index.search(query);
  return hits.slice(0, 10).map((hit) => ({
    id: String(hit.id),
    url: hit.url as string,
    title: hit.title as string,
    heading: hit.heading as string,
    section: hit.section as string,
    snippet: snippet(hit.content as string, hit.terms),
  }));
}
