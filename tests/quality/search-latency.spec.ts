import { expect, test } from "@playwright/test";
import { openSearch, results, searchInput } from "../helpers/search";

const QUERIES = ["m", "mo", "modal", "button", "tooltpi", "theme", "dark mode", "pui-solid", "accordion", "dropdown",
  "table", "field group", "checkbox", "tailwind", "layer", "install", "cdn", "migration", "popover", "xyz"];

// Search NFR-1, AC-8: from input to rendered results under 100 ms at the 95th percentile, with
// the CPU slowed 4× (Chrome DevTools Protocol), over 20 queries on the loaded index.
test("results render within 100 ms of input at the 95th percentile under 4× CPU throttling", async ({ page }) => {
  await openSearch(page, "/docs/v1/components/button");
  await searchInput(page).fill("warm");
  await expect(results(page).first()).toBeVisible();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const times: number[] = [];
  for (const query of QUERIES) {
    times.push(await page.evaluate(async (q) => {
      const input = document.querySelector<HTMLInputElement>("dialog[open] input[type=search]")!;
      const list = document.querySelector("dialog[open] [role=listbox]")!;
      const changed = new Promise<void>((resolve) => new MutationObserver((_, o) => { o.disconnect(); resolve(); }).observe(list, { childList: true, subtree: true, characterData: true }));
      const start = performance.now();
      input.value = q;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      await changed;
      await new Promise(requestAnimationFrame);
      return performance.now() - start;
    }, query));
  }
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  const sorted = [...times].sort((a, b) => a - b);
  const p95 = sorted[Math.ceil(sorted.length * 0.95) - 1]!;
  console.log(`search latency p95 ${p95.toFixed(1)} ms, max ${sorted.at(-1)!.toFixed(1)} ms`);
  expect(p95).toBeLessThan(100);
});
