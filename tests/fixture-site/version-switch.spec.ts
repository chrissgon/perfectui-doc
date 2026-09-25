import { expect, test } from "@playwright/test";

// A version index is its first page (user review 2026-09-25); a failed switch lands on that page
// with the missing page in the query (shared/version-switch.ts), and the page names it.
test.describe("version notice (REQ-6, EDGE-1, AC-6)", () => {
  test("the first page names the missing page and the version", async ({ page }) => {
    await page.goto("/docs/v0/components/button?missing=components%2Fchip");
    const notice = page.getByRole("status").filter({ hasText: "has no page" });
    await expect(notice).toContainText("chip");
    await expect(notice).toContainText("0.23");
  });

  test("the index opens the first page with no notice", async ({ page }) => {
    await page.goto("/docs/v0");
    await expect(page).toHaveURL(/\/docs\/v0\/components\/button$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "has no page" })).toHaveCount(0);
  });

  test("a client-side visit to the index opens the first page", async ({ page }) => {
    await page.goto("/docs/v1/components/chip");
    type Root = { __vue_app__?: { config: { globalProperties: { $router: { push: (to: string) => Promise<unknown> } } } } };
    await page.waitForFunction(() => Boolean((document.querySelector("#__nuxt") as unknown as Root | null)?.__vue_app__));
    await page.evaluate(() => (document.querySelector("#__nuxt") as unknown as Root).__vue_app__!.config.globalProperties.$router.push("/docs/v0"));
    await expect(page).toHaveURL(/\/docs\/v0\/components\/button$/);
  });
});
