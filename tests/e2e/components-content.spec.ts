import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

// T-cm-18: the general and components pages as written from the library's documents.
const pages = ["general", "components"].flatMap((section) =>
  readdirSync(`content/v1/0${section === "general" ? 3 : 4}.${section}`)
    .filter((f) => f.endsWith(".md"))
    .map((f) => `/docs/v1/${section}/${f.replace(/^\d+\./, "").replace(/\.md$/, "")}`),
);

test.describe("general and components pages", () => {
  test("every example renders a pui- element, and no page scrolls sideways at 360 px", async ({ page }) => {
    expect(pages.length).toBe(13);
    await page.setViewportSize({ width: 360, height: 640 });
    for (const path of pages) {
      await page.goto(path);
      const previews = page.locator("[data-example-preview]");
      const count = await previews.count();
      for (let i = 0; i < count; i++) {
        expect(await previews.nth(i).locator('[class*="pui-"]').count(), `${path} example ${i + 1}`).toBeGreaterThan(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(360);
    }
  });

  test("the four examples the landing shows are named", async ({ page }) => {
    for (const name of ["modal", "dropdown", "tooltip", "accordion"]) {
      await page.goto(`/docs/v1/components/${name}`);
      await expect(page.locator('[data-example][name="basic"]'), name).toHaveCount(1);
    }
  });

  test("examples on one page never share an id", async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      const dupes = await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
        return ids.filter((id, i) => ids.indexOf(id) !== i);
      });
      expect(dupes, path).toEqual([]);
    }
  });

  test("the headings column highlights the heading scrolled into view (T-cm-11 review)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/docs/v1/components/button");
    const toc = page.getByRole("navigation", { name: "On this page" });
    // Put the heading 150 px below the top, inside the observer's band (80 px to 40% of the view).
    await page.evaluate(() => window.scrollTo(0, document.getElementById("disabled")!.getBoundingClientRect().top + scrollY - 150));
    await expect(toc.getByRole("link", { name: "Disabled" })).toHaveAttribute("aria-current", "location");
    await expect(toc.locator('[aria-current="location"]')).toHaveCount(1);
  });
});

test("an opened modal is centred in the viewport, under Tailwind's Preflight", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/docs/v1/components/modal");
  await page.locator("[data-example-preview]").first().getByRole("button", { name: "Delete project" }).click();
  const box = await page.locator("dialog[open]").boundingBox();
  expect(Math.abs(box!.x + box!.width / 2 - 640)).toBeLessThan(2);
  expect(Math.abs(box!.y + box!.height / 2 - 400)).toBeLessThan(2);
});

test("examples render as on a plain page: no prose styles, no Preflight", async ({ page }) => {
  await page.goto("/docs/v1/components/list");
  const preview = page.locator("[data-example-preview]");
  // The library's own list keeps the browser's markers (list.md: "No markers" needs a declaration).
  // Polled: hydration may replace the preview's nodes while they are read.
  const listStyle = (selector: string) => () => preview.locator(selector).first().evaluate((el) => getComputedStyle(el).listStyleType);
  await expect.poll(listStyle("ul")).toBe("disc");
  await expect.poll(listStyle('ul[style*="list-style: none"]')).toBe("none");
  // A bare element keeps the browser's default margin instead of Preflight's 0 or the prose's.
  await page.goto("/docs/v1/components/card");
  const p = page.locator("[data-example-preview] p").first();
  if (await p.count()) expect(await p.evaluate((el) => getComputedStyle(el).marginTop)).not.toBe("0px");
});
