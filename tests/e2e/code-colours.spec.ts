import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// ADR-0006 spike: code colours come from CSS variables bound to the role inks, so they follow
// the mode (and could follow the theme) without a rebuild.
test.describe("code colours (REQ-10)", () => {
  test("highlighted spans reference the site's code variables", () => {
    const html = readFileSync(".output/public/docs/v1/components/button/index.html", "utf8");
    for (const name of ["tag", "attr", "value", "punct"]) {
      expect(html, name).toContain(`var(--site-code-${name})`);
    }
  });

  test("the tag colour changes with data-pui-mode", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    const tag = page.locator("[data-example-code] pre span", { hasText: /^button$/ }).first();
    const colour = () => tag.evaluate((el) => getComputedStyle(el).color);
    await page.evaluate(() => document.documentElement.setAttribute("data-pui-mode", "light"));
    const light = await colour();
    await page.evaluate(() => document.documentElement.setAttribute("data-pui-mode", "dark"));
    const dark = await colour();
    expect(light).toBe("rgb(0, 98, 139)"); // theme/ink light #00628B
    expect(dark).toBe("rgb(107, 201, 245)"); // theme/ink dark #6BC9F5
  });
});
