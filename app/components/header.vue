<template>
  <header :class="[$route.path != '/' ? 'flex-all flex--jc-sb flex--ai-c' : '']">
    <nuxt-link v-if="$route.path != '/'" to="/" class="home-link">emily dela cruz</nuxt-link>
    <nav>
      <ul>
        <li v-if="$route.path != '/'">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/projects">Projects</nuxt-link>
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
ul {
  display: flex;
  list-style-type: none;
  justify-content: flex-end;
  padding: 0;
}

.nuxt-link-exact-active {
  font-weight: bold;
  border-bottom: 4px solid #f3f3f3;
}

@media (prefers-color-scheme: dark) {
  .nuxt-link-exact-active {
    border-bottom: 4px solid yellow;
    border-bottom: 4px solid #f3f3f3;
  }
}

a {
  font-family: "input-mono", monospace;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  display: block;
  font-size: 1rem;
  border: none;
}

.home-link {
  font-family: ff-more-web-pro, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.5rem;
}
</style>
