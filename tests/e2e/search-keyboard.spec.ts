import { expect, test } from "@playwright/test";
import { openSearch, results, searchDialog, searchInput } from "../helpers/search";

// Search REQ-7, AC-6.
test("arrows move the selection, the live region announces it, Enter opens it", async ({ page }) => {
  await openSearch(page, "/");
  await searchInput(page).fill("button");
  await expect(results(page).first()).toHaveAttribute("aria-selected", "true");
  await searchInput(page).press("ArrowDown");
  const second = results(page).nth(1);
  await expect(second).toHaveAttribute("aria-selected", "true");
  await expect(searchInput(page)).toHaveAttribute("aria-activedescendant", (await second.getAttribute("id"))!);
  await expect(searchDialog(page).locator("[aria-live=polite]")).toContainText("2 of");
  await searchInput(page).press("ArrowUp");
  await expect(results(page).first()).toHaveAttribute("aria-selected", "true");
  const href = (await results(page).first().getAttribute("href"))!;
  await searchInput(page).press("Enter");
  await expect(page).toHaveURL(new RegExp(`${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
});

test("Escape closes and returns focus to the search button", async ({ page }) => {
  await openSearch(page, "/docs/v1/components/button");
  await searchInput(page).press("Escape");
  await expect(searchDialog(page)).toBeHidden();
  await expect(page.getByRole("button", { name: /^Search/ })).toBeFocused();
});

test("Enter opens the result under the pointer after a hover", async ({ page }) => {
  await openSearch(page, "/");
  await searchInput(page).fill("button");
  const third = results(page).nth(2);
  await third.hover();
  await expect(third).toHaveAttribute("aria-selected", "true");
  const href = (await third.getAttribute("href"))!;
  await searchInput(page).press("Enter");
  await expect(page).toHaveURL(new RegExp(`${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
});
