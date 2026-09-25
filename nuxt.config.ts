import tailwindcss from "@tailwindcss/vite";
import { versions } from "./app/versions";
import { codeTheme } from "./shared/code-theme";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-24",

  modules: ["@nuxt/content", "@nuxt/eslint"],

  css: ["~/assets/css/main.css", "~/assets/css/code.css"],

  content: {
    build: {
      markdown: {
        highlight: { theme: { default: codeTheme } },
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
    },
  },
});
