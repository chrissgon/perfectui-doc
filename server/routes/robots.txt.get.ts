import { site } from "../../app/site.config";

/** Every page may be crawled; the sitemap lists them (prerendered to `robots.txt`). */
export default defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "text/plain; charset=utf-8");
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;
});
