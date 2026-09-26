// Reproduction for docs/engineering/plans/header-menu-scroll.md: a Perfect UI dropdown opened from
// a button in a sticky header, then the page scrolls. The panel should stay under its button.
// The page is the smallest one that shows it: the published library files (the version the site
// pins, from node_modules) and the site's header structure, served through Playwright's routing,
// so no local server is involved. Run: node scripts/repro-header-menu-scroll.mjs
import { readFileSync } from "node:fs";
import { chromium, webkit } from "@playwright/test";

const lib = "node_modules/@chrissgon/perfectui/dist";
// Variants isolate the cause: the library as published, the panel without flip fallbacks, and
// the panel positioned against the viewport instead of the initial containing block.
const variants = {
  published: "",
  "no position-try-fallbacks": "#menu{position-try-fallbacks:none}",
  "position: fixed": "#menu{position:fixed}",
};
const html = (extra) => `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="/perfectui.css">
<script type="module" src="/js/index.js"></script>
<style>header{position:sticky;top:0;z-index:20;height:64px;display:flex;justify-content:flex-end;align-items:center;background:#fff}main{height:3000px}${extra}</style>
</head><body>
<header><button class="pui-btn" popovertarget="menu" aria-label="Menu">⋯</button>
<div id="menu" class="pui-dropdown pui-align-end" popover><a href="#">Docs</a><a href="#">GitHub</a></div></header>
<main>content</main></body></html>`;

for (const engine of [chromium, webkit]) for (const [variant, extra] of Object.entries(variants)) {
  const page = html(extra);
  const browser = await engine.launch();
  const tab = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await tab.route("http://repro.test/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === "/") return route.fulfill({ contentType: "text/html", body: page });
    const type = path.endsWith(".css") ? "text/css" : "text/javascript";
    return route.fulfill({ contentType: type, body: readFileSync(`${lib}${path}`) });
  });
  await tab.goto("http://repro.test/");
  await tab.waitForTimeout(500);
  await tab.getByRole("button", { name: "Menu" }).click();
  const read = () =>
    tab.evaluate(() => {
      const panel = document.getElementById("menu");
      const button = document.querySelector("header button");
      return {
        scrollY: Math.round(scrollY),
        buttonBottom: Math.round(button.getBoundingClientRect().bottom),
        panelTop: Math.round(panel.getBoundingClientRect().top),
        position: getComputedStyle(panel).position,
        positionArea: getComputedStyle(panel).getPropertyValue("position-area"),
      };
    });
  // 600 px keeps the anchor inside the first viewport's height; 1200 px takes it past it.
  for (const y of [0, 600, 1200]) {
    await tab.evaluate((y) => window.scrollTo(0, y), y);
    await tab.waitForTimeout(300);
    console.log(`${engine.name().padEnd(8)} ${variant.padEnd(26)} ${JSON.stringify(await read())}`);
  }
  await browser.close();
}
