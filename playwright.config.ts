import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const FIXTURE_PORT = 4174;

// Browser and build tests run against static output: the production site (`bun run generate`
// first) and the fixture site built from tests/fixtures/site by its web server.
export default defineConfig({
  testDir: "tests",
  testMatch: ["e2e/**/*.spec.ts", "build/**/*.spec.ts", "quality/**/*.spec.ts", "fixture-site/**/*.spec.ts", "slow/**/*.spec.ts"],
  fullyParallel: true,
  reporter: "list",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT}` },
      testIgnore: ["slow/**", "fixture-site/**", "quality/**"],
    },
    // Lighthouse and axe run after the other browser tests, one at a time, so no parallel test
    // competes for the CPU during a measurement.
    {
      name: "quality",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT}` },
      testMatch: ["quality/**/*.spec.ts"],
      dependencies: ["chromium", "fixtures"],
      fullyParallel: false,
      workers: 1,
    },
    // Content-model features (badges, pages without headings, long snippets, a second version)
    // run against fixture pages, not against the published documentation.
    {
      name: "fixtures",
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${FIXTURE_PORT}` },
      testMatch: ["fixture-site/**/*.spec.ts"],
    },
    // Full builds of a project copy; run with `bun run test:slow`.
    { name: "slow", testMatch: ["slow/**/*.spec.ts"] },
  ],
  webServer: [
    {
      command: `node tests/helpers/static-server.mjs .output/public ${PORT}`,
      url: `http://localhost:${PORT}/`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `node tests/helpers/fixture-site.mjs ${FIXTURE_PORT}`,
      url: `http://localhost:${FIXTURE_PORT}/`,
      reuseExistingServer: false,
      timeout: 240_000,
    },
  ],
});
