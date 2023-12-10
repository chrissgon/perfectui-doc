// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      script: [
        {
          src: "https://cdn.tailwindcss.com",
        },
        // {
        //   src: "https://unpkg.com/@chrissgon/perfectui@0.4.8/dist/perfectui.js",
        //   type: "module"
        // },
      ],
      link: [
        // {
        //   rel: "stylesheet",
        //   href: "https://unpkg.com/@chrissgon/perfectui@0.4.8/dist/perfectui.css",
        // },
      ],
    },
  },
  // devtools: { enabled: true }
});
