import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  colorMode: {
    classSuffix: ''
  },

  pinia: {
    storesDirs: ['./store/**']
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'My-Pocket',
      meta: [{ name: 'description', content: appDescription }]
    }
  }
})
