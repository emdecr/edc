<template>
  <div>
    <nuxt-link class="skip-main" :to="{ path: $route.path,hash:'main-content'}">Skip to main content</nuxt-link>
    <transition name="fade">
      <div id="main-content">
        <div class="content">
          <h1
            v-if="error.statusCode === 404"
            class="mono"
          >{{error.statusCode}} The content you’re looking for doesn’t exist (...yet)</h1>
          <h1 v-else>An error occurred</h1>
          <nuxt-link to="/">Go to the home page</nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
export default {
  props: ["error"],
  loading: {
    failedColor: "#e3e3e3"
  },
  components: {
    "comp-header": Header,
    "comp-footer": Footer
  }
  // layout: "" // you can set a custom layout for the error page
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

a {
  display: inline-block;
  margin-top: 2rem;
}

.content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
}

h1 {
  font-size: 30px;
}
</style>