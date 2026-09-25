/**
 * The single list of documented versions (content-model spec REQ-5). Routing, navigation,
 * redirects and the generators read it; no other file names a version.
 * A version's URL prefix is always `/docs/<id>`; its folder is `content/<id>/`.
 */
import type { Collections } from "@nuxt/content";

/** The documentation collections (`docs_<id>`), excluding data collections such as the landing's. */
export type DocsCollection = Extract<keyof Collections, `docs_${string}`>;

export interface DocVersion {
  id: string;
  label: string;
  collection: string;
  latest: boolean;
  deprecated?: boolean;
  /**
   * The library git ref this major's pages are generated from (ADR-0010). Unset for the latest
   * major, which follows the installed version's tag, `v<version>`.
   */
  libraryRef?: string;
}

export const versions: readonly DocVersion[] = [
  // Pinned to the library commit that adds the conversion markers until a release carries them
  // (spec library-docs-and-versions ASSUMPTION-1); then this line loses `libraryRef`.
  { id: "v1", label: "1.x", collection: "docs_v1", latest: true, libraryRef: "652748d75d42f25a6396173c8e4f8a59487c6299" },
  // 0.23 is not a documented major: its documents stay in the library at tag v0.23.0 (PRD F-7,
  // retired). The test fixture site lists a v0 to exercise two majors (tests/fixtures/site).
];

/** The latest version; fails naming this file unless exactly one version is latest (EDGE-8). */
export function pickLatest(list: readonly DocVersion[]): DocVersion {
  const latest = list.filter((v) => v.latest);
  if (latest.length !== 1) {
    throw new Error(
      `app/versions.ts: exactly one version must have latest: true, found ${latest.length}`,
    );
  }
  return latest[0]!;
}

export const latestVersion = pickLatest(versions);

export const versionPrefix = (v: DocVersion) => `/docs/${v.id}`;
