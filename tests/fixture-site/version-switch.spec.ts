import { expect, test } from "@playwright/test";

test.describe("version notice (REQ-6, EDGE-1, AC-6)", () => {
  test("the target index names the missing page and the version", async ({ page }) => {
    await page.goto("/docs/v0?missing=components%2Fchip");
    const notice = page.getByRole("status");
    await expect(notice).toContainText("chip");
    await expect(notice).toContainText("0.23");
  });

  test("the index without the query shows no notice", async ({ page }) => {
    await page.goto("/docs/v0");
    await expect(page.getByRole("status")).toHaveCount(0);
  });
});
