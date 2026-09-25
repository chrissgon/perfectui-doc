import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Frontmatter of every documentation page (content-model spec REQ-2). Sections and order are
// not frontmatter: they come from folders, numeric prefixes and `.navigation.yml` (ADR-0004).
const docsSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  since: z.string().optional(),
  changed: z.string().optional(),
});

// One collection per major version (ADR-0001); the prefix carries the version, so paths are
// `/docs/<major>/<section>/<slug>`. Collection names match `app/versions.ts`.
export default defineContentConfig({
  collections: {
    docs_v1: defineCollection({
      type: "page",
      source: { include: "v1/**", prefix: "/docs/v1" },
      schema: docsSchema,
    }),
    docs_v0: defineCollection({
      type: "page",
      source: { include: "v0/**", prefix: "/docs/v0" },
      schema: docsSchema,
    }),
  },
});
