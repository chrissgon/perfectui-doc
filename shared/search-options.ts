import type { Options } from "minisearch";
import type { SearchDocument } from "./search-set";

/**
 * MiniSearch options shared by the build (index) and the browser (loadJSON), so both agree on
 * fields and rules (search design, ADR-0009): prefix matching for every word, one typo from four
 * characters, title matches above heading matches above body matches, and a page's opening
 * section (no heading) above its other sections, so the page itself comes first.
 */
export const searchOptions: Options<SearchDocument> = {
  fields: ["title", "heading", "content"],
  storeFields: ["title", "heading", "url", "section", "content"],
  searchOptions: {
    prefix: true,
    fuzzy: (term: string) => (term.length >= 4 ? 1 : 0),
    boost: { title: 3, heading: 2 },
    // Every section of a page carries the page title, which lowers the title's weight in BM25;
    // the opening section is the page itself.
    boostDocument: (_id, _term, stored) => (stored?.heading ? 1 : 1.5),
  },
};
