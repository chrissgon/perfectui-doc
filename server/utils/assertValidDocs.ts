import { readdirSync } from "node:fs";
import { join } from "node:path";
import { versions } from "../../app/versions";
import { validateDocs } from "../../shared/validate-docs";

let checked = false;

/**
 * Validates `content/` once per build and throws when a rule fails, which stops
 * `nuxt generate` through `nitro.prerender.failOnError` (content-model design, ADR-0003).
 * The registered MDC components are the files of `app/components/content/`.
 */
export function assertValidDocs(): void {
  if (checked) return;
  const root = process.cwd();
  const components = readdirSync(join(root, "app/components/content"))
    .filter((name) => name.endsWith(".vue"))
    .map((name) => name.replace(/\.vue$/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase());
  const { errors, warnings } = validateDocs(join(root, "content"), versions, components);
  for (const warning of warnings) console.warn(`[docs] warning: ${warning}`);
  if (errors.length) throw new Error(`[docs] invalid content:\n${errors.join("\n")}`);
  checked = true;
}
