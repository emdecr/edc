<template>
  <div>
    <a class="skip-main" href="#main-content">Skip to main content</a>
    <v-header />
    <transition name="fade">
    <nuxt />
    </transition>
    <v-footer />
  </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
export default {
  components: {
    'v-header': Header,
    'v-footer': Footer
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

</style>
