import pkg from "./package.json";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  nitro: {
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },

      title: `${pkg.displayName} - ${pkg.description}`,

      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.svg",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css",
        },
      ],
    },
  },

  tailwindcss: {
    viewer: false,
  },
});
