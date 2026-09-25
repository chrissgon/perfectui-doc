/**
 * The alternatives on the landing's size chart (messaging PROOF-2, research brief): the published
 * builds measured with `gzip -9` over stdin on 2026-09-23. perfectui's own row is never here; it
 * comes from the build's measurement (ADR-0007).
 */
export interface Competitor {
  name: string;
  version: string;
  css: number;
  js: number;
}

export const competitorsMeasuredAt = "2026-09-23";

export const competitors: readonly Competitor[] = [
  { name: "Pico", version: "2.1.1", css: 11640, js: 0 },
  { name: "Beer CSS", version: "5.0.3", css: 17035, js: 5864 },
  { name: "Bootstrap", version: "5.3.8", css: 30869, js: 23743 },
  { name: "UIkit", version: "3.25.24", css: 30944, js: 53317 },
  { name: "Bulma", version: "1.0.4", css: 64842, js: 0 },
];
