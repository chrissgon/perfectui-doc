import { existsSync } from "node:fs";
import { landingHydrated } from "../helpers/hydrated";
import { expect, test } from "@playwright/test";
import { installCommand, site } from "../../app/site.config";
import { pageFile } from "../helpers/page-file";

const guide = "/docs/v1/getting-started/migrating-from-0-x";
const guideBuilt = existsSync(pageFile(".output/public", guide));

// REQ-4, AC-4: a 0.23 user reaches the guide from the landing.
test.describe("migration callout", () => {
  test("shows the 0.23 and 1.0 classes side by side", async ({ page }) => {
    await page.goto("/");
    const callout = page.locator("#migration");
    await expect(callout).toContainText("- btn style-solid-primary");
    await expect(callout).toContainText("+ pui-btn pui-solid pui-theme");
  });

  test("the guide link is visible before the end of the showcase and opens the guide", async ({ page }) => {
    // The guide is written in T-mg-1; until then the landing renders no link to it (no dead
    // link), and this test only proves that. T-sh-15 fails the release while it is missing.
    await page.goto("/");
    const link = page.locator("#migration").getByRole("link", { name: "Read the migration guide" });
    if (!guideBuilt) {
      await expect(link).toHaveCount(0);
      return;
    }
    const showcaseEnd = await page.locator("#mode-theme").evaluate((el) => el.getBoundingClientRect().bottom + scrollY);
    const hero = page.locator("#hero").getByRole("link", { name: "Migrating from 0.x" });
    const heroTop = await hero.evaluate((el) => el.getBoundingClientRect().top + scrollY);
    expect(heroTop).toBeLessThan(showcaseEnd);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${guide}$`));
  });
});

test.describe("install tabs", () => {
  test("arrow keys move between package managers and the command follows", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    const install = page.locator("#install");
    const npm = install.getByRole("button", { name: "npm", exact: true });
    await expect(npm).toHaveAttribute("aria-pressed", "true");
    await expect(install.getByRole("textbox", { name: "Install command" })).toHaveValue(installCommand("npm"));
    await npm.focus();
    for (const manager of ["yarn", "pnpm", "bun"] as const) {
      await page.keyboard.press("ArrowRight");
      const tab = install.getByRole("button", { name: manager, exact: true });
      await expect(tab).toBeFocused();
      await expect(tab).toHaveAttribute("aria-pressed", "true");
      await expect(install.getByRole("textbox", { name: "Install command" })).toHaveValue(installCommand(manager));
    }
    await page.keyboard.press("ArrowRight");
    await expect(npm).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(install.getByRole("button", { name: "bun", exact: true })).toBeFocused();
  });

  test("the CDN snippet is pinned to the installed version", async ({ page, request }) => {
    const { version } = await (await request.get("/api/library-size.json")).json();
    await page.goto("/");
    await landingHydrated(page);
    const cdn = page.locator("#install [data-cdn]");
    await expect(cdn).toContainText(`https://cdn.jsdelivr.net/npm/${site.packageName}@${version}/dist/perfectui.css`);
    await expect(cdn).toContainText(`https://cdn.jsdelivr.net/npm/${site.packageName}@${version}/dist/js/index.js`);
  });

  test("the CDN copy control copies the snippet", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await landingHydrated(page);
    await page.locator("#install").getByRole("button", { name: "Copy CDN tags" }).click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('<script type="module">');
  });
});
