/**
 * Where a version switch lands (content-model REQ-6, brief decision 7): the same path in the
 * target version when the page exists there; otherwise the target's index with the missing
 * page in the query, which the index turns into a notice (EDGE-1).
 */
export function relativeDocPath(path: string): string {
  return path.replace(/^\/docs\/[^/]+\/?/, "");
}

export function switchTarget(currentPath: string, targetId: string, existsInTarget: boolean): string {
  const relative = relativeDocPath(currentPath);
  const index = `/docs/${targetId}`;
  if (!relative) return index;
  if (existsInTarget) return `${index}/${relative}`;
  return `${index}?missing=${encodeURIComponent(relative)}`;
}
