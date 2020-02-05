<template>
  <header>
    <!-- <nuxt-link v-if="$route.path != '/'" to="/" class="home-link">
      <img src="~/assets/images/connect-extend.svg" alt>
    </nuxt-link>-->
    <nav class="flex-all flex--jc-sb flex--ai-c">
      <nuxt-link to="/" class="home-link home logo-home">
        <img src="~/assets/images/connect-extend.svg" alt>
      </nuxt-link>
      <div class="flex-all flex--jc-sb flex--ai-c">
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
        <div tabindex="0" class="mode-switch">
          <div class="switch-top-left"></div>
        </div>
      </div>
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
  position: relative;
  z-index: 5;
}

@media only screen and (max-width: 1024px) {
  header {
    padding: 4rem 2rem;
  }
}

@media only screen and (max-width: 500px) {
  header {
    width: 100vw;
    overflow-x: scroll;
    padding: 0;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #363636;
  }
}

@media (prefers-color-scheme: light) {
  @media only screen and (max-width: 500px) {
    header {
      background: white;
    }
  }
}

nav {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

ul {
  display: flex;
  list-style-type: none;
  justify-content: flex-end;
  padding: 0;
}

@media only screen and (min-width: 500px) {
  ul {
    li:last-child {
      margin-right: 1rem;
    }
  }
}

.nuxt-link-exact-active,
.nuxt-link-active:not(.home) {
  font-weight: bold;
  border-bottom: 2px solid #f3f3f3;
}

.logo-home.nuxt-link-exact-active {
  padding: 0;
}

@media only screen and (max-width: 500px) {
  .logo-home {
    display: none;
  }
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

@media only screen and (max-width: 500px) {
  ul {
    justify-content: space-between;
    width: 100vw;
  }
  a:not(.logo-home) {
    padding: 1.5rem 1rem;
    font-size: 0.7rem;
    border: none;
  }
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

// THEME SWITCH

.mode-switch {
  display: none;
  // position: fixed;
  // top: 4.1rem;
  // right: 4rem;
  border-radius: 50px;
  height: 20px;
  width: 20px;
  overflow: hidden;
  background: white;
  border: 1px solid #363636;
  margin-top: -10px;
  &:hover {
    cursor: pointer;
  }
}

.switch-top-left {
  width: 0;
  height: 0;
  border-top: 20px solid #121212;
  border-right: 20px solid transparent;
}
</style>
