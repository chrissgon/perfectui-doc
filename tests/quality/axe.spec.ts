import { expect, test } from "@playwright/test";
import { withoutAcceptedTradeOff } from "../helpers/accepted";
import { axeViolations } from "../helpers/axe";

// 0 WCAG 2.2 AA violations but for the accepted trade-off: the Button page (content model NFR-3,
// AC-12, T-cm-20) and the landing (NFR-1, AC-11, T-sh-16), in both modes.
const pages = { "Button page": "/docs/v1/components/button", landing: "/" };

for (const [name, path] of Object.entries(pages)) for (const mode of ["light", "dark"] as const) {
  test(`the ${name} has no WCAG 2.2 AA violation in ${mode} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const violations = withoutAcceptedTradeOff(await axeViolations(page), mode);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
