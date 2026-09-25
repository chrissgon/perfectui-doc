import { latestVersion, versions } from "../../app/versions";
import { firstPageRoute } from "../../shared/first-page";
import { assertValidDocs } from "../utils/assertValidDocs";

/**
 * Netlify redirect rules, prerendered to `.output/public/_redirects` (ADR-0005).
 * 1. Each version's index (`/docs/<id>`) to the version's first page (user review 2026-09-25),
 *    forced: the build also writes the index as a redirect page, which would otherwise be served.
 * 2. `/docs` to the latest major's first page, and any unversioned `/docs/...` path to the same
 *    path under the latest major; not forced, so the versioned files are served first.
 * The 0.23 site's flat URLs (`/docs/<slug>`) have no rule since it was retired (spec
 * library-docs-and-versions REQ-11).
 */
export default defineEventHandler((event) => {
  // The first generated artifact validates the content, so bad content fails the build.
  assertValidDocs();
  const latest = `/docs/${latestVersion.id}`;

  // The same first page the route rules in nuxt.config.ts redirect to.
  const homes = new Map<string, string>();
  for (const v of versions) {
    const home = firstPageRoute("content", v.id);
    if (home) homes.set(v.id, home);
  }

  const lines = [
    ...[...homes].map(([id, home]) => `/docs/${id} ${home} 301!`),
    `/docs ${homes.get(latestVersion.id) ?? latest} 301`,
    `/docs/* ${latest}/:splat 301`,
  ];
  setResponseHeader(event, "content-type", "text/plain; charset=utf-8");
  return `${lines.join("\n")}\n`;
});
