import { expect, test } from "@playwright/test";
import { withoutAcceptedTradeOff } from "../helpers/accepted";
import { axeViolations } from "../helpers/axe";
import { openSearch, results, searchInput } from "../helpers/search";

// 0 WCAG 2.2 AA violations but for the accepted trade-off: the Button page (content model NFR-3,
// AC-12, T-cm-20), the landing (NFR-1, AC-11, T-sh-16) and the migration guide (AC-6, T-mg-5),
// in both modes.
const pages = { "Button page": "/docs/v1/components/button", landing: "/", "migration guide": "/docs/v1/getting-started/migrating-from-0-x" };

for (const [name, path] of Object.entries(pages)) for (const mode of ["light", "dark"] as const) {
  test(`the ${name} has no WCAG 2.2 AA violation in ${mode} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const violations = withoutAcceptedTradeOff(await axeViolations(page), mode);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}

// Search NFR-3, AC-10: the page with the search dialog open and results showing.
for (const mode of ["light", "dark"] as const) {
  test(`the search dialog with results has no WCAG 2.2 AA violation in ${mode} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    await openSearch(page, "/docs/v1/components/button");
    await searchInput(page).fill("modal");
    await expect(results(page).first()).toBeVisible();
    const violations = withoutAcceptedTradeOff(await axeViolations(page), mode);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
