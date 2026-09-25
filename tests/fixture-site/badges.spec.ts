import { expect, test } from "@playwright/test";

test.describe("page header (REQ-7, AC-2)", () => {
  test("a page with since shows the Added badge", async ({ page }) => {
    await page.goto("/docs/v1/components/chip");
    const header = page.locator("[data-doc-header]");
    await expect(header.getByText("Added in 1.0")).toBeVisible();
    await expect(header.getByText(/Changed in/)).toHaveCount(0);
  });

  test("a page with changed shows the Changed badge, its section and its description", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    const header = page.locator("[data-doc-header]");
    await expect(header.getByText("Changed in 1.0")).toBeVisible();
    await expect(header.getByText("Components", { exact: true })).toBeVisible();
    await expect(header.locator("code").first()).toHaveText("pui-btn");
    await expect(header.getByRole("heading", { level: 1 })).toHaveText("Button");
  });

  test("a page without since or changed has no badge", async ({ page }) => {
    await page.goto("/docs/v1/forms/input");
    await expect(page.locator("[data-doc-header] .pui-badge")).toHaveCount(0);
  });
});
