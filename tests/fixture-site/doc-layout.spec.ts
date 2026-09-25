import { expect, test } from "@playwright/test";

const BUTTON = "/docs/v1/components/button";
const toc = (page: import("@playwright/test").Page) => page.getByRole("navigation", { name: "On this page" });

test.describe("documentation layout (REQ-4, NFR-3)", () => {
  test("three columns at 1280 px: sidebar, content, on-page headings", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BUTTON);
    await expect(page.getByRole("navigation", { name: "Documentation" })).toBeVisible();
    await expect(toc(page).getByRole("link")).toHaveText(["Styles", "Colors"]);
    await expect(toc(page).getByRole("link", { name: "Styles" })).toHaveAttribute("href", "#styles");
    await expect(page.locator("details[data-toc-disclosure]")).toBeHidden();
  });

  test("at 1024 px the headings become a disclosure in the content", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto(BUTTON);
    await expect(toc(page)).toBeHidden();
    const disclosure = page.locator("details[data-toc-disclosure]");
    await expect(disclosure.locator("summary")).toHaveText("On this page");
    await disclosure.locator("summary").click();
    await expect(disclosure.getByRole("link", { name: "Colors" })).toBeVisible();
  });

  test("a page without headings has no headings list", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/docs/v1/forms/input");
    await expect(toc(page)).toHaveCount(0);
    await expect(page.locator("details[data-toc-disclosure]")).toHaveCount(0);
  });

  test("previous and next follow the navigation order, with an edit link", async ({ page }) => {
    await page.goto(BUTTON);
    const pager = page.getByRole("navigation", { name: "Pagination" });
    await expect(pager.getByRole("link", { name: /Previous.*Installation/ })).toHaveAttribute("href", "/docs/v1/getting-started/installation");
    await expect(pager.getByRole("link", { name: /Next.*Chip/ })).toHaveAttribute("href", "/docs/v1/components/chip");
    await expect(page.getByRole("link", { name: "Edit this page on GitHub" })).toHaveAttribute(
      "href",
      /\/edit\/[^/]+\/content\/v1\/04\.components\/03\.button\.md$/,
    );
  });

  test("no horizontal scroll at 360 px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(BUTTON);
    const [scroll, inner] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(scroll).toBe(inner);
  });
});
