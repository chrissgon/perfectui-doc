import type { Collections } from "@nuxt/content";
import { queryCollection } from "@nuxt/content/server";
import { latestVersion } from "../../app/versions";
import { assertValidDocs } from "../utils/assertValidDocs";

/**
 * Netlify redirect rules, prerendered to `.output/public/_redirects` (ADR-0005).
 * 1. One rule per page of the latest version for the 0.23 site's flat URL (`/docs/<slug>`),
 *    so inbound links land on the page of the same topic.
 * 2. `/docs` and any unversioned `/docs/...` path to the same path under the latest major.
 * The rules are not forced, so the versioned files the build writes are always served first.
 */
export default defineEventHandler(async (event) => {
  // The first generated artifact validates the content, so bad content fails the build.
  assertValidDocs();
  const latest = `/docs/${latestVersion.id}`;
  const pages = await queryCollection(event, latestVersion.collection as keyof Collections)
    .select("path")
    .all();

  const flat = new Map<string, string>();
  for (const { path } of pages) {
    if (path.endsWith("/.navigation")) continue;
    const slug = path.split("/").pop();
    if (slug && !flat.has(slug)) flat.set(slug, path);
  }

  const lines = [
    ...[...flat].map(([slug, path]) => `/docs/${slug} ${path} 301`),
    `/docs ${latest} 301`,
    `/docs/* ${latest}/:splat 301`,
  ];
  setResponseHeader(event, "content-type", "text/plain; charset=utf-8");
  return `${lines.join("\n")}\n`;
});
