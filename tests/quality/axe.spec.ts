import { expect, test } from "@playwright/test";
import { withoutAcceptedTradeOff } from "../helpers/accepted";
import { axeViolations } from "../helpers/axe";

const PAGE = "/docs/v1/components/button";

// NFR-3, AC-12 (content model): 0 WCAG 2.2 AA violations, but for the accepted trade-off.
for (const mode of ["light", "dark"] as const) {
  test(`the Button page has no WCAG 2.2 AA violation in ${mode} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    await page.goto(PAGE);
    await page.waitForLoadState("networkidle");
    const violations = withoutAcceptedTradeOff(await axeViolations(page), mode);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
