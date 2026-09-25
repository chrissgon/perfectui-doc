import { expect, test } from "@playwright/test";
import { axeViolations } from "../helpers/axe";
import { lighthouseScores } from "../helpers/lighthouse";

test("the generated home page renders with the library's button", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const bg = await page.locator("#hero").getByRole("link", { name: "Get started" }).evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).not.toBe("rgba(0, 0, 0, 0)");
});

// The helper's job is to find violations; zero violations is the quality tasks' check
// (T-cm-20, T-sh-16), not the harness's.
test("the axe helper runs the WCAG 2.2 AA rules", async ({ page }) => {
  await page.goto("/");
  const violations = await axeViolations(page);
  expect(Array.isArray(violations)).toBe(true);
  const levels = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
  for (const v of violations) expect(v.tags.some((t) => levels.includes(t))).toBe(true);
});

test("the Lighthouse helper returns mobile scores", async ({ baseURL }) => {
  test.setTimeout(120_000);
  const scores = await lighthouseScores(`${baseURL}/`);
  expect(scores.performance).toBeGreaterThan(0);
  expect(scores.accessibility).toBeGreaterThan(0);
});
