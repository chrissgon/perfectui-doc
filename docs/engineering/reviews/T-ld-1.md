# Code review: T-ld-1

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-25
- Change: working tree after 3e71cbc (`shared/library-docs.ts`, `tests/unit/library-docs.spec.ts`, `tests/fixtures/library/` with 6 files; all new)
- Intent: T-ld-1 "Conversion of the summary and of one document" (Delivers REQ-3 to REQ-8, EDGE-2, EDGE-5 to EDGE-7, AC-3, AC-4 converter cases)
- Checks run: lint exit 0; typecheck exit 0; `bunx vitest run tests/unit/library-docs.spec.ts` 17 passed; full unit suite 96 passed

## Summary
`parseSummary`, `pagePaths` and `convertDocument` turn the library's summary and documents into the content model's files, with every rule of REQ-3 to REQ-8 and every failure of EDGE-2, EDGE-5, EDGE-6 and EDGE-7 tested on a fixture library.
The review found one defect, fixed in the change: when code came first after the title, a later paragraph became the description. A test now covers that case, and it was seen failing without the fix.
Verdict: approve.

## Findings
| # | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
|---|----------|-------------|----------|----------|--------------------|-----|
| 1 | medium (fixed) | edge cases | shared/library-docs.ts:161 | `description ??= "";` (added) | Without it, a document opening with code took a paragraph from further down as its description. | Fixed, with the test "gives no description when code comes first". |

## Perspectives without a finding
- Scope and contracts: only the three planned paths; the functions match the design's interfaces (`parseSummary`, `convertDocument`), plus `pagePaths`, which the sync step will need for the numbered files.
- Quality: one pass over the lines with explicit fence, callout and description states; no dependency added.
- Regression: nothing imports the module yet; the site is unchanged.
- Security: the input is the library's own repository; nothing is evaluated.
- Tests: 17 cases, one per rule and per failure; markers inside fences are left alone.
