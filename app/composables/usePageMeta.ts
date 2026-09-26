import { site } from "~/site.config";

/**
 * Title, description, Open Graph and Twitter meta, set at setup so the prerendered HTML
 * carries them (REQ-10). The share image, the page URL and the canonical link are absolute, from
 * the site URL.
 * Inline-code backticks from frontmatter are dropped: meta content is plain text.
 */
export function usePageMeta(meta: { title: string; description: string }) {
  const route = useRoute();
  const description = meta.description.replace(/`/g, "");
  const url = `${site.url}${route.path.length > 1 ? route.path.replace(/\/+$/, "") : route.path}`;
  // The canonical address: the same page served from an alias host or with a trailing slash
  // counts as this one for search engines.
  useHead({ link: [{ rel: "canonical", href: url }] });
  useSeoMeta({
    title: meta.title.includes(site.name) ? meta.title : `${meta.title} · ${site.name}`,
    description,
    ogTitle: meta.title,
    ogDescription: description,
    ogImage: `${site.url}/og.jpg`,
    ogUrl: url,
    ogType: "website",
    twitterCard: "summary_large_image",
  });
}
