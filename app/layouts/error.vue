<template>
  <div>
    <nuxt-link class="skip-main" :to="{ path: $route.path,hash:'main-content'}">Skip to main content</nuxt-link>
    <comp-header/>
    <transition name="fade">
      <div id="main-content">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/">Home page</nuxt-link>
      </div>
    </transition>
    <comp-footer/>
  </div>
</template>

<script>
export default {
  props: ["error"],
  loading: {
    failedColor: "#e3e3e3"
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
</style>