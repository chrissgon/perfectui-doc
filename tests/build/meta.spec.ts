import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { parse } from "yaml";
import { site } from "../../app/site.config";
import { pageFile } from "../helpers/page-file";
import { SITE_DIR } from "../helpers/site-dir";

const html = (path: string) => readFileSync(pageFile(SITE_DIR, path), "utf8");
const decode = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");

function head(page: string) {
  const meta = (key: string) => {
    // Attribute values may hold an unescaped ">" (a description naming `<button>`).
    const tag = [...page.matchAll(/<meta(?:[^>"]|"[^"]*")*>/g)].map((m) => m[0]).find((t) => t.includes(`="${key}"`));
    const content = tag?.match(/content="([^"]*)"/)?.[1];
    return content === undefined ? undefined : decode(content);
  };
  const title = page.match(/<title>([^<]*)<\/title>/)?.[1];
  return {
    title: title === undefined ? undefined : decode(title),
    description: meta("description"),
    ogTitle: meta("og:title"),
    ogDescription: meta("og:description"),
    ogImage: meta("og:image"),
    ogUrl: meta("og:url"),
    twitterCard: meta("twitter:card"),
  };
}

// REQ-10, AC-10: the seven tags in the prerendered HTML, absolute image and URL.
test.describe("page metadata", () => {
  test("the landing carries the seven tags with the site's title and description", () => {
    const h = head(html(""));
    for (const [key, value] of Object.entries(h)) expect(value, key).toBeTruthy();
    expect(h.title).toContain("Perfect UI");
    expect(h.ogImage).toBe(`${site.url}/og.jpg`);
    expect(h.ogUrl).toBe(`${site.url}/`);
    expect(h.twitterCard).toBe("summary_large_image");
  });

  test("a documentation page carries its own frontmatter title and description", () => {
    const md = readFileSync("content/v1/04.components/03.button.md", "utf8");
    const front = parse(md.split("---")[1]!) as { title: string; description: string };
    const plain = front.description.replace(/`/g, "");
    const h = head(html("/docs/v1/components/button"));
    for (const [key, value] of Object.entries(h)) expect(value, key).toBeTruthy();
    expect(h.title).toBe(`${front.title} · Perfect UI`);
    expect(h.ogTitle).toBe(front.title);
    expect(h.description).toBe(plain);
    expect(h.ogDescription).toBe(plain);
    expect(h.ogImage).toBe(`${site.url}/og.jpg`);
    expect(h.ogUrl).toBe(`${site.url}/docs/v1/components/button`);
    expect(h.twitterCard).toBe("summary_large_image");
  });

  test("the share image is the 1200 × 630 JPG", () => {
    const jpg = readFileSync(`${SITE_DIR}/og.jpg`);
    expect(jpg.subarray(0, 3)).toEqual(Buffer.from([0xff, 0xd8, 0xff]));
    expect(jpg.equals(readFileSync("docs/design/results/og-image/final/og-1200x630.jpg"))).toBe(true);
  });
});
