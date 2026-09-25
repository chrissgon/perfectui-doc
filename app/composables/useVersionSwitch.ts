import type { Collections } from "@nuxt/content";
import { relativeDocPath, switchTarget } from "../../shared/version-switch";
import type { DocVersion } from "~/versions";

/** Switches the page being read to another version (REQ-6); the control ships in release R-2. */
export function useVersionSwitch() {
  const route = useRoute();
  return async (target: DocVersion) => {
    const relative = relativeDocPath(route.path);
    const candidate = relative ? `/docs/${target.id}/${relative}` : "";
    const exists = candidate
      ? Boolean(await queryCollection(target.collection as keyof Collections).path(candidate).first())
      : true;
    return navigateTo(switchTarget(route.path, target.id, exists));
  };
}
