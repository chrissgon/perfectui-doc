import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { parse } from "yaml";
import type { LandingCopy } from "../../shared/landing-copy";
import { installCommand } from "../../app/site.config";

const copy = parse(readFileSync("content/landing.yml", "utf8")) as LandingCopy;

// NFR-3, EDGE-1, AC-12: the landing reads and navigates with JavaScript off.
test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every section's text, the links and the install command are visible", async ({ page }) => {
    await page.goto("/");
    for (const section of copy.sections) {
      await expect(page.locator(`#${section.id} h1, #${section.id} h2`).first(), section.id).toBeVisible();
    }
    await expect(page.locator("#hero").getByRole("textbox", { name: "Install command" })).toHaveValue(installCommand("npm"));
    for (const link of await page.locator("main a[href]").all()) await expect(link).toBeVisible();
    await expect(page.getByRole("button", { name: /Copy install command|Copy CDN tags/ })).toHaveCount(0);
  });

  test("the calls to action navigate", async ({ page }) => {
    await page.goto("/");
    await page.locator("#hero").getByRole("link", { name: "Get started" }).click();
    // The version index is a redirect to the first page (user review 2026-09-25).
    await expect(page).toHaveURL(/\/docs\/v1\/getting-started\/installation$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goto("/");
    await page.locator("#classes").getByRole("link", { name: "See the components" }).click();
    await expect(page).toHaveURL(/\/docs\/v1\/components\/button$/);
  });
});

// EDGE-2: no horizontal scroll at 320 px.
test("at 320 px neither the landing nor a documentation page scrolls sideways", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const path of ["/", "/docs/v1/components/button", "/docs/v1/getting-started/tailwind-css"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(320);
  }
});
