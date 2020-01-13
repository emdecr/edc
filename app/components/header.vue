<template>
  <header>
    <!-- <nuxt-link v-if="$route.path != '/'" to="/" class="home-link">
      <img src="~/assets/images/connect-extend.svg" alt>
    </nuxt-link>-->
    <nav class="flex-all flex--jc-sb flex--ai-c">
      <nuxt-link to="/" class="home-link home logo-home">
        <img src="~/assets/images/connect-extend.svg" alt>
      </nuxt-link>
      <ul>
        <li v-if="$route.path != '/'">
          <nuxt-link to="/" class="home">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/projects">Projects</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/writing">Writing</nuxt-link>
        </li>
        <!-- <li><a href="https://theswell.space" target="_blank">The Swell Space</a></li> -->
        <li>
          <nuxt-link to="#contact">Contact</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
header {
  padding: 4rem 0;
}

nav {
  max-width: 1000px;
  margin: 0 auto;
}

ul {
  display: flex;
  list-style-type: none;
  justify-content: flex-end;
  padding: 0;
}

.nuxt-link-exact-active,
.nuxt-link-active:not(.home) {
  font-weight: bold;
  border-bottom: 2px solid #f3f3f3;
}

.logo-home.nuxt-link-exact-active {
  padding: 0;
}

@media (prefers-color-scheme: dark) {
  .nuxt-link-exact-active {
    border-bottom: 2px solid yellow;
    border-bottom: 2px solid #f3f3f3;
  }
  .logo-home.nuxt-link-exact-active {
    border-bottom: none;
  }
}

a {
  font-family: "input-mono", monospace;
  text-decoration: none;
  display: block;
  font-size: 1rem;
  font-size: 0.8rem;
  border: none;
}

a:not(.logo-home) {
  padding: 0rem 1.5rem 0.5rem;
}

.home-link {
  font-family: ff-more-web-pro, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.5rem;
}

img {
  width: 50px;
  height: auto;
}
</style>
