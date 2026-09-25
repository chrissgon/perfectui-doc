// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// docs/ holds design exports and artifacts, not site code.
export default withNuxt({ ignores: ["docs/**"] });
