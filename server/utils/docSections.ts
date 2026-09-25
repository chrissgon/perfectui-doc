import type { ContentNavigationItem, PageCollections } from "@nuxt/content";
import { queryCollectionNavigation, queryCollectionSearchSections } from "@nuxt/content/server";
import type { H3Event } from "h3";
import type { DocVersion } from "../../app/versions";
import type { Section } from "../../shared/search-set";

/**
 * Heading sections of one version, without the generated highlighting CSS that the
 * rendered body carries in <style> (it would otherwise be indexed as text).
 */
export async function docSections(event: H3Event, version: DocVersion): Promise<Section[]> {
  const collection = version.collection as keyof PageCollections;
  return (await queryCollectionSearchSections(event, collection, { ignoredTags: ["style"] })) as Section[];
}

/** Maps a page path to the title of its navigation section. */
export async function sectionTitles(event: H3Event, version: DocVersion) {
  const tree = await queryCollectionNavigation(event, version.collection as keyof PageCollections);
  const titles = new Map<string, string>();
  const walk = (items: ContentNavigationItem[], section?: string) => {
    for (const item of items) {
      const isSection = item.path.split("/").length === 4; // /docs/<version>/<section>
      if (item.page === false || !item.children) titles.set(item.path, section ?? "");
      walk(item.children ?? [], isSection ? item.title : section);
    }
  };
  walk(tree);
  return (path: string) => titles.get(path) || undefined;
}
