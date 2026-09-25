import { expect, test } from "@playwright/test";
import { lighthouseScores } from "../helpers/lighthouse";

// NFR-3, AC-12 (content model) and PRD M-4: mobile Lighthouse on the Button page's static file.
test("the Button page scores performance ≥ 90 and accessibility ≥ 95 on mobile", async ({ baseURL }) => {
  test.setTimeout(180_000);
  const scores = await lighthouseScores(`${baseURL}/docs/v1/components/button`, 3);
  expect(scores.performance).toBeGreaterThanOrEqual(90);
  expect(scores.accessibility).toBeGreaterThanOrEqual(95);
});

// NFR-1, AC-11: the same bar on the landing.
test("the landing scores performance ≥ 90 and accessibility ≥ 95 on mobile", async ({ baseURL }) => {
  test.setTimeout(180_000);
  const scores = await lighthouseScores(`${baseURL}/`, 3);
  expect(scores.performance).toBeGreaterThanOrEqual(90);
  expect(scores.accessibility).toBeGreaterThanOrEqual(95);
});

// Migration guide NFR-1, AC-6. Not met yet: the median is 89 on the local CDN-like server (FCP
// 2.8 s under simulated slow 4G), where the runtime and fonts share the link with a long page.
// Blocked in T-mg-5 until the user decides (deploy preview measurement, or partial hydration of
// documentation prose); marked fixme so every run reports it.
test.fixme("the migration guide scores performance ≥ 90 and accessibility ≥ 95 on mobile", async ({ baseURL }) => {
  test.setTimeout(180_000);
  const scores = await lighthouseScores(`${baseURL}/docs/v1/getting-started/migrating-from-0-23`, 3);
  expect(scores.performance).toBeGreaterThanOrEqual(90);
  expect(scores.accessibility).toBeGreaterThanOrEqual(95);
});
