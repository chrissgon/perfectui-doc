import { describe, expect, it } from "vitest";
import { relativeDocPath, switchTarget } from "../../shared/version-switch";

const HOME = "/docs/v0/getting-started/installation";

describe("version switch (REQ-6, EDGE-1, AC-6)", () => {
  it("keeps the same path when the page exists in the target version", () => {
    expect(switchTarget("/docs/v1/components/button", "v0", true, HOME)).toBe("/docs/v0/components/button");
    expect(switchTarget("/docs/v0/components/button", "v1", true, "/docs/v1/x")).toBe("/docs/v1/components/button");
  });

  it("opens the target's first page with the missing page when it does not exist there", () => {
    expect(switchTarget("/docs/v1/components/chip", "v0", false, HOME)).toBe(`${HOME}?missing=components%2Fchip`);
  });

  it("maps a version index to the other version's first page", () => {
    expect(switchTarget("/docs/v1", "v0", true, HOME)).toBe(HOME);
    expect(relativeDocPath("/docs/v1")).toBe("");
  });
});
