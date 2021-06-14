export default {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { property: 'og:image', content: 'https://dacade.org/img/dacade_og.png' },
      { property: 'og:description', content: 'Peer-to-Peer Learning' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/font-awesome.min.css' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1B66F8' },
  /*
   ** Global CSS
   */
  // css: ['@/assets/css/custom.scss', '@/assets/css/main.css'],
  css: ['@/assets/css/fonts.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vee-validate.js' },
    '~/plugins/globals.js',
    '~/plugins/axios',
    '~/plugins/api.js',
    '~/plugins/fireauth.js',
    '~/plugins/highlight',
    { src: '~/plugins/vClickOutside.js', ssr: false },
  ],

  router: {
    middleware: 'router-auth',
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt',
    'nuxt-highlightjs',
    '@nuxtjs/svg',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-36567351-2',
        dev: false,
      },
    ],
    'cookie-universal-nuxt',
    'nuxt-i18n',
    '@nuxtjs/markdownit',
    '@nuxtjs/axios',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    componentPlugins: [
      'AlertPlugin',
      'BadgePlugin',
      'ButtonPlugin',
      'CardPlugin',
      'LayoutPlugin',
      'FormInputPlugin',
      'FormGroupPlugin',
      'FormPlugin',
      'FormRadioPlugin',
      'FormSelect',
      'FormTextarea',
      'ImagePlugin',
      'ModalPlugin',
      'NavbarPlugin',
      'TabsPlugin',
      'SpinnerPlugin',
    ],
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    [
      'nuxt-bugsnag',
      {
        apiKey: '77a1ecc00ef7ab8ac27ac7ebfb353afd',
        enabledReleaseStages: ['staging', 'production'],
        reporterOptions: {
          releaseStage: process.env.NODE_ENV,
          autoAssignRelease: true,
        },
        publishRelease: true,
      },
    ],
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  storybook: {
    stories: ['~/stories/**/*.stories.js'],
    addons: ['@storybook/addon-controls', '@storybook/addon-notes'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        es: require('./locales/es.json'),
      },
    },
  },

  fontawesome: {
    icons: {
      brands: ['faTwitter', 'faTelegramPlane', 'faYoutube'],
    },
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    langPrefix: 'language-',
    typographer: true,
    highlight: (str, lang) => {
      const hljs = require('highlight.js')
      const hljsDefineSolidity = require('highlightjs-solidity')
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            hljsDefineSolidity(hljs) +
            hljs.initHighlightingOnLoad() +
            '</code></pre>'
          )
        } catch (__) {}
      }

      return '' // use external default escaping
    },

    use: ['markdown-it-div', 'markdown-it-attrs'],
  },
}
