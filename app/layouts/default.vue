<template>
  <div>
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

</style>
