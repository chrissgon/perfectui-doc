/**
 * Where a version switch lands (content-model REQ-6, brief decision 7): the same path in the
 * target version when the page exists there; otherwise the target's first page (`home`) with the
 * missing page in the query, which the page turns into a notice (EDGE-1). A version's index is a
 * redirect to its first page (user review 2026-09-25), which would drop the query.
 */
export function relativeDocPath(path: string): string {
  return path.replace(/^\/docs\/[^/]+\/?/, "");
}

export function switchTarget(currentPath: string, targetId: string, existsInTarget: boolean, home: string): string {
  const relative = relativeDocPath(currentPath);
  const index = `/docs/${targetId}`;
  if (!relative) return home;
  if (existsInTarget) return `${index}/${relative}`;
  return `${home}?missing=${encodeURIComponent(relative)}`;
}
