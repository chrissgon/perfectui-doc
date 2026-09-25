import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { assertSections, docsLink, fillSize, landingSectionIds, type LandingCopy } from "../../shared/landing-copy";

const copy = parse(readFileSync("content/landing.yml", "utf8")) as LandingCopy;
const messaging = readFileSync("docs/marketing/messaging.md", "utf8");
const measured = { css: 3221, js: 493 };

// messaging SECTION-n lines: "Headline: <text> Body: <text> Demo:"
const section = (n: number) => {
  const line = messaging.split("\n").find((l) => l.startsWith(`- SECTION-${n}:`))!;
  return {
    headline: line.match(/Headline: (.*?) Body: /)![1]!,
    body: line.match(/ Body: (.*?) Demo: /)![1]!,
  };
};

// REQ-1, REQ-4: the landing's copy is messaging's, verbatim.
describe("landing copy", () => {
  it("has the nine sections in messaging order", () => {
    expect(copy.sections.map((s) => s.id)).toEqual([...landingSectionIds]);
  });

  it("every headline and body of SECTION-1 to SECTION-9 is in the collection verbatim", () => {
    copy.sections.forEach((s, i) => {
      const m = section(i + 1);
      expect(fillSize(s.headline, measured), s.id).toBe(m.headline);
      expect(fillSize(s.body, measured), s.id).toBe(m.body);
    });
  });

  it("the tagline is one of messaging's taglines", () => {
    expect(messaging).toContain(`- ${copy.tagline}\n`);
  });

  // REQ-2: numbers come from the build's measurement, never typed in the copy.
  it("no byte count is typed in the copy", () => {
    const text = copy.sections.map((s) => `${s.headline} ${s.body}`).join(" ");
    expect(text).not.toMatch(/3[.,]2|3,221|\b493\b/);
    expect(fillSize("{css.kB} · {css.bytes} · {js.bytes}", { css: 12345, js: 50 })).toBe("12.3 kB · 12,345 · 50");
  });

  it("a missing or extra section id fails naming it", () => {
    expect(() => assertSections(copy, [...landingSectionIds])).not.toThrow();
    expect(() => assertSections(copy, landingSectionIds.filter((id) => id !== "size"))).toThrow(/size/);
    expect(() => assertSections(copy, [...landingSectionIds, "pricing"])).toThrow(/pricing/);
  });

  it("calls to action point at the latest version's pages", () => {
    expect(docsLink("/docs", "v1")).toBe("/docs/v1");
    expect(docsLink("/docs/components/button", "v1")).toBe("/docs/v1/components/button");
    for (const s of copy.sections) if (s.cta) expect(s.cta.to).toMatch(/^\/docs(\/|$)/);
  });
});
