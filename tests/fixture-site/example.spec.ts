import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT } from "./paths";

const SNIPPET = '<button class="pui-btn pui-solid pui-theme">Solid</button>';
const PAGE = "/docs/v1/components/button";

test.describe("example block (REQ-3, REQ-10, EDGE-7, AC-3)", () => {
  test("the static HTML holds the rendered preview and the highlighted code", () => {
    const html = readFileSync(`${OUT}/docs/v1/components/button/index.html`, "utf8");
    const example = html.slice(html.indexOf("data-example"));
    expect(example).toContain(SNIPPET.replace("</button>", ""));
    expect(example).toMatch(/<pre[^>]*class="[^"]*shiki/);
  });

  test("Preview shows by default; the Code tab shows the same snippet with its language", async ({ page }) => {
    await page.goto(PAGE);
    const block = page.locator("[data-example]").first();
    const button = block.locator("[data-example-preview] .pui-btn");
    await expect(button).toHaveText("Solid");
    expect(await button.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
    await expect(block.locator("[data-example-code]")).toBeHidden();
    await block.getByRole("tab", { name: "Code" }).click();
    await expect(block.locator("[data-example-code] pre")).toHaveText(SNIPPET);
    await expect(block.getByText("html", { exact: true })).toBeVisible();
  });

  test("arrow keys move between the tabs", async ({ page }) => {
    await page.goto(PAGE);
    const block = page.locator("[data-example]").first();
    await block.getByRole("tab", { name: "Preview" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(block.getByRole("tab", { name: "Code" })).toBeFocused();
    await expect(block.getByRole("tab", { name: "Code" })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowLeft");
    await expect(block.getByRole("tab", { name: "Preview" })).toHaveAttribute("aria-selected", "true");
  });

  test("Copy puts the snippet in the clipboard and says Copied", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(PAGE);
    const block = page.locator("[data-example]").first();
    await block.getByRole("button", { name: "Copy" }).press("Enter");
    await expect(block.getByRole("button", { name: "Copied" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(SNIPPET);
    await expect(block.getByRole("button", { name: "Copy" })).toBeVisible({ timeout: 3000 });
  });

  test("a long snippet scrolls inside its box and never widens the page", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(PAGE);
    const block = page.locator("[data-example]").nth(1);
    await block.getByRole("tab", { name: "Code" }).click();
    const widths = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(widths[0]).toBe(widths[1]);
  });

  test("notes and warnings render as callouts", async ({ page }) => {
    await page.goto(PAGE);
    await expect(page.locator("[data-callout=note]")).toContainText("defined against the page");
    await expect(page.locator("[data-callout=warning]")).toContainText("has no");
  });
});
