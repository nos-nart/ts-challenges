// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/a11y",
    "@nuxt/hints",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
  ],

  ssr: false,

  sourcemap: false,

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  // Optimized configuration for Monaco & Shiki in Nuxt 4/Vite
  vite: {
    optimizeDeps: {
      include: ["splitpanes", "monaco-editor", "@shikijs/monaco", "shiki"],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },

  app: {
    head: {
      titleTemplate: 'ts challenges',
      htmlAttrs: {
        lang: 'en-US',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
});
