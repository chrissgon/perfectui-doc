// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
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
