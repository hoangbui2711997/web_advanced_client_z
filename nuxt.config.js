module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'web_advenced_client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'stylesheet', href: '/index.css' },
      { rel: 'stylesheet', href: '/drift-basic.css' },
    ],
    script: [
      { src: '/Drift.js' }
    ]
  },
  css: [
    '~assets/styles/app.scss'
  ],
  plugins: [
    { src: '~/plugins/element', ssr: false },
    '~/plugins/i18n.js',
    { src: '~/plugins/nuxt-client-init.js' },
    { src: '~/plugins/only-client-side.js', ssr: false },
  ],
  env: {

  },
  router: {
    middleware: [
      'i18n',
      'set_token_if_exist',
    ]
  },
  proxy: {
    '/api/': 'http://localhost:8000',
    // '/api2/': 'http://api.another-website.com'
  },
  axios: {
    // API_PREFIX: '/api',
    // API_HOST: 'localhost',
    // API_PORT: 8000,
    // baseURL: `http://localhost:8000`,
    debug: true,
    proxy: true,
    // credentials: true,
    // proxyHeaders: true,
    // init (axios, ctx) {
    //   axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
    // }
  },
  auth: {
    // Options
  },
	modules: [
		'@nuxtjs/axios',
    // '@nuxtjs/auth'
	],
  // mode: 'spa',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
	// buildModules: ['@nuxt/typescript-build']
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
	  devtool: true,
	  parallel: true,
    // transpile: [
    //   '~/plugins/element'
    // ],
  }
}

