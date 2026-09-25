import { versions } from "../../../app/versions";
import { toCorpus } from "../../../shared/search-set";
import { assertValidDocs } from "../../utils/assertValidDocs";
import { docSections } from "../../utils/docSections";

// The assistant corpus of every version, one entry per heading section (ADR-0003).
export default defineEventHandler(async (event) => {
  assertValidDocs();
  const corpus = [];
  for (const version of versions) corpus.push(...toCorpus(await docSections(event, version), version));
  return corpus;
});
