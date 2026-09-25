import type MiniSearch from "minisearch";
import type { AsPlainObject } from "minisearch";
import { searchOptions } from "#shared/search-options";
import { runSearch, type SearchResult } from "#shared/search-query";
import type { SearchDocument } from "#shared/search-set";

type State = "idle" | "loading" | "ready" | "unavailable";

// One index per version, kept for the page's lifetime: loaded on first open, never twice.
const indexes = new Map<string, Promise<MiniSearch<SearchDocument>>>();

function loadIndex(version: string) {
  let pending = indexes.get(version);
  if (!pending) {
    pending = Promise.all([import("minisearch"), $fetch<AsPlainObject>(`/api/search/${version}.json`)]).then(
      ([{ default: MiniSearchClass }, json]) => MiniSearchClass.loadJS(json, searchOptions),
    );
    // A failed load is forgotten, so Retry fetches again (EDGE-2).
    pending.catch(() => indexes.delete(version));
    indexes.set(version, pending);
  }
  return pending;
}

/**
 * Search over the static index of a version (search design, ADR-0009): the index loads on the
 * first query or `open()`, then every query runs in the browser with no request.
 */
export function useSearch(version: Ref<string>) {
  const state = ref<State>("idle");
  const query = ref("");
  const results = ref<SearchResult[]>([]);
  let index: MiniSearch<SearchDocument> | undefined;
  let loadedFor = "";

  async function open() {
    if (index && loadedFor === version.value) return;
    state.value = "loading";
    try {
      index = await loadIndex(version.value);
      loadedFor = version.value;
      state.value = "ready";
      run();
    } catch {
      state.value = "unavailable";
    }
  }

  function run() {
    results.value = index ? runSearch(index, query.value) : [];
  }

  watch(query, run);
  // A version change keeps the query and re-filters (EDGE-5).
  watch(version, () => {
    if (state.value !== "idle") void open();
  });

  return { state, query, results, open, retry: open };
}
