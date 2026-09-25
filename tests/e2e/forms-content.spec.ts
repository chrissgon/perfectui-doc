import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

// T-cm-19: the forms pages as written from the library's documents.
const pages = readdirSync("content/v1/05.forms")
  .filter((f) => f.endsWith(".md"))
  .map((f) => `/docs/v1/forms/${f.replace(/^\d+\./, "").replace(/\.md$/, "")}`);

test.describe("forms pages", () => {
  test("every page builds its examples with pui- elements and fits 360 px", async ({ page }) => {
    expect(pages.length).toBe(8);
    await page.setViewportSize({ width: 360, height: 640 });
    for (const path of pages) {
      await page.goto(path);
      const previews = page.locator("[data-example-preview]");
      const count = await previews.count();
      expect(count, path).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        expect(await previews.nth(i).locator('[class*="pui-"]').count(), `${path} example ${i + 1}`).toBeGreaterThan(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(360);
    }
  });

  test("the library's script runs: an indeterminate checkbox example is indeterminate", async ({ page }) => {
    await page.goto("/docs/v1/forms/checkbox");
    const box = page.locator("[data-example-preview] input[indeterminate]").first();
    await expect.poll(() => box.evaluate((el) => (el as HTMLInputElement).indeterminate)).toBe(true);
  });

  test("radio groups in different examples stay independent", async ({ page }) => {
    await page.goto("/docs/v1/forms/radio");
    // Polled: hydration replaces the previews' nodes once (v-html is re-assigned).
    const groups = () =>
      page.evaluate(() => {
        const examples = [...document.querySelectorAll("[data-example]")];
        const byName = new Map<string, Set<number>>();
        for (const radio of document.querySelectorAll<HTMLInputElement>("[data-example-preview] input[type=radio]")) {
          const example = examples.indexOf(radio.closest("[data-example]")!);
          byName.set(radio.name, (byName.get(radio.name) ?? new Set()).add(example));
        }
        return { names: byName.size, shared: [...byName.values()].filter((s) => s.size > 1).length };
      });
    await expect.poll(groups).toMatchObject({ shared: 0 });
    expect((await groups()).names).toBeGreaterThan(2);
  });
});
