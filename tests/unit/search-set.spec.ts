import { describe, expect, it } from "vitest";
import { toCorpus, toSearchDocuments, type Section } from "../../shared/search-set";
import { versions } from "../../app/versions";

const v1 = versions.find((v) => v.id === "v1")!;
const sections: Section[] = [
  { id: "/docs/v1/components/button", title: "Button", titles: [], content: "Intro.", level: 1 },
  { id: "/docs/v1/components/button#styles", title: "Styles", titles: ["Button"], content: "Solid.", level: 2 },
];
const sectionOf = (path: string) => (path.startsWith("/docs/v1/components/") ? "Components" : undefined);

describe("generated sets (REQ-8, EDGE-8, AC-7)", () => {
  it("search documents carry version, url, page title, heading and navigation section", () => {
    expect(toSearchDocuments(sections, v1, sectionOf)).toEqual([
      { id: "/docs/v1/components/button", version: "v1", url: "/docs/v1/components/button", title: "Button", heading: "", section: "Components", content: "Intro." },
      { id: "/docs/v1/components/button#styles", version: "v1", url: "/docs/v1/components/button#styles", title: "Button", heading: "Styles", section: "Components", content: "Solid." },
    ]);
  });

  it("corpus entries are split by heading with level and titles", () => {
    expect(toCorpus(sections, v1)[1]).toEqual({
      id: "/docs/v1/components/button#styles", version: "v1", url: "/docs/v1/components/button#styles",
      titles: ["Button", "Styles"], level: 2, content: "Solid.",
    });
  });

  it("an empty version fails, naming the artifact and the version", () => {
    expect(() => toSearchDocuments([], v1, sectionOf)).toThrow("search document set is empty for v1");
    expect(() => toCorpus([], v1)).toThrow("assistant corpus is empty for v1");
  });
});
