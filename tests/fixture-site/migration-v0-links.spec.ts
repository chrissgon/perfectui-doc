import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT } from "./paths";
import { pageFile } from "../helpers/page-file";

// Spec library-docs-and-versions REQ-10, AC-6: a 0.23 name links to the 0.23 document on GitHub,
// written as an ordinary link; migration guide EDGE-5: a wide table scrolls inside its own box.
test.describe("links to the 0.23 documents", () => {
  test("btn links to its 0.23 document on GitHub and chip stays text", () => {
    const html = readFileSync(pageFile(OUT, "/docs/v1/getting-started/installation"), "utf8");
    const table = html.match(/<table[\s\S]*?<\/table>/)![0];
    // Vue's hydration markers (<!--[-->) sit between the tags.
    const text = table.replace(/<!--[[\]]-->/g, "");
    expect(text).toMatch(/<a[^>]+href="https:\/\/github\.com\/chrissgon\/perfectui\/blob\/v0\.23\.0\/docs\/button\.md"[^>]*><code>btn<\/code><\/a>/);
    expect(text).toMatch(/<code>chip<\/code>/);
    expect(table).not.toContain('href="/docs/v0');
  });

  test("a wide table scrolls in its box at 360 px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/docs/v1/getting-started/installation");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
    const box = page.locator(".prose-table").nth(1);
    expect(await box.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  });
});
