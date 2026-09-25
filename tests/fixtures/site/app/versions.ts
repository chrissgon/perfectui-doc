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
}

export const versions: readonly DocVersion[] = [
  { id: "v1", label: "1.x", collection: "docs_v1", latest: true },
  // Listed now so routing and the switch are designed for it; its content ships in release R-2.
  { id: "v0", label: "0.23", collection: "docs_v0", latest: false, deprecated: true },
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
