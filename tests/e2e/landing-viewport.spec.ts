import { expect, test, type Locator } from "@playwright/test";
import { installCommand } from "../../app/site.config";

const inViewport = async (locator: Locator, width: number, height: number) => {
  const box = await locator.boundingBox();
  expect(box, "rendered").not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(height);
};

// REQ-1, AC-1: what perfectui is, the install command and the primary call to action fit the
// first screen on a phone and on a laptop.
for (const [width, height] of [[360, 640], [1280, 800]] as const) {
  test(`the hero's essentials are inside ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const hero = page.locator("#hero");
    await inViewport(hero.getByRole("heading", { level: 1, name: "The bare minimum for elegant interfaces." }), width, height);
    await inViewport(hero.getByText("Three classes, no framework,").filter({ visible: true }), width, height);
    await inViewport(hero.getByRole("textbox", { name: "Install command" }), width, height);
    await expect(hero.getByRole("textbox", { name: "Install command" })).toHaveValue(installCommand("npm"));
    const cta = hero.getByRole("link", { name: "Get started" });
    await inViewport(cta, width, height);
    await expect(cta).toHaveAttribute("href", "/docs/v1");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}

test("the size in the hero comes from the build's measurement", async ({ page, request }) => {
  const size = await (await request.get("/api/library-size.json")).json();
  await page.goto("/");
  await expect(page.locator("#hero")).toContainText(`${(size.css / 1000).toFixed(1)} kB`);
});

test("the class cycle renders its first combination complete without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  const demo = page.locator("#hero [data-demo]");
  await expect(demo.locator("code")).toContainText('class="pui-btn pui-solid pui-theme"');
  await expect(demo.locator("button.pui-btn.pui-solid.pui-theme")).toBeVisible();
  await context.close();
});

test("with reduced motion the cycle stays on its final state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const code = page.locator("#hero [data-demo] code");
  await page.waitForTimeout(1500);
  await expect(code).toContainText('class="pui-btn pui-solid pui-theme"');
});

test("with motion the cycle types the classes", async ({ page }) => {
  await page.goto("/");
  const code = page.locator("#hero [data-demo] code");
  await expect(code).not.toContainText('class="pui-btn pui-solid pui-theme"', { timeout: 3000 });
});
