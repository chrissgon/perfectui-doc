import type { PageCollections } from "@nuxt/content";
import { queryCollection } from "@nuxt/content/server";
import { site } from "../../app/site.config";
import { versions } from "../../app/versions";

/**
 * The sitemap search engines read (prerendered to `sitemap.xml`): the landing and every page of
 * every published version, at the site's domain. Navigation entries are not pages.
 */
export default defineEventHandler(async (event) => {
  const paths = ["/"];
  for (const v of versions) {
    const pages = await queryCollection(event, v.collection as keyof PageCollections).select("path").all();
    paths.push(...pages.map((p) => p.path).filter((path) => !path.endsWith("/.navigation")));
  }
  const urls = paths.map((path) => `  <url><loc>${site.url}${path === "/" ? "/" : path}</loc></url>`);
  setResponseHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
});
