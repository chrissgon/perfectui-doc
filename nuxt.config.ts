import tailwindcss from "@tailwindcss/vite";

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
      routes: ["/"],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },
});
