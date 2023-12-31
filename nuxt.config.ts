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
