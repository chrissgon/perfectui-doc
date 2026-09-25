import { existsSync, readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { OUT, latestVersion, versions } from "./paths";


test.describe("documentation routes (REQ-1, REQ-11, AC-1)", () => {
  test("every version serves the page under its own segment", () => {
    for (const v of versions) {
      expect(existsSync(`${OUT}/docs/${v.id}/components/button/index.html`), v.id).toBe(true);
      expect(existsSync(`${OUT}/docs/${v.id}/index.html`), `${v.id} index`).toBe(true);
    }
  });

  test("no documentation file exists without a version segment", () => {
    const ids = new Set(versions.map((v) => v.id));
    const unversioned = readdirSync(`${OUT}/docs`).filter((name) => !ids.has(name));
    expect(unversioned).toEqual([]);
  });

  test("the page's title and description come from its frontmatter", async ({ page }) => {
    await page.goto("/docs/v1/components/button");
    await expect(page).toHaveTitle(/Button/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    // Meta content is plain text: the frontmatter's inline-code backticks are dropped (T-sh-5).
    expect(description).toMatch(/^The pui-btn class turns a/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Button");
  });

  test("an unknown version or page is not published", async ({ request }) => {
    expect((await request.get("/docs/v9/components/button")).status()).toBe(404);
    expect((await request.get("/docs/v1/components/nothing")).status()).toBe(404);
  });
});

test.describe("redirects for unversioned paths (REQ-1, REQ-5, AC-1, ADR-0005)", () => {
  test("_redirects sends 0.23 flat URLs to the same topic, then /docs to the latest major", () => {
    const file = `${OUT}/_redirects`;
    expect(existsSync(file)).toBe(true);
    const lines = readFileSync(file, "utf8").trim().split("\n");
    const latest = `/docs/${latestVersion.id}`;
    expect(lines).toContain(`/docs/button ${latest}/components/button 301`);
    expect(lines).toContain(`/docs/chip ${latest}/components/chip 301`);
    expect(lines.slice(-2)).toEqual([`/docs ${latest} 301`, `/docs/* ${latest}/:splat 301`]);
    expect(lines.filter((l) => l.includes("/.navigation"))).toEqual([]);
  });
});
