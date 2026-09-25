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
    plugins: [tailwindcss()],
  },

  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: true,
      // Each version's index; the crawler follows its links to every page.
      routes: ["/", ...versions.map((v) => `/docs/${v.id}`), "/_redirects", "/api/search-index.json", "/api/assistant-corpus.json"],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },
});
