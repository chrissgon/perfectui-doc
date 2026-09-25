import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";
import { results, searchInput } from "../helpers/search";

// Search NFR-2, AC-9: the files the first open requests (index, dialog chunk, MiniSearch chunk)
// weigh at most 300 KB with `gzip -9 -n`.
test("the first open downloads at most 300 KB (gzip -9 -n)", async ({ page, baseURL }) => {
  await page.goto("/docs/v1/components/button");
  await expect(page.getByRole("button", { name: /^Search/ })).toBeVisible();
  await page.waitForLoadState("networkidle");
  const requested: string[] = [];
  page.on("request", (r) => requested.push(r.url()));
  await page.getByRole("button", { name: /^Search/ }).click();
  await searchInput(page).fill("modal");
  await expect(results(page).first()).toBeVisible();
  const files = [...new Set(requested)].filter((u) => u.startsWith(baseURL!)).map((u) => new URL(u).pathname);
  expect(files.some((f) => f.startsWith("/api/search/"))).toBe(true);
  const sizes = files.map((f) => ({ f, bytes: execFileSync("gzip", ["-9", "-n", "-c", `.output/public${f}`]).length }));
  const total = sizes.reduce((sum, s) => sum + s.bytes, 0);
  console.log(`first open: ${sizes.map((s) => `${s.f} ${s.bytes}`).join(", ")}; total ${total}`);
  expect(total).toBeLessThanOrEqual(300 * 1024);
});
