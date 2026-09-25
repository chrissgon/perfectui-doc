import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { parse } from "yaml";
import { docsLink, type LandingCopy } from "../../shared/landing-copy";
import { features } from "../../app/features";
import { latestVersion } from "../../app/versions";
import { pageFile } from "../helpers/page-file";

const html = (path: string) => readFileSync(pageFile(".output/public", path), "utf8");
const visibleText = (page: string) =>
  page.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
const region = (page: string, tag: "header" | "footer") => page.match(new RegExp(`<${tag}[\\s\\S]*?</${tag}>`))?.[0] ?? "";

const copy = parse(readFileSync("content/landing.yml", "utf8")) as LandingCopy;

// REQ-6, AC-6: nothing unshipped is promised on the landing or in the shell.
test.describe("unshipped features", () => {
  test("the landing and the shell name no assistant, ChatGPT or 'soon'", () => {
    const docs = html("/docs/v1/components/button");
    for (const [where, text] of [
      ["landing", visibleText(html(""))],
      ["docs header", visibleText(region(docs, "header"))],
      ["docs footer", visibleText(region(docs, "footer"))],
    ] as const) {
      expect(text, where).not.toMatch(/assistant|chatgpt|\bsoon\b/i);
    }
  });

  test("no search entry point while search is off", () => {
    test.skip(features.search, "search is on");
    for (const page of [html(""), html("/docs/v1/components/button")]) {
      expect(region(page, "header")).not.toMatch(/aria-label="Search|>\s*Search\s*</);
    }
  });
});

// T-sh-9 review, finding 4: the copy's sections and the rendered sections are the same set.
test("every section of the landing copy is rendered, and nothing else", () => {
  const page = html("");
  const main = page.match(/<main[\s\S]*<\/main>/)?.[0] ?? "";
  const rendered = [...main.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
  expect(rendered).toEqual(copy.sections.map((s) => s.id));
});

// Calls to action whose page is written in a later task; each entry fails this test as soon as
// its page exists, so the list cannot go stale.
const pending: Record<string, string> = {};

test("every call to action of the copy renders, except pages still to be written", () => {
  const page = html("");
  const links = copy.sections.flatMap((s) => [s.cta, s.secondary]).filter((l) => l !== undefined);
  for (const link of links) {
    const href = docsLink(link.to, latestVersion.id);
    const rendered = page.includes(`href="${href}"`);
    if (link.to in pending) {
      expect(rendered, `${link.to} waits for ${pending[link.to]}`).toBe(false);
      expect(() => readFileSync(pageFile(".output/public", href)), `${pending[link.to]} is done: remove it from pending`).toThrow();
    } else {
      expect(rendered, `${link.label} → ${href}`).toBe(true);
    }
  }
});
