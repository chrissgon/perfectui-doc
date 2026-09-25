import { versions } from "../../../app/versions";
import { toSearchDocuments } from "../../../shared/search-set";
import { assertValidDocs } from "../../utils/assertValidDocs";
import { docSections, sectionTitles } from "../../utils/docSections";

// The search document set of every version, prerendered (ADR-0003); validates the content first.
export default defineEventHandler(async (event) => {
  assertValidDocs();
  const documents = [];
  for (const version of versions) {
    documents.push(...toSearchDocuments(await docSections(event, version), version, await sectionTitles(event, version)));
  }
  return documents;
});
