import { existsSync, readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { site } from "../../app/site.config";
import { OUT, latestVersion, versions } from "./paths";
import { pageFile } from "../helpers/page-file";


test.describe("documentation routes (REQ-1, REQ-11, AC-1)", () => {
  test("every version serves the page under its own segment", () => {
    for (const v of versions) {
      expect(existsSync(pageFile(OUT, `/docs/${v.id}/components/button`)), v.id).toBe(true);
      expect(existsSync(pageFile(OUT, `/docs/${v.id}`)), `${v.id} index`).toBe(true);
    }
  });

  test("no documentation file exists without a version segment", () => {
    const ids = new Set(versions.map((v) => v.id));
    const unversioned = readdirSync(`${OUT}/docs`).filter((name) => !ids.has(name.replace(/\.html$/, "")));
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
  test("_redirects sends each version index and /docs to a first page, with no rule for a 0.23 flat URL (AC-7)", () => {
    const file = `${OUT}/_redirects`;
    expect(existsSync(file)).toBe(true);
    const lines = readFileSync(file, "utf8").trim().split("\n");
    const latest = `/docs/${latestVersion.id}`;
    // One rule per 0.23 page is gone (spec library-docs-and-versions REQ-11): only the three kinds remain.
    expect(lines.filter((l) => /^\/docs\/[a-z-]+ /.test(l) && !/^\/docs\/v\d+ /.test(l))).toEqual([]);
    // The alias hosts come first (search engines, 2026-09-26), then one rule per version, then two.
    expect(lines.slice(0, site.aliasHosts.length)).toEqual(site.aliasHosts.map((h) => `https://${h}/* ${site.url}/:splat 301!`));
    expect(lines).toHaveLength(site.aliasHosts.length + versions.length + 2);
    // The index is forced: the build writes it as a redirect page, which would be served first.
    expect(lines).toContain(`${latest} ${latest}/getting-started/installation 301!`);
    expect(lines).toContain("/docs/v0 /docs/v0/components/button 301!");
    expect(lines.slice(-2)).toEqual([`/docs ${latest}/getting-started/installation 301`, `/docs/* ${latest}/:splat 301`]);
    expect(lines.filter((l) => l.includes("/.navigation"))).toEqual([]);
  });
});
