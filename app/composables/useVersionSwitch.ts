import { relativeDocPath, switchTarget } from "../../shared/version-switch";
import type { DocsCollection, DocVersion } from "~/versions";

/** Switches the page being read to another version (REQ-6); the control ships in release R-2. */
export function useVersionSwitch() {
  const route = useRoute();
  return async (target: DocVersion) => {
    const current = route.path.replace(/\/+$/, "");
    const relative = relativeDocPath(current);
    const candidate = relative ? `/docs/${target.id}/${relative}` : "";
    const exists = candidate
      ? Boolean(await queryCollection(target.collection as DocsCollection).path(candidate).first())
      : true;
    // The target's first page in navigation order (the numeric prefixes of the stem, ADR-0004).
    const home = await queryCollection(target.collection as DocsCollection)
      .select("path", "stem")
      .where("path", "NOT LIKE", "%/.navigation")
      .order("stem", "ASC")
      .first();
    return navigateTo(switchTarget(current, target.id, exists, home?.path ?? `/docs/${target.id}`));
  };
}
