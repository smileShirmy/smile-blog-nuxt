
module.exports = {
  mode: 'universal',

  server: {
    port: 5000, // default: 5000
    host: '0.0.0.0'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'smile',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '前端，JavaScript，博客，Node，Vue' },
      { name: 'author', content: 'qiushiming1997@gmail.com' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: '//resource.shirmy.me' },
      { rel: 'dns-prefetch', href: '//api.shirmy.me' },
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://resource.shirmy.me/intersection-polyfill.js'
      }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    'highlight.js/styles/github.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/marked.js'
    },
    {
      src: '@/plugins/highlight.js'
    },
    {
      src: '@/plugins/filter.js'
    },
    {
      src: '@/plugins/global-component.js'
    },
    {
      src: '@/plugins/baidu-seo-push.js',
      ssr: false
    },
    {
      src: '@/plugins/copy.js',
      ssr: false
    },
  ],
  /**
   * router config
   */
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixin.scss']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
