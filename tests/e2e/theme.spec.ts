import { expect, test, type Page } from "@playwright/test";

const rootTheme = (page: Page) =>
  page.evaluate(() => document.documentElement.style.getPropertyValue("--pui-theme"));
const bg = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => getComputedStyle(el).backgroundColor);
// Components fade colour changes over the library's 150 ms transition, so colours are polled.
// The landing's primary call to action, a solid theme button.
const getStarted = "#hero a.pui-btn.pui-solid.pui-theme";
const picker = (page: Page) => page.getByRole("button", { name: "Theme colour" });

async function pick(page: Page, preset: string) {
  await picker(page).click();
  await page.getByRole("button", { name: preset, exact: true }).click();
}

test.describe("theme picker (REQ-9, EDGE-6, AC-9)", () => {
  test("a colour applies to a component and an example block without reload, and survives a reload", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    const example = ".example-canvas .pui-solid.pui-theme";
    const before = await bg(page, example);
    await pick(page, "Violet");
    expect(await rootTheme(page)).toBe("#7c3aed");
    await expect.poll(() => bg(page, example)).toBe("rgb(124, 58, 237)");
    expect(before).not.toBe("rgb(124, 58, 237)");

    await page.goto("/");
    await expect.poll(() => bg(page, getStarted)).toBe("rgb(124, 58, 237)");
    await page.reload();
    expect(await rootTheme(page)).toBe("#7c3aed");
    await expect.poll(() => bg(page, getStarted)).toBe("rgb(124, 58, 237)");
  });

  test("presets set the colour and Default restores the library's", async ({ page }) => {
    await page.goto("/");
    const initial = await bg(page, getStarted);
    await picker(page).click();
    await page.getByRole("button", { name: "Violet", exact: true }).click();
    expect(await rootTheme(page)).toBe("#7c3aed");
    await expect.poll(() => bg(page, getStarted)).toBe("rgb(124, 58, 237)");

    await page.getByRole("button", { name: "Success", exact: true }).click();
    expect(await rootTheme(page)).toBe("var(--pui-success)");

    await page.getByRole("button", { name: "Default", exact: true }).click();
    expect(await rootTheme(page)).toBe("");
    expect(await page.evaluate(() => sessionStorage.getItem("pui-theme"))).toBeNull();
    await expect.poll(() => bg(page, getStarted)).toBe(initial);
  });

  test("the site's own theme-coloured text follows the picked colour (user review 2026-09-25)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/docs/v1/getting-started/typescript");
    const texts = [
      page.getByRole("navigation", { name: "Documentation" }).locator('[aria-current="page"]'),
      page.getByRole("navigation", { name: "On this page" }).locator('[aria-current="location"]'),
      page.locator("article p").filter({ hasText: /^\s*Getting Started\s*$/ }).first(),
    ];
    const colours = () => Promise.all(texts.map((t) => t.evaluate((el) => getComputedStyle(el).color)));
    const before = await colours();
    await pick(page, "Warn");
    await expect.poll(async () => (await colours()).every((c, i) => c !== before[i])).toBe(true);
  });

  test("the picker offers the five presets and no free colour input (user review 2026-09-25)", async ({ page }) => {
    await page.goto("/");
    await picker(page).click();
    const panel = page.locator(".pui-dropdown:popover-open");
    const names = await panel.getByRole("button").evaluateAll((els) => els.map((el) => el.getAttribute("aria-label")));
    expect(names).toEqual(["Default", "Violet", "Success", "Error", "Warn"]);
    await expect(panel.locator("input")).toHaveCount(0);
  });
});
