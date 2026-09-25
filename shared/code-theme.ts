/**
 * Shiki theme whose colours are the site's code variables (ADR-0006), so highlighted code
 * follows `data-pui-mode` without a rebuild. The variables are defined in
 * `app/assets/css/code.css` from the design system's role inks.
 */
import type { ThemeRegistrationRaw } from "shiki";

export const codeTheme: ThemeRegistrationRaw = {
  name: "perfectui-site",
  type: "light",
  colors: { "editor.foreground": "var(--site-code-text)", "editor.background": "transparent" },
  settings: [
    { settings: { foreground: "var(--site-code-text)" } },
    { scope: ["entity.name.tag", "keyword", "storage.type"], settings: { foreground: "var(--site-code-tag)" } },
    {
      scope: ["entity.other.attribute-name", "support.type.property-name", "variable.parameter"],
      settings: { foreground: "var(--site-code-attr)" },
    },
    {
      scope: ["string", "string.quoted", "constant.numeric", "constant.other", "support.constant"],
      settings: { foreground: "var(--site-code-value)" },
    },
    {
      scope: ["punctuation", "punctuation.definition.tag", "punctuation.separator", "comment"],
      settings: { foreground: "var(--site-code-punct)" },
    },
    { scope: ["markup.inserted", "punctuation.definition.inserted"], settings: { foreground: "var(--site-code-value)" } },
    { scope: ["markup.deleted", "punctuation.definition.deleted"], settings: { foreground: "var(--site-code-deleted)" } },
  ],
};
