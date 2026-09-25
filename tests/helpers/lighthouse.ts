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
    const categories = result?.lhr.categories;
    return {
      performance: Math.round((categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories?.accessibility?.score ?? 0) * 100),
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
  const results = [];
  for (let i = 0; i < runs; i++) results.push(await once(url));
  return {
    performance: median(results.map((r) => r.performance)),
    accessibility: median(results.map((r) => r.accessibility)),
  };
}
