/**
 * Site-wide settings (landing-and-site-shell design, `site.config.ts`): the only place that
 * holds the package name, the site URL and the links. The documentation repository and
 * branch feed the "Edit this page" link.
 */
export const site = {
  name: "Perfect UI",
  url: "https://perfectui.netlify.app",
  packageName: "@chrissgon/perfectui",
  repository: "https://github.com/chrissgon/perfectui",
  figma: "https://www.figma.com/file/szD991W25tQxPuqhfRektk/PerfectUI",
  license: "MIT",
  docsRepository: "https://github.com/chrissgon/perfectui-doc",
  docsBranch: "main",
} as const;

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

const installVerb: Record<PackageManager, string> = { npm: "i", yarn: "add", pnpm: "add", bun: "add" };

/** The install command for a package manager, built from the configured package name (REQ-3). */
export function installCommand(manager: PackageManager, packageName: string = site.packageName): string {
  return `${manager} ${installVerb[manager]} ${packageName}`;
}
