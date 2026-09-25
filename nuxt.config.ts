import tailwindcss from "@tailwindcss/vite";
import { versions } from "./app/versions";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-24",

  modules: ["@nuxt/content", "@nuxt/eslint"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: true,
      // Each version's index; the crawler follows its links to every page.
      routes: ["/", ...versions.map((v) => `/docs/${v.id}`)],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },
});
