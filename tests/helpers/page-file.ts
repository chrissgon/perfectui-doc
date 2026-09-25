import { join } from "node:path";

/**
 * The prerendered file of a route: pages are written as `<route>.html` (`/` is `index.html`), so
 * the host serves `/docs/v1/components/button` without redirecting it to a trailing slash.
 */
export function pageFile(out: string, route: string): string {
  const clean = route.replace(/\/+$/, "");
  return clean ? join(out, `${clean}.html`) : join(out, "index.html");
}
