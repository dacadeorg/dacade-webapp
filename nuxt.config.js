export default {
  ssr: false,
  target: 'static',
  /*
   ** Headers of the page
   */
  env: {
    packageName: process.env.npm_package_name || '',
  },
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
      {
        rel: 'icon',
        sizes: '180x180',
        href: '/fav-icons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/fav-icons/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/fav-icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'mask-icon',
        href: '/fav-icons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
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
    '~/plugins/api.js',
    '~/plugins/auth.js',
    '~/plugins/highlight',
    { src: '~/plugins/vClickOutside.js', ssr: false },
    { src: '~/plugins/persistedState.client.js', ssr: false },
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
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.NODE_ENV}`,
      },
    ],
    [
      'nuxt-highlightjs',
      {
        style: 'obsidian',
      },
    ],
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
    '@nuxt/content',
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
    '@nuxt/image',
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
      regular: ['faTimesCircle'],
      solid: ['faSpinner'],
      brands: ['faTwitter', 'faTelegramPlane', 'faYoutube', 'faDiscord'],
    },
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    langPrefix: 'language-',
    typographer: true,
    highlight: (str, lang) => {
      lang = lang || 'js'

      const hljs = require('highlight.js')
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {
        return ''
      }
    },

    use: ['markdown-it-div', 'markdown-it-attrs'],
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },
}
