/** The landing's copy (content/landing.yml), from messaging SECTION-1 to SECTION-9. */
export interface LandingLink {
  label: string;
  /** A documentation path without a version (`/docs/<section>/<slug>`), resolved by `docsLink`. */
  to: string;
}

export interface LandingSection {
  id: string;
  headline: string;
  body: string;
  cta?: LandingLink;
  secondary?: LandingLink;
}

export interface LandingCopy {
  sections: LandingSection[];
  tagline: string;
}

/** The sections the landing renders, in page order. */
export const landingSectionIds = [
  "hero",
  "size",
  "classes",
  "overlays",
  "mode-theme",
  "tailwind",
  "nothing-to-undo",
  "migration",
  "install",
] as const;

/** Fails naming every section id the copy has and the page does not render, and the reverse. */
export function assertSections(copy: LandingCopy, rendered: readonly string[]): void {
  const inCopy = copy.sections.map((s) => s.id);
  const missing = rendered.filter((id) => !inCopy.includes(id));
  const extra = inCopy.filter((id) => !rendered.includes(id));
  if (missing.length || extra.length) {
    throw new Error(
      `content/landing.yml: ${[
        missing.length ? `missing section ids: ${missing.join(", ")}` : "",
        extra.length ? `section ids the page does not render: ${extra.join(", ")}` : "",
      ].filter(Boolean).join("; ")}`,
    );
  }
}

/**
 * Replaces the size placeholders with the build's measurement (REQ-2: no typed number):
 * `{css.kB}` → "3.2 kB", `{css.bytes}` → "3,221", `{js.bytes}` → "493".
 */
export function fillSize(text: string, size: { css: number; js: number }): string {
  const bytes = (n: number) => n.toLocaleString("en-US");
  return text
    .replaceAll("{css.kB}", `${(size.css / 1000).toFixed(1)} kB`)
    .replaceAll("{css.bytes}", bytes(size.css))
    .replaceAll("{js.bytes}", bytes(size.js));
}

/** `/docs/<rest>` in the copy → the same path under a version (`/docs/<version>/<rest>`). */
export function docsLink(to: string, version: string): string {
  return to.replace(/^\/docs(?=\/|$)/, `/docs/${version}`);
}
