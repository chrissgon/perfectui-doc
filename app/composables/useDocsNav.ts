import type { ContentNavigationItem, PageCollections } from "@nuxt/content";
import type { DocVersion } from "~/versions";

function findNode(items: ContentNavigationItem[], path: string): ContentNavigationItem | undefined {
  for (const item of items) {
    if (item.path === path) return item;
    const found = findNode(item.children ?? [], path);
    if (found) return found;
  }
  return undefined;
}

/**
 * The sections of one version, each with its pages, in folder-prefix order (REQ-4, ADR-0004).
 * The collection prefix nests the tree as /docs → /docs/<version> → sections → pages; sections
 * with no page are dropped (EDGE-5).
 */
export async function useDocsNav(version: DocVersion) {
  const { data } = await useAsyncData(`nav:${version.id}`, () =>
    queryCollectionNavigation(version.collection as keyof PageCollections),
  );
  return computed<ContentNavigationItem[]>(() =>
    (findNode(data.value ?? [], `/docs/${version.id}`)?.children ?? []).filter(
      (section) => (section.children?.length ?? 0) > 0,
    ),
  );
}
