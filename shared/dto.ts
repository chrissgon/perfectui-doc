import type { IAlgoliaList } from ".";

export function AlgoliaListDTO(primitives: any[]): IAlgoliaList {
  const list: IAlgoliaList = [];

  if (!primitives.length) return list;

  for (const primitive of primitives) {
    list.push({
      url: primitive.url,
      title: primitive.title,
      description: primitive.description,
      tags: primitive.tags,
      requireJavascript: primitive.requireJavascript
    });
  }

  return list;
}
