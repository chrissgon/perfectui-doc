import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,

  app: {
    head: {
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
      ],
    },
  },
});
