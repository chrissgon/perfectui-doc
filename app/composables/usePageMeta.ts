import { site } from "~/site.config";

/**
 * Title, description, Open Graph and Twitter meta, set at setup so the prerendered HTML
 * carries them (REQ-10). The share image and the page URL are absolute, from the site URL.
 * Inline-code backticks from frontmatter are dropped: meta content is plain text.
 */
export function usePageMeta(meta: { title: string; description: string }) {
  const route = useRoute();
  const description = meta.description.replace(/`/g, "");
  useSeoMeta({
    title: meta.title.includes(site.name) ? meta.title : `${meta.title} · ${site.name}`,
    description,
    ogTitle: meta.title,
    ogDescription: description,
    ogImage: `${site.url}/og.jpg`,
    ogUrl: `${site.url}${route.path}`,
    ogType: "website",
    twitterCard: "summary_large_image",
  });
}
