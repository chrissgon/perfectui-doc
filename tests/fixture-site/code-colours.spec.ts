import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT } from "./paths";
import { pageFile } from "../helpers/page-file";

// ADR-0006 spike: code colours come from CSS variables bound to the role inks, so they follow
// the mode and, since the user review of 2026-09-25, the theme, without a rebuild.
test.describe("code colours (REQ-10)", () => {
  test("highlighted spans reference the site's code variables", () => {
    const html = readFileSync(pageFile(OUT, "/docs/v1/components/button"), "utf8");
    for (const name of ["tag", "attr", "value", "punct"]) {
      expect(html, name).toContain(`var(--site-code-${name})`);
    }
  });

  test("the tag colour changes with data-pui-mode and with --pui-theme", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    const tag = page.locator("[data-example-code] pre span", { hasText: /^button$/ }).first();
    const colour = () => tag.evaluate((el) => getComputedStyle(el).color);
    await page.evaluate(() => document.documentElement.setAttribute("data-pui-mode", "light"));
    const light = await colour();
    await page.evaluate(() => document.documentElement.setAttribute("data-pui-mode", "dark"));
    const dark = await colour();
    expect(light).not.toBe(dark);
    await page.evaluate(() => document.documentElement.style.setProperty("--pui-theme", "#7c3aed"));
    expect(await colour()).not.toBe(dark);
  });
});
