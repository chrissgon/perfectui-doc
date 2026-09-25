# ADR-0007: The library's size is measured at build with `gzip -9 -n`, the competitors' method

- Status: proposed
- Date: 2026-09-24
- Serves: REQ-2, NFR-2, EDGE-7

## Context

The landing prints the gzip size of the installed `perfectui.css` and JavaScript entry, computed at build, with the method next to them, and the build tests must find a 0 B difference from a `gzip -9` measurement (REQ-2, NFR-2). The same chart shows five competitors measured on 2026-09-23 with `curl -sL <cdn url> | gzip -9 | wc -c`, which compresses from standard input and so stores no file name in the gzip header (research brief, Method). Measured on 2026-09-24 for 1.0.0-beta.1: `gzip -9 -n` 3,221 B and 493 B; `gzip -9 -c <file>` 3,235 B and 502 B (the header carries the file name); Node's `zlib.gzipSync` at level 9, 3,229 B and 487 B (a different deflate implementation).

## Options

### Option A: run the system `gzip -9 -n` on the installed files in the build and in the test
- Consequences: the same method as the competitors (no name in the header); the build and the test use the same binary in the same environment, so NFR-2 holds exactly; depends on `gzip` being on the build image (it is on Netlify's Linux image), and GNU and macOS gzip may differ by a few bytes, which only matters across machines.

### Option B: Node's zlib at level 9
- Consequences: no external binary; but the numbers differ from the competitors' method by a few bytes in either direction, so the chart would compare unlike measurements, and the printed method would not be `gzip -9`.

### Option C: `gzip -9 -c <file>`, as the first messaging measurement did
- Consequences: matches the numbers written in messaging PROOF-1; but adds the file name to every perfectui number, 9 to 14 bytes the competitors' numbers do not carry.

## Decision

Option A. The footnote reads "`gzip -9 -n` of the published builds; perfectui measured at build from version <x>, others on 2026-09-23".

## Consequences

- The generator fails the build when a file or `gzip` is missing, naming it (EDGE-7).
- Messaging PROOF-1 was corrected to 3,221 B and 493 B for 1.0.0-beta.1 (user, 2026-09-24); the page never prints a typed number for perfectui.

## Spike result (T-sh-6, 2026-09-25)

- Local build (macOS, Apple gzip 479): `api/library-size.json` is `{ "version": "1.0.0-beta.1", "css": 3221, "js": 493, "method": "gzip -9 -n" }`, equal to the build test's own `gzip -9 -n` run.
- Still to confirm on the first Netlify deploy preview: `gzip` exists on the build image and GNU gzip gives the same bytes. If it differs by a few bytes, NFR-2 still holds (build and test share the machine), but the test's pinned 3,221 and 493 for 1.0.0-beta.1 must be relaxed to the same-machine comparison.

