import { expect, test } from "@playwright/test";
import { lighthouseScores } from "../helpers/lighthouse";

// NFR-3, AC-12 (content model) and PRD M-4: mobile Lighthouse on the Button page's static file.
test("the Button page scores performance ≥ 90 and accessibility ≥ 95 on mobile", async ({ baseURL }) => {
  test.setTimeout(180_000);
  const scores = await lighthouseScores(`${baseURL}/docs/v1/components/button`);
  expect(scores.performance).toBeGreaterThanOrEqual(90);
  expect(scores.accessibility).toBeGreaterThanOrEqual(95);
});
