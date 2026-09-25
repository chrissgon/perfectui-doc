import { readFileSync } from "node:fs";
import { landingHydrated } from "../helpers/hydrated";
import { expect, test, type Page } from "@playwright/test";

const shapes = [["button", "btn"], ["chip", "chip"], ["badge", "badge"]] as const;
const styles = ["solid", "soft", "outline", "link"];
const colours = ["theme", "success", "error", "warn", "muted", "surface", "inverse"];

const picker = (page: Page) => page.locator("#classes");
const live = (page: Page) => picker(page).locator("[data-live]");

// REQ-5, AC-5: the three-class model, live.
test.describe("class picker", () => {
  test("every shape, style and colour combination renders the matching classes", async ({ page }) => {
    await page.goto("/");
    for (const [label, shape] of shapes) {
      await picker(page).getByRole("button", { name: label, exact: true }).click();
      await expect(picker(page).getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-pressed", "true");
      for (const style of styles) {
        for (const colour of colours) {
          const cell = picker(page).getByRole("button", { name: `${style} ${colour}`, exact: true });
          await expect(cell).toHaveClass(`pui-${shape} pui-${style} pui-${colour}`);
        }
      }
      for (const style of styles) {
        await picker(page).getByRole("button", { name: style, exact: true }).click();
        for (const colour of colours) {
          await picker(page).getByRole("button", { name: colour, exact: true }).click();
          await expect(live(page)).toHaveClass(`pui-${shape} pui-${style} pui-${colour}`);
          await expect(picker(page).locator("code")).toContainText(`pui-${shape} pui-${style} pui-${colour}`);
        }
      }
    }
  });

  test("a matrix cell picks its style and colour and highlights the changed token", async ({ page }) => {
    await page.goto("/");
    await picker(page).getByRole("button", { name: "soft error", exact: true }).click();
    await expect(live(page)).toHaveClass("pui-btn pui-soft pui-error");
    await expect(picker(page).getByRole("button", { name: "soft", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(picker(page).locator("code [data-changed]")).toHaveCount(1);
  });

  test("without JavaScript the picker shows its default combination", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(live(page)).toHaveClass("pui-btn pui-solid pui-theme");
    await context.close();
  });
});

test.describe("mode and theme demo", () => {
  test("the section demo changes only its section", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const section = page.locator("#mode-theme");
    const outside = page.locator("#hero a.pui-btn.pui-solid.pui-theme");
    const outsideBg = await outside.evaluate((el) => getComputedStyle(el).backgroundColor);
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await expect(section).toHaveAttribute("data-pui-mode", "dark");
    const dark = section.getByRole("checkbox", { name: "Dark" });
    await expect(dark).toBeChecked();
    await dark.uncheck();
    await expect(section).toHaveAttribute("data-pui-mode", "light");
    await expect(section.locator("pre")).toContainText('data-pui-mode="light"');

    await section.getByRole("radio", { name: "#16a34a" }).check();
    await expect(section.locator("pre")).toContainText("--pui-theme: #16a34a;");
    await expect.poll(() => section.getByRole("button", { name: "Create" }).evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgb(22, 163, 74)");

    expect(await page.evaluate(() => document.documentElement.getAttribute("data-pui-mode"))).toBeNull();
    expect(await page.evaluate(() => document.documentElement.style.getPropertyValue("--pui-theme"))).toBe("");
    expect(await outside.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(outsideBg);
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(bodyBg);
  });
});

// REQ-5, AC-5, ADR-0008: the overlays come from the documentation's named examples and work
// with no script of the landing's.
test.describe("overlays showcase", () => {
  const overlays = (page: Page) => page.locator("#overlays");

  test("renders the four named examples from their documentation pages", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    await expect(overlays(page).locator("[data-example]")).toHaveCount(4);
    for (const label of ["Modal", "Dropdown", "Tooltip", "Accordion"]) {
      await expect(overlays(page).getByText(label, { exact: true })).toBeVisible();
    }
    await expect(overlays(page).getByText("no JavaScript of yours")).toHaveCount(4);
  });

  test("the modal opens and closes natively", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    await overlays(page).getByRole("button", { name: "Delete project" }).click();
    const dialog = page.locator("#overlays dialog[open]");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("the dropdown opens and closes natively", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    await overlays(page).getByRole("button", { name: "Menu" }).click();
    const panel = overlays(page).locator(".pui-dropdown:popover-open");
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
  });

  test("the tooltip opens on focus and closes on blur", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    await overlays(page).getByRole("button", { name: "?" }).focus();
    const tip = overlays(page).locator(".pui-tooltip:popover-open");
    await expect(tip).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tip).toHaveCount(0);
  });

  test("the accordion opens and closes natively", async ({ page }) => {
    await page.goto("/");
    await landingHydrated(page);
    const item = overlays(page).locator("details").first();
    const open = () => item.evaluate((el) => (el as HTMLDetailsElement).open);
    const before = await open();
    await item.locator("summary").click();
    expect(await open()).toBe(!before);
    await item.locator("summary").click();
    expect(await open()).toBe(before);
  });

  test("the landing holds no example HTML of its own", () => {
    const source = readFileSync("app/components/landing/OverlaysShowcase.vue", "utf8");
    // Labels may name "<dialog>"; markup would need closing tags or overlay attributes.
    expect(source).not.toMatch(/<\/(dialog|details)>|popover=|popovertarget=|commandfor=|interestfor=/);
  });
});
