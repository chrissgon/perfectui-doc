import { expect, test } from "@playwright/test";
import { lighthouseScores } from "../helpers/lighthouse";

// On a CI runner the local simulation sits near its floor, so CI measures the deploy instead
// (`SITE_URL`, set by the workflow's lighthouse job); locally both work.
test.skip(!!process.env.CI && !process.env.SITE_URL, "CI measures the deployed preview, not the runner");

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

// Migration guide NFR-1, AC-6. Verified on the host instead (user's decision, T-mg-5): on the
// Netlify branch deploy the guide scores 99 (median of 3) once the trailing-slash defect was fixed;
// the local simulation reads 89 for this long page. Kept as fixme so every run shows the gap
// between the local proxy and the host.
test.fixme("the migration guide scores performance ≥ 90 and accessibility ≥ 95 on mobile", async ({ baseURL }) => {
  test.setTimeout(180_000);
  const scores = await lighthouseScores(`${baseURL}/docs/v1/getting-started/migrating-from-0-x`, 3);
  expect(scores.performance).toBeGreaterThanOrEqual(90);
  expect(scores.accessibility).toBeGreaterThanOrEqual(95);
});
