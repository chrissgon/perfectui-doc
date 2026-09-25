import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

/** Mobile Lighthouse scores (0 to 100) for performance and accessibility (PRD M-4). */
export async function lighthouseScores(url: string) {
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
