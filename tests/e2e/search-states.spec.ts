import { expect, test } from "@playwright/test";
import { openSearch, results, searchDialog, searchInput } from "../helpers/search";

// Search REQ-8, EDGE-2, EDGE-3, AC-7.
test("an empty input shows only the input; a miss says so", async ({ page }) => {
  await openSearch(page, "/docs/v1/components/button");
  await expect(results(page)).toHaveCount(0);
  await expect(searchDialog(page).getByText(/No results|unavailable/)).toHaveCount(0);
  await searchInput(page).fill("xyz");
  await expect(searchDialog(page)).toContainText("No results for 'xyz'");
  await searchInput(page).fill("?!");
  await expect(results(page)).toHaveCount(0);
  await expect(searchDialog(page).getByText("No results")).toHaveCount(0);
});

test("a failed index load says search is unavailable, and Retry recovers", async ({ page }) => {
  let fail = true;
  await page.route("**/api/search/*.json", (route) => (fail ? route.abort() : route.continue()));
  await openSearch(page, "/docs/v1/components/button");
  await searchInput(page).fill("modal");
  await expect(searchDialog(page)).toContainText("Search is unavailable");
  fail = false;
  await searchDialog(page).getByRole("button", { name: "Retry" }).click();
  await expect(results(page).first()).toBeVisible();
});

test("below 640 px the dialog fills the screen", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await openSearch(page, "/docs/v1/components/button");
  const box = await searchDialog(page).boundingBox();
  expect(Math.round(box!.width)).toBe(360);
  expect(Math.round(box!.height)).toBe(640);
});
