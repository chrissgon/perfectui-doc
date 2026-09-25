/** Attributes whose value names one or more ids (space-separated for the aria ones). */
const REFERENCES = ["popovertarget", "commandfor", "interestfor", "for", "list", "form", "aria-controls", "aria-describedby", "aria-labelledby", "aria-owns", "aria-details"];

/**
 * Makes one example's live preview independent of the others on the page: every id it defines,
 * every attribute pointing at those ids, and every `name` (details and radio groups) gets the
 * suffix. The code tab keeps the author's HTML.
 */
export function scopeExample(html: string, suffix: string): string {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]!));
  const attrs = new RegExp(`(\\s(?:${REFERENCES.join("|")}))="([^"]+)"`, "g");
  return html
    .replace(/(\sid)="([^"]+)"/g, (_, a: string, v: string) => `${a}="${v}-${suffix}"`)
    .replace(attrs, (all, a: string, v: string) => {
      const parts = v.split(/\s+/);
      if (!parts.some((p) => ids.has(p))) return all;
      return `${a}="${parts.map((p) => (ids.has(p) ? `${p}-${suffix}` : p)).join(" ")}"`;
    })
    .replace(/(\sname)="([^"]+)"/g, (_, a: string, v: string) => `${a}="${v}-${suffix}"`);
}
