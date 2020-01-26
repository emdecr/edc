import pkg from "./package";

require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Emily Dela Cruz | Web Developer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A web developer helping values-driven organizations, who's also into user experience research."
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      },
      { hid: "twitter:site", name: "twitter:site", content: "@emdecr" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Emily Dela Cruz | Web Developer"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "A web developer helping values-driven organizations, who's also into user experience research."
      },
      { hid: "twitter:creator", name: "twitter:creator", content: "@emdecr" },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://emilydelacruz.com/files/emily_dela_cruz_social.png"
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Emily Dela Cruz | Web Developer"
      },
      {
        hid: "author",
        name: "author",
        content: "Emily Dela Cruz"
      },
      {
        hid: "last-modified",
        name: "last-modified",
        content: "Sun, 26 Jan 2020 14:45 EST"
      },
      {
        hid: "DC.date",
        name: "DC.date",
        content: "2020-01"
      },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:url", name: "og:url", content: "https://emilydelacruz.com/" },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://emilydelacruz.com/files/emily_dela_cruz_social.png"
      },
      {
        hid: "og:image:width",
        name: "og:image:width",
        content: "1200"
      },
      {
        hid: "og:image:height",
        name: "og:image:height",
        content: "630"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "A web developer helping values-driven organizations, who's also into user experience research."
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Emily Dela Cruz | Web Developer"
      }
    ],
    script: [],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/fav/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/fav/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/fav/favicon-32x32.png"
      },
      { rel: "stylesheet", href: "https://use.typekit.net/gsa5ewd.css" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i|Material+Icons&display=swap"
      }
    ]
  },
  /*
   ** Used to go to top of page for pagaination
   */
  router: {
    base: process.env.BASE_ROUTER,
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }

      const findEl = async (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve();
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1));
            }, 100);
          })
        );
      };

      if (to.hash) {
        let el = await findEl(to.hash);
        if ("scrollBehavior" in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        } else {
          return window.scrollTo(0, el.offsetTop);
        }
      }

      return { x: 0, y: 0 };
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#e3e3e3", height: "3px" },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/css/global.css",
    "@/assets/css/typography.css",
    "@/assets/css/layout.css",
    "@/assets/css/scheme.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/fontawesome", { src: "~/plugins/vue-aos", ssr: false }],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/moment",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-56305018-1"
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {}
  }
};
