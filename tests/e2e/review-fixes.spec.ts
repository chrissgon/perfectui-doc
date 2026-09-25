import { expect, test, type Page } from "@playwright/test";

// The user's review of the branch deploy on 2026-09-25: twelve adjustments, one check each where
// the adjustment is observable.

// Code never scrolls sideways: long lines wrap (items 1 and 6). Only the landing's overlays
// showcase caps its height and scrolls vertically (the user's follow-up).
async function scrollingCode(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("pre, [data-example-code], [data-demo] code")]
      .filter((el) => el.offsetParent !== null && !el.closest("#overlays"))
      .filter((el) => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)
      .map((el) => el.textContent!.slice(0, 40)),
  );
}

for (const width of [360, 1280]) {
  test(`at ${width} px no code block scrolls on the landing or a documentation page`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/docs/v1/components/modal", "/docs/v1/getting-started/installation"]) {
      await page.goto(path);
      expect(await scrollingCode(page), path).toEqual([]);
    }
  });
}

test("the header's icon buttons are 36 px square below 1024 px and the menu dots are visible (item 3)", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const search = page.getByRole("button", { name: /^Search/ });
  const box = await search.boundingBox();
  expect([Math.round(box!.width), Math.round(box!.height)]).toEqual([36, 36]);
  const dots = page.getByRole("button", { name: "Menu" }).locator("svg");
  expect(Number(await dots.getAttribute("stroke-width"))).toBeGreaterThanOrEqual(3);
});

test("the Tailwind demo keeps its height while the class is typed at 360 px (item 4)", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const code = page.locator("#tailwind [data-demo] code");
  await code.scrollIntoViewIfNeeded();
  const heights = new Set<number>();
  for (let i = 0; i < 25; i++) {
    heights.add(Math.round((await code.boundingBox())!.height));
    await page.waitForTimeout(120);
  }
  expect([...heights]).toHaveLength(1);
});

test("a struck item that wraps is struck on every line (item 5)", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const wrapped = page.locator("#nothing-to-undo [data-strike]").filter({ hasText: "no initialiser" });
  await wrapped.scrollIntoViewIfNeeded();
  const strike = wrapped.locator(".strike");
  // The line is the inline box's background, which covers each of its line boxes.
  expect(await strike.evaluate((el) => el.getClientRects().length)).toBeGreaterThan(1);
  expect(await strike.evaluate((el) => getComputedStyle(el).backgroundSize)).toMatch(/^100% /);
});

test("Docs opens the first page, not an index (item 7)", async ({ page }) => {
  await page.goto("/docs/v1");
  await expect(page).toHaveURL(/\/docs\/v1\/getting-started\/installation$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Installation");
});

test("the sidebar sections and On this page are Perfect UI accordion items (items 8 and 10)", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/docs/v1/getting-started/typescript");
  const nav = page.getByRole("navigation", { name: "Documentation" });
  await expect(nav.locator(".pui-accordion > details.pui-accordion-item")).toHaveCount(5);
  const toc = page.locator(".pui-accordion > details.pui-accordion-item[data-toc-disclosure]");
  await expect(toc).toBeVisible();
  await expect(nav.locator("summary").first()).toHaveText("Getting Started");
  await nav.locator("summary").first().click();
  await expect(nav.getByRole("link", { name: "Installation" })).toBeHidden();
});

test("below 1280 px the content fills its column (item 9)", async ({ page }) => {
  for (const width of [950, 1100]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/docs/v1/getting-started/typescript");
    const article = page.locator("article").first();
    const column = await article.evaluate((el) => [el.getBoundingClientRect().width, el.parentElement!.clientWidth]);
    expect(Math.round(column[0]!), `${width}`).toBe(Math.round(column[1]!));
  }
});

test("the overlays showcase gives its code one height and scrolls it vertically, never sideways", async ({ page }) => {
  await page.goto("/");
  const panels = page.locator("#overlays [data-example-code]");
  await expect(panels).toHaveCount(4);
  for (const panel of await panels.all()) {
    const [scrollW, clientW, clientH] = await panel.evaluate((el) => [el.scrollWidth, el.clientWidth, el.clientHeight]);
    expect(scrollW).toBeLessThanOrEqual(clientW);
    expect(clientH).toBeLessThanOrEqual(224);
    expect(Math.round((await panel.boundingBox())!.height)).toBe(224);
    await expect(panel).toHaveAttribute("tabindex", "0");
  }
  const modal = panels.first();
  expect(await modal.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
  // Cells in a row line up: the Tooltip and Accordion previews are the same height.
  const previews = page.locator("#overlays [data-example-preview]");
  const heights = await previews.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));
  expect(heights[2]).toBe(heights[3]);
  expect(heights[0]).toBe(heights[1]);
});

test.describe("copy icon inside code (user review 2026-09-25)", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("a documentation code block copies its code and shows a check", async ({ page }) => {
    await page.goto("/docs/v1/getting-started/typescript");
    const block = page.locator(".doc-prose > .code-block").first();
    await block.getByRole("button", { name: "Copy code" }).click();
    await expect(block.getByRole("button", { name: "Copied" })).toHaveClass(/\bpui-success\b/);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('from "@chrissgon/perfectui/mode"');
  });

  test("each showcase cell copies its snippet", async ({ page }) => {
    await page.goto("/");
    const cells = page.locator("#overlays [data-example]");
    await cells.nth(3).getByRole("button", { name: "Copy code" }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('class="pui-accordion"');
  });

  test("example blocks with tabs keep their Copy and get no second icon", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    await expect(page.locator("[data-example]").first().getByRole("button", { name: "Copy code" })).toHaveCount(0);
  });
});

test("the showcase's code panel is divided by the border colour, not the text colour", async ({ page }) => {
  await page.goto("/");
  const divider = page.locator("#overlays [data-example-code]").first().locator("..");
  const [border, expected] = await divider.evaluate((el) => {
    const probe = document.createElement("div");
    probe.style.color = "var(--pui-border)";
    el.append(probe);
    const colour = getComputedStyle(probe).color;
    probe.remove();
    return [getComputedStyle(el).borderTopColor, colour];
  });
  expect(border).toBe(expected);
});
