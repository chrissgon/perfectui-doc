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
    return navigateTo(switchTarget(current, target.id, exists));
  };
}
