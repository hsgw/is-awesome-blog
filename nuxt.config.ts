import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || 'https://is-awesome.5z6p.com',
    MICROCMS_X_API_KEY: process.env.DEV_MICROCMS_X_API_KEY || '',
    MICROCMS_API_BASE_URL: process.env.DEV_MICROCMS_API_BASE_URL || '',
    ITEMS_PER_PAGE: process.env.ITEMS_PER_PAGE || 10,
  },
  privateRuntimeConfig: {
    MICROCMS_X_API_KEY: process.env.MICROCMS_X_API_KEY,
    MICROCMS_API_BASE_URL: process.env.MICROCMS_API_BASE_URL,
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s is Awesome',
    htmlAttrs: {
      lang: 'jp',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'インターネットにあるイケてるものを並べるブログ　主に音楽やデザイン、電子工作のプロジェクトを集めています',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'is Awesome' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'is Awesome' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL || 'https://is-awesome.5z6p.com',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'インターネットにあるイケてるものを並べるブログ　主に音楽やデザイン、電子工作のプロジェクトを集めています',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          (process.env.BASE_URL || 'https://is-awesome.5z6p.com') +
          '/images/ogp.jpg',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ress', '@/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/_pageIndex.vue'),
      })
    },
  },
}

export default config
