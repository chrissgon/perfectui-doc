import { expect, test, type Page } from "@playwright/test";

// Spec library-docs-and-versions REQ-9, EDGE-8, AC-5: the version badge opens a menu of the
// documented majors and the archived 0.23 documents on GitHub.
const trigger = (page: Page) => page.getByRole("button", { name: /^Version 1\.x/ });
const menu = (page: Page) => page.locator("[data-version-menu]:popover-open");

test("the badge opens the menu with the pointer: 1.x current, 0.23 on GitHub", async ({ page }) => {
  await page.goto("/docs/v1/components/button");
  await expect(trigger(page)).toHaveText("1.x");
  await trigger(page).click();
  await expect(menu(page)).toBeVisible();
  await expect(menu(page).getByRole("link", { name: /1\.x/ })).toHaveAttribute("aria-current", "true");
  const archived = menu(page).getByRole("link", { name: /0\.23/ });
  await expect(archived).toHaveAttribute("href", "https://github.com/chrissgon/perfectui/tree/v0.23.0/docs");
});

test("the menu opens from the keyboard and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await trigger(page).focus();
  await page.keyboard.press("Enter");
  await expect(menu(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu(page)).toHaveCount(0);
});
