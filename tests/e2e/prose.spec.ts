import { expect, test } from "@playwright/test";

const PAGE = "/docs/v1/getting-started/tailwind-css";

// Rendered Markdown keeps a typography under Tailwind's Preflight (approved export).
test.describe("documentation prose", () => {
  test("headings, lists, inline code and tables are styled", async ({ page }) => {
    await page.goto(PAGE);
    const prose = page.locator(".doc-prose");
    const style = (selector: string, prop: string) =>
      prose.locator(selector).first().evaluate((el, p) => getComputedStyle(el).getPropertyValue(p), prop);
    expect(await style("h2", "font-size")).toBe("26px");
    expect(await style("ol", "list-style-type")).toBe("decimal");
    expect(await style("p > code", "border-top-style")).toBe("solid");
    await expect(prose.locator(".prose-table > table.pui-table")).toHaveCount(1);
    expect(await style("h2 a", "text-decoration-line")).toBe("none");
  });

  test("Tailwind utilities written in a documentation example are generated", async ({ page }) => {
    await page.goto(PAGE);
    const save = page.locator(".example-canvas").getByRole("button", { name: "Save" });
    await expect(save).toHaveCSS("border-top-left-radius", "0px");
  });

  test("at 360 px code blocks and tables scroll inside their box on every written page", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const paths = ["installation", "typescript", "tailwind-css", "license"].map((s) => `/docs/v1/getting-started/${s}`)
      .concat(["dark-mode", "theme-color"].map((s) => `/docs/v1/customization/${s}`));
    for (const path of paths) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(360);
    }
  });
});
