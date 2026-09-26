import { expect, test } from "@playwright/test";

// Migration guide REQ-5, AC-5: a page with a version range shows it under its description;
// a page without one shows nothing.
test("a page with from and to shows the range it applies to", async ({ page }) => {
  await page.goto("/docs/v1/getting-started/installation");
  await expect(page.locator("[data-doc-header] [data-range]")).toHaveText("Applies to 0.23.0 → 1.0.0");
  await page.goto("/docs/v1/components/button");
  await expect(page.locator("[data-doc-header] [data-range]")).toHaveCount(0);
});
