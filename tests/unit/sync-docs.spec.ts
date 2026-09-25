import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { convertLibrary, refFor, resolveLibrary } from "../../scripts/sync-docs";

// T-ld-3 (spec library-docs-and-versions REQ-1, REQ-2, EDGE-1, EDGE-3, EDGE-4).
const FIXTURE = "tests/fixtures/library";
const scratch = () => mkdtempSync(join(tmpdir(), "sync-docs-"));

describe("ref (REQ-2)", () => {
  it("follows the installed version's tag unless the major pins a ref", () => {
    expect(refFor({ id: "v1", label: "1.x", collection: "docs_v1", latest: true }, "1.0.0")).toBe("v1.0.0");
    expect(refFor({ id: "v1", label: "1.x", collection: "docs_v1", latest: true, libraryRef: "abc123" }, "1.0.0")).toBe("abc123");
  });
});

describe("library source (REQ-2, EDGE-4)", () => {
  it("uses a local checkout first", async () => {
    const download = vi.fn();
    expect(await resolveLibrary("v1.0.0", { source: FIXTURE, cache: scratch(), download })).toBe(FIXTURE);
    expect(download).not.toHaveBeenCalled();
  });

  it("downloads once into the cache, then reads the cache", async () => {
    const cache = scratch();
    const download = vi.fn(async (_ref: string, into: string) => cpSync(FIXTURE, into, { recursive: true }));
    const first = await resolveLibrary("v9.9.9", { source: "", cache, download });
    const second = await resolveLibrary("v9.9.9", { source: "", cache, download });
    expect(first).toBe(join(cache, "v9.9.9"));
    expect(second).toBe(first);
    expect(download).toHaveBeenCalledTimes(1);
  });

  it("fails naming the ref when the download fails, and leaves no copy behind", async () => {
    const cache = scratch();
    const download = vi.fn(async () => {
      throw new Error("download failed with HTTP 404");
    });
    await expect(resolveLibrary("v0.0.0-missing", { source: "", cache, download })).rejects.toThrow(
      'library ref "v0.0.0-missing": download failed with HTTP 404',
    );
    expect(existsSync(join(cache, "v0.0.0-missing"))).toBe(false);
    expect(existsSync(join(cache, "v0.0.0-missing.partial"))).toBe(false);
  });
});

describe("conversion of a library (REQ-1, EDGE-1, EDGE-3)", () => {
  const { files, warnings } = convertLibrary(FIXTURE, "v1", "v1.0.0");

  it("writes the section titles and every page of the summary, numbered", () => {
    expect(files.map((f) => f.file)).toEqual([
      "01.getting-started/.navigation.yml",
      "01.getting-started/01.installation.md",
      "01.getting-started/02.migrating-from-0-x.md",
      "02.components/.navigation.yml",
      "02.components/01.button.md",
      "02.components/02.card.md",
    ]);
    expect(files[0]!.text).toBe("title: Getting Started\n");
  });

  it("warns about a document the summary does not list (EDGE-3)", () => {
    expect(warnings).toEqual(["docs/unlisted.md is not in the summary of docs/README.md, so it is not published"]);
  });

  it("fails naming the summary line and the ref when a listed document is missing (EDGE-1)", () => {
    const library = scratch();
    cpSync(FIXTURE, library, { recursive: true });
    const summary = readFileSync(join(library, "docs/README.md"), "utf8");
    writeFileSync(join(library, "docs/README.md"), summary.replace("./card.md", "./cards.md"));
    expect(() => convertLibrary(library, "v1", "v1.0.0")).toThrow('docs/README.md:15: "docs/cards.md" does not exist at v1.0.0');
  });
});
