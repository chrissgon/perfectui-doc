import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const SNIPPET = '<button class="pui-btn pui-solid pui-theme">Solid</button>';

// ADR-0002 spike: one fenced snippet yields a live preview and build-time highlighted code.
test.describe("example block (REQ-3, REQ-10, AC-3)", () => {
  test("the static HTML holds the rendered preview and the highlighted code", () => {
    const html = readFileSync(".output/public/docs/v1/components/button/index.html", "utf8");
    const example = html.slice(html.indexOf('data-example'));
    expect(example).toContain(SNIPPET.replace("</button>", "")); // the live element
    expect(example).toMatch(/<pre[^>]*class="[^"]*shiki/); // Shiki markup
  });

  test("the preview renders a real pui-btn and the code shows the same snippet", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    const block = page.locator("[data-example]").first();
    const button = block.locator("[data-example-preview] .pui-btn");
    await expect(button).toHaveText("Solid");
    const bg = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    await expect(block.locator("[data-example-code] pre")).toHaveText(SNIPPET);
  });
});
