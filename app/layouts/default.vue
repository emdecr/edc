<template>
  <div>
    <nuxt-link class="skip-main" :to="{ path: $route.path,hash:'main-content'}">Skip to main content</nuxt-link>
    <comp-header />
    <transition name="fade">
    <nuxt id="main-content" />
    </transition>
    <comp-footer />
  </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
export default {
  components: {
    'comp-header': Header,
    'comp-footer': Footer
  },
}
</script>


<style>

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

#main-content {
  padding: 4rem 0;
}

</style>
