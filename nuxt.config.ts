import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  
  nitro: {
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },

      title: `${pkg.displayName} - ${pkg.description}`,
      script: [
        {
          src: "https://cdn.tailwindcss.com",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.svg",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.min.css"
        }
      ],
    },
  },
});
