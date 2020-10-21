
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { property: 'og:image', content: 'https://dacade.org/img/dacade_og.png' },
      { property: 'og:description', content: 'Peer-to-Peer Learning' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/font-awesome.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/custom.scss',
    '@/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vee-validate.js' },
    '~/plugins/fireauth.js',
    '~/plugins/globals.js'
  ],

  router: {
    middleware: 'router-auth'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-36567351-2',
      dev: false
    }],
    'cookie-universal-nuxt',
    ['nuxt-bugsnag', {
      apiKey: '77a1ecc00ef7ab8ac27ac7ebfb353afd',
      enabledReleaseStages: ['staging', 'production'],
      reporterOptions: {
        releaseStage: process.env.NODE_ENV,
        autoAssignRelease: true
      },
      publishRelease: true
    }]
  ],
  bootstrapVue: {
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
      'SpinnerPlugin'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
