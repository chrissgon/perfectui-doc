import { expect, test, type Page } from "@playwright/test";
import { installCommand } from "../../app/site.config";

// The hero's command; the install section has its own (tested in landing-migration.spec.ts).
const hero = (page: Page) => page.locator("#hero");
const clipboard = (page: Page) => page.evaluate(() => navigator.clipboard.readText());
const denyClipboard = (page: Page) =>
  page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) },
    });
  });

test.describe("copy command (REQ-3, EDGE-9, AC-3)", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("a click copies the command and reports Copied for at least 1 s", async ({ page }) => {
    await page.goto("/");
    await hero(page).getByRole("button", { name: "Copy install command" }).click();
    expect(await clipboard(page)).toBe(installCommand("npm"));
    const copied = hero(page).getByRole("button", { name: "Copied" });
    await expect(copied).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(copied).toBeVisible();
    await expect(hero(page).getByRole("status").filter({ hasText: "Copied" })).toHaveCount(1);
    await expect(hero(page).getByRole("button", { name: "Copy install command" })).toBeVisible({ timeout: 2000 });
  });

  test("the keyboard copies the command", async ({ page }) => {
    await page.goto("/");
    await hero(page).getByRole("button", { name: "Copy install command" }).focus();
    await page.keyboard.press("Enter");
    expect(await clipboard(page)).toBe(installCommand("npm"));
    await expect(hero(page).getByRole("button", { name: "Copied" })).toBeFocused();
  });

  test("without clipboard access the command is selected, with no dialog", async ({ page }) => {
    await denyClipboard(page);
    let dialogs = 0;
    page.on("dialog", () => dialogs++);
    await page.goto("/");
    await hero(page).getByRole("button", { name: "Copy install command" }).click();
    const selected = await page.evaluate(() => {
      const el = document.activeElement as HTMLInputElement;
      return el.value.slice(el.selectionStart ?? 0, el.selectionEnd ?? 0);
    });
    expect(selected).toBe(installCommand("npm"));
    expect(dialogs).toBe(0);
  });

  test("the example block selects its code without clipboard access (T-cm-12 review)", async ({ page }) => {
    await denyClipboard(page);
    await page.goto("/docs/v1/components/button");
    const example = page.locator("[data-example]").first();
    await example.getByRole("button", { name: "Copy" }).click();
    await expect(example.getByRole("tab", { name: "Code" })).toHaveAttribute("aria-selected", "true");
    const selection = await page.evaluate(() => window.getSelection()?.toString() ?? "");
    expect(selection).toContain('class="pui-btn pui-solid pui-theme"');
  });

  test("without JavaScript the command shows and no copy control renders", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(hero(page).getByRole("textbox", { name: "Install command" })).toHaveValue(installCommand("npm"));
    await expect(hero(page).getByRole("button", { name: /Copy install command|Copied/ })).toHaveCount(0);
    await context.close();
  });
});
