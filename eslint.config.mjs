// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// docs/ holds design exports and artifacts, not site code; .fixture-site is a generated copy.
export default withNuxt(
  { ignores: ["docs/**", ".fixture-site/**"] },
  // The fixture site's pages are Nuxt pages like app/pages (tests/fixtures/site replaces them).
  { files: ["tests/fixtures/site/app/pages/**/*.vue"], rules: { "vue/multi-word-component-names": "off" } },
);
