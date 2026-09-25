import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT } from "./paths";
import { pageFile } from "../helpers/page-file";

// Migration guide REQ-3, EDGE-1, EDGE-2, EDGE-5, AC-3: a 0.23 name links to its v0 page only
// when that page is in the build; a wide table scrolls inside its own box.
test.describe("links to v0 pages", () => {
  test("with the v0 button page, btn links to it and chip (no v0 page) is text", () => {
    const html = readFileSync(pageFile(OUT, "/docs/v1/getting-started/installation"), "utf8");
    const table = html.match(/<table[\s\S]*?<\/table>/)![0];
    expect(table).toMatch(/<a[^>]+href="\/docs\/v0\/components\/button"[^>]*><code>btn<\/code><\/a>/);
    expect(table).toMatch(/<code>chip<\/code>/);
    expect(table).not.toContain('href="/docs/v0/components/chip"');
  });

  test("the link works and a wide table scrolls in its box at 360 px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/docs/v1/getting-started/installation");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
    const box = page.locator(".prose-table").nth(1);
    expect(await box.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await page.getByRole("link", { name: "btn" }).click();
    await expect(page).toHaveURL(/\/docs\/v0\/components\/button$/);
  });
});
