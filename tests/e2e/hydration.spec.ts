import { expect, test } from "@playwright/test";

// Prerendered pages hydrate without a mismatch: a mismatch makes Vue rebuild the affected DOM,
// which once turned every documentation h2 into an h3 after load (T-sh-16).
const pages = ["/", "/docs/v1", "/docs/v1/components/button", "/docs/v1/getting-started/tailwind-css", "/docs/v1/forms/checkbox"];

for (const path of pages) {
  test(`${path} hydrates without a mismatch and keeps its headings`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
    const server = await (await page.request.get(path)).text();
    const serverH2 = (server.match(/<h2[\s>]/g) ?? []).length;
    expect(await page.locator("h2").count()).toBe(serverH2);
  });
}
