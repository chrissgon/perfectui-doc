import { expect, type Page } from "@playwright/test";

export const searchInput = (page: Page) => page.getByRole("searchbox", { name: /Search/ });
export const searchDialog = (page: Page) => page.getByRole("dialog", { name: "Search the documentation" });
export const results = (page: Page) => searchDialog(page).getByRole("option");

/** Opens search on a page once the app has hydrated. */
export async function openSearch(page: Page, path: string) {
  await page.goto(path);
  await expect(page.getByRole("button", { name: /^Search/ })).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /^Search/ }).click();
  await expect(searchInput(page)).toBeFocused();
}
