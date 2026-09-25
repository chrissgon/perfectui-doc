import { expect, test, type Page } from "@playwright/test";

const input = (page: Page) => page.getByRole("searchbox", { name: /Search/ });
const dialog = (page: Page) => page.getByRole("dialog", { name: "Search the documentation" });

async function hydrated(page: Page) {
  await expect(page.getByRole("button", { name: /^Search/ })).toBeVisible();
  await page.waitForLoadState("networkidle");
}

// Search REQ-1, EDGE-8, AC-1: every trigger opens the dialog with the input focused.
for (const path of ["/", "/docs/v1/components/button"]) {
  test.describe(`opening search on ${path}`, () => {
    test("the header button opens it", async ({ page }) => {
      await page.goto(path);
      await hydrated(page);
      await page.getByRole("button", { name: /^Search/ }).click();
      await expect(dialog(page)).toBeVisible();
      await expect(input(page)).toBeFocused();
    });

    test("/ outside a text field opens it", async ({ page }) => {
      await page.goto(path);
      await hydrated(page);
      await page.locator("body").press("/");
      await expect(dialog(page)).toBeVisible();
      await expect(input(page)).toBeFocused();
      await expect(input(page)).toHaveValue("");
    });

    test("Ctrl+K and Cmd+K open it", async ({ page }) => {
      await page.goto(path);
      await hydrated(page);
      await page.keyboard.press("Control+k");
      await expect(input(page)).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog(page)).toBeHidden();
      await page.keyboard.press("Meta+k");
      await expect(input(page)).toBeFocused();
    });
  });
}

test("#search=<query> opens it with the query", async ({ page }) => {
  await page.goto("/docs/v1/components/button#search=modal");
  await expect(dialog(page)).toBeVisible();
  await expect(input(page)).toHaveValue("modal");
});

test("/ typed in a text field types a slash (EDGE-8)", async ({ page }) => {
  await page.goto("/docs/v1/forms/input");
  await hydrated(page);
  const field = page.locator("[data-example-preview] input.pui-input").first();
  await field.click();
  await field.press("/");
  await expect(dialog(page)).toBeHidden();
  expect(await field.inputValue()).toContain("/");
});
