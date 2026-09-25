import { expect, test, type Page } from "@playwright/test";
import { features } from "../../app/features";
import { site } from "../../app/site.config";
import { latestVersion } from "../../app/versions";

const pages = ["/", "/docs/v1/components/button"];
const header = (page: Page) => page.getByRole("banner");
const footer = (page: Page) => page.getByRole("contentinfo");

test.describe("site shell (REQ-6, REQ-7, AC-7)", () => {
  for (const path of pages) {
    test(`header and footer carry the links and controls on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      const h = header(page);
      await expect(h.getByRole("link", { name: "Docs", exact: true })).toHaveAttribute("href", `/docs/${latestVersion.id}`);
      await expect(h.getByText(latestVersion.label, { exact: true }).filter({ visible: true })).toHaveCount(1);
      await expect(h.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", site.repository);
      await expect(h.getByRole("link", { name: "Figma" })).toHaveAttribute("href", site.figma);
      await expect(h.getByRole("button", { name: /^Switch to .+ mode$/ })).toBeVisible();
      await expect(h.getByRole("button", { name: "Theme colour" })).toBeVisible();

      const f = footer(page);
      await expect(f.getByRole("link", { name: `${site.license} license` })).toHaveAttribute("href", `${site.repository}/blob/main/LICENSE`);
      await expect(f.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", site.repository);

      // One set of controls per page: the floating placeholders are gone.
      await expect(page.getByRole("button", { name: /^Switch to .+ mode$/ })).toHaveCount(1);
    });
  }

  test("the landing and a docs page have the same header and footer contents", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const contents = async (path: string) => {
      await page.goto(path);
      const links = async (region: ReturnType<typeof header>) =>
        region.getByRole("link").evaluateAll((els) => els.map((e) => `${e.textContent?.trim()}|${e.getAttribute("aria-label")}|${e.getAttribute("href")}`));
      return { header: await links(header(page)), footer: await links(footer(page)), text: await footer(page).innerText() };
    };
    expect(await contents(pages[1]!)).toEqual(await contents(pages[0]!));
  });

  test("no search entry point while features.search is off", async ({ page }) => {
    test.skip(features.search, "search is on");
    for (const path of pages) {
      await page.goto(path);
      await expect(page.getByRole("button", { name: /search/i })).toHaveCount(0);
      await expect(page.getByRole("searchbox")).toHaveCount(0);
    }
  });

  test("below 1024 px the landing header keeps its links behind a menu", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");
    await expect(header(page).getByRole("link", { name: "GitHub" })).toBeHidden();
    await header(page).getByRole("button", { name: "Menu" }).click();
    const menu = header(page).locator("[popover]:popover-open");
    await expect(menu.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Figma" })).toBeVisible();
    await expect(menu.getByRole("link", { name: /Docs/ })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  });

  test("below 1024 px a docs page opens its sidebar from the header", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/docs/v1/components/button");
    await header(page).getByRole("button", { name: "Documentation menu" }).click();
    const panel = page.getByRole("navigation", { name: "Documentation" });
    await expect(panel).toBeVisible();
    // The header hides GitHub and Figma at this width; the panel carries them (user, 2026-09-25).
    await expect(panel.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", site.repository);
    await expect(panel.getByRole("link", { name: "Figma" })).toHaveAttribute("href", site.figma);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  });
});
