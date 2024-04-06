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

      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }
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
