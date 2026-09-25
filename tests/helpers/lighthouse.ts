import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

async function once(url: string) {
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility"],
    });
    const lhr = result?.lhr;
    const categories = lhr?.categories;
    // The weighted audits that lost points, so a failing score says why (a CI runner and a laptop
    // can differ, and the report itself stays on the runner).
    const lost = (id: "performance" | "accessibility") =>
      (categories?.[id]?.auditRefs ?? [])
        .filter((ref) => ref.weight > 0 && (lhr?.audits[ref.id]?.score ?? 1) < 1)
        .map((ref) => ref.id);
    return {
      performance: Math.round((categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories?.accessibility?.score ?? 0) * 100),
      lost: { performance: lost("performance"), accessibility: lost("accessibility") },
    };
  } finally {
    await chrome.kill();
  }
}

const median = (values: number[]) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]!;

/**
 * Mobile Lighthouse scores (0 to 100) for performance and accessibility (PRD M-4): the median of
 * `runs` runs, as Lighthouse's documentation recommends for its run-to-run variance.
 */
export async function lighthouseScores(url: string, runs = 1) {
  const results: Awaited<ReturnType<typeof once>>[] = [];
  for (let i = 0; i < runs; i++) results.push(await once(url));
  const lost = (id: "performance" | "accessibility") => [...new Set(results.flatMap((r) => r.lost[id]))].join(", ") || "none";
  return {
    performance: median(results.map((r) => r.performance)),
    accessibility: median(results.map((r) => r.accessibility)),
    /** Audits that lost points in any run, per category, for the failure message. */
    lost: { performance: lost("performance"), accessibility: lost("accessibility") },
  };
}
