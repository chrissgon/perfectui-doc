import { join } from "node:path";
import { measureLibrary } from "../../../shared/library-size";

// The installed library's gzip sizes, prerendered (REQ-2, ADR-0007); a missing file fails the build.
export default defineEventHandler(() => measureLibrary(join(process.cwd(), "node_modules/@chrissgon/perfectui")));
