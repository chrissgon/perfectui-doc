import { expect, test } from "@playwright/test";

// Netlify redirected /docs/v1/components/button to .../button/ and the page lost its content after
// hydration (the path gained a slash and matched no page): content must survive either form.
for (const path of ["/docs/v1/components/button/", "/docs/v1/getting-started/migrating-from-0-x/"]) {
  test(`${path} keeps its content after hydration`, async ({ page }) => {
    await page.goto(path);
    const headingsBefore = await page.locator("main h1, .doc-prose h2, main h2").count();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator("main h1, .doc-prose h2, main h2").count()).toBe(headingsBefore);
  });
}

// The version index is its first page (user review 2026-09-25), with or without the slash.
test("/docs/v1/ opens the first page with its content", async ({ page }) => {
  await page.goto("/docs/v1/");
  await expect(page).toHaveURL(/\/docs\/v1\/getting-started\/installation$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Installation");
});
