import tailwindcss from "@tailwindcss/vite";
import { versions } from "./app/versions";
import { codeTheme } from "./shared/code-theme";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-24",

  modules: ["@nuxt/content", "@nuxt/eslint"],

  // The stylesheet is inlined into each prerendered page, removing the render-blocking request
  // on a first visit (Lighthouse mobile, T-cm-20).
  features: { inlineStyles: true },

  css: ["~/assets/css/main.css", "~/assets/css/code.css", "~/assets/css/prose.css"],

  content: {
    build: {
      markdown: {
        // The default languages plus `diff`, for the migration guide (T-mg-3).
        highlight: {
          theme: { default: codeTheme },
          langs: ["js", "jsx", "json", "ts", "tsx", "vue", "css", "html", "bash", "md", "mdc", "yaml", "diff"],
        },
      },
    },
  },

  vite: {
    // LightningCSS (Tailwind's optimizer and Vite 8's CSS minifier) rewrites light-dark() for
    // older targets into variables resolved once on :root, which breaks a mode scoped to one
    // element (the landing's inverse bands, the section 5 demo, nested data-pui-mode). The
    // library ships light-dark() unpolyfilled, so the CSS targets the browsers that support it;
    // Vite does the minifying.
    plugins: [tailwindcss({ optimize: false })],
    build: { cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"] },
  },

  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: true,
      // Each version's index; the crawler follows its links to every page.
      routes: ["/", ...versions.map((v) => `/docs/${v.id}`), "/_redirects", "/api/search-index.json", "/api/assistant-corpus.json", "/api/library-size.json"],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});
