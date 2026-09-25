import MiniSearch from "minisearch";
import { versions } from "../../../../app/versions";
import { searchOptions } from "../../../../shared/search-options";
import { toSearchDocuments } from "../../../../shared/search-set";
import { assertValidDocs } from "../../../utils/assertValidDocs";
import { docSections, sectionTitles } from "../../../utils/docSections";

// The serialized MiniSearch index of one version (search design, ADR-0009), prerendered for every
// configured version; an empty version throws and fails the build (EDGE-7).
export default defineEventHandler(async (event) => {
  assertValidDocs();
  // Read from the path: with a ".json" suffix the router does not name the parameter "version".
  const id = /\/api\/search\/([^/]+)\.json$/.exec(event.path.split("?")[0]!)?.[1];
  const version = versions.find((v) => v.id === id);
  if (!version) throw createError({ statusCode: 404, statusMessage: `No version ${id}` });
  const documents = toSearchDocuments(await docSections(event, version), version, await sectionTitles(event, version));
  const index = new MiniSearch(searchOptions);
  index.addAll(documents);
  return index.toJSON();
});
