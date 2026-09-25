import { expect, test, type Page } from "@playwright/test";

const bg = (page: Page) => page.locator("#size").evaluate((el) => getComputedStyle(el).backgroundColor);

test.describe("size chart (REQ-2)", () => {
  test("the bars and counters end on the exact numbers after the animation", async ({ page, request }) => {
    const size = await (await request.get("/api/library-size.json")).json();
    await page.goto("/");
    await page.locator("#size").scrollIntoViewIfNeeded();
    const total = (size.css + size.js).toLocaleString("en-US");
    await expect(page.locator("#size")).toContainText(total, { timeout: 5000 });
    await expect(page.locator("#size")).toContainText("84,261");
  });

  test("with reduced motion the numbers are final from the start", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("#size")).toContainText("84,261");
  });

  test("the band inverts the page's mode, including the system's", async ({ page, context, baseURL }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    expect(await bg(page)).toBe("rgb(0, 0, 0)");
    await page.emulateMedia({ colorScheme: "dark" });
    expect(await bg(page)).toBe("rgb(255, 255, 255)");
    await context.addCookies([{ name: "pui-mode", value: "dark", url: baseURL! }]);
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    expect(await bg(page)).toBe("rgb(255, 255, 255)");
  });
});
