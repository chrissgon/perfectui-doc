import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { isAcceptedTradeOff } from "./accepted";

export type Scheme = "light" | "dark";

async function once(url: string, scheme: Scheme) {
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    // Chrome follows the operating system's appearance unless told otherwise, so a laptop in dark
    // mode and a CI runner in light mode measured different colours (2026-09-25).
    chromeFlags: ["--headless=new", "--no-sandbox", `--blink-settings=preferredColorScheme=${scheme === "dark" ? 0 : 1}`],
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
        .filter((ref) => ref.weight > 0 && (lhr?.audits[ref.id]?.score ?? 1) < 1 && !(id === "accessibility" && accepted(ref.id)))
        .map((ref) => {
          const items = (lhr?.audits[ref.id]?.details as { items?: { node?: { selector?: string; explanation?: string } }[] } | undefined)?.items ?? [];
          const nodes = items.slice(0, 3).map((item) => `${item.node?.selector} (${item.node?.explanation?.split("\n")[1]?.trim() ?? ""})`);
          return nodes.length ? `${ref.id} [${nodes.join("; ")}]` : ref.id;
        });
    // Accessibility with the accepted trade-off set aside, as the axe tests do: `color-contrast`
    // counts as passed when every element it flags is an accepted light-mode label. The score is
    // Lighthouse's own weighted mean of the category's audits, recomputed with that one change.
    const nodes = (id: string) =>
      ((lhr?.audits[id]?.details as { items?: { node?: { snippet?: string } }[] } | undefined)?.items ?? []).map((i) => i.node?.snippet ?? "");
    const accepted = (id: string) => id === "color-contrast" && nodes(id).length > 0 && nodes(id).every((n) => isAcceptedTradeOff(n, scheme));
    const refs = (categories?.accessibility?.auditRefs ?? []).filter((r) => r.weight > 0 && lhr?.audits[r.id]?.score != null);
    const weight = refs.reduce((sum, r) => sum + r.weight, 0);
    const a11y = weight ? refs.reduce((sum, r) => sum + r.weight * (accepted(r.id) ? 1 : lhr!.audits[r.id]!.score!), 0) / weight : 0;
    return {
      performance: Math.round((categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round(a11y * 100),
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
export async function lighthouseScores(url: string, runs = 1, scheme: Scheme = "light") {
  const results: Awaited<ReturnType<typeof once>>[] = [];
  for (let i = 0; i < runs; i++) results.push(await once(url, scheme));
  const lost = (id: "performance" | "accessibility") => [...new Set(results.flatMap((r) => r.lost[id]))].join(", ") || "none";
  return {
    performance: median(results.map((r) => r.performance)),
    accessibility: median(results.map((r) => r.accessibility)),
    /** Audits that lost points in any run, per category, for the failure message. */
    lost: { performance: lost("performance"), accessibility: lost("accessibility") },
  };
}
