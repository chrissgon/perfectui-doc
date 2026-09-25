import { expect, test, type Page } from "@playwright/test";

const attr = (page: Page) => page.evaluate(() => document.documentElement.getAttribute("data-pui-mode"));
const bodyColor = (page: Page) => page.evaluate(() => getComputedStyle(document.body).color);
const darkClasses = (page: Page) =>
  page.evaluate(() => document.documentElement.classList.contains("dark") || document.querySelector(".dark") !== null);
const toggle = (page: Page) => page.getByRole("button", { name: /^Switch to (light|dark|system) mode$/ });

test.describe("mode before first paint (REQ-8, EDGE-4, EDGE-5, AC-8)", () => {
  for (const path of ["/", "/docs/v1/components/button"]) {
    test(`the mode script precedes every stylesheet on ${path}`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      const script = html.indexOf("pui-mode=(light|dark)");
      // The first CSS of the page, linked or inlined (the stylesheet is inlined since T-cm-20).
      const stylesheet = html.search(/<link[^>]+rel="stylesheet"|<style[\s>]/);
      expect(script).toBeGreaterThan(-1);
      expect(stylesheet).toBeGreaterThan(-1);
      expect(script).toBeLessThan(stylesheet);
    });
  }

  test("no cookie leaves the attribute absent and follows prefers-color-scheme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    expect(await attr(page)).toBeNull();
    const light = await bodyColor(page);
    await page.emulateMedia({ colorScheme: "dark" });
    expect(await attr(page)).toBeNull();
    expect(await bodyColor(page)).not.toBe(light);
    await expect(toggle(page)).toHaveAttribute("data-mode", "system");
  });

  test("a stored cookie renders that mode against the system preference", async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "pui-mode", value: "dark", url: baseURL! }]);
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/docs/v1/components/button");
    expect(await attr(page)).toBe("dark");
    await expect(toggle(page)).toHaveAttribute("data-mode", "dark");
    await expect(toggle(page)).toHaveAccessibleName("Switch to system mode");
  });

  test("a session colour is applied by the head script", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => sessionStorage.setItem("pui-theme", "#7c3aed"));
    await page.reload();
    const theme = await page.evaluate(() => document.documentElement.style.getPropertyValue("--pui-theme"));
    expect(theme).toBe("#7c3aed");
  });

  test("the toggle cycles light, dark, system through setMode, never with a dark class", async ({ page, context }) => {
    await page.goto("/");
    const button = toggle(page);
    await expect(button).toHaveAttribute("data-mode", "system");
    const cookie = async () => (await context.cookies()).find((c) => c.name === "pui-mode")?.value;

    await button.click();
    await expect(button).toHaveAttribute("data-mode", "light");
    expect(await attr(page)).toBe("light");
    expect(await cookie()).toBe("light");
    expect(await darkClasses(page)).toBe(false);

    await button.click();
    await expect(button).toHaveAttribute("data-mode", "dark");
    expect(await attr(page)).toBe("dark");
    expect(await cookie()).toBe("dark");
    expect(await darkClasses(page)).toBe(false);

    await button.press("Enter");
    await expect(button).toHaveAttribute("data-mode", "system");
    expect(await attr(page)).toBeNull();
    expect(await cookie()).toBeUndefined();
    expect(await darkClasses(page)).toBe(false);
    await expect(button).toHaveAccessibleName("Switch to light mode");
  });
});
