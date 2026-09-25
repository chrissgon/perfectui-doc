import { expect, test } from "@playwright/test";

const PAGE = "/docs/v1/getting-started/migrating-from-0-x";

// Migration guide NFR-1, EDGE-5, AC-6: the long page with its tables reads on a phone.
test("at 360 px the page does not scroll sideways and each wide table scrolls in its box", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(PAGE);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  const boxes = page.locator(".doc-prose .prose-table");
  await expect(boxes).toHaveCount(3);
  for (const box of await boxes.all()) {
    const { scroll, client, overflow } = await box.evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth, overflow: getComputedStyle(el).overflowX }));
    expect(overflow).toBe("auto");
    expect(client).toBeLessThanOrEqual(360);
    expect(scroll).toBeGreaterThanOrEqual(client);
  }
});

// EDGE-4: while the production site has no v0, no page offers a way to it; the switch rule and
// its notice are covered on the fixture site (tests/fixture-site/version-switch.spec.ts).
test("the guide offers no link into a version the build does not have", async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.locator('a[href^="/docs/v0"]')).toHaveCount(0);
});
