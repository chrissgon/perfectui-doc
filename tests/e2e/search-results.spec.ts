import { expect, test } from "@playwright/test";
import { openSearch, results, searchDialog, searchInput } from "../helpers/search";

// Search REQ-2, REQ-3, REQ-6, AC-2, AC-3.
test("one character shows results, using only the site's own static files", async ({ page, baseURL }) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await openSearch(page, "/docs/v1/components/button");
  await searchInput(page).fill("m");
  await expect(results(page).first()).toBeVisible();
  expect(requests.filter((u) => !u.startsWith(baseURL!))).toEqual([]);
  expect(requests.filter((u) => u.includes("/api/search/"))).toEqual([`${baseURL}/api/search/v1.json`]);
});

test("a result shows its page, its section and a snippet with the match marked, and opens the anchor", async ({ page }) => {
  await openSearch(page, "/docs/v1/components/button");
  await searchInput(page).fill("closedby");
  const first = results(page).first();
  await expect(first.locator("mark").first()).toBeVisible();
  const group = searchDialog(page).getByRole("group").first();
  await expect(group).toHaveAttribute("aria-label", "Modal");
  const href = await first.getAttribute("href");
  expect(href).toMatch(/^\/docs\/v1\/components\/modal(#.+)?$/);
  await first.click();
  await expect(page).toHaveURL(new RegExp(`${href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  await expect(searchDialog(page)).toBeHidden();
});
