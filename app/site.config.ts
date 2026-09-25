/**
 * Site-wide settings (landing-and-site-shell design, `site.config.ts`). T-sh-1 adds the
 * package name, the site URL and the links; the documentation repository is here first
 * because the "Edit this page" link needs it.
 */
export const site = {
  docsRepository: "https://github.com/chrissgon/perfectui-doc",
  docsBranch: "main",
} as const;
