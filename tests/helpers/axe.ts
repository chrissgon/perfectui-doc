import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

/** WCAG 2.2 AA violations on the current page (PRD M-4). */
export async function axeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return result.violations;
}
