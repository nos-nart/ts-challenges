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
    '@nuxt/fonts',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    injectRegister: 'script',
    manifest: {
      name: 'TypeScript Challenges',
      short_name: 'TS Challenges',
      theme_color: '#000000',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^\/data\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'challenge-data',
            expiration: {
              maxEntries: 1000,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },

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
