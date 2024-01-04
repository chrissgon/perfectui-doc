import pkg from "./package.json";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  devtools: {
    enabled: false,
  },

  nitro: {
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "dark",
      },

      title: `${pkg.displayName} - ${pkg.description}`,

      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.svg",
        },
      ],

      script: [
        {
          src: "/lazy-icons.js",
          defer: true,
        },
      ],
    },
  },

  tailwindcss: {
    viewer: false,
  },
});
