// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// docs/ holds design exports and artifacts, not site code; .fixture-site is a generated copy.
export default withNuxt({ ignores: ["docs/**", ".fixture-site/**"] });
