import { relativeDocPath, switchTarget } from "#shared/version-switch";
import type { DocsCollection, DocVersion } from "~/versions";

/**
 * Opens the page being read in another major (content-model REQ-6, spec library-docs-and-versions
 * REQ-9): the same page when it exists there, otherwise that major's first page with the missing
 * page in the query. Loaded by the version menu on demand; call it inside the Nuxt app's context.
 */
export async function switchVersion(path: string, target: DocVersion) {
  const current = path.replace(/\/+$/, "");
  // Outside the documentation (the landing), a major opens at its first page.
  if (!current.startsWith("/docs/")) return navigateTo(`/docs/${target.id}`);
  const collection = target.collection as DocsCollection;
  const relative = relativeDocPath(current);
  const candidate = relative ? `/docs/${target.id}/${relative}` : "";
  const exists = candidate ? Boolean(await queryCollection(collection).path(candidate).first()) : true;
  // The target's first page in navigation order (the numeric prefixes of the stem, ADR-0004).
  const home = await queryCollection(collection)
    .select("path", "stem")
    .where("path", "NOT LIKE", "%/.navigation")
    .order("stem", "ASC")
    .first();
  return navigateTo(switchTarget(current, target.id, exists, home?.path ?? `/docs/${target.id}`));
}
