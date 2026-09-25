import { expect, test } from "@playwright/test";

const nav = (page: import("@playwright/test").Page) => page.getByRole("navigation", { name: "Documentation" });

test.describe("navigation (REQ-4, EDGE-5, AC-4)", () => {
  test("sections and pages follow the folder prefixes, with .navigation.yml titles", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/docs/v1/components/button");
    const sections = nav(page).locator("summary");
    await expect(sections).toHaveText(["Getting Started", "Components", "Forms"]);
    const components = nav(page).locator("details", { hasText: "Components" }).getByRole("link");
    await expect(components).toHaveText(["Button", "Chip"]);
    await expect(components.first()).toHaveAttribute("href", "/docs/v1/components/button");
  });

  test("empty sections are absent and the current page is marked", async ({ page }) => {
    await page.goto("/docs/v1/components/chip");
    await expect(nav(page).getByText("General")).toHaveCount(0);
    await expect(nav(page).getByRole("link", { name: "Chip" })).toHaveAttribute("aria-current", "page");
  });

  test("below 1024 px the sidebar is a panel behind a menu control", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/docs/v1/components/button");
    await expect(nav(page)).toBeHidden();
    await page.getByRole("button", { name: "Documentation menu" }).click();
    await expect(nav(page)).toBeVisible();
    await nav(page).getByRole("link", { name: "Chip" }).click();
    await expect(page).toHaveURL(/\/docs\/v1\/components\/chip$/);
    await expect(nav(page)).toBeHidden();
  });
});
