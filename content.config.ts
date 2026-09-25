import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Frontmatter of every documentation page (content-model spec REQ-2). Sections and order are
// not frontmatter: they come from folders, numeric prefixes and `.navigation.yml` (ADR-0004).
const docsSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  since: z.string().optional(),
  changed: z.string().optional(),
  // A version range, for the migration guide (migration-guide design, REQ-5).
  from: z.string().optional(),
  to: z.string().optional(),
});

const link = z.object({ label: z.string(), to: z.string() });

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
    // The landing's copy (landing-and-site-shell design); a missing field fails the build.
    landing: defineCollection({
      type: "data",
      source: "landing.yml",
      schema: z.object({
        tagline: z.string(),
        sections: z.array(z.object({
          id: z.string(),
          headline: z.string(),
          body: z.string(),
          cta: link.optional(),
          secondary: link.optional(),
        })),
      }),
    }),
  },
});
