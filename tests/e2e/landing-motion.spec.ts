import { expect, test, type Page } from "@playwright/test";

const tailwindButton = (page: Page) => page.locator("#tailwind [data-demo] button");
const widths = (page: Page) =>
  tailwindButton(page).evaluate((el) => [el.getBoundingClientRect().width, el.parentElement!.clientWidth - 32]);

async function tailwindFinal(page: Page) {
  await expect(page.locator("#tailwind [data-demo] code")).toContainText('class="pui-btn pui-solid pui-theme w-full"');
  await expect(tailwindButton(page)).toHaveClass(/\bw-full\b/);
  const [button, box] = await widths(page);
  expect(Math.round(button!)).toBe(Math.round(box!));
}

async function strikesFinal(page: Page) {
  const items = page.locator("#nothing-to-undo [data-strike]");
  await expect(items).toHaveCount(5);
  for (const item of await items.all()) await expect(item).toHaveAttribute("data-struck", "true");
}

// REQ-4 and the handoff's Motion table: final states without motion, and after the timings.
test.describe("Tailwind and nothing-to-undo sections", () => {
  test("with reduced motion both render their final states", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#tailwind").scrollIntoViewIfNeeded();
    await tailwindFinal(page);
    await page.locator("#nothing-to-undo").scrollIntoViewIfNeeded();
    await strikesFinal(page);
  });

  test("with motion the final states match after the timings", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#nothing-to-undo [data-struck=false]")).toHaveCount(5);
    await page.locator("#tailwind [data-demo]").scrollIntoViewIfNeeded();
    // 500 ms delay, then " w-full" at 90 ms per character; held for 2600 ms.
    await expect(tailwindButton(page)).toHaveClass(/\bw-full\b/, { timeout: 3000 });
    await tailwindFinal(page);
    for (const item of await page.locator("#nothing-to-undo [data-strike]").all()) {
      await item.scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 120);
    }
    await expect(page.locator("#nothing-to-undo [data-struck=true]")).toHaveCount(5, { timeout: 5000 });
  });

  test("the copy is messaging's and the strike items come from it", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#tailwind")).toContainText("One @layer line keeps Tailwind's reset below perfectui and every utility above it.");
    await expect(page.locator("#tailwind")).not.toContainText("unlayered");
    await expect(page.locator("#nothing-to-undo [data-strike]").first()).toHaveText("No reset to override,");
    await expect(page.locator("#nothing-to-undo")).toContainText("ESM only, nothing on window.");
  });
});
