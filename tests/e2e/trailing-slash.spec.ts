import { expect, test } from "@playwright/test";

// Netlify redirected /docs/v1/components/button to .../button/ and the page lost its content after
// hydration (the path gained a slash and matched no page): content must survive either form.
for (const path of ["/docs/v1/components/button/", "/docs/v1/getting-started/migrating-from-0-23/", "/docs/v1/"]) {
  test(`${path} keeps its content after hydration`, async ({ page }) => {
    await page.goto(path);
    const headingsBefore = await page.locator("main h1, .doc-prose h2, main h2").count();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator("main h1, .doc-prose h2, main h2").count()).toBe(headingsBefore);
  });
}
