import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { pageFile } from "../helpers/page-file";
import { SITE_DIR } from "../helpers/site-dir";

// Migration guide REQ-1, REQ-2, REQ-4, AC-1, AC-2, AC-4: the page is the library's MIGRATION.md
// at the pinned tag. The source comes from the library checkout next to this repository, or
// from GitHub at the tag.
const TAG = `v${JSON.parse(readFileSync("node_modules/@chrissgon/perfectui/package.json", "utf8")).version}`;
const PAGE = "/docs/v1/getting-started/migrating-from-0-x";

async function migrationSource(): Promise<string> {
  const local = process.env.PERFECTUI_REPO ?? "../perfectui";
  if (existsSync(`${local}/.git`)) return execFileSync("git", ["-C", local, "show", `${TAG}:MIGRATION.md`], { encoding: "utf8" });
  const res = await fetch(`https://raw.githubusercontent.com/chrissgon/perfectui/${TAG}/MIGRATION.md`);
  expect(res.ok, `MIGRATION.md at ${TAG}`).toBe(true);
  return res.text();
}

const outsideFences = (md: string) => md.split(/^```[\s\S]*?^```/m).join("\n");
const decode = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").trim();

test("the guide's h2 sequence equals MIGRATION.md at the pinned tag, every h2 with an id", async () => {
  const source = await migrationSource();
  const expected = [...outsideFences(source).matchAll(/^## (.+)$/gm)].map((m) => m[1]!.replace(/`/g, "").trim());
  const html = readFileSync(pageFile(SITE_DIR, PAGE), "utf8");
  const article = html.match(/<div[^>]*class="[^"]*doc-prose[\s\S]*<\/article>/)?.[0] ?? html;
  const h2 = [...article.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)];
  expect(h2.map((m) => decode(m[2]!))).toEqual(expected);
  for (const m of h2) expect(m[1]).toBeTruthy();
});

test("every diff block of the source renders as a highlighted diff", async () => {
  const source = await migrationSource();
  const blocks = (source.match(/^```diff$/gm) ?? []).length;
  const html = readFileSync(pageFile(SITE_DIR, PAGE), "utf8");
  expect(blocks).toBe(11);
  expect((html.match(/<pre[^>]*class="[^"]*language-diff/g) ?? []).length).toBe(blocks);
});

test("the guide is in the getting-started navigation, after Tailwind CSS", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(PAGE);
  const nav = page.getByRole("navigation", { name: "Documentation" });
  const links = nav.locator("details", { hasText: "Getting Started" }).getByRole("link");
  await expect(links).toHaveText(["Installation", "TypeScript", "Tailwind CSS", "Migrating from 0.x", "License"]);
  await expect(page.locator("[data-doc-header] [data-range]")).toHaveText("Applies to 0.23.0 → 1.0.0-beta.1");
  await expect(page.locator("[data-doc-header]")).toContainText("Changed in 1.0");
});
