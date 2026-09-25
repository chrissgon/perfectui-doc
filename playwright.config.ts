import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

// Browser, build and quality tests run against the static output of `bun run generate`.
export default defineConfig({
  testDir: "tests",
  testMatch: ["e2e/**/*.spec.ts", "build/**/*.spec.ts", "quality/**/*.spec.ts"],
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `node tests/helpers/static-server.mjs .output/public ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
});
