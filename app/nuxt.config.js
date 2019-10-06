import pkg from './package'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'emily dela cruz | designer + developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Based in Toronto. Interested in helping out a good cause through compelling stories and code." },
      { hid: 'twitter:card', name: 'twitter:card', content: "summary" },
      { hid: 'twitter:site', name: 'twitter:site', content: "@emdecr" },
      { hid: 'twitter:title', name: 'twitter:title', content: "emily dela cruz | designer + developer" },
      { hid: 'twitter:description', name: 'twitter:description', content: "Based in Toronto. Interested in helping out a good cause through compelling stories and code." },
      { hid: 'twitter:creator', name: 'twitter:creator', content: "@emdecr" },
      { hid: 'twitter:image', name: 'twitter:image', content: "" },
      { hid: 'og:title', name: 'og:title', content: "emily dela cruz | designer + developer" },
      { hid: 'og:type', name: 'og:type', content: "Website" },
      { hid: 'og:url', name: 'og:url', content: "https://emilydelacruz.com/" },
      { hid: 'og:image', name: 'og:image', content: "" },
      { hid: 'og:description', name: 'og:description', content: "Based in Toronto. Interested in helping out a good cause through compelling stories and code." },
      { hid: 'og:site_name', name: 'og:site_name', content: "emily dela cruz | designer + developer" }
    ],
    script: [
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/gsa5ewd.css' }
    ],
  },
  /*
  ** Used to go to top of page for pagaination
  */
  router: {
    base: process.env.BASE_ROUTER,
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e3e3e3', height: '3px' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/layout.css',
    '@/assets/css/global.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome',
    '~/plugins/vue-paginate',
    { src: "~/plugins/vue-aos", ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: 'UA-56305018-1'
    }]
  ],
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
