import { mdiPageLayoutBody } from '@mdi/js'
import { NuxtConfig } from '@nuxt/types'
import axios from 'axios'
import { getSourceKind } from './scripts/article'
import { ArticleResult } from './scripts/cms'

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

  // in Development, set ssr: false
  ssr: process.env.NODE_ENV !== 'development',

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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/apple-touch-icon-180x180.png',
      },
      { rel: 'icon', type: 'image/png', href: '/icon-192x192.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ress', '@/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/transitionProps.ts', '@/plugins/VueGtag.ts'],

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
    '@nuxtjs/feed',
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
      routes.push({
        name: 'category',
        path: '/category/:category/:pageIndex?',
        component: resolve(__dirname, 'pages/_pageIndex.vue'),
      })
    },
  },

  generate: {
    exclude: [/^\/feed/],
  },

  feed: [
    {
      path: '/feed',
      type: 'rss2',
      create: async (feed: any) => {
        feed.options = {
          title: 'is Awesome',
          link: 'https://is-awesome.5z6p.com',
          description:
            'インターネットにあるイケてるものを並べるブログ　主に音楽やデザイン、電子工作のプロジェクトを集めています',
        }
        const result = await axios.get<ArticleResult>(
          process.env.DEV_MICROCMS_API_BASE_URL + 'articles',
          {
            headers: {
              'X-API-KEY': process.env.DEV_MICROCMS_X_API_KEY,
            },
            params: {
              limit: config.ITEMS_PER_PAGE,
              orders: '-publishedAt',
              fields: 'id,publishedAt,body,title,image,source',
              offset: 0,
            },
          }
        )
        if (!result.data.contents.length)
          console.error("can't get article data in make feed")
        result.data.contents.forEach((v) => {
          const body = v?.body
            ? v.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
            : ''
          feed.addItem({
            title: `${v.title} is Awesome`,
            id: `https://is-awesome.5z6p.com/posts/${v.id}`,
            link: `https://is-awesome.5z6p.com/posts/${v.id}`,
            description: body.slice(0, 100),
            content: body,
            date: new Date(v.publishedAt),
          })
        })
        feed.addContributor({
          name: 'hsgw',
          link: 'https://twitter.com/hsgw',
        })
      },
    },
  ],
}

export default config
