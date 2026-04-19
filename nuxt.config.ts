// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@nuxtjs/mdc',
    'nuxt-og-image',
    '@nuxt/fonts'
  ],

  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      titleTemplate: '%s | TS Challenges',
      htmlAttrs: {
        lang: 'en-US'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://ts-challenges.vercel.app',
    name: 'TypeScript Challenges'
  },

  sourcemap: false,

  compatibilityDate: '2025-01-15',

  // Optimized configuration for Monaco & Shiki in Nuxt 4/Vite
  vite: {
    optimizeDeps: {
      include: [
        'splitpanes',
        'monaco-editor',
        '@shikijs/monaco',
        'shiki',
        '@vueuse/core',
        'idb-keyval',
        '@vueuse/integrations',
        '@vueuse/integrations/useIDBKeyval'
      ]
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      },
      rollupOptions: {
        onwarn(warning, warn) {
          // With the update to nuxt 4.4.2 a ton of messages about missing sourcemaps started to appear, but sourcemaps
          // are disabled by default on nuxt and we do not want them, and thus there is no need to worry about the
          // warning, so just ignore these.
          if (warning.code === 'SOURCEMAP_BROKEN') {
            return // ignore
          }
          warn(warning)
        }
      }
    }
  },

  typescript: {
    typeCheck: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    enabled: true
  }
})
