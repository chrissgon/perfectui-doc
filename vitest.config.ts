import { defineConfig } from "vitest/config";

// Unit tests and repository checks; browser tests run in Playwright over the generated site.
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.spec.ts", "tests/repo/**/*.spec.ts"],
  },
});
