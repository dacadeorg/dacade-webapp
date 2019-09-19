
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    { src: '~/plugins/vee-validate.js' }
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
      'FormTextarea',
      'ImagePlugin',
      'ModalPlugin',
      'NavbarPlugin'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    analyze: true,
    extend(config, ctx) {
    }
  }
}
