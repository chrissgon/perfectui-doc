import type { Result } from "axe-core";

/**
 * The accepted library trade-off (state file, 2026-09-24; PRD M-4 amended): in light mode the
 * labels of `pui-solid` on `pui-theme`, `pui-success` or `pui-warn` stay below AA. Only
 * `color-contrast` on those elements is set aside; everything else counts.
 */
export function withoutAcceptedTradeOff(violations: Result[], mode: "light" | "dark"): Result[] {
  if (mode === "dark") return violations;
  return violations
    .map((v) => {
      if (v.id !== "color-contrast") return v;
      const nodes = v.nodes.filter((n) => !/\bpui-solid\b/.test(n.html) || !/\bpui-(theme|success|warn)\b/.test(n.html));
      return { ...v, nodes };
    })
    .filter((v) => v.nodes.length > 0);
}
