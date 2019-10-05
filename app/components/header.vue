<template>
    <header>
        <nav>
            <ul>
                <nuxt-link v-if="$route.path != '/'" to="/">Home</nuxt-link>
                <nuxt-link to="/about">About</nuxt-link>
                <nuxt-link to="/projects">Projects</nuxt-link>
                <a href="https://theswell.space" target="_blank">The Swell Space</a>
                <nuxt-link to="#contact">Contact</nuxt-link>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   components: {
   },
   data: function() {
      return {

      }
   },
   methods: {

   },
}
</script>

<style lang="scss" scoped>

.nuxt-link-exact-active {
    font-weight: bold;
}

</style>
